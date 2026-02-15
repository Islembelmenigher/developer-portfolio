import { Github, Linkedin, Heart } from "lucide-react";
import { useSiteSettings } from "@/hooks/usePortfolioData";

export function Footer() {
  const { data: settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Built with <Heart className="w-4 h-4 text-primary" /> using React
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {settings?.github_url && (
              <a
                href={settings.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {settings?.linkedin_url && (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
