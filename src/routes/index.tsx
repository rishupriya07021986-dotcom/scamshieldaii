import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Shield,
  Zap,
  Brain,
  Link2,
  MessageSquare,
  Eye,
  Sparkles,
  ArrowRight,
  Lock,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScamShield AI — Detect scams, phishing & manipulation" },
      {
        name: "description",
        content: "Paste any suspicious message or link. ScamShield AI uses Gemini to instantly detect phishing, scams, and emotional manipulation tactics.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Powered by Gemini AI · Real-time analysis
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            Outsmart scammers <br />
            with <span className="text-gradient">AI on your side</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Paste a suspicious email, SMS, DM, or link. ScamShield AI instantly detects phishing,
            fake urgency, impersonation, and the psychological tricks behind every scam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/analyzer"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 font-medium text-primary-foreground shadow-[0_0_30px_oklch(0.78_0.18_240_/_45%)] hover:shadow-[0_0_45px_oklch(0.72_0.24_305_/_60%)] transition-all"
            >
              Analyze a message
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border glass px-6 py-3 font-medium hover:bg-white/5 transition-colors"
            >
              Learn how it works
            </Link>
          </motion.div>

          {/* Floating shield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative mx-auto w-full max-w-3xl"
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8 animate-pulse-glow">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <span className="h-2 w-2 rounded-full bg-danger" />
                <span className="h-2 w-2 rounded-full bg-warning" />
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="ml-2 font-mono">scamshield.ai · live analysis</span>
              </div>
              <div className="font-mono text-sm text-left space-y-3">
                <div className="text-muted-foreground">&gt; analyzing message...</div>
                <div className="text-neon-cyan">[✓] phishing pattern detected</div>
                <div className="text-warning">[!] urgency manipulation: HIGH</div>
                <div className="text-danger">[!] impersonation attempt: amazon</div>
                <div className="text-neon-purple">[ai] scam probability: 94/100</div>
                <div className="text-success">[→] recommendation: do not click link</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Three layers of <span className="text-gradient">protection</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Modern scams are emotional, urgent, and designed to bypass your judgment. ScamShield catches them before you act.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon={MessageSquare}
            title="Message analyzer"
            desc="Detects phishing, smishing, romance scams, fake invoices, and impersonation across emails, SMS, and chats."
            tone="blue"
          />
          <FeatureCard
            icon={Brain}
            title="Manipulation insights"
            desc="Surfaces the exact psychological tactics — urgency, fear, authority, reward bait — with quoted evidence."
            tone="purple"
          />
          <FeatureCard
            icon={Link2}
            title="Suspicious link checker"
            desc="Spots typo-squatting, fake subdomains, IP-based hosts, and homograph attacks before you click."
            tone="cyan"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="glass-strong rounded-3xl p-8 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neon-cyan mb-4">
                <Activity className="h-3.5 w-3.5" /> How it works
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                From suspicion to clarity in seconds
              </h2>
              <p className="mt-4 text-muted-foreground">
                Powered by Gemini's reasoning, every analysis returns a structured report you can actually act on — not vague warnings.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Scam probability score (0–100)",
                  "Threat level + scam category",
                  "Manipulation tactics with evidence",
                  "Plain-language explanation",
                  "Concrete safety recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-neon-purple mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Zap, label: "Instant analysis", value: "<3s" },
                { icon: Shield, label: "Threat coverage", value: "20+" },
                { icon: Eye, label: "Tactics tracked", value: "8+" },
                { icon: Lock, label: "Privacy", value: "Zero retention" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="glass rounded-2xl p-5">
                    <Icon className="h-5 w-5 text-neon-blue mb-3" />
                    <div className="text-2xl font-semibold">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-neon-purple/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-neon-blue/20 blur-3xl" />
          <Shield className="h-12 w-12 mx-auto text-neon-cyan" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
            Stop scams before they cost you.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Free, instant, and built to make AI work for the people scammers usually target.
          </p>
          <Link
            to="/analyzer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 font-medium text-primary-foreground shadow-[0_0_30px_oklch(0.78_0.18_240_/_45%)]"
          >
            Launch ScamShield <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  tone,
}: {
  icon: typeof Shield;
  title: string;
  desc: string;
  tone: "blue" | "purple" | "cyan";
}) {
  const toneClass =
    tone === "blue" ? "text-neon-blue" : tone === "purple" ? "text-neon-purple" : "text-neon-cyan";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 hover:border-white/20 transition-colors group"
    >
      <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-white/5 border border-border/60 group-hover:scale-105 transition-transform">
        <Icon className={`h-5 w-5 ${toneClass}`} />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}
