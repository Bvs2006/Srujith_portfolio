import { useState, useEffect, useRef } from "react";
import Card3D from "./Card3D";

interface WelcomeScreenProps {
  onEnter: () => void;
  name: string;
  title: string;
  cgpa: string;
  problemsCount: string;
  university: string;
  isDark?: boolean;
}

const TOTAL_SECONDS = 3;

export default function WelcomeScreen({
  onEnter,
  name,
  title,
  cgpa,
  problemsCount,
  university,
  isDark = true,
}: WelcomeScreenProps) {
  const [greeting, setGreeting] = useState("Welcome");
  const [isClosing, setIsClosing] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
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

  // Clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");

      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

      setDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Automatic redirect countdown (3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressPct = Math.max(0, Math.min(100, ((TOTAL_SECONDS - countdown) / TOTAL_SECONDS) * 100));

  return (
    <div
      onClick={handleEnter}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: isDark
          ? "radial-gradient(ellipse at 50% 35%, #0f0d22 0%, #05050a 100%)"
          : "radial-gradient(ellipse at 50% 35%, #ffffff 0%, #f1f5f9 100%)",
        color: isDark ? "#f1f0f7" : "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "scale(1.06) translateY(-16px)" : "scale(1) translateY(0)",
        filter: isClosing ? "blur(6px)" : "blur(0px)",
        transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease",
        pointerEvents: isClosing ? "none" : "auto",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Ambient Pulsing Glow Blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "pulseGlow 8s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "12%",
          right: "22%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(52, 211, 153, 0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          animation: "pulseGlow 10s ease-in-out infinite 2s",
        }}
      />

      {/* Holographic 3D Card */}
      <Card3D
        maxTilt={16}
        accentColor={isDark ? "#10b981" : "#059669"}
        isDark={isDark}
        style={{
          maxWidth: 680,
          width: "100%",
        }}
      >
        <div
          style={{
            background: isDark ? "rgba(8, 20, 15, 0.86)" : "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(16, 185, 129, 0.25)"}`,
            borderRadius: "32px",
            padding: "clamp(2.2rem, 5vw, 3.75rem) clamp(1.5rem, 5vw, 3rem)",
            boxShadow: isDark
              ? "0 30px 80px rgba(0, 0, 0, 0.75), 0 0 45px rgba(16, 185, 129, 0.25)"
              : "0 30px 80px rgba(16, 185, 129, 0.12), 0 0 35px rgba(16, 185, 129, 0.1)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Header Status Bar */}
          <div
            style={{
              transform: "translateZ(30px)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: isDark ? "rgba(16, 185, 129, 0.14)" : "rgba(16, 185, 129, 0.08)",
              border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.4)" : "rgba(16, 185, 129, 0.25)"}`,
              borderRadius: "999px",
              padding: "0.4rem 1.15rem",
              marginBottom: "1.75rem",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.15)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#34d399",
                boxShadow: "0 0 10px #34d399",
                animation: "pulseGlow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                color: isDark ? "#6ee7b7" : "#047857",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {greeting} · {dateStr} · {timeStr}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              transform: "translateZ(45px)",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
              lineHeight: 1.05,
              fontWeight: 900,
              color: isDark ? "#ffffff" : "#0f172a",
              margin: "0 0 1rem 0",
              letterSpacing: "-0.03em",
            }}
          >
            Welcome to the World of <br />
            <span
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #ffffff 0%, #e0e7ff 35%, #a5b4fc 65%, #6366f1 100%)"
                  : "linear-gradient(135deg, #0f172a 0%, #6366f1 50%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: isDark ? "drop-shadow(0 0 25px rgba(99, 102, 241, 0.45))" : "none",
              }}
            >
              {name}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              transform: "translateZ(25px)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: isDark ? "#a1a1aa" : "#64748b",
              lineHeight: 1.65,
              maxWidth: 520,
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            {title} at {university}. Explore verified credentials, interactive algorithmic profiles, and production systems.
          </p>

          {/* 3D Stat Badges Row */}
          <div
            style={{
              transform: "translateZ(35px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "0.75rem",
              width: "100%",
              maxWidth: 480,
              marginBottom: "2.5rem",
            }}
          >
            {[
              { val: cgpa, label: "CGPA", color: isDark ? "#818cf8" : "#4f46e5" },
              { val: problemsCount, label: "CP Solved", color: isDark ? "#38bdf8" : "#0284c7" },
              { val: "6+", label: "Projects", color: isDark ? "#34d399" : "#059669" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(16, 185, 129, 0.05)",
                  border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(16, 185, 129, 0.15)"}`,
                  borderRadius: "16px",
                  padding: "0.85rem 0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "1.3rem", fontWeight: 800, color: stat.color, fontFamily: "'Outfit', sans-serif" }}>
                  {stat.val}
                </span>
                <span style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px", fontWeight: 600 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Modern Countdown Progress HUD (No Button) */}
          <div
            style={{
              transform: "translateZ(45px)",
              width: "100%",
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: isDark ? "#a5b4fc" : "#4f46e5", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
                Directing to Portfolio
              </span>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: isDark ? "#818cf8" : "#4f46e5",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.2rem",
                }}
              >
                {countdown}s
              </span>
            </div>

            {/* Glowing countdown bar */}
            <div
              style={{
                width: "100%",
                height: 8,
                background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                borderRadius: "999px",
                overflow: "hidden",
                border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(16, 185, 129, 0.15)"}`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                  borderRadius: "999px",
                  boxShadow: "0 0 15px #06b6d4",
                  transition: "width 1s linear",
                }}
              />
            </div>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: isDark ? "#64748b" : "#94a3b8", margin: "0.25rem 0 0 0", letterSpacing: "0.04em" }}>
              (Tap anywhere to enter immediately)
            </p>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
