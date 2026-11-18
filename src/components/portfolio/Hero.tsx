import { useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Linkedin, Download, Terminal, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/hooks/usePortfolioData";

/* ── Floating tech chip component ── */
interface TechChipProps {
  label: string;
  style: React.CSSProperties;
  delay: number;
}

function TechChip({ label, style, delay }: TechChipProps) {
  return (
    <div
      aria-hidden
      className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
        bg-card/60 backdrop-blur-md border border-border/50 text-muted-foreground
        hover:border-primary/40 hover:text-foreground transition-all duration-300
        animate-float select-none"
      style={{ ...style, animationDelay: `${delay}s`, animationDuration: `${5 + delay}s` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
      {label}
    </div>
  );
}

const TECH_CHIPS = [
  { label: "React",        style: { top: "18%",  left: "6%" },   delay: 0 },
  { label: "TypeScript",   style: { top: "30%",  left: "3%" },   delay: 1.2 },
  { label: "Node.js",      style: { top: "55%",  left: "5%" },   delay: 0.6 },
  { label: "Next.js",      style: { top: "70%",  left: "7%" },   delay: 1.8 },
  { label: "PostgreSQL",   style: { top: "14%",  right: "5%" },  delay: 0.4 },
  { label: "Tailwind CSS", style: { top: "28%",  right: "3%" },  delay: 1.5 },
  { label: "REST APIs",    style: { top: "50%",  right: "5%" },  delay: 0.9 },
  { label: "Git",          style: { top: "66%",  right: "7%" },  delay: 2.1 },
  { label: "JWT",          style: { top: "80%",  left: "9%" },   delay: 1.3 },
  { label: "Deployment",   style: { top: "80%",  right: "9%" },  delay: 0.7 },
];

/* ── Typewriter effect ── */
const ROLES = [
  "Full Stack Developer",
  "Frontend Engineer",
  "React Developer",
  "UI/UX Engineer",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay   = deleting ? 40 : charIdx === current.length ? pause : speed;

    const id = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [displayed, charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ── Mouse glow follower ── */
function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--gx", `${x}px`);
      el.style.setProperty("--gy", `${y}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}

export function Hero() {
  const { data: settings } = useSiteSettings();
  const role               = useTypewriter(ROLES);
  const sectionRef         = useMouseGlow();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={
        {
          "--gx": "50%",
          "--gy": "50%",
        } as React.CSSProperties
      }
    >
      {/* Mouse-following radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden md:block opacity-30"
        style={{
          background:
            "radial-gradient(400px at var(--gx) var(--gy), hsl(185 90% 48% / 0.12), transparent 70%)",
          transition: "background 0.1s ease",
        }}
      />

      {/* Floating tech chips */}
      {TECH_CHIPS.map((chip) => (
        <TechChip key={chip.label} {...chip} />
      ))}

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Availability badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8
            bg-primary/10 border border-primary/25 text-primary animate-fade-up opacity-0"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Available for new opportunities
        </div>

        {/* Name */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight animate-fade-up opacity-0"
          style={{ animationDelay: "0.15s", lineHeight: 1.05 }}
        >
          <span className="text-foreground">Islem</span>
          <br />
          <span className="gradient-text">Belmenigher</span>
        </h1>

        {/* Typewriter role */}
        <div
          className="mt-5 h-10 flex items-center justify-center animate-fade-up opacity-0"
          style={{ animationDelay: "0.25s" }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
            {role}
            <span className="inline-block w-0.5 h-6 ml-1 bg-primary animate-cursor-blink" />
          </span>
        </div>

        {/* Description */}
        <p
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0"
          style={{ animationDelay: "0.35s" }}
        >
          {settings?.hero_description ||
            "I build modern, scalable web applications — from pixel-perfect frontends to resilient backend systems and reliable cloud deployments."}
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-up opacity-0"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#projects"
            className="glow-effect inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles size={16} />
            Explore My Work
          </a>

          {settings?.cv_url && (
            <a
              href={settings.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                bg-secondary/70 backdrop-blur-sm border border-border/60 text-foreground
                hover:border-primary/40 hover:bg-secondary transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download size={16} />
              Download CV
            </a>
          )}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
              border border-border/60 text-muted-foreground
              hover:border-primary/40 hover:text-foreground transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </div>

        {/* Social links */}
        <div
          className="mt-10 flex justify-center gap-3 animate-fade-up opacity-0"
          style={{ animationDelay: "0.55s" }}
        >
          {settings?.github_url && (
            <a
              href={settings.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/50
                text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-secondary
                transition-all duration-200 hover:-translate-y-0.5"
            >
              <Github size={18} />
            </a>
          )}
          {settings?.linkedin_url && (
            <a
              href={settings.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/50
                text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-secondary
                transition-all duration-200 hover:-translate-y-0.5"
            >
              <Linkedin size={18} />
            </a>
          )}
          <a
            href="mailto:islembelmenigher@gmail.com"
            aria-label="Email"
            className="p-3 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/50
              text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-secondary
              transition-all duration-200 hover:-translate-y-0.5"
          >
            <Terminal size={18} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex justify-center animate-fade-up opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#about"
            aria-label="Scroll to About"
            className="relative flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <span className="text-xs font-mono tracking-widest uppercase opacity-60">Scroll</span>
            <span
              className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center pt-1.5"
            >
              <ArrowDown size={12} className="animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
