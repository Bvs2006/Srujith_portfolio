import React, { useState } from "react";
import Card3D from "./Card3D";

interface AdminAuthModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ADMIN_PASSWORD = "02062006";

export default function AdminAuthModal({ onSuccess, onCancel }: AdminAuthModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("portfolio_admin_auth", "true");
      onSuccess();
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "radial-gradient(ellipse at 50% 40%, #0f0d22 0%, #05050a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "widgetPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Ambient background glows */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "25%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "20%",
          right: "25%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Card3D maxTilt={14} accentColor="#6366f1" isDark={true} style={{ maxWidth: 440, width: "100%" }}>
        <div
          style={{
            background: "rgba(15, 14, 28, 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            borderRadius: "28px",
            padding: "2.5rem 2rem",
            boxShadow: "0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.25)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Lock Icon */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "20px",
              background: error ? "rgba(244, 63, 94, 0.15)" : "rgba(99, 102, 241, 0.15)",
              border: `1.5px solid ${error ? "#f43f5e" : "#6366f1"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              marginBottom: "1.25rem",
              boxShadow: `0 0 25px ${error ? "rgba(244, 63, 94, 0.3)" : "rgba(99, 102, 241, 0.3)"}`,
              transition: "all 0.3s ease",
            }}
          >
            {error ? "🚫" : "🔐"}
          </div>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#a5b4fc",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "0.4rem",
            }}
          >
            Security Checkpoint
          </span>

          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.65rem",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 0.5rem 0",
            }}
          >
            Portfolio Studio Access
          </h2>

          <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, margin: "0 0 1.75rem 0" }}>
            Enter the master administrator passcode to access live cloud storage and configuration controls.
          </p>

          <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: error ? "1.5px solid #f43f5e" : "1.5px solid rgba(99, 102, 241, 0.35)",
                  borderRadius: "14px",
                  padding: "0.95rem 1.25rem",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  letterSpacing: "0.3em",
                  textAlign: "center",
                  outline: "none",
                  boxSizing: "border-box",
                  boxShadow: error ? "0 0 15px rgba(244, 63, 94, 0.4)" : "none",
                  transition: "all 0.2s ease",
                }}
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#f43f5e",
                  fontSize: "0.75rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                ✕ Incorrect passcode. Please try again.
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
                transition: "all 0.2s",
              }}
            >
              Authorize & Enter Studio →
            </button>

            <button
              type="button"
              onClick={onCancel}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                fontSize: "0.75rem",
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                padding: "0.4rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              ← Cancel & Return to Portfolio
            </button>
          </form>
        </div>
      </Card3D>
    </div>
  );
}
