export function AmbientBackground() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(var(--primary)/0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,hsl(var(--primary)/0.08),transparent_35%,hsl(var(--accent)/0.08),transparent_70%,hsl(var(--primary)/0.08))] animate-aurora opacity-60" />

      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-drift-slow" />
      <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl animate-drift-reverse" />
      <div className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl animate-drift-slow [animation-delay:1.2s]" />

      <div className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_90%)] bg-[linear-gradient(to_right,hsl(var(--foreground)/0.7)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.7)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
    </div>
  );
}

