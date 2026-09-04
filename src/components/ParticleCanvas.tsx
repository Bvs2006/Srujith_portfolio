import { useEffect, useRef } from "react";

export default function ParticleCanvas({ isDark = true }: { isDark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, radius: 160 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Multilayer depth particles
    const particleCount = Math.min(Math.floor((width * height) / 12000), 85);
    const particles: Array<{
      x: number;
      y: number;
      z: number; // depth: 1 = far, 3 = close
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const darkColors = ["#818cf8", "#06b6d4", "#c084fc", "#38bdf8", "#10b981", "#fb7185"];
    const lightColors = ["#6366f1", "#0284c7", "#9333ea", "#2563eb", "#059669", "#e11d48"];
    const colors = isDark ? darkColors : lightColors;

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * (0.35 * z),
        vy: (Math.random() - 0.5) * (0.35 * z),
        size: (Math.random() * 1.8 + 0.8) * (z * 0.75),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: (Math.random() * 0.4 + 0.2) * (z / 3),
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // ── Realistic 3D Horizon Grid (Subtle) ──
      const gridY = height * 0.65;
      ctx.save();
      ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.04)" : "rgba(99, 102, 241, 0.05)";
      ctx.lineWidth = 0.75;

      // Perspective horizon lines
      for (let i = 0; i < 8; i++) {
        const y = gridY + Math.pow(i / 7, 2.2) * (height - gridY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // ── Particle Connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 115) * 0.18 * ((particles[i].z + particles[j].z) / 4);
            ctx.strokeStyle = isDark
              ? `rgba(129, 140, 248, ${lineAlpha})`
              : `rgba(99, 102, 241, ${lineAlpha * 1.2})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // ── Update & Draw Particles ──
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.15;
        p.y += p.vy + Math.cos(time + p.x * 0.01) * 0.15;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * (2.2 * p.z);
          p.y -= (dy / dist) * force * (2.2 * p.z);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: isDark ? 0.75 : 0.85,
      }}
    />
  );
}
