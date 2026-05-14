import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import type { AnalysisResult, ThreatLevel } from "@/lib/analysis-types";

const RequestSchema = z.object({
  content: z.string().min(1).max(10000),
  type: z.enum(["message", "url"]).default("message"),
});

function extractJson(raw: string): unknown {
  let s = raw.trim();
  // Strip markdown fences
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  // Find first { and last }
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start !== -1 && end > start) s = s.slice(start, end + 1);
  return JSON.parse(s);
}

function normalizeThreatLevel(v: unknown): ThreatLevel {
  const s = String(v ?? "").toLowerCase().trim();
  if (s.includes("critical")) return "critical";
  if (s.includes("high")) return "high";
  if (s.includes("medium") || s.includes("moderate")) return "medium";
  if (s.includes("low")) return "low";
  if (s.includes("safe") || s.includes("none")) return "safe";
  return "low";
}

function normalize(raw: any): AnalysisResult {
  const tactics = Array.isArray(raw?.manipulationTactics) ? raw.manipulationTactics : [];
  return {
    scamProbability: Math.max(0, Math.min(100, Number(raw?.scamProbability ?? 0))),
    threatLevel: normalizeThreatLevel(raw?.threatLevel),
    scamCategory: String(raw?.scamCategory ?? "Unknown"),
    manipulationTactics: tactics.map((t: any) =>
      typeof t === "string"
        ? { name: t, severity: "medium" as const, evidence: "" }
        : {
            name: String(t?.name ?? "Tactic"),
            severity: (["low", "medium", "high"].includes(String(t?.severity).toLowerCase())
              ? String(t.severity).toLowerCase()
              : "medium") as "low" | "medium" | "high",
            evidence: String(t?.evidence ?? ""),
          }
    ).slice(0, 8),
    suspiciousIndicators: Array.isArray(raw?.suspiciousIndicators)
      ? raw.suspiciousIndicators.map((x: any) => String(x)).slice(0, 8)
      : [],
    explanation: String(raw?.explanation ?? "No explanation provided."),
    safetyAdvice: Array.isArray(raw?.safetyAdvice) && raw.safetyAdvice.length
      ? raw.safetyAdvice.map((x: any) => String(x)).slice(0, 6)
      : ["Do not click any links or share personal information until you've verified the sender through an official channel."],
  };
}

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const apiKey = process.env.GEMINI_API_KEY || process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "AI gateway not configured" }, { status: 500 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = RequestSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const { content, type } = parsed.data;
        const gateway = createLovableAiGatewayProvider(apiKey);
        const model = gateway("google/gemini-3-flash-preview");

        const systemPrompt = `You are ScamShield AI, an expert cybersecurity & social-engineering analyst. Analyze the provided ${
          type === "url" ? "URL" : "message"
        } for scams, phishing, fraud, impersonation, suspicious links, and psychological manipulation.

Respond ONLY with a single JSON object. Do not include markdown fences, prose, or commentary. The JSON MUST match this exact shape:

{
  "scamProbability": number,            // 0-100
  "threatLevel": "Low" | "Medium" | "High" | "Critical",
  "scamCategory": string,               // e.g. "Phishing", "Smishing", "Romance scam", "Tech support scam", "Legitimate"
  "manipulationTactics": [              // up to 8 items
    { "name": string, "severity": "low" | "medium" | "high", "evidence": string }
  ],
  "suspiciousIndicators": string[],     // up to 8 concrete red flags
  "explanation": string,                // 2-4 sentence human-friendly explanation
  "safetyAdvice": string[]              // 1-6 concrete actions
}

Be calibrated: do not cry wolf on legitimate messages, and be firm when red flags are clear. Quote specific evidence from the input.`;

        try {
          const { text } = await generateText({
            model,
            system: systemPrompt,
            prompt: `Analyze this ${type === "url" ? "URL" : "message"}:\n\n"""\n${content}\n"""\n\nReturn ONLY the JSON object.`,
          });

          let parsedJson: unknown;
          try {
            parsedJson = extractJson(text);
          } catch (e) {
            console.error("[analyze] JSON parse failed", text);
            return Response.json(
              { error: "AI returned an unreadable response. Please try again." },
              { status: 502 }
            );
          }

          return Response.json(normalize(parsedJson));
        } catch (err) {
          const e = err as { statusCode?: number; status?: number; message?: string };
          const status = e.statusCode ?? e.status;
          if (status === 429) {
            return Response.json(
              { error: "Rate limit reached. Please wait a moment and try again." },
              { status: 429 }
            );
          }
          if (status === 402) {
            return Response.json(
              { error: "AI credits exhausted. Add credits in Workspace Settings." },
              { status: 402 }
            );
          }
          console.error("[analyze] error", err);
          return Response.json({ error: e.message ?? "Analysis failed" }, { status: 500 });
        }
      },
    },
  },
});
