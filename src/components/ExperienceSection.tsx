import Card3D from "./Card3D";
import { ExperienceItem } from "../hooks/usePortfolioStore";

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  isDark?: boolean;
}

export default function ExperienceSection({ experiences, isDark = true }: ExperienceSectionProps) {
  const cardBg = isDark ? "rgba(15, 14, 28, 0.78)" : "rgba(255, 255, 255, 0.88)";
  const textMain = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const cardBorder = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(99, 102, 241, 0.15)";

  const items = Array.isArray(experiences) && experiences.length > 0 ? experiences : [];

  return (
    <section id="experience" style={{ padding: "6rem clamp(1.5rem, 5vw, 6rem)", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#10b981", letterSpacing: "0.2em", fontWeight: 700 }}>
            02
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(16, 185, 129, 0.5), transparent)" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Professional Journey & Industry Track
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.08, color: textMain, margin: 0 }}>
              Work & <span style={{ background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Experience</span>
            </h2>
            <p style={{ color: textMuted, fontSize: "0.95rem", margin: "0.5rem 0 0 0" }}>
              Practical engineering experience in production web systems, AI API integration, and collaborative Agile development.
            </p>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.35rem 0.85rem", borderRadius: "999px", fontWeight: 700 }}>
            ● {items.length} ROLES RECORDED
          </span>
        </div>

        {/* 3D Timeline Container */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {/* Vertical Glowing Track Line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 20,
              bottom: 20,
              left: "clamp(12px, 2.5vw, 24px)",
              width: 2,
              background: isDark
                ? "linear-gradient(to bottom, #10b981, #6366f1, transparent)"
                : "linear-gradient(to bottom, #10b981, #6366f1, transparent)",
              boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
              zIndex: 0,
            }}
          />

          {items.map((exp, idx) => (
            <div
              key={exp.id}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "clamp(1rem, 3vw, 2.5rem)",
                alignItems: "flex-start",
                zIndex: 1,
              }}
            >
              {/* Timeline Glowing Node */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1.2rem" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: isDark ? "#0c0b18" : "#ffffff",
                    border: `2.5px solid ${exp.accent || "#10b981"}`,
                    boxShadow: `0 0 20px ${exp.accent || "#10b981"}88`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: exp.accent || "#10b981" }} />
                </div>
              </div>

              {/* 3D Movable Experience Card */}
              <Card3D maxTilt={10} accentColor={exp.accent || "#10b981"} isDark={isDark}>
                <div
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: `1px solid ${exp.accent || "#10b981"}44`,
                    borderRadius: "26px",
                    padding: "clamp(1.5rem, 4vw, 2.4rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    boxShadow: isDark
                      ? "0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)"
                      : "0 15px 40px rgba(99, 102, 241, 0.08)",
                  }}
                >
                  {/* Top Bar: Role + Company + Period Badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)", fontWeight: 800, color: textMain, margin: 0 }}>
                          {exp.role}
                        </h3>
                        {exp.badge && (
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.62rem",
                              color: "#10b981",
                              background: "rgba(16, 185, 129, 0.14)",
                              border: "1px solid rgba(16, 185, 129, 0.35)",
                              borderRadius: "999px",
                              padding: "0.2rem 0.65rem",
                              fontWeight: 700,
                              letterSpacing: "0.05em",
                            }}
                          >
                            [{exp.badge}]
                          </span>
                        )}
                      </div>

                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: isDark ? "#a5b4fc" : "#4338ca", margin: 0 }}>
                        {exp.company}
                      </p>

                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: textMuted, margin: "4px 0 0 0" }}>
                        📍 {exp.location}
                      </p>
                    </div>

                    {/* Period Badge & Action */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.72rem",
                          color: textMain,
                          background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(99, 102, 241, 0.08)",
                          border: `1px solid ${cardBorder}`,
                          borderRadius: "10px",
                          padding: "0.35rem 0.85rem",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        🗓️ {exp.period}
                      </span>

                      {exp.certificateUrl && (
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
                            borderRadius: "10px",
                            padding: "0.4rem 0.9rem",
                            textDecoration: "none",
                            boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span>📜</span> View Certificate ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: `1px solid ${cardBorder}`, paddingTop: "1.25rem" }}>
                    {(exp.highlights || []).map((highlight, hIdx) => (
                      <div key={hIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <span style={{ color: exp.accent || "#10b981", fontSize: "0.85rem", lineHeight: 1.6, flexShrink: 0 }}>
                          ✦
                        </span>
                        <p style={{ color: textMuted, fontSize: "0.9rem", lineHeight: 1.65, margin: 0, flex: 1 }}>
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Skills / Tech Stack Chips */}
                  {Array.isArray(exp.skills) && exp.skills.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", borderTop: `1px solid ${cardBorder}`, paddingTop: "1rem" }}>
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.68rem",
                            color: isDark ? "#cbd5e1" : "#475569",
                            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(99, 102, 241, 0.06)",
                            border: `1px solid ${cardBorder}`,
                            borderRadius: "8px",
                            padding: "0.3rem 0.65rem",
                            fontWeight: 600,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
