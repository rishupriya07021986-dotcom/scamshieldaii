import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { generateText, Output } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

const RequestSchema = z.object({
  content: z.string().min(1).max(10000),
  type: z.enum(["message", "url"]).default("message"),
});

const AnalysisSchema = z.object({
  scamProbability: z.number().min(0).max(100).describe("Likelihood this is a scam, 0-100"),
  threatLevel: z.enum(["safe", "low", "medium", "high", "critical"]),
  scamCategory: z.string().describe("Short category, e.g. 'Phishing', 'Romance scam', 'Crypto fraud', 'Smishing', 'Tech support scam', 'Legitimate'"),
  manipulationTactics: z
    .array(
      z.object({
        name: z.string().describe("Short tactic name e.g. 'Urgency Pressure', 'Fake Authority'"),
        severity: z.enum(["low", "medium", "high"]),
        evidence: z.string().describe("Quoted or paraphrased excerpt that shows this tactic"),
      })
    )
    .max(8),
  suspiciousIndicators: z.array(z.string()).max(8).describe("Concrete red flags spotted"),
  explanation: z.string().describe("2-4 sentence human-friendly explanation"),
  safetyAdvice: z.array(z.string()).min(1).max(6).describe("Concrete actions the user should take"),
});

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "AI gateway not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const parsed = RequestSchema.safeParse(body);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { content, type } = parsed.data;
        const gateway = createLovableAiGatewayProvider(apiKey);
        const model = gateway("google/gemini-3-flash-preview");

        const systemPrompt =
          type === "url"
            ? `You are ScamShield AI, a cybersecurity assistant specialized in detecting phishing URLs and suspicious links. Analyze the provided URL for phishing indicators (typo-squatting, suspicious TLDs, IP-based hosts, deceptive subdomains, URL shorteners hiding redirects, mismatched brand spelling, suspicious query params, punycode/homograph attacks). Be precise, evidence-based, and conservative — only mark legitimate well-known domains as safe.`
            : `You are ScamShield AI, an expert cybersecurity & social-engineering analyst. Analyze the suspicious message (email / SMS / WhatsApp / DM) for scams, phishing, fraud, impersonation, and psychological manipulation. Quote specific evidence from the message. Be calibrated — don't cry wolf on legitimate messages, and be firm when red flags are clear.`;

        try {
          const { experimental_output } = await generateText({
            model,
            system: systemPrompt,
            prompt: `Analyze this ${type === "url" ? "URL" : "message"} and return structured findings:\n\n"""\n${content}\n"""`,
            experimental_output: Output.object({ schema: AnalysisSchema }),
          });

          return new Response(JSON.stringify(experimental_output), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          const e = err as { statusCode?: number; status?: number; message?: string };
          const status = e.statusCode ?? e.status;
          if (status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit reached. Please wait a moment and try again." }), {
              status: 429,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (status === 402) {
            return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Workspace Settings." }), {
              status: 402,
              headers: { "Content-Type": "application/json" },
            });
          }
          console.error("[analyze] error", err);
          return new Response(JSON.stringify({ error: e.message ?? "Analysis failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
