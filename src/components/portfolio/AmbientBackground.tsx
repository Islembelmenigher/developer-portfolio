"use client";
import { useEffect, useRef, useCallback } from "react";

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);

    // Particle field
    const NUM = window.matchMedia("(max-width: 768px)").matches ? 28 : 60;
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const particles: Particle[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      // Animated orb 1 — primary cyan
      const ox1 = w * 0.25 + Math.sin(t * 0.7) * 90;
      const oy1 = h * 0.22 + Math.cos(t * 0.5) * 70;
      const g1 = ctx.createRadialGradient(ox1, oy1, 0, ox1, oy1, Math.min(w, h) * 0.38);
      g1.addColorStop(0, "hsla(185,90%,48%,0.14)");
      g1.addColorStop(1, "hsla(185,90%,48%,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Animated orb 2 — violet accent
      const ox2 = w * 0.78 + Math.cos(t * 0.6) * 80;
      const oy2 = h * 0.65 + Math.sin(t * 0.45) * 60;
      const g2 = ctx.createRadialGradient(ox2, oy2, 0, ox2, oy2, Math.min(w, h) * 0.32);
      g2.addColorStop(0, "hsla(250,80%,65%,0.12)");
      g2.addColorStop(1, "hsla(250,80%,65%,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Animated orb 3 — deep blue
      const ox3 = w * 0.5 + Math.sin(t * 0.4) * 60;
      const oy3 = h * 0.85 + Math.cos(t * 0.6) * 40;
      const g3 = ctx.createRadialGradient(ox3, oy3, 0, ox3, oy3, Math.min(w, h) * 0.28);
      g3.addColorStop(0, "hsla(220,80%,55%,0.08)");
      g3.addColorStop(1, "hsla(220,80%,55%,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(185,80%,65%,${p.alpha})`;
        ctx.fill();
      });

      // Connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(185,80%,60%,${(1 - dist / 100) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas particle field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.9 }} />

      {/* Static radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,hsl(185_90%_48%/0.1),transparent_55%)]" />

      {/* Soft conic sweep */}
      <div
        className="absolute inset-0 opacity-50 animate-aurora"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, hsl(185 90% 48% / 0.06), transparent 35%, hsl(250 80% 65% / 0.06), transparent 70%, hsl(185 90% 48% / 0.06))",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)/0.6) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)/0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Bottom fade to background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
    </div>
  );
}
