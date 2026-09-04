import { useState, useEffect } from "react";

interface ScrollProgressProps {
  isDark?: boolean;
}

export default function ScrollProgress({ isDark = true }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3.5,
        zIndex: 9999,
        background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
        pointerEvents: "none",
      }}
    >
      {/* Animated Glowing Progress Bar */}
      <div
        style={{
          height: "100%",
          width: `${scrollProgress}%`,
          background: isDark
            ? "linear-gradient(90deg, #6366f1 0%, #06b6d4 40%, #10b981 75%, #34d399 100%)"
            : "linear-gradient(90deg, #4f46e5 0%, #0284c7 50%, #059669 100%)",
          boxShadow: isDark
            ? "0 0 16px rgba(52, 211, 153, 0.7), 0 0 8px rgba(6, 182, 212, 0.9)"
            : "0 0 12px rgba(16, 185, 129, 0.5)",
          transition: "width 0.1s ease-out",
          borderRadius: "0 999px 999px 0",
        }}
      />
    </div>
  );
}
