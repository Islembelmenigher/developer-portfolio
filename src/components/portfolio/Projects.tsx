import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/usePortfolioData";

// Default projects if database is empty
const defaultProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with cart, checkout, and payment integration.",
    image_url: null,
    tech_stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    live_url: "https://example.com",
    github_url: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team features.",
    image_url: null,
    tech_stack: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    live_url: "https://example.com",
    github_url: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "AI Content Generator",
    description: "AI-powered content creation tool using OpenAI API for blogs and marketing copy.",
    image_url: null,
    tech_stack: ["React", "Python", "FastAPI", "OpenAI"],
    live_url: "https://example.com",
    github_url: "https://github.com",
    featured: true,
  },
  {
    id: "4",
    title: "Real-time Analytics Dashboard",
    description: "Interactive dashboard with live data visualization and reporting features.",
    image_url: null,
    tech_stack: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
    live_url: null,
    github_url: "https://github.com",
    featured: false,
  },
  {
    id: "5",
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans and progress tracking.",
    image_url: null,
    tech_stack: ["React Native", "Firebase", "Redux"],
    live_url: "https://example.com",
    github_url: null,
    featured: false,
  },
  {
    id: "6",
    title: "Social Media API",
    description: "RESTful API for a social media platform with authentication and real-time features.",
    image_url: null,
    tech_stack: ["Node.js", "Express", "MongoDB", "JWT"],
    live_url: null,
    github_url: "https://github.com",
    featured: false,
  },
];

export function Projects() {
  const { data: projects } = useProjects();
  const displayProjects = projects?.length ? projects : defaultProjects;
  
  const featuredProjects = displayProjects.filter((p) => p.featured);
  const otherProjects = displayProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-base md:text-lg font-semibold">03. Projects</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            Featured Work
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I've built. Each one taught me something new and helped me grow as a developer.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-20">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="group relative aspect-video rounded-xl overflow-hidden glass-card p-1">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center transition-all duration-700 ease-out group-hover:brightness-90">
                      <Folder className="w-16 h-16 text-primary/30" />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-1 rounded-lg border border-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-1 rounded-lg bg-gradient-to-t from-background/65 via-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -inset-8 rounded-full bg-primary/20 blur-3xl opacity-0 transition-all duration-700 group-hover:opacity-60 group-hover:scale-110" />

                  <div className="pointer-events-none absolute inset-y-1 left-[-45%] w-[40%] rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />

                  <div className="pointer-events-none absolute inset-1 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="h-full w-full rounded-lg bg-[linear-gradient(to_right,hsl(var(--primary)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.15)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className={`${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                <span className="text-primary font-mono text-sm">Featured Project</span>
                <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
                <div className="mt-4 glass-card p-6">
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className={`mt-4 flex flex-wrap gap-2 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={`mt-6 flex gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View source code"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View live site"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-center mb-8">Other Noteworthy Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card-hover p-6 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Folder className="w-10 h-10 text-primary" />
                    <div className="flex gap-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View source code"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View live site"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                  <p className="text-muted-foreground text-sm flex-grow">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs text-muted-foreground font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
