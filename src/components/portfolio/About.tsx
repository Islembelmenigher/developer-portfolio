import { Code2, Coffee, Lightbulb, Rocket } from "lucide-react";
import { useSiteSettings, useSkills } from "@/hooks/usePortfolioData";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { defaultSkills } from "@/lib/defaultSkills";

const highlights = [
  { icon: Code2, label: "Clean Code", description: "Writing maintainable, scalable solutions" },
  { icon: Rocket, label: "Fast Delivery", description: "Agile methodology & quick iterations" },
  { icon: Lightbulb, label: "Problem Solver", description: "Creative solutions to complex challenges" },
  { icon: Coffee, label: "Dedicated", description: "Passionate about continuous learning" },
];

function ReactLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <circle cx="12" cy="12" r="1.9" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="M6.2 9.1c1-1.6 2.3-2.4 4-2.4 2.5 0 3.3 1.7 4 3 .5.8.8 1.3 1.5 1.3.7 0 1.2-.3 1.8-1.1-.9 1.6-2.2 2.4-4 2.4-2.4 0-3.2-1.7-3.9-3-.5-.8-.8-1.3-1.6-1.3-.7 0-1.2.4-1.8 1.1Zm-1.8 5.1c1-1.6 2.3-2.4 4-2.4 2.5 0 3.3 1.7 4 3 .5.8.8 1.3 1.5 1.3.7 0 1.2-.3 1.8-1.1-.9 1.6-2.2 2.4-4 2.4-2.4 0-3.2-1.7-3.9-3-.5-.8-.8-1.3-1.6-1.3-.7 0-1.2.4-1.8 1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 16V8l6 8V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path d="M12 2.8 19.2 7v10L12 21.2 4.8 17V7L12 2.8Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.1 15.2V8.8l5.8 6.4V8.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <rect x="4" y="4" width="16" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 10h8M12 10v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15.8 14.2c.8 0 1.4.5 1.4 1.1 0 .7-.7 1.1-1.4 1.1-.6 0-1.1-.2-1.5-.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GitLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <rect x="6" y="6" width="12" height="12" rx="2" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9.6" cy="9.6" r="1.3" fill="currentColor" />
      <circle cx="14.4" cy="14.4" r="1.3" fill="currentColor" />
      <circle cx="14.4" cy="9.6" r="1.3" fill="currentColor" />
      <path d="M10.5 10.5 13.5 13.5M14.4 10.9v2.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path d="M5.5 15.2h11.2c.8 0 1.6-.3 2.2-.8.6-.5.9-1.3 1.1-2.1-.5.2-1.1.2-1.6 0-.7-.2-1.2-.8-1.4-1.5-.5.3-.9.8-1.1 1.4H5.5v3Z" fill="currentColor" />
      <rect x="6" y="9.1" width="2.1" height="2.1" fill="currentColor" />
      <rect x="8.6" y="9.1" width="2.1" height="2.1" fill="currentColor" />
      <rect x="11.2" y="9.1" width="2.1" height="2.1" fill="currentColor" />
      <rect x="8.6" y="6.6" width="2.1" height="2.1" fill="currentColor" />
      <rect x="11.2" y="6.6" width="2.1" height="2.1" fill="currentColor" />
    </svg>
  );
}

export function About() {
  const { data: settings } = useSiteSettings();
  const { data: skills } = useSkills();
  const visualRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
  const [pointerPosition, setPointerPosition] = useState<{ x: number; y: number } | null>(null);
  const displaySkills = skills?.length ? skills : defaultSkills;

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setBoxSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    resizeObserver.observe(visual);

    return () => resizeObserver.disconnect();
  }, []);

  const bubblePositions = [
    { left: 30, top: 16 },
    { left: 70, top: 27 },
    { left: 34, top: 42 },
    { left: 66, top: 53 },
    { left: 30, top: 69 },
    { left: 70, top: 81 },
    { left: 36, top: 28 },
    { left: 64, top: 39 },
    { left: 32, top: 55 },
    { left: 68, top: 66 },
    { left: 34, top: 82 },
    { left: 66, top: 91 },
    { left: 30, top: 35 },
    { left: 70, top: 47 },
  ];
  const skillLogos: Record<string, JSX.Element> = {
    React: <ReactLogo />,
    "Tailwind CSS": <TailwindLogo />,
    "Next.js": <NextLogo />,
    "Node.js": <NodeLogo />,
    TypeScript: <TypeScriptLogo />,
    Git: <GitLogo />,
    Docker: <DockerLogo />,
  };
  const floatingLogos: Array<{
    name: string;
    logo: JSX.Element;
    position: { left: number; top: number };
    style: CSSProperties;
  }> = displaySkills.map((skill, index) => {
    const position = bubblePositions[index % bubblePositions.length];
    const animationSeed = skill.name.split("").reduce(
      (seed, character) => (seed * 31 + character.charCodeAt(0)) >>> 0,
      7,
    );

    return {
      name: skill.name,
      logo: skillLogos[skill.name] ?? <Code2 className="h-5 w-5" />,
      position,
      style: {
        left: `${position.left}%`,
        top: `${position.top}%`,
        translate: "-50% -50%",
        animationDuration: `${7 + (animationSeed % 8)}s`,
        animationDelay: `-${(animationSeed % 60) / 10}s`,
      },
    };
  });

  const getBubbleStyle = (item: (typeof floatingLogos)[number]): CSSProperties => {
    const centerX = (item.position.left / 100) * boxSize.width;
    const centerY = (item.position.top / 100) * boxSize.height;
    const deltaX = centerX - (pointerPosition?.x ?? centerX);
    const deltaY = centerY - (pointerPosition?.y ?? centerY);
    const distance = Math.hypot(deltaX, deltaY);
    const strength = distance < 140 ? (1 - distance / 140) * 28 : 0;
    const halfWidth = (54 + item.name.length * 7) / 2;
    const horizontalRoom = Math.max(0, Math.min(centerX - halfWidth, boxSize.width - centerX - halfWidth));
    const verticalRoom = Math.max(0, Math.min(centerY - 18, boxSize.height - centerY - 18));
    const driftX = Math.min(44, horizontalRoom * 0.65);
    const driftY = Math.min(44, verticalRoom * 0.65);
    const repelRoomX = horizontalRoom - driftX;
    const repelRoomY = verticalRoom - driftY;
    const repelX = Math.max(-repelRoomX, Math.min(repelRoomX, distance ? (deltaX / distance) * strength : 0));
    const repelY = Math.max(-repelRoomY, Math.min(repelRoomY, distance ? (deltaY / distance) * strength : -strength));

    return {
      ...item.style,
      translate: `calc(-50% + ${repelX}px) calc(-50% + ${repelY}px)`,
      "--bubble-drift-x": `${driftX}px`,
      "--bubble-drift-x-negative": `${-driftX}px`,
      "--bubble-drift-y": `${driftY}px`,
      "--bubble-drift-y-negative": `${-driftY}px`,
    } as CSSProperties;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointerPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  };

  return (
    <section id="about" className="section-padding relative bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-base md:text-lg font-semibold">01. About</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            Get to know me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="group relative aspect-square overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/15 via-card/90 to-card/75 p-1 shadow-[0_12px_30px_-18px_hsl(var(--primary)/0.8)]">
              <div
                ref={visualRef}
                className="relative h-full w-full rounded-xl overflow-hidden bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.22),transparent_55%)]"
                onPointerMove={handlePointerMove}
                onPointerLeave={() => setPointerPosition(null)}
              >
                <div className="absolute inset-0">
                  {floatingLogos.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className={`absolute rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm shadow-lg transition-[translate] duration-200 ease-out ${[
                        "text-sky-700 dark:text-sky-300 bg-white/85 dark:bg-sky-500/20 border-sky-500/55 dark:border-sky-300/40 animate-bubble-drift",
                        "text-cyan-700 dark:text-cyan-300 bg-white/85 dark:bg-cyan-500/20 border-cyan-500/55 dark:border-cyan-300/40 animate-bubble-drift",
                        "text-slate-800 dark:text-slate-100 bg-white/90 dark:bg-slate-500/20 border-slate-600/55 dark:border-slate-200/40 animate-bubble-drift",
                        "text-emerald-700 dark:text-emerald-300 bg-white/85 dark:bg-emerald-500/20 border-emerald-500/55 dark:border-emerald-300/40 animate-bubble-drift",
                        "text-blue-700 dark:text-blue-300 bg-white/85 dark:bg-blue-500/20 border-blue-500/55 dark:border-blue-300/40 animate-bubble-drift",
                        "text-orange-700 dark:text-orange-300 bg-white/85 dark:bg-orange-500/20 border-orange-500/55 dark:border-orange-300/40 animate-bubble-drift",
                      ][index % 6]}`}
                      style={getBubbleStyle(item)}
                    >
                      <span className="flex items-center gap-2">
                        {item.logo}
                        {item.name}
                      </span>
                    </div>
                  ))}
                  <div className="absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
                  <div className="absolute -right-10 bottom-1/4 h-44 w-44 rounded-full bg-accent/20 blur-3xl animate-pulse-slow" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center text-center p-8">
                  <div>
                    <div className="text-8xl md:text-9xl font-bold gradient-text opacity-95">4+</div>
                    <div className="text-foreground/90 font-semibold tracking-wide">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/40 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div>
            {settings?.about_text ? (
              <p className="text-muted-foreground text-lg leading-relaxed">{settings.about_text}</p>
            ) : (
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I'm a Full-Stack Web Developer with 4+ years of experience building modern, responsive, and user-focused web applications. I specialize in React, TypeScript, and modern web technologies, turning ideas into scalable digital experiences.
                </p>
                <p>
                  From crafting intuitive frontends and developing robust backend APIs to integrating databases, authentication, and third-party services, I enjoy building complete solutions that combine great design with reliable performance.
                </p>
              </div>
            )}

            {/* Highlights Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border border-primary/25 bg-gradient-to-b from-primary/10 via-card/85 to-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_15px_35px_-20px_hsl(var(--primary)/0.7)]"
                >
                  <item.icon className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold text-sm">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
