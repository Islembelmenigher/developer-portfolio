import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Copy, Check, Sparkles, Clock } from "lucide-react";
import { useSiteSettings } from "@/hooks/usePortfolioData";
import { toast } from "sonner";

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

export function Contact() {
  const { data: settings } = useSiteSettings();
  const { ref: sectionRef, inView } = useInView();
  const [copied, setCopied] = useState(false);

  const contactEmail = settings?.contact_email || "islembelmenigher@gmail.com";

  const socialLinks = [
    {
      label: "LinkedIn",
      description: "Connect professionally",
      href: settings?.linkedin_url || "https://www.linkedin.com/in/islem-belmenigher-148109253/",
      icon: Linkedin,
      color: "text-blue-400",
    },
    {
      label: "GitHub",
      description: "Browse my projects & code",
      href: settings?.github_url || "https://github.com/Islembelmenigher",
      icon: Github,
      color: "text-foreground",
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const emailTemplates = [
    {
      label: "💼 Job Opportunity",
      subject: "Job Opportunity - Full Stack Developer",
      body: "Hi Islem,%0D%0A%0D%0AI came across your portfolio and would like to discuss an opportunity at our company.%0D%0A%0D%0ABest regards,",
    },
    {
      label: "🚀 Freelance Project",
      subject: "Project Inquiry / Freelance Collaboration",
      body: "Hi Islem,%0D%0A%0D%0AI have a project I'd like to collaborate on and discuss your availability and rates.%0D%0A%0D%0ABest regards,",
    },
    {
      label: "💬 General Inquiry",
      subject: "Hello from your Portfolio",
      body: "Hi Islem,%0D%0A%0D%0AI'd love to connect and chat about web development.%0D%0A%0D%0ABest regards,",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, hsl(185 90% 48% / 0.07), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label">04 — Contact</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Let's build something<br className="hidden sm:block" />{" "}
            <span className="gradient-text">great together</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Available for full-time roles, freelance projects, and collaborations.
            Reach out directly and I'll get back to you ASAP.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
          {/* Left Column — Info & Details */}
          <div
            className={`flex flex-col space-y-3 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Phone Card */}
            <a
              href="tel:+48516304549"
              className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border/50
                bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:bg-card
                transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center
                  group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">Phone</p>
                  <p className="font-semibold text-sm">+48 516 304 549</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Location Card */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono">Location</p>
                <p className="font-semibold text-sm">Kraków, Poland</p>
              </div>
            </div>

            {/* Availability Banner */}
            <div className="p-4 rounded-xl border border-primary/25 bg-primary/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-primary">Availability</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Open to remote/hybrid positions and freelance contracts worldwide (CET timezone).
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-2.5">
              {socialLinks.map(({ label, description, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-3.5 rounded-xl border border-border/40
                    bg-secondary/30 hover:border-primary/40 hover:bg-secondary/60
                    transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>

            {/* CV Download if available */}
            {settings?.cv_url && (
              <a
                href={settings.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-effect w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl
                  text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 pt-1"
                style={{ background: "var(--gradient-primary)" }}
              >
                Download CV
              </a>
            )}
          </div>

          {/* Right Column — Prominent Direct Email Hub (replaces form) */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Email Directly</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> will get back to you ASAP
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary">
                    <Sparkles className="w-3 h-3" /> Preferred
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Skip the form! The most direct and reliable way to contact me is straight to my inbox. Click below to launch your email client or copy my address.
                </p>

                {/* Main Email Box with Copy */}
                <div className="p-4 rounded-xl border border-primary/25 bg-secondary/40 backdrop-blur-md mb-6">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Direct Email Address
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-mono text-sm sm:text-base font-semibold text-foreground select-all break-all">
                      {contactEmail}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold
                        bg-secondary hover:bg-secondary/80 border border-border/60 hover:border-primary/40
                        text-foreground transition-all duration-200"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-primary" />
                          <span className="text-primary">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Send Button */}
                <a
                  href={`mailto:${contactEmail}`}
                  className="glow-effect w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl
                    text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 mb-6"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Mail App</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Fast One-Click Topics */}
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Or choose a topic to auto-fill:
                  </span>
                  <div className="space-y-2">
                    {emailTemplates.map((template) => (
                      <a
                        key={template.label}
                        href={`mailto:${contactEmail}?subject=${encodeURIComponent(template.subject)}&body=${template.body}`}
                        className="group flex items-center justify-between p-3 rounded-xl border border-border/40
                          bg-secondary/20 hover:bg-secondary/50 hover:border-primary/30
                          text-sm text-foreground transition-all duration-200"
                      >
                        <span className="text-xs sm:text-sm font-medium">{template.label}</span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="mt-8 pt-4 border-t border-border/40 text-center">
                <p className="text-xs text-muted-foreground">
                  Looking forward to discussing your next idea or opportunity!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
