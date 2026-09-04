import { useState, useEffect, useRef } from "react";

interface WelcomeScreenProps {
  onEnter: () => void;
  isDark?: boolean;
  name?: string;
  title?: string;
  cgpa?: string;
  problemsCount?: string;
  university?: string;
}

const TOTAL_SECONDS = 2.2;

export default function WelcomeScreen({
  onEnter,
  isDark = true,
}: WelcomeScreenProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [countdown, setCountdown] = useState(TOTAL_SECONDS);
  const hasTriggeredRef = useRef(false);

  const handleEnter = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsClosing(true);
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  // Keyboard shortcut to enter (Space or Enter or Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Automatic redirect countdown (2.2 seconds)
  useEffect(() => {
    const startTime = Date.now();
    const duration = TOTAL_SECONDS * 1000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, TOTAL_SECONDS - elapsed / 1000);
      setCountdown(remaining);

      if (elapsed >= duration) {
        clearInterval(timer);
        handleEnter();
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const progressPct = Math.max(0, Math.min(100, ((TOTAL_SECONDS - countdown) / TOTAL_SECONDS) * 100));

  return (
    <div
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      aria-label="Welcome screen. Click anywhere to enter."
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: isDark
          ? "radial-gradient(ellipse at 50% 50%, #061c14 0%, #020a07 100%)"
          : "radial-gradient(ellipse at 50% 50%, #f0fdf4 0%, #e2e8f0 100%)",
        color: isDark ? "#f1f0f7" : "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "scale(1.08) translateY(-12px)" : "scale(1) translateY(0)",
        filter: isClosing ? "blur(8px)" : "blur(0px)",
        transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease",
        pointerEvents: isClosing ? "none" : "auto",
        cursor: "pointer",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Ambient Pulsing Glow Blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(300px, 60vw, 700px)",
          height: "clamp(300px, 60vw, 700px)",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.12) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.08) 45%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          animation: "pulseGlow 6s ease-in-out infinite",
        }}
      />

      {/* Center Frameless Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Pure Majestic Welcome Title - Frameless */}
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(4.5rem, 14vw, 9.5rem)",
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            margin: "0 0 2.5rem 0",
            background: isDark
              ? "linear-gradient(135deg, #ffffff 0%, #a7f3d0 35%, #34d399 70%, #059669 100%)"
              : "linear-gradient(135deg, #0f172a 0%, #059669 50%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: isDark ? "drop-shadow(0 0 45px rgba(52, 211, 153, 0.45))" : "none",
            animation: "fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          Welcome
        </h1>

        {/* Minimal Sleek Countdown Bar */}
        <div
          style={{
            width: "100%",
            maxWidth: 240,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 3,
              background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)",
                borderRadius: "999px",
                boxShadow: "0 0 12px #34d399",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: isDark ? "#4ade80" : "#059669",
              letterSpacing: "0.08em",
              opacity: 0.8,
            }}
          >
            tap anywhere to enter
          </span>
        </div>
      </div>
    </div>
  );
}
