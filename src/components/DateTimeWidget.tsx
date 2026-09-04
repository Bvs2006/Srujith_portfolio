import { useState, useEffect } from "react";

export default function DateTimeWidget({ email, isDark = true }: { email: string; isDark?: boolean }) {
  const [time, setTime] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateFormatted = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timeFormatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const istTimeStr = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(time);

  const istDateStr = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(time);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 50,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Popover Card */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 14px)",
            right: 0,
            width: "min(320px, calc(100vw - 2rem))",
            maxWidth: "calc(100vw - 2rem)",
            background: isDark ? "rgba(8, 20, 16, 0.94)" : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(16, 185, 129, 0.2)"}`,
            borderRadius: "24px",
            padding: "1.4rem",
            boxShadow: isDark
              ? "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(16, 185, 129, 0.2)"
              : "0 25px 60px rgba(16, 185, 129, 0.15), 0 0 25px rgba(16, 185, 129, 0.08)",
            animation: "widgetPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, paddingBottom: "0.65rem" }}>
            <span style={{ fontSize: "0.65rem", color: isDark ? "#6ee7b7" : "#047857", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
              Live System Status
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: isDark ? "#a1a1aa" : "#64748b", cursor: "pointer", fontSize: "0.9rem", padding: "0 4px" }}
              aria-label="Close status"
            >
              ✕
            </button>
          </div>

          {/* Srujith's Time in India */}
          <div style={{ background: isDark ? "rgba(52, 211, 153, 0.05)" : "rgba(16, 185, 129, 0.04)", borderRadius: "14px", padding: "0.85rem", border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.15)" : "rgba(16, 185, 129, 0.1)"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "0.62rem", color: isDark ? "#a1a1aa" : "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                Base: India (IST)
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.6rem", color: "#34d399", fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
                Online & Available
              </span>
            </div>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: isDark ? "#ffffff" : "#0f172a", margin: 0, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}>
              {istTimeStr}
            </p>
            <p style={{ fontSize: "0.65rem", color: isDark ? "#64748b" : "#94a3b8", margin: "2px 0 0 0" }}>
              {istDateStr}
            </p>
          </div>

          {/* Device Clock */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px", fontSize: "0.68rem", color: isDark ? "#a1a1aa" : "#64748b" }}>
            <span>Your Device Clock:</span>
            <span style={{ fontWeight: 600, color: isDark ? "#e2e8f0" : "#0f172a" }}>{timeFormatted}</span>
          </div>

          {/* Availability Status */}
          <div style={{ background: isDark ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.08)", border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.3)" : "rgba(16, 185, 129, 0.3)"}`, borderRadius: "12px", padding: "0.75rem 0.9rem" }}>
            <p style={{ fontSize: "0.68rem", color: isDark ? "#34d399" : "#047857", margin: 0, fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🚀</span> Open for Internships & Projects
            </p>
            <p style={{ fontSize: "0.62rem", color: isDark ? "#a1a1aa" : "#64748b", margin: "4px 0 0 0", fontFamily: "'Inter', sans-serif" }}>
              Available for Full-Stack, AI/ML & Systems Engineering.
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleCopyEmail}
              style={{
                flex: 1,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.05em",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "0.7rem 0.5rem",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 600,
                boxShadow: copied ? "0 0 15px rgba(52, 211, 153, 0.6)" : "0 4px 15px rgba(16, 185, 129, 0.35)",
              }}
            >
              {copied ? "Copied Email! ✓" : "Copy Email"}
            </button>
            <a
              href={`mailto:${email}`}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.05em",
                background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
                color: isDark ? "#ffffff" : "#0f172a",
                border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.3)" : "rgba(0, 0, 0, 0.12)"}`,
                borderRadius: "10px",
                padding: "0.7rem 0.85rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                fontWeight: 600,
              }}
            >
              Send Mail ↗
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: isDark ? "rgba(8, 20, 16, 0.9)" : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          color: isDark ? "#f1f0f7" : "#0f172a",
          border: `1px solid ${isOpen ? "#34d399" : isDark ? "rgba(52, 211, 153, 0.4)" : "rgba(16, 185, 129, 0.25)"}`,
          borderRadius: "999px",
          padding: "0.65rem 1.35rem",
          boxShadow: isOpen
            ? "0 10px 30px rgba(16, 185, 129, 0.45), 0 0 20px rgba(52, 211, 153, 0.3)"
            : isDark
            ? "0 8px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(16, 185, 129, 0.2)"
            : "0 8px 25px rgba(16, 185, 129, 0.15)",
          cursor: "pointer",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span style={{ position: "relative", display: "flex", height: 9, width: 9 }}>
          <span
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              background: "#34d399",
              opacity: 0.75,
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <span
            style={{
              position: "relative",
              borderRadius: "50%",
              height: 9,
              width: 9,
              background: "#34d399",
              boxShadow: "0 0 8px #34d399",
            }}
          />
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.04em" }}>
          <span style={{ color: isDark ? "#a1a1aa" : "#64748b" }}>{dateFormatted}</span>
          <span style={{ color: isDark ? "#475569" : "#cbd5e1" }}>·</span>
          <span style={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: 700 }}>{timeFormatted}</span>
        </div>

        <span
          style={{
            fontSize: "0.68rem",
            color: isDark ? "#6ee7b7" : "#047857",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▲
        </span>
      </button>
    </div>
  );
}
