import { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const shouldUseLightMode = storedTheme === "light";

    setIsLightMode(shouldUseLightMode);
    document.documentElement.classList.toggle("light", shouldUseLightMode);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextIsLightMode = !isLightMode;
    setIsLightMode(nextIsLightMode);
    document.documentElement.classList.toggle("light", nextIsLightMode);
    localStorage.setItem("theme", nextIsLightMode ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">{"<islem_belmenigher/>"}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium px-3 py-1.5 rounded-md bg-background/35 backdrop-blur-md border border-border/40 hover:border-primary/40"
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={toggleTheme}
              aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
              title={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
            >
              {isLightMode ? <Moon /> : <Sun />}
            </Button>
            <Button variant="default" size="sm" className="ml-4" asChild>
              <a href="#contact">Contact</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
            <div className="flex flex-col py-4 px-4 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-3 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2 justify-start"
                onClick={toggleTheme}
                aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
              >
                {isLightMode ? <Moon /> : <Sun />}
                {isLightMode ? "Dark mode" : "Day mode"}
              </Button>
              <Button variant="default" size="sm" className="mt-2" asChild>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
