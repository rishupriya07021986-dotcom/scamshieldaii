import { motion } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Eye,
  Brain,
  Lightbulb,
  Flame,
  Crown,
  Gift,
  UserX,
  Clock,
  Sparkles,
} from "lucide-react";
import type { AnalysisResult, ThreatLevel } from "@/lib/analysis-types";

const threatStyles: Record<ThreatLevel, { label: string; color: string; ring: string; Icon: typeof ShieldCheck }> = {
  safe: { label: "Safe", color: "text-success", ring: "ring-success/40", Icon: ShieldCheck },
  low: { label: "Low risk", color: "text-success", ring: "ring-success/40", Icon: ShieldCheck },
  medium: { label: "Medium risk", color: "text-warning", ring: "ring-warning/40", Icon: AlertTriangle },
  high: { label: "High risk", color: "text-danger", ring: "ring-danger/40", Icon: ShieldAlert },
  critical: { label: "Critical threat", color: "text-danger", ring: "ring-danger/60", Icon: ShieldAlert },
};

function tacticIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("urgen") || n.includes("time") || n.includes("pressure")) return Clock;
  if (n.includes("fear") || n.includes("threat")) return Flame;
  if (n.includes("authority") || n.includes("official")) return Crown;
  if (n.includes("reward") || n.includes("bait") || n.includes("prize") || n.includes("greed")) return Gift;
  if (n.includes("imperson") || n.includes("identity")) return UserX;
  return Sparkles;
}

export function AnalysisResults({ result }: { result: AnalysisResult }) {
  const threat = threatStyles[result.threatLevel];
  const ThreatIcon = threat.Icon;
  const score = Math.round(result.scamProbability);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Score + threat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-6 md:col-span-1 flex flex-col items-center text-center"
        >
          <ScoreRing score={score} />
          <p className="mt-3 text-sm text-muted-foreground">Scam probability</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`glass rounded-2xl p-6 md:col-span-2 flex flex-col justify-center ring-1 ${threat.ring}`}
        >
          <div className="flex items-center gap-3">
            <ThreatIcon className={`h-7 w-7 ${threat.color}`} />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Threat level</p>
              <p className={`text-2xl font-semibold ${threat.color}`}>{threat.label}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Category:</span>
            <span className="rounded-full bg-white/5 border border-border/60 px-3 py-1 font-medium">
              {result.scamCategory}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Brain className="h-4 w-4 text-neon-purple" />
          <span>AI explanation</span>
        </div>
        <p className="text-base leading-relaxed text-foreground/90">{result.explanation}</p>
      </motion.div>

      {/* Manipulation tactics */}
      {result.manipulationTactics.length > 0 && (
        <div>
          <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Eye className="h-4 w-4 text-neon-blue" /> Manipulation tactics detected
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.manipulationTactics.map((t, i) => {
              const Icon = tacticIcon(t.name);
              const sevColor =
                t.severity === "high" ? "text-danger" : t.severity === "medium" ? "text-warning" : "text-neon-cyan";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="glass rounded-xl p-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg p-2 bg-white/5 border border-border/60">
                      <Icon className={`h-4 w-4 ${sevColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium">{t.name}</h4>
                        <span className={`text-[10px] uppercase tracking-wider ${sevColor}`}>{t.severity}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground italic">"{t.evidence}"</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Indicators */}
      {result.suspiciousIndicators.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" /> Suspicious indicators
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {result.suspiciousIndicators.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neon-purple shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Safety advice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-2xl p-6 ring-1 ring-neon-cyan/20"
      >
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-neon-cyan" /> What you should do
        </h3>
        <ul className="space-y-2">
          {result.safetyAdvice.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75 ? "oklch(0.68 0.24 20)" : score >= 40 ? "oklch(0.82 0.18 80)" : "oklch(0.78 0.18 155)";

  return (
    <div className="relative h-32 w-32">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} stroke="oklch(1 0 0 / 8%)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums">{score}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}
