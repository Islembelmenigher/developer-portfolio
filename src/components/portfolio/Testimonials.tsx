import { Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/usePortfolioData";

// Default testimonials if database is empty
const defaultTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechStart Inc",
    content: "Working with this developer was an absolute pleasure. They delivered a complex web application on time and exceeded our expectations in terms of quality and performance.",
    avatar_url: null,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Product Manager",
    company: "Digital Solutions",
    content: "Exceptional attention to detail and great communication throughout the project. The final product was exactly what we envisioned, if not better.",
    avatar_url: null,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "CreativeFlow",
    content: "A true professional who understands both the technical and business aspects. Our platform has seen a 40% increase in user engagement since the redesign.",
    avatar_url: null,
  },
];

export function Testimonials() {
  const { data: testimonials } = useTestimonials();
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  if (displayTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding relative bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-base md:text-lg font-semibold">04. Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            What people say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Feedback from teams and people I've collaborated with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    testimonial.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
