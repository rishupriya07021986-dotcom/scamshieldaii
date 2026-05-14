import { createFileRoute } from "@tanstack/react-router";
import { Analyzer } from "@/components/Analyzer";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/analyzer")({
  head: () => ({
    meta: [
      { title: "Scam Analyzer — ScamShield AI" },
      { name: "description", content: "Paste a suspicious message or URL and get an instant Gemini-powered scam analysis." },
      { property: "og:title", content: "Scam Analyzer — ScamShield AI" },
      { property: "og:description", content: "Instant AI analysis of suspicious messages and links." },
    ],
  }),
  component: AnalyzerPage,
});

function AnalyzerPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground mb-4">
          <Shield className="h-3.5 w-3.5 text-neon-cyan" />
          Live Gemini AI analysis
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Scam <span className="text-gradient">Analyzer</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Paste a suspicious message or link below. We'll break down the threat, the tactics used, and what to do next.
        </p>
      </header>
      <Analyzer />
    </div>
  );
}
