import { useSkills } from "@/hooks/usePortfolioData";

// Default skills if database is empty
const defaultSkills = [
  { id: "1", name: "React", category: "Frontend", proficiency: 95 },
  { id: "2", name: "TypeScript", category: "Languages", proficiency: 90 },
  { id: "3", name: "Node.js", category: "Backend", proficiency: 88 },
  { id: "4", name: "Next.js", category: "Frontend", proficiency: 85 },
  { id: "5", name: "PostgreSQL", category: "Database", proficiency: 82 },
  { id: "6", name: "Tailwind CSS", category: "Frontend", proficiency: 95 },
  { id: "7", name: "GraphQL", category: "Backend", proficiency: 78 },
  { id: "8", name: "Docker", category: "DevOps", proficiency: 75 },
  { id: "9", name: "AWS", category: "Cloud", proficiency: 80 },
  { id: "10", name: "Python", category: "Languages", proficiency: 72 },
  { id: "11", name: "MongoDB", category: "Database", proficiency: 80 },
  { id: "12", name: "Git", category: "Tools", proficiency: 92 },
];

export function Skills() {
  const { data: skills } = useSkills();
  const displaySkills = skills?.length ? skills : defaultSkills;

  // Group skills by category
  const categories = displaySkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof displaySkills>);

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

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([category, categorySkills]) => (
            <div key={category} className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {displaySkills.map((skill) => (
            <span key={skill.id} className="tech-badge">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
