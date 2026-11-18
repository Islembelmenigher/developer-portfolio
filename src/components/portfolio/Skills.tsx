import { useRef, useState, useEffect } from "react";
import {
  Atom, Braces, Cloud, Code2, Container, Database,
  GitBranch, Github, Network, Server, Wind, Wrench,
  Globe, Lock, Layers, Cpu, Terminal, Zap,
} from "lucide-react";
import { useSkills } from "@/hooks/usePortfolioData";
import { defaultSkills } from "@/lib/defaultSkills";

function useInView(threshold = 0.12) {
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

const ICON_MAP: Record<string, typeof Code2> = {
  React:         Atom,
  TypeScript:    Braces,
  JavaScript:    Braces,
  "Node.js":     Server,
  "Next.js":     Layers,
  PostgreSQL:    Database,
  MongoDB:       Database,
  "Tailwind CSS":Wind,
  GraphQL:       Network,
  Docker:        Container,
  AWS:           Cloud,
  Python:        Cpu,
  Git:           GitBranch,
  GitHub:        Github,
  "REST APIs":   Globe,
  JWT:           Lock,
  Express:       Server,
  "Express.js":  Server,
  Deployment:    Cloud,
  Testing:       Zap,
  "VS Code":     Terminal,
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:   "from-sky-500/10   to-transparent  border-sky-500/30   text-sky-400",
  Backend:    "from-violet-500/10 to-transparent border-violet-500/30 text-violet-400",
  Database:   "from-emerald-500/10 to-transparent border-emerald-500/30 text-emerald-400",
  Languages:  "from-amber-500/10  to-transparent border-amber-500/30  text-amber-400",
  Tools:      "from-cyan-500/10   to-transparent border-cyan-500/30   text-cyan-400",
  DevOps:     "from-orange-500/10 to-transparent border-orange-500/30 text-orange-400",
  Cloud:      "from-blue-500/10   to-transparent border-blue-500/30   text-blue-400",
  default:    "from-primary/10    to-transparent border-primary/30    text-primary",
};

function getColor(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;
}

function SkillDots({ proficiency }: { proficiency: number }) {
  const filled = Math.max(1, Math.min(5, Math.round(proficiency / 25) + 1));
  return (
    <div className="flex items-center gap-1" aria-label={`Proficiency: ${filled} of 5`}>
      {[1, 2, 3, 4, 5].map((d) => (
        <span
          key={d}
          className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
            d <= filled ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.7)]" : "bg-primary/15"
          }`}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const { data: skills } = useSkills();
  const { ref: sectionRef, inView } = useInView();
  const displaySkills = skills?.length ? skills : defaultSkills;

  const categories = displaySkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof displaySkills>);

  const catEntries = Object.entries(categories);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label">02 — Technical skills</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            My <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            A curated set of tools and frameworks I use to build complete, production-ready applications.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {catEntries.map(([category, catSkills], catIdx) => {
            const colorStr = getColor(category);
            const [from,, border, text] = colorStr.split(" ");
            return (
              <div
                key={category}
                className={`group relative rounded-2xl border p-5 bg-gradient-to-b ${colorStr}
                  transition-all duration-700 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.25)]
                  hover:-translate-y-1 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${100 + catIdx * 60}ms` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-sm font-bold font-mono ${text}`}>{category}</span>
                  <span className="ml-auto text-xs text-muted-foreground font-mono">
                    {catSkills.length} skills
                  </span>
                </div>

                {/* Skills list */}
                <div className="space-y-2.5">
                  {catSkills.map((skill, skillIdx) => {
                    const Icon = ICON_MAP[skill.name] ?? Wrench;
                    return (
                      <div
                        key={skill.id}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl
                          bg-background/50 border border-border/40
                          hover:border-primary/30 hover:bg-background/80
                          transition-all duration-200 group/skill
                          ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                        style={{ transitionDelay: `${200 + catIdx * 60 + skillIdx * 40}ms` }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center
                            group-hover/skill:bg-primary/20 transition-colors duration-200 flex-shrink-0">
                            <Icon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        </div>
                        <SkillDots proficiency={skill.proficiency} />
                      </div>
                    );
                  })}
                </div>

                {/* Subtle corner accent */}
                <div
                  aria-hidden
                  className="absolute top-0 right-0 w-16 h-16 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle at 100% 0%, hsl(var(--primary)/0.1), transparent 60%)",
                  }}
                />
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
