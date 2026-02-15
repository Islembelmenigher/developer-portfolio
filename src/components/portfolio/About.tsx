import { Code2, Coffee, Lightbulb, Rocket } from "lucide-react";
import { useSiteSettings } from "@/hooks/usePortfolioData";

const highlights = [
  { icon: Code2, label: "Clean Code", description: "Writing maintainable, scalable solutions" },
  { icon: Rocket, label: "Fast Delivery", description: "Agile methodology & quick iterations" },
  { icon: Lightbulb, label: "Problem Solver", description: "Creative solutions to complex challenges" },
  { icon: Coffee, label: "Dedicated", description: "Passionate about continuous learning" },
];

export function About() {
  const { data: settings } = useSiteSettings();

  return (
    <section id="about" className="section-padding relative">
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
            <div className="aspect-square rounded-2xl overflow-hidden glass-card p-1">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl md:text-9xl font-bold gradient-text opacity-20">5+</div>
                  <div className="text-muted-foreground font-medium">Years Experience</div>
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/30 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {settings?.about_text || 
                "I'm a passionate full-stack developer with over 5 years of experience building web applications. I specialize in React, Node.js, and cloud technologies. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community."}
            </p>

            {/* Highlights Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
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
