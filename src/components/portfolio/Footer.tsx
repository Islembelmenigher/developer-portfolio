import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { useSiteSettings } from "@/hooks/usePortfolioData";

export function Footer() {
  const { data: settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 py-10 overflow-hidden">
      {/* Subtle top glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: "var(--gradient-primary)", opacity: 0.4 }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo & copyright */}
          <div className="text-center md:text-left">
            <span className="font-mono text-sm font-bold gradient-text">&lt;islem.dev /&gt;</span>
            <p className="mt-1 text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              © {year} Islem Belmenigher — Built with{" "}
              <Heart className="w-3 h-3 text-primary fill-current" /> using React & Supabase
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {(settings?.github_url ?? "https://github.com/Islembelmenigher") && (
              <a
                href={settings?.github_url ?? "https://github.com/Islembelmenigher"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-border/50 text-muted-foreground
                  hover:text-foreground hover:border-primary/40 transition-all duration-200"
              >
                <Github size={16} />
              </a>
            )}
            {(settings?.linkedin_url ?? "https://www.linkedin.com/in/islem-belmenigher-148109253/") && (
              <a
                href={settings?.linkedin_url ?? "https://www.linkedin.com/in/islem-belmenigher-148109253/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-border/50 text-muted-foreground
                  hover:text-foreground hover:border-primary/40 transition-all duration-200"
              >
                <Linkedin size={16} />
              </a>
            )}
            <a
              href="mailto:islembelmenigher@gmail.com"
              aria-label="Email"
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-border/50 text-muted-foreground
                hover:text-foreground hover:border-primary/40 transition-all duration-200"
            >
              <Mail size={16} />
            </a>

            {/* Scroll to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-border/50 text-muted-foreground
                hover:text-foreground hover:border-primary/40 transition-all duration-200 ml-2"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
