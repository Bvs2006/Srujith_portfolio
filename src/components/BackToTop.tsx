import { useState, useEffect } from "react";

interface BackToTopProps {
  isDark?: boolean;
}

export default function BackToTop({ isDark = true }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      style={{
        position: "fixed",
        bottom: "5.5rem",
        right: "1.75rem",
        zIndex: 90,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: isDark ? "rgba(10, 24, 18, 0.88)" : "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(99, 102, 241, 0.25)"}`,
        boxShadow: isDark
          ? "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.25)"
          : "0 10px 25px rgba(99, 102, 241, 0.15)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        color: isDark ? "#34d399" : "#4f46e5",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        animation: "widgetPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* SVG Progress Ring */}
      <svg
        width="48"
        height="48"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)",
          pointerEvents: "none",
        }}
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={isDark ? "#34d399" : "#6366f1"}
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>

      {/* Up Arrow Icon */}
      <span style={{ fontSize: "1.1rem", fontWeight: 900, lineHeight: 1, transform: "translateY(-1px)" }}>
        ↑
      </span>
    </button>
  );
}
