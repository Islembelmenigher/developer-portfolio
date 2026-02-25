import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const socialLinks = [
    {
      label: "LinkedIn",
      description: "Connect professionally",
      href: "https://www.linkedin.com/in/islem-belmenigher-148109253/",
      icon: Linkedin,
    },
    {
      label: "Email",
      description: "Fastest way to contact me",
      href: "mailto:islembelmenigher@gmail.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      description: "Check out my projects",
      href: "https://github.com/Islembelmenigher",
      icon: Github,
    },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-base md:text-lg font-semibold">04. Contact</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            Let's connect
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            If you have a React role, collaboration idea, or feedback, feel free to send a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Get in touch</h3>
            <div className="space-y-4">
              <a
                href="tel:+48516304549"
                className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_15px_40px_-20px_hsl(var(--primary)/0.6)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+48 516 304 549</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
              </a>

              <div className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_15px_40px_-20px_hsl(var(--primary)/0.6)]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">Poland, Krakow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-8 rounded-2xl border border-border/60 bg-card/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                Availability
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                <strong className="font-semibold text-foreground">Currently open</strong> to{" "}
                <strong className="font-semibold text-foreground">React frontend roles</strong>,{" "}
                <strong className="font-semibold text-foreground">freelance projects</strong>, and{" "}
                <strong className="font-semibold text-foreground">technical collaborations</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_15px_40px_-20px_hsl(var(--primary)/0.6)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-base font-semibold">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
