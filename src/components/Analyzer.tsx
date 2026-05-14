import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Send, MessageSquare, Link2, Sparkles } from "lucide-react";
import { AnalysisResults } from "./AnalysisResults";
import type { AnalysisResult } from "@/lib/analysis-types";

const SAMPLE_MESSAGE = `URGENT: Your bank account has been suspended due to suspicious activity. Verify your identity within 24 hours or your account will be permanently closed. Click here: http://secure-bank-verify.tk/login`;

const SAMPLE_URL = `http://amaz0n-account-verify.security-update.tk/signin?ref=urgent`;

export function Analyzer() {
  const [tab, setTab] = useState<"message" | "url">("message");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), type: tab }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Analysis failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  function loadSample() {
    setContent(tab === "message" ? SAMPLE_MESSAGE : SAMPLE_URL);
  }

  return (
    <div className="space-y-8">
      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit mb-5">
          <TabButton active={tab === "message"} onClick={() => setTab("message")} icon={MessageSquare}>
            Message
          </TabButton>
          <TabButton active={tab === "url"} onClick={() => setTab("url")} icon={Link2}>
            URL
          </TabButton>
        </div>

        <form onSubmit={analyze} className="space-y-4">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                tab === "message"
                  ? "Paste a suspicious email, SMS, WhatsApp message, or DM..."
                  : "Paste a suspicious link, e.g. https://..."
              }
              rows={tab === "url" ? 2 : 7}
              maxLength={10000}
              className="w-full rounded-xl bg-input/40 border border-border focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20 outline-none px-4 py-3 text-sm font-mono resize-none transition-all"
            />
            <div className="absolute bottom-3 right-3 text-[11px] text-muted-foreground tabular-nums">
              {content.length} / 10000
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_25px_oklch(0.78_0.18_240_/_40%)] hover:shadow-[0_0_35px_oklch(0.72_0.24_305_/_55%)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Analyze with AI
                </>
              )}
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            >
              <Sparkles className="h-4 w-4" /> Try a sample
            </button>
          </div>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center scan-line"
          >
            <div className="relative h-14 w-14 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-neon-blue/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-blue animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-neon-purple animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
            </div>
            <p className="font-medium">Scanning with Gemini AI</p>
            <p className="text-sm text-muted-foreground mt-1">
              Analyzing patterns, manipulation tactics, and threat indicators...
            </p>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 ring-1 ring-danger/40"
          >
            <p className="text-sm text-danger">{error}</p>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div key="result">
            <AnalysisResults result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof MessageSquare;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {active && (
        <motion.div
          layoutId="tab-pill"
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-white/10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <Icon className="h-4 w-4 relative" />
      <span className="relative">{children}</span>
    </button>
  );
}
