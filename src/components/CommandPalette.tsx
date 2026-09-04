import { useState, useEffect, useRef } from "react";
import { soundManager } from "./SoundFX";
import { ProjectItem } from "../hooks/usePortfolioStore";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  projects: ProjectItem[];
  personalInfo: {
    name: string;
    email: string;
    resumeUrl: string;
    github: string;
    linkedin: string;
  };
}

export default function CommandPalette({
  isOpen,
  onClose,
  isDark,
  toggleTheme,
  projects,
  personalInfo,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      soundManager.playClick(700, 0.05);
    }
  }, [isOpen]);

  // Keyboard navigation & Shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open trigger
          const btn = document.getElementById("cmd-palette-trigger");
          if (btn) btn.click();
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const defaultActions = [
    {
      id: "sec-about",
      category: "Navigation",
      label: "Jump to About Section",
      icon: "👤",
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "sec-experience",
      category: "Navigation",
      label: "Jump to Experience & Track",
      icon: "💼",
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "sec-projects",
      category: "Navigation",
      label: "Jump to Projects & Systems",
      icon: "🚀",
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "sec-skills",
      category: "Navigation",
      label: "Jump to Skills Matrix",
      icon: "⚡",
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "sec-certifications",
      category: "Navigation",
      label: "Jump to Certifications",
      icon: "📜",
      action: () => {
        document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "sec-stats",
      category: "Navigation",
      label: "Jump to Competitive Programming & Live Stats",
      icon: "📊",
      action: () => {
        document.getElementById("competitive")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "sec-contact",
      category: "Navigation",
      label: "Jump to Contact",
      icon: "📫",
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "action-theme",
      category: "Theme",
      label: `Switch to ${isDark ? "Light" : "Dark"} Mode`,
      icon: isDark ? "☀️" : "🌙",
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: "action-sound",
      category: "System",
      label: `Sound Effects (${soundManager.isMuted ? "Disabled · Turn ON" : "Enabled · Turn OFF"})`,
      icon: soundManager.isMuted ? "🔇" : "🔊",
      action: () => {
        soundManager.toggleMute();
        onClose();
      },
    },
    {
      id: "action-resume",
      category: "Documents",
      label: "View / Download Official Resume (PDF)",
      icon: "📄",
      action: () => {
        if (personalInfo.resumeUrl) {
          window.open(personalInfo.resumeUrl, "_blank");
        }
        onClose();
      },
    },
    {
      id: "action-github",
      category: "Social",
      label: "Visit GitHub Profile",
      icon: "🐙",
      action: () => {
        if (personalInfo.github) window.open(personalInfo.github, "_blank");
        onClose();
      },
    },
    {
      id: "action-linkedin",
      category: "Social",
      label: "Connect on LinkedIn",
      icon: "💼",
      action: () => {
        if (personalInfo.linkedin) window.open(personalInfo.linkedin, "_blank");
        onClose();
      },
    },
  ];

  // Project search actions
  const projectActions = (projects || []).map((p) => ({
    id: `proj-${p.id}`,
    category: "Projects",
    label: `Open ${p.title} (${p.category || "Full-Stack"})`,
    icon: "💻",
    action: () => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      onClose();
    },
  }));

  const allItems = [...defaultActions, ...projectActions];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      soundManager.playHover();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      soundManager.playHover();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        soundManager.playClick();
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: isDark ? "rgba(2, 10, 7, 0.85)" : "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(2rem, 8vh, 6rem) 1.25rem",
        animation: "widgetPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 620,
          background: isDark ? "rgba(6, 20, 15, 0.94)" : "rgba(255, 255, 255, 0.96)",
          border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(99, 102, 241, 0.25)"}`,
          borderRadius: "24px",
          boxShadow: isDark
            ? "0 30px 90px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)"
            : "0 25px 70px rgba(99, 102, 241, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1.2rem 1.4rem",
            borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`,
            gap: "0.85rem",
          }}
        >
          <span style={{ fontSize: "1.2rem", color: isDark ? "#34d399" : "#6366f1" }}>⚡</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInList}
            placeholder="Type a command or search sections, projects, documents..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.05rem",
              color: isDark ? "#ffffff" : "#0f172a",
              fontWeight: 600,
            }}
          />
          <kbd
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
              padding: "0.2rem 0.55rem",
              borderRadius: "6px",
              color: isDark ? "#94a3b8" : "#64748b",
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)"}`,
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Action Results List */}
        <div style={{ maxHeight: 380, overflowY: "auto", padding: "0.6rem" }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: isDark ? "#94a3b8" : "#64748b" }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", margin: 0 }}>No matching commands found</p>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", opacity: 0.7 }}>
                Try searching for 'about', 'skills', 'theme', or 'projects'
              </span>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    borderRadius: "14px",
                    cursor: "pointer",
                    background: isSelected
                      ? isDark
                        ? "rgba(52, 211, 153, 0.14)"
                        : "rgba(99, 102, 241, 0.1)"
                      : "transparent",
                    border: isSelected
                      ? `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(99, 102, 241, 0.25)"}`
                      : "1px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected
                          ? isDark
                            ? "#ffffff"
                            : "#0f172a"
                          : isDark
                            ? "#cbd5e1"
                            : "#334155",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        color: isDark ? "#6ee7b7" : "#4f46e5",
                        background: isDark ? "rgba(52, 211, 153, 0.08)" : "rgba(99, 102, 241, 0.08)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "6px",
                        fontWeight: 600,
                      }}
                    >
                      {item.category}
                    </span>
                    {isSelected && (
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.68rem",
                          color: isDark ? "#34d399" : "#6366f1",
                        }}
                      >
                        ↵
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: "0.75rem 1.25rem",
            background: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.03)",
            borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: isDark ? "#64748b" : "#94a3b8" }}>
              ↑↓ Navigate
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: isDark ? "#64748b" : "#94a3b8" }}>
              ↵ Select
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: isDark ? "#64748b" : "#94a3b8" }}>
              ESC Close
            </span>
          </div>

          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: isDark ? "#34d399" : "#4f46e5", fontWeight: 700 }}>
            ⚡ Antigravity Core
          </span>
        </div>
      </div>
    </div>
  );
}
