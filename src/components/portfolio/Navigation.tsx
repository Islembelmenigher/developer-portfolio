import { useState, useEffect, useRef } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMenuOpen, setIsMenuOpen]          = useState(false);
  const [isLightMode, setIsLightMode]        = useState(false);
  const [activeSection, setActiveSection]    = useState("");
  const [scrollProgress, setScrollProgress]  = useState(0);
  const rafRef = useRef<number>();

  /* ── theme init ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const light  = stored === "light";
    setIsLightMode(light);
    document.documentElement.classList.toggle("light", light);
  }, []);

  /* ── scroll events ── */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY   = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
        setIsScrolled(scrollY > 60);

        // Active section tracker
        const sections = NAV_ITEMS.map((i) => i.href.slice(1));
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.getBoundingClientRect().top <= 100) {
            setActiveSection(sections[i]);
            return;
          }
        }
        setActiveSection("");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── close menu on ESC ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/75 backdrop-blur-2xl border-b border-border/40 shadow-[0_1px_0_hsl(var(--primary)/0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <a href="#" className="group flex items-center gap-2 select-none" aria-label="Back to top">
              <span className="font-mono text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                &lt;
              </span>
              <span className="font-mono text-base font-bold gradient-text tracking-tight">
                islem.dev
              </span>
              <span className="font-mono text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                /&gt;
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                );
              })}

              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-2 w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground"
                aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
              >
                {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
              </Button>

              {/* CTA */}
              <a
                href="#contact"
                className="ml-3 inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-all duration-200 glow-effect"
                style={{ background: "var(--gradient-primary)" }}
              >
                Hire Me
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background/95 backdrop-blur-2xl border-b border-border/40 px-4 pb-4 pt-2 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="flex-1"
              >
                {isLightMode ? <Moon size={14} className="mr-1.5" /> : <Sun size={14} className="mr-1.5" />}
                {isLightMode ? "Dark mode" : "Light mode"}
              </Button>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
