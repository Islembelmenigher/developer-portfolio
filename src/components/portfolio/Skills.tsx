import { useSkills } from "@/hooks/usePortfolioData";
import {
  Atom,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  GitBranch,
  Github,
  Network,
  Server,
  Wind,
  Wrench,
} from "lucide-react";
import { defaultSkills } from "@/lib/defaultSkills";

export function Skills() {
  const { data: skills } = useSkills();
  const displaySkills = skills?.length ? skills : defaultSkills;
  const dots = [1, 2, 3, 4, 5];

  const skillIconMap: Record<string, typeof Code2> = {
    React: Atom,
    TypeScript: Braces,
    "Node.js": Server,
    "Next.js": Code2,
    PostgreSQL: Database,
    "Tailwind CSS": Wind,
    GraphQL: Network,
    Docker: Container,
    AWS: Cloud,
    Python: Code2,
    MongoDB: Database,
    Git: GitBranch,
    GitHub: Github,
    JavaScript: Code2,
  };

  // Group skills by category
  const categories = displaySkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof displaySkills>);

  const proficiencyToDots = (proficiency: number) =>
    Math.max(1, Math.min(5, Math.round(proficiency / 25) + 1));

  return (
    <section id="skills" className="section-padding relative bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-base md:text-lg font-semibold">02. Skills</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            Technologies I work with
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I'm constantly learning and expanding my skill set. Here are the technologies I've mastered and use regularly.
          </p>
        </div>

        {/* Category Sections */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(categories).map(([category, categorySkills]) => (
            <div
              key={category}
              className="rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card/90 to-card/75 p-6 shadow-[0_12px_30px_-18px_hsl(var(--primary)/0.8)]"
            >
              <h3 className="text-lg font-semibold text-primary">{category}</h3>
              <div className="mt-5 space-y-4">
                {categorySkills.map((skill) => {
                  const SkillIcon = skillIconMap[skill.name] ?? Wrench;

                  return (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between rounded-xl border border-primary/20 bg-background/70 px-4 py-3 transition-colors hover:border-primary/45"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/40">
                          <SkillIcon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {dots.map((dot) => (
                          <span
                            key={`${skill.id}-${dot}`}
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${
                              dot <= proficiencyToDots(skill.proficiency)
                                ? "bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.9)]"
                                : "bg-primary/20"
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
