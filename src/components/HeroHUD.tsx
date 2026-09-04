import { useState, useEffect } from "react";
import Card3D from "./Card3D";

interface HeroHUDProps {
  isDark?: boolean;
  name?: string;
  cgpa?: string;
  problemsCount?: string;
}

export default function HeroHUD({
  isDark = true,
  name = "Srujith",
  cgpa = "8.87",
  problemsCount = "674",
}: HeroHUDProps) {
  const [activeTab, setActiveTab] = useState<"ai" | "cp" | "code">("ai");
  const [lossValue, setLossValue] = useState(0.124);
  const [fps, setFps] = useState(60);

  // Simulated live training telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLossValue((prev) => Math.max(0.082, +(prev - 0.001 * (Math.random() - 0.4)).toFixed(4)));
      setFps(Math.floor(58 + Math.random() * 4));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const cardBg = isDark
    ? "linear-gradient(145deg, rgba(10, 24, 18, 0.92) 0%, rgba(4, 12, 9, 0.96) 100%)"
    : "linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(243, 244, 255, 0.9) 100%)";
  const textMain = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";

  return (
    <Card3D maxTilt={15} accentColor={isDark ? "#10b981" : "#059669"} isDark={isDark} style={{ width: "100%", maxWidth: 540 }}>
      <div
        style={{
          background: cardBg,
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(16, 185, 129, 0.22)"}`,
          borderRadius: "26px",
          padding: "1.75rem",
          boxShadow: isDark
            ? "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(16, 185, 129, 0.2), inset 0 1px 1px 0 rgba(52, 211, 153, 0.25)"
            : "0 20px 50px rgba(16, 185, 129, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Terminal Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, paddingBottom: "0.85rem" }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px rgba(239, 68, 68, 0.6)" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 6px rgba(245, 158, 11, 0.6)" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)" }} />
            <span style={{ marginLeft: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: isDark ? "#6ee7b7" : textMuted, fontWeight: 600 }}>
              bvs-core@engine:~$
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#34d399", fontWeight: 700 }}>
              {fps} FPS · LIVE
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "0.5rem", background: isDark ? "rgba(0, 0, 0, 0.35)" : "rgba(16, 185, 129, 0.06)", padding: "4px", borderRadius: "12px", border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.15)" : "rgba(0, 0, 0, 0.05)"}` }}>
          {[
            { id: "ai", label: "Neural Pipeline", icon: "🧠" },
            { id: "cp", label: "Algorithmic Radar", icon: "⚡" },
            { id: "code", label: "Core Kernel", icon: "💻" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "ai" | "cp" | "code")}
              style={{
                flex: 1,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? "#ffffff" : textMuted,
                background: activeTab === tab.id ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "transparent",
                border: "none",
                borderRadius: "8px",
                padding: "0.45rem 0.6rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: activeTab === tab.id ? "0 4px 15px rgba(99, 102, 241, 0.45)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: AI / Neural Pipeline */}
        {activeTab === "ai" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div style={{ background: isDark ? "rgba(99, 102, 241, 0.06)" : "rgba(99, 102, 241, 0.04)", borderRadius: "14px", padding: "0.85rem", border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(0, 0, 0, 0.06)"}` }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Model Accuracy</span>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.45rem", fontWeight: 800, color: "#818cf8", margin: "2px 0 0 0" }}>88.4%</p>
                <span style={{ fontSize: "0.58rem", color: textMuted, fontFamily: "'JetBrains Mono', monospace" }}>IMDb 50k TF-IDF Pipeline</span>
              </div>
              <div style={{ background: isDark ? "rgba(6, 182, 212, 0.06)" : "rgba(6, 182, 212, 0.04)", borderRadius: "14px", padding: "0.85rem", border: `1px solid ${isDark ? "rgba(6, 182, 212, 0.2)" : "rgba(0, 0, 0, 0.06)"}` }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Cross-Entropy Loss</span>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.45rem", fontWeight: 800, color: "#06b6d4", margin: "2px 0 0 0" }}>{lossValue}</p>
                <span style={{ fontSize: "0.58rem", color: textMuted, fontFamily: "'JetBrains Mono', monospace" }}>Convergence Verified</span>
              </div>
            </div>

            {/* Neural Topology Visualizer Bar */}
            <div style={{ background: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(241, 245, 249, 0.8)", borderRadius: "14px", padding: "1rem", border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: isDark ? "#a5b4fc" : "#4f46e5", fontWeight: 700 }}>Dense Feature Layers (NLP / Scikit)</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#34d399" }}>Active</span>
              </div>
              <div style={{ display: "flex", gap: "4px", height: "24px", alignItems: "flex-end" }}>
                {[65, 82, 45, 95, 78, 88, 92, 70, 85, 90, 94, 88].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: `linear-gradient(to top, #6366f1, ${i % 2 === 0 ? "#06b6d4" : "#a855f7"})`,
                      borderRadius: "3px",
                      opacity: 0.85,
                      boxShadow: "0 0 8px rgba(99, 102, 241, 0.35)",
                      transition: "height 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Algorithmic Radar */}
        {activeTab === "cp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { name: "LeetCode", solved: "360 Solved", rating: "1451 Rating", color: "#f59e0b", pct: 85 },
              { name: "CodeChef", solved: "208 Solved", rating: "1247 Rating", color: "#06b6d4", pct: 72 },
              { name: "GeeksForGeeks", solved: "58 Solved", rating: "162 Score", color: "#10b981", pct: 55 },
              { name: "HackerRank", solved: "48 Solved", rating: "5 Gold/★ Badges", color: "#a855f7", pct: 65 },
            ].map((p) => (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: textMain }}>{p.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: p.color, fontWeight: 700 }}>{p.solved} · {p.rating}</span>
                </div>
                <div style={{ height: 6, background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p.pct}%`, background: p.color, borderRadius: 999, boxShadow: `0 0 8px ${p.color}` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Interactive Python Kernel */}
        {activeTab === "code" && (
          <div
            style={{
              background: isDark ? "#090814" : "#1e1e2e",
              borderRadius: "14px",
              padding: "1rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              lineHeight: 1.6,
              color: "#e2e8f0",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              overflowX: "auto",
            }}
          >
            <p style={{ margin: 0, color: "#94a3b8" }}># Sentiment NLP Pipeline</p>
            <p style={{ margin: 0 }}>
              <span style={{ color: "#f43f5e" }}>from</span> <span style={{ color: "#38bdf8" }}>sklearn.feature_extraction.text</span> <span style={{ color: "#f43f5e" }}>import</span> TfidfVectorizer
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: "#f43f5e" }}>from</span> <span style={{ color: "#38bdf8" }}>sklearn.linear_model</span> <span style={{ color: "#f43f5e" }}>import</span> LogisticRegression
            </p>
            <p style={{ margin: "4px 0 0 0" }}>
              clf = LogisticRegression(solver=<span style={{ color: "#a5b4fc" }}>"lbfgs"</span>, max_iter=<span style={{ color: "#f59e0b" }}>1000</span>)
            </p>
            <p style={{ margin: 0 }}>
              clf.fit(X_train_tfidf, y_train) <span style={{ color: "#10b981" }}># 88.4% Acc ✓</span>
            </p>
          </div>
        )}

        {/* Bottom Micro-Status Indicators */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, paddingTop: "0.85rem", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", color: textMuted }}>
          <span>👤 {name}</span>
          <span>🎓 CGPA: {cgpa}</span>
          <span style={{ color: "#06b6d4", fontWeight: 700 }}>⚡ {problemsCount} Solved</span>
        </div>
      </div>
    </Card3D>
  );
}
