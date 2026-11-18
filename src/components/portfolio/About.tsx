import { useRef, useState, useEffect, type CSSProperties, type PointerEvent } from "react";
import { Code2, Rocket, Lightbulb, Coffee, Globe, Shield } from "lucide-react";
import { useSiteSettings, useSkills } from "@/hooks/usePortfolioData";
import { defaultSkills } from "@/lib/defaultSkills";

/* ── Intersection observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const HIGHLIGHTS = [
  { icon: Code2,     label: "Clean Architecture", description: "Maintainable, scalable code from day one" },
  { icon: Rocket,    label: "Fast Delivery",       description: "Agile iterations, shipping on time" },
  { icon: Lightbulb, label: "Problem Solver",      description: "Creative solutions to complex challenges" },
  { icon: Coffee,    label: "Always Learning",     description: "Passionate about continuous growth" },
  { icon: Globe,     label: "Full-Stack",           description: "Frontend, backend, database, deployment" },
  { icon: Shield,    label: "Reliability",          description: "Tested, secure, production-grade code" },
];

/* ── Inline SVG logos ── */
function ReactLogo()      { return <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5"><circle cx="12" cy="12" r="1.9" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.4"/><ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)"/></svg>; }
function TailwindLogo()   { return <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5"><path d="M6.2 9.1c1-1.6 2.3-2.4 4-2.4 2.5 0 3.3 1.7 4 3 .5.8.8 1.3 1.5 1.3.7 0 1.2-.3 1.8-1.1-.9 1.6-2.2 2.4-4 2.4-2.4 0-3.2-1.7-3.9-3-.5-.8-.8-1.3-1.6-1.3-.7 0-1.2.4-1.8 1.1Zm-1.8 5.1c1-1.6 2.3-2.4 4-2.4 2.5 0 3.3 1.7 4 3 .5.8.8 1.3 1.5 1.3.7 0 1.2-.3 1.8-1.1-.9 1.6-2.2 2.4-4 2.4-2.4 0-3.2-1.7-3.9-3-.5-.8-.8-1.3-1.6-1.3-.7 0-1.2.4-1.8 1.1Z" fill="currentColor"/></svg>; }
function NextLogo()       { return <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4"/><path d="M9 16V8l6 8V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function NodeLogo()       { return <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5"><path d="M12 2.8 19.2 7v10L12 21.2 4.8 17V7L12 2.8Z" stroke="currentColor" strokeWidth="1.4"/><path d="M9.1 15.2V8.8l5.8 6.4V8.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function TSLogo()         { return <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5"><rect x="4" y="4" width="16" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.4"/><path d="M8 10h8M12 10v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M15.8 14.2c.8 0 1.4.5 1.4 1.1 0 .7-.7 1.1-1.4 1.1-.6 0-1.1-.2-1.5-.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function GitLogo()        { return <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5"><rect x="6" y="6" width="12" height="12" rx="2" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.4"/><circle cx="9.6" cy="9.6" r="1.3" fill="currentColor"/><circle cx="14.4" cy="14.4" r="1.3" fill="currentColor"/><circle cx="14.4" cy="9.6" r="1.3" fill="currentColor"/><path d="M10.5 10.5 13.5 13.5M14.4 10.9v2.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>; }

const SKILL_LOGOS: Record<string, JSX.Element> = {
  React: <ReactLogo />,
  "Tailwind CSS": <TailwindLogo />,
  "Next.js": <NextLogo />,
  "Node.js": <NodeLogo />,
  TypeScript: <TSLogo />,
  Git: <GitLogo />,
};

const BUBBLE_POSITIONS = [
  { left: 28, top: 15 }, { left: 72, top: 25 }, { left: 32, top: 40 },
  { left: 68, top: 52 }, { left: 26, top: 65 }, { left: 74, top: 78 },
  { left: 38, top: 28 }, { left: 62, top: 38 }, { left: 30, top: 55 },
  { left: 70, top: 65 }, { left: 36, top: 80 }, { left: 65, top: 90 },
  { left: 48, top: 18 }, { left: 52, top: 70 },
];

const CHIP_COLORS = [
  "text-sky-400 bg-sky-500/10 border-sky-500/30",
  "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  "text-violet-400 bg-violet-500/10 border-violet-500/30",
  "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  "text-blue-400 bg-blue-500/10 border-blue-500/30",
  "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
];

export function About() {
  const { data: settings } = useSiteSettings();
  const { data: skills }   = useSkills();
  const { ref: sectionRef, inView } = useInView();
  const visualRef   = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize]       = useState({ width: 0, height: 0 });
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);

  const displaySkills = skills?.length ? skills : defaultSkills;

  /* ── Box size tracker ── */
  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setBoxSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Floating logo data ── */
  const floatingLogos = displaySkills.map((skill, idx) => {
    const position = BUBBLE_POSITIONS[idx % BUBBLE_POSITIONS.length];
    const seed = skill.name.split("").reduce((s, c) => (s * 31 + c.charCodeAt(0)) >>> 0, 7);
    return {
      name: skill.name,
      logo: SKILL_LOGOS[skill.name] ?? <Code2 className="h-4 w-4" />,
      position,
      style: {
        left: `${position.left}%`,
        top:  `${position.top}%`,
        translate: "-50% -50%",
        animationDuration: `${7 + (seed % 8)}s`,
        animationDelay:    `-${(seed % 60) / 10}s`,
      } as CSSProperties,
      colorClass: CHIP_COLORS[idx % CHIP_COLORS.length],
    };
  });

  const getBubbleStyle = (item: typeof floatingLogos[number]): CSSProperties => {
    const cx = (item.position.left / 100) * boxSize.width;
    const cy = (item.position.top  / 100) * boxSize.height;
    const dx = cx - (pointerPos?.x ?? cx);
    const dy = cy - (pointerPos?.y ?? cy);
    const dist = Math.hypot(dx, dy);
    const strength = dist < 130 ? (1 - dist / 130) * 24 : 0;
    const halfW = (54 + item.name.length * 7) / 2;
    const hRoom = Math.max(0, Math.min(cx - halfW, boxSize.width - cx - halfW));
    const vRoom = Math.max(0, Math.min(cy - 18,    boxSize.height - cy - 18));
    const driftX = Math.min(40, hRoom * 0.6);
    const driftY = Math.min(40, vRoom * 0.6);
    const rX = Math.max(-(hRoom - driftX), Math.min(hRoom - driftX, dist ? (dx / dist) * strength : 0));
    const rY = Math.max(-(vRoom - driftY), Math.min(vRoom - driftY, dist ? (dy / dist) * strength : -strength));

    return {
      ...item.style,
      translate: `calc(-50% + ${rX}px) calc(-50% + ${rY}px)`,
      "--bubble-drift-x":          `${driftX}px`,
      "--bubble-drift-x-negative": `${-driftX}px`,
      "--bubble-drift-y":          `${driftY}px`,
      "--bubble-drift-y-negative": `${-driftY}px`,
    } as CSSProperties;
  };

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      {/* Subtle section background tint */}
      <div aria-hidden className="absolute inset-0 bg-secondary/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label">01 — About me</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Turning ideas into<br className="hidden sm:block" />{" "}
            <span className="gradient-text">real digital products</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Visual / skill bubble panel */}
          <div
            className={`relative transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative aspect-square max-w-sm mx-auto">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: "var(--gradient-primary)", padding: 1 }}
              >
                <div className="w-full h-full rounded-2xl bg-card" />
              </div>

              {/* Inner content */}
              <div
                ref={visualRef}
                className="absolute inset-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-primary/10 to-card cursor-crosshair"
                onPointerMove={(e: PointerEvent<HTMLDivElement>) => {
                  const b = e.currentTarget.getBoundingClientRect();
                  setPointerPos({ x: e.clientX - b.left, y: e.clientY - b.top });
                }}
                onPointerLeave={() => setPointerPos(null)}
              >
                {/* Skill bubbles */}
                {floatingLogos.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className={`absolute flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold
                      backdrop-blur-sm shadow-sm transition-[translate] duration-200 ease-out
                      animate-bubble-drift ${item.colorClass}`}
                    style={getBubbleStyle(item)}
                  >
                    {item.logo}
                    <span className="whitespace-nowrap">{item.name}</span>
                  </div>
                ))}

                {/* Centre stat */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center select-none">
                    <div className="text-7xl font-black gradient-text leading-none">4+</div>
                    <div className="text-sm font-semibold text-muted-foreground mt-2 tracking-wide">
                      Years Experience
                    </div>
                  </div>
                </div>

                {/* Ambient blobs inside panel */}
                <div aria-hidden className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
                <div aria-hidden className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent/20 blur-3xl" />
              </div>
            </div>

            {/* Decorative bracket */}
            <div aria-hidden className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-primary/30 rounded-xl -z-10" />
          </div>

          {/* Text & highlights */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {settings?.about_text ? (
                <p className="text-base md:text-lg">{settings.about_text}</p>
              ) : (
                <>
                  <p className="text-base md:text-lg">
                    I'm a <span className="text-foreground font-medium">Full-Stack Developer</span> who
                    builds modern, responsive, and user-focused web applications. I work across the entire
                    application lifecycle — from crafting intuitive frontends to designing robust backend
                    APIs and managing databases.
                  </p>
                  <p className="text-base">
                    I specialise in <span className="text-primary font-medium">React</span>,{" "}
                    <span className="text-primary font-medium">TypeScript</span>, and{" "}
                    <span className="text-primary font-medium">Node.js</span>, and I care deeply about
                    code quality, performance, and developer experience.
                  </p>
                </>
              )}
            </div>

            {/* Highlights grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h, i) => (
                <div
                  key={h.label}
                  className={`group p-4 rounded-xl border border-border/50 bg-secondary/30
                    hover:border-primary/40 hover:bg-secondary/60 transition-all duration-200
                    hover:-translate-y-0.5 transition-all duration-700`}
                  style={{ transitionDelay: `${200 + i * 60}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center mb-2.5
                    group-hover:bg-primary/25 transition-colors duration-200">
                    <h.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{h.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
