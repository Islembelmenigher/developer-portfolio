import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.25)" },
          "50%": { boxShadow: "0 0 48px hsl(var(--primary) / 0.5)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "scan-line": {
          "0%":   { top: "0%" },
          "100%": { top: "100%" },
        },
        "bounce-y": {
          "0%, 100%": { transform: "translateY(0) translateX(-50%)" },
          "50%":       { transform: "translateY(8px) translateX(-50%)" },
        },
        "aurora-shift": {
          "0%":   { transform: "rotate(0deg) scale(1)" },
          "50%":  { transform: "rotate(6deg) scale(1.05)" },
          "100%": { transform: "rotate(0deg) scale(1)" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%":       { transform: "translate3d(32px, -24px, 0) scale(1.07)" },
          "66%":       { transform: "translate3d(-18px, 18px, 0) scale(0.97)" },
        },
        "drift-reverse": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%":       { transform: "translate3d(-28px, 22px, 0) scale(1.05)" },
          "66%":       { transform: "translate3d(22px, -16px, 0) scale(0.98)" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-up":         "fade-up 0.65s ease-out forwards",
        "fade-in":         "fade-in 0.65s ease-out forwards",
        "scale-in":        "scale-in 0.5s ease-out forwards",
        "slide-in-right":  "slide-in-right 0.3s ease-out",
        "float":           "float 6s ease-in-out infinite",
        "glow-pulse":      "glow-pulse 2.5s ease-in-out infinite",
        "cursor-blink":    "cursor-blink 1s step-end infinite",
        "scan-line":       "scan-line 1.4s linear infinite",
        "bounce-y":        "bounce-y 1.8s ease-in-out infinite",
        "aurora":          "aurora-shift 22s linear infinite",
        "drift-slow":      "drift-slow 18s ease-in-out infinite",
        "drift-reverse":   "drift-reverse 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
