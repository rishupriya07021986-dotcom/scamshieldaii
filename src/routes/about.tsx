import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, Flame, Crown, Gift, UserX, Sparkles, Shield, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Cyber Awareness — ScamShield AI" },
      { name: "description", content: "Learn how scammers exploit psychology — urgency, fear, authority, reward bait, impersonation — and how to defend yourself." },
      { property: "og:title", content: "Cyber Awareness — ScamShield AI" },
      { property: "og:description", content: "Understand the psychology behind modern scams." },
    ],
  }),
  component: AboutPage,
});

const tactics = [
  {
    icon: Clock,
    name: "Urgency Pressure",
    color: "text-neon-blue",
    desc: '"Act in the next 30 minutes or your account closes." Time pressure shuts down rational thinking and forces hasty decisions.',
  },
  {
    icon: Flame,
    name: "Fear Tactics",
    color: "text-danger",
    desc: '"There is suspicious activity on your account." Fear of loss, legal trouble, or embarrassment makes people comply without verifying.',
  },
  {
    icon: Crown,
    name: "Fake Authority",
    color: "text-warning",
    desc: 'Impersonating banks, the IRS, the police, or your CEO. Authority bias makes us obey requests we would otherwise question.',
  },
  {
    icon: Gift,
    name: "Reward Bait",
    color: "text-success",
    desc: '"You won a prize", "claim your refund", "exclusive crypto opportunity." Greed and FOMO override healthy skepticism.',
  },
  {
    icon: UserX,
    name: "Impersonation",
    color: "text-neon-purple",
    desc: "Spoofed emails, lookalike domains, hijacked accounts. Trusted identities are the perfect Trojan horse.",
  },
  {
    icon: Sparkles,
    name: "Emotional Manipulation",
    color: "text-neon-cyan",
    desc: "Romance scams, fake charity appeals, sob stories. Strong emotions short-circuit critical thinking.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground mb-4">
          <Shield className="h-3.5 w-3.5 text-neon-cyan" /> Cyber awareness
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The psychology behind <span className="text-gradient">every scam</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Scammers don't hack computers — they hack people. They use a small set of repeatable
          psychological tactics. Recognize them, and you defuse them.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tactics.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl p-2.5 bg-white/5 border border-border/60">
                  <Icon className={`h-5 w-5 ${t.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <section className="mt-16 glass-strong rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Quick defense checklist</h2>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            "Pause before you act — urgency is a red flag.",
            "Verify the sender through an independent channel.",
            "Hover over links before clicking. Watch for typos.",
            "Never share OTPs, passwords, or seed phrases.",
            "Banks and governments don't ask for payment in gift cards.",
            "When in doubt — paste it into ScamShield AI.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neon-cyan shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 text-center">
        <Link
          to="/analyzer"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 font-medium text-primary-foreground shadow-[0_0_30px_oklch(0.78_0.18_240_/_45%)]"
        >
          Try the analyzer <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
