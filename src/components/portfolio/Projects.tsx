import { useState, useRef, useEffect } from "react";
import { ExternalLink, Github, Folder, ArrowRight, Star } from "lucide-react";
import { useProjects } from "@/hooks/usePortfolioData";

function useInView(threshold = 0.1) {
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

/* Default projects — only shown when database is empty */
const DEFAULT_PROJECTS = [
  {
    id: "1", title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with cart, checkout, payment integration, inventory management and an admin panel.",
    image_url: null, featured: true, display_order: 0,
    tech_stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    live_url: "https://example.com", github_url: "https://github.com",
    long_description: null, created_at: "", updated_at: "",
  },
  {
    id: "2", title: "Task Management App",
    description: "Collaborative project management with real-time updates, team workspaces, and Kanban boards.",
    image_url: null, featured: true, display_order: 1,
    tech_stack: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    live_url: "https://example.com", github_url: "https://github.com",
    long_description: null, created_at: "", updated_at: "",
  },
  {
    id: "3", title: "AI Content Generator",
    description: "AI-powered content creation tool using the OpenAI API for blogs, marketing copy and social media posts.",
    image_url: null, featured: true, display_order: 2,
    tech_stack: ["React", "Python", "FastAPI", "OpenAI"],
    live_url: "https://example.com", github_url: null,
    long_description: null, created_at: "", updated_at: "",
  },
  {
    id: "4", title: "Real-time Analytics Dashboard",
    description: "Interactive dashboard with live data visualisation, custom reporting and export functionality.",
    image_url: null, featured: false, display_order: 3,
    tech_stack: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
    live_url: null, github_url: "https://github.com",
    long_description: null, created_at: "", updated_at: "",
  },
  {
    id: "5", title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking with personalised workout plans, progress charts and push notifications.",
    image_url: null, featured: false, display_order: 4,
    tech_stack: ["React Native", "Firebase", "Redux"],
    live_url: "https://example.com", github_url: null,
    long_description: null, created_at: "", updated_at: "",
  },
  {
    id: "6", title: "Social Media API",
    description: "RESTful API for a social platform with authentication, follow/feed system and media uploads.",
    image_url: null, featured: false, display_order: 5,
    tech_stack: ["Node.js", "Express", "MongoDB", "JWT"],
    live_url: null, github_url: "https://github.com",
    long_description: null, created_at: "", updated_at: "",
  },
];

/* ── Featured project card (large alternating layout) ── */
function FeaturedCard({
  project, index, inView,
}: {
  project: (typeof DEFAULT_PROJECTS)[number];
  index: number;
  inView: boolean;
}) {
  const isEven = index % 2 === 0;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${100 + index * 120}ms` }}
    >
      {/* Image */}
      <div className={isEven ? "" : "md:order-2"}>
        <div
          className="group relative aspect-video rounded-2xl overflow-hidden border border-border/50
            hover:border-primary/40 transition-all duration-500 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            boxShadow: hovered ? "0 20px 60px -20px hsl(var(--primary)/0.35)" : undefined,
          }}
        >
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 ${
                hovered ? "scale-105 brightness-90" : "scale-100"
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-card flex items-center justify-center">
              <div className="text-center">
                <Folder className="w-14 h-14 text-primary/40 mx-auto mb-2" />
                <span className="text-xs text-muted-foreground font-mono">{project.title}</span>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent
            transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          />

          {/* Scan line */}
          {hovered && (
            <div
              aria-hidden
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              style={{ animation: "scan-line 1.4s linear infinite" }}
            />
          )}

          {/* Grid overlay on hover */}
          <div
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--primary)/0.08) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)/0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Featured badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
            bg-primary/15 backdrop-blur-sm border border-primary/30 text-primary">
            <Star size={10} className="fill-current" />
            Featured
          </div>
        </div>
      </div>

      {/* Info */}
      <div className={isEven ? "" : "md:order-1"}>
        <span className="font-mono text-xs text-primary/70 tracking-widest uppercase">
          Featured Project
        </span>
        <h3 className={`mt-2 text-2xl md:text-3xl font-bold ${isEven ? "" : "md:text-right"}`}>
          {project.title}
        </h3>

        {/* Description card */}
        <div className="mt-4 p-4 md:p-5 rounded-xl border border-border/50 bg-secondary/30 backdrop-blur-sm
          hover:border-primary/30 transition-colors duration-200">
          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Tech badges */}
        <div className={`mt-4 flex flex-wrap gap-2 ${isEven ? "" : "md:justify-end"}`}>
          {project.tech_stack.map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div className={`mt-5 flex gap-4 ${isEven ? "" : "md:justify-end"}`}>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github size={18} />
              <span>Source</span>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Compact grid card ── */
function ProjectCard({
  project, index, inView,
}: {
  project: (typeof DEFAULT_PROJECTS)[number];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-border/50 bg-card/60 overflow-hidden
        hover:border-primary/40 transition-all duration-300 hover:-translate-y-1
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${100 + index * 80}ms`,
        boxShadow: hovered ? "0 12px 40px -12px hsl(var(--primary)/0.25)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      {project.image_url && (
        <div className="relative h-40 overflow-hidden border-b border-border/40">
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 ${
              hovered ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Folder className="w-8 h-8 text-primary/60 flex-shrink-0 mt-0.5" />
          <div className="flex gap-3">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                aria-label="Source code"
                className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={16} />
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                aria-label="Live demo"
                className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed flex-1">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 4).map((t) => (
            <span key={t} className="tech-badge text-[10px] px-2 py-0.5">{t}</span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="text-xs text-muted-foreground">+{project.tech_stack.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { data: projects } = useProjects();
  const { ref: sectionRef, inView } = useInView();

  const displayProjects = projects?.length ? projects : DEFAULT_PROJECTS;
  const featured = displayProjects.filter((p) => p.featured);
  const others   = displayProjects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label">03 — Featured work</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Projects I've <span className="gradient-text">shipped</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            A selection of real applications built with modern stacks. Each project is managed via the admin dashboard.
          </p>
        </div>

        {/* Featured — large alternating layout */}
        {featured.length > 0 && (
          <div className="space-y-20 md:space-y-28 mb-20">
            {featured.map((p, i) => (
              <FeaturedCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        )}

        {/* Other projects grid */}
        {others.length > 0 && (
          <>
            <h3
              className={`text-xl font-bold text-center mb-10 transition-all duration-700 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Other Projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} inView={inView} />
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <div
          className={`mt-16 flex justify-center transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="https://github.com/Islembelmenigher"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border/50
              bg-secondary/40 backdrop-blur-sm text-sm font-semibold text-muted-foreground
              hover:border-primary/40 hover:text-foreground hover:bg-secondary
              transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github size={18} className="text-primary" />
            View all projects on GitHub
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
}
