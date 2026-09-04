import { useState, useEffect } from "react";

interface CursorGlowProps {
  isDark?: boolean;
}

export default function CursorGlow({ isDark = true }: CursorGlowProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth inertia interpolation
    const loop = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.12,
        y: prev.y + (targetPos.y - prev.y) * 0.12,
      }));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [targetPos, visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: isDark
          ? "radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 70%)"
          : "radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 5,
        filter: "blur(20px)",
      }}
    />
  );
}
