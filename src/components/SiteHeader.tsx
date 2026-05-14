import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Shield className="h-7 w-7 text-neon-cyan transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-md bg-neon-cyan/40 -z-10" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Scam<span className="text-gradient">Shield</span> AI
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              activeOptions={{ exact: true }}
              activeProps={{ className: "px-4 py-2 rounded-lg text-foreground bg-white/5" }}
            >
              Home
            </Link>
            <Link
              to="/analyzer"
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-4 py-2 rounded-lg text-foreground bg-white/5" }}
            >
              Analyzer
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-4 py-2 rounded-lg text-foreground bg-white/5" }}
            >
              Awareness
            </Link>
            <Link
              to="/analyzer"
              className="ml-2 inline-flex items-center rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_20px_oklch(0.78_0.18_240_/_35%)] hover:shadow-[0_0_30px_oklch(0.72_0.24_305_/_45%)] transition-shadow"
            >
              Launch App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
