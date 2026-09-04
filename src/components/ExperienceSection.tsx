import { useState } from "react";
import Card3D from "./Card3D";
import { ExperienceItem } from "../hooks/usePortfolioStore";

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  isDark?: boolean;
}

export default function ExperienceSection({ experiences, isDark = true }: ExperienceSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cardBg = isDark ? "rgba(15, 14, 28, 0.78)" : "rgba(255, 255, 255, 0.88)";
  const textMain = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const cardBorder = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(99, 102, 241, 0.15)";

  const items = Array.isArray(experiences) && experiences.length > 0 ? experiences : [];

  return (
    <section id="experience" style={{ padding: "clamp(4.5rem, 8vh, 6rem) clamp(1rem, 4vw, 6rem)", position: "relative", zIndex: 10 }}>
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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.9rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.08, color: textMain, margin: 0 }}>
              Work & <span style={{ background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Experience</span>
            </h2>
            <p style={{ color: textMuted, fontSize: "0.92rem", margin: "0.5rem 0 0 0" }}>
              Practical engineering experience in production web systems, AI API integration, and collaborative Agile development. Click any role to explore key contributions.
            </p>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#10b981", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.35rem 0.85rem", borderRadius: "999px", fontWeight: 700 }}>
            ● {items.length} ROLES RECORDED
          </span>
        </div>

        {/* 3D Timeline Container */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Vertical Glowing Track Line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 20,
              bottom: 20,
              left: "clamp(10px, 1.8vw, 24px)",
              width: 2,
              background: isDark
                ? "linear-gradient(to bottom, #10b981, #6366f1, transparent)"
                : "linear-gradient(to bottom, #10b981, #6366f1, transparent)",
              boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
              zIndex: 0,
            }}
          />

          {items.map((exp) => {
            const isExpanded = !!expandedIds[exp.id];

            return (
              <div
                key={exp.id}
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "clamp(0.6rem, 2.5vw, 2.5rem)",
                  alignItems: "flex-start",
                  zIndex: 1,
                }}
              >
                {/* Timeline Glowing Node */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1.2rem" }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: isDark ? "#0c0b18" : "#ffffff",
                      border: `2.5px solid ${exp.accent || "#10b981"}`,
                      boxShadow: `0 0 20px ${exp.accent || "#10b981"}88`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: exp.accent || "#10b981" }} />
                  </div>
                </div>

                {/* 3D Movable Experience Card */}
                <Card3D maxTilt={10} accentColor={exp.accent || "#10b981"} isDark={isDark}>
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    style={{
                      background: cardBg,
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: `1px solid ${isExpanded ? (exp.accent || "#10b981") : `${exp.accent || "#10b981"}44`}`,
                      borderRadius: "24px",
                      padding: "clamp(1.15rem, 3.5vw, 2.4rem)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                      cursor: "pointer",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: isDark
                        ? isExpanded
                          ? `0 25px 60px rgba(0, 0, 0, 0.75), 0 0 30px ${exp.accent || "#10b981"}33, inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)`
                          : "0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)"
                        : isExpanded
                          ? `0 20px 50px rgba(16, 185, 129, 0.15), 0 0 20px ${exp.accent || "#10b981"}22`
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
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }} onClick={(e) => e.stopPropagation()}>
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

                    {/* Expand / Collapse Interactive Trigger Banner */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: `1px solid ${cardBorder}`,
                        paddingTop: "0.85rem",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: isExpanded ? (exp.accent || "#10b981") : textMain,
                          transition: "color 0.2s ease",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                            fontSize: "0.75rem",
                          }}
                        >
                          ▶
                        </span>
                        <span>{isExpanded ? "Hide Deliverables & Tech Stack" : "Click to view contributions & tech stack"}</span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.68rem",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "6px",
                            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                            border: `1px solid ${cardBorder}`,
                            color: textMuted,
                          }}
                        >
                          {exp.highlights?.length || 0} Highlights
                        </span>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.68rem",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "6px",
                            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                            border: `1px solid ${cardBorder}`,
                            color: textMuted,
                          }}
                        >
                          {exp.skills?.length || 0} Tech Skills
                        </span>
                      </div>
                    </div>

                    {/* Expandable Content Area (Only revealed when isExpanded === true) */}
                    {isExpanded && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1.25rem",
                          borderTop: `1px solid ${cardBorder}`,
                          paddingTop: "1.25rem",
                          animation: "fadeIn 0.3s ease-out forwards",
                        }}
                      >
                        {/* Bullet Highlights */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
                    )}
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
