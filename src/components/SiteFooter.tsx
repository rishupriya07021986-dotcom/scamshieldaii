import { Shield } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-neon-cyan" />
          <span>ScamShield AI · Powered by Gemini</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ScamShield AI. Built for safer digital lives.
        </p>
      </div>
    </footer>
  );
}
