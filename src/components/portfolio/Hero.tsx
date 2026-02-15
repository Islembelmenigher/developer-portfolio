import { ArrowDown, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/usePortfolioData";

export function Hero() {
  const { data: settings } = useSiteSettings();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
          Hi, I'm a{" "}
          <span className="gradient-text">React Developer</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
          {settings?.hero_description || "I craft beautiful, performant web applications with modern technologies. Let's turn your ideas into reality."}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
          <Button size="lg" className="glow-effect" asChild>
            <a href="#projects">View My Work</a>
          </Button>
          {settings?.cv_url && (
            <Button size="lg" variant="outline" asChild>
              <a href={settings.cv_url} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
          {settings?.github_url && (
            <a
              href={settings.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          )}
          {settings?.linkedin_url && (
            <a
              href={settings.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
