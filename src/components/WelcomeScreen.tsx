import { useState, useEffect, useRef } from "react";
import Card3D from "./Card3D";

interface WelcomeScreenProps {
  onEnter: () => void;
  isDark?: boolean;
  name?: string;
  title?: string;
  cgpa?: string;
  problemsCount?: string;
  university?: string;
}

const TOTAL_SECONDS = 2.5;

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

  // Keyboard shortcut to enter (Space or Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Automatic redirect countdown (2.5 seconds)
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
      aria-label="Welcome screen. Click to enter portfolio."
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: isDark
          ? "radial-gradient(ellipse at 50% 40%, #061c14 0%, #020b08 100%)"
          : "radial-gradient(ellipse at 50% 40%, #f0fdf4 0%, #e2e8f0 100%)",
        color: isDark ? "#f1f0f7" : "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
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
          top: "20%",
          left: "25%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          animation: "pulseGlow 7s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "18%",
          right: "25%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(52, 211, 153, 0.22) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(52, 211, 153, 0.14) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "pulseGlow 9s ease-in-out infinite 1.5s",
        }}
      />

      {/* 3D Glassmorphic Card containing only Welcome */}
      <Card3D
        maxTilt={14}
        accentColor={isDark ? "#10b981" : "#059669"}
        isDark={isDark}
        style={{
          maxWidth: 560,
          width: "100%",
        }}
      >
        <div
          style={{
            background: isDark ? "rgba(4, 22, 16, 0.88)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(16, 185, 129, 0.25)"}`,
            borderRadius: "32px",
            padding: "clamp(3rem, 7vw, 4.5rem) clamp(2rem, 6vw, 3.5rem)",
            boxShadow: isDark
              ? "0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(16, 185, 129, 0.28)"
              : "0 30px 90px rgba(16, 185, 129, 0.14), 0 0 40px rgba(16, 185, 129, 0.12)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glowing Pill / Dot */}
          <div
            style={{
              transform: "translateZ(30px)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)",
              border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.45)" : "rgba(16, 185, 129, 0.3)"}`,
              borderRadius: "999px",
              padding: "0.35rem 1rem",
              marginBottom: "1.5rem",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#34d399",
                boxShadow: "0 0 12px #34d399",
                animation: "pulseGlow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                color: isDark ? "#6ee7b7" : "#047857",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              PORTFOLIO
            </span>
          </div>

          {/* Pure Majestic Welcome */}
          <h1
            style={{
              transform: "translateZ(50px)",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(3.2rem, 9vw, 5.5rem)",
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              margin: "0 0 2.2rem 0",
              background: isDark
                ? "linear-gradient(135deg, #ffffff 0%, #a7f3d0 40%, #34d399 75%, #059669 100%)"
                : "linear-gradient(135deg, #0f172a 0%, #059669 50%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: isDark ? "drop-shadow(0 0 35px rgba(52, 211, 153, 0.45))" : "none",
            }}
          >
            Welcome
          </h1>

          {/* Minimal Sleek Countdown Bar */}
          <div
            style={{
              transform: "translateZ(35px)",
              width: "100%",
              maxWidth: 260,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 4,
                background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                borderRadius: "999px",
                overflow: "hidden",
                border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.25)" : "rgba(16, 185, 129, 0.15)"}`,
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
                fontSize: "0.65rem",
                color: isDark ? "#64748b" : "#94a3b8",
                letterSpacing: "0.05em",
              }}
            >
              Tap anywhere to enter
            </span>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
