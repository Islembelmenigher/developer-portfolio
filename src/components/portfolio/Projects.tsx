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

  return (
    <section id="projects" className="section-padding relative bg-secondary/20">
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
                <div className="group relative aspect-video overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card/90 to-card/75 p-1 shadow-[0_12px_30px_-18px_hsl(var(--primary)/0.8)]">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 flex items-center justify-center transition-all duration-700 ease-out group-hover:brightness-90">
                      <Folder className="w-16 h-16 text-primary/70" />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-1 rounded-xl border border-primary/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
                <div className="mt-4 rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/10 via-card/85 to-card/70 p-6">
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
                      className="text-primary/70 hover:text-primary transition-colors"
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
                      className="text-primary/70 hover:text-primary transition-colors"
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

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-8">
            Check My GitHub for other interesting projects
          </h3>
          <a
            href="https://github.com/Islembelmenigher"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="mx-auto flex aspect-square w-full max-w-56 items-center justify-center rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/10 via-card/85 to-card/70 text-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_15px_40px_-20px_hsl(var(--primary)/0.75)]"
          >
            <Github className="h-28 w-28" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
