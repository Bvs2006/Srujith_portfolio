import { useEffect, useRef } from "react";

interface NeuralGlobe3DProps {
  isDark?: boolean;
  size?: number;
}

export default function NeuralGlobe3D({ isDark = true, size = 380 }: NeuralGlobe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const radius = size * 0.38;
    const centerX = size / 2;
    const centerY = size / 2;

    // Generate 3D Sphere Points
    const numPoints = 220;
    const points: Array<{ x: number; y: number; z: number; ox: number; oy: number; oz: number; size: number; color: string }> = [];

    const palette = isDark
      ? ["#34d399", "#10b981", "#6ee7b7", "#a7f3d0", "#4ade80", "#059669", "#ffffff"]
      : ["#047857", "#059669", "#10b981", "#0284c7", "#16a34a", "#064e3b"];

    // Fibonacci sphere distribution for uniform 3D distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // -1 to 1
      const radAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radAtY;
      const z = Math.sin(theta) * radAtY;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        ox: x * radius,
        oy: y * radius,
        oz: z * radius,
        size: Math.random() * 2 + 1.5,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    // Outer orbital rings
    const ringCount = 3;
    const ringRays: Array<{ angleX: number; angleY: number; angleZ: number; speed: number; color: string }> = [
      { angleX: 0.4, angleY: 0.6, angleZ: 0.2, speed: 0.012, color: isDark ? "#34d399" : "#059669" },
      { angleX: -0.5, angleY: 0.8, angleZ: -0.3, speed: -0.015, color: isDark ? "#10b981" : "#10b981" },
      { angleX: 0.8, angleY: -0.4, angleZ: 0.6, speed: 0.009, color: isDark ? "#6ee7b7" : "#0284c7" },
    ];

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetRotY = nx * 1.5;
      targetRotX = -ny * 1.5;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let baseAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      baseAngle += 0.007;
      if (!mouseActive) {
        targetRotY = Math.sin(baseAngle * 0.7) * 0.6;
        targetRotX = Math.cos(baseAngle * 0.5) * 0.4;
      }

      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;

      const cosX = Math.cos(rotX + baseAngle * 0.3);
      const sinX = Math.sin(rotX + baseAngle * 0.3);
      const cosY = Math.cos(rotY + baseAngle);
      const sinY = Math.sin(rotY + baseAngle);

      // Project and sort points by Depth (Z-Buffer)
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.ox * cosY - p.oz * sinY;
        let z1 = p.oz * cosY + p.ox * sinY;

        // Rotate X
        let y1 = p.oy * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.oy * sinX;

        // Perspective projection factor
        const fov = 340;
        const scale = fov / (fov + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;

        return {
          px,
          py,
          scale,
          z: z2,
          color: p.color,
          size: p.size * scale,
          alpha: Math.max(0.1, (z2 + radius) / (radius * 2)),
        };
      });

      projected.sort((a, b) => a.z - b.z);

      // Draw Connection Lines for close points (Wireframe mesh)
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42 && projected[i].z > -radius * 0.6 && projected[j].z > -radius * 0.6) {
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            const alpha = (1 - dist / 42) * 0.35 * Math.min(projected[i].alpha, projected[j].alpha);
            ctx.strokeStyle = isDark
              ? `rgba(52, 211, 153, ${alpha})`
              : `rgba(16, 185, 129, ${alpha * 1.2})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw Orbiting 3D Rings
      ringRays.forEach((ring, idx) => {
        const ringRad = radius * (1.2 + idx * 0.15);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotY * 0.5 + idx * 1.2);
        ctx.scale(1, 0.38 + idx * 0.08);

        ctx.beginPath();
        ctx.arc(0, 0, ringRad, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}${isDark ? "33" : "25"}`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 8]);
        ctx.stroke();

        // Orbiting satellite light
        const satAngle = baseAngle * (3 + idx) * (idx % 2 === 0 ? 1 : -1);
        const satX = Math.cos(satAngle) * ringRad;
        const satY = Math.sin(satAngle) * ringRad;
        ctx.beginPath();
        ctx.arc(satX, satY, 3, 0, Math.PI * 2);
        ctx.fillStyle = ring.color;
        ctx.shadowColor = ring.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      // Draw Projected 3D Points
      projected.forEach((p) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        if (p.z > 0) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.scale * 8;
        }
        ctx.fill();
        ctx.restore();
      });

      // Core 3D Light Glow in the center
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.85);
      grad.addColorStop(0, isDark ? "rgba(16, 185, 129, 0.28)" : "rgba(16, 185, 129, 0.12)");
      grad.addColorStop(0.6, isDark ? "rgba(52, 211, 153, 0.12)" : "rgba(5, 150, 105, 0.05)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark, size]);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          pointerEvents: "auto",
          cursor: "grab",
        }}
      />
    </div>
  );
}
