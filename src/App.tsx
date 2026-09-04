import { useState, useEffect, useRef } from "react";
import ParticleCanvas from "./components/ParticleCanvas";
import Card3D from "./components/Card3D";
import WelcomeScreen from "./components/WelcomeScreen";
import DateTimeWidget from "./components/DateTimeWidget";
import ThemeToggle from "./components/ThemeToggle";
import LiveProfiles from "./components/LiveProfiles";
import AdminDashboard from "./components/AdminDashboard";
import AdminAuthModal from "./components/AdminAuthModal";
import HeroHUD from "./components/HeroHUD";
import NeuralGlobe3D from "./components/NeuralGlobe3D";
import HoloCard from "./components/HoloCard";
import ExperienceSection from "./components/ExperienceSection";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import BackToTop from "./components/BackToTop";
import ContactSection from "./components/ContactSection";
import { usePortfolioStore, ProjectItem, CertItem } from "./hooks/usePortfolioStore";
import { useTheme } from "./hooks/useTheme";

// ── Navigation Items ──────────────────────────────────────────────────────────
const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "competitive", label: "Live Stats" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Full-Stack Software Engineer",
  "AI & ML Systems Integrator",
  "Competitive Programmer (670+ Solved)",
  "Next.js, TypeScript & PostgreSQL",
];

export default function App() {
  const store = usePortfolioStore();
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [skillSearch, setSkillSearch] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  // Typewriter rotating roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Stealth URL-only Admin routing (/admin or #admin)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path.includes("/admin") || hash.includes("admin") || search.includes("admin=true");
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("portfolio_admin_auth") === "true";
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      setIsAdmin(path.includes("/admin") || hash.includes("admin") || search.includes("admin=true"));
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  // Typewriter effect loop
  useEffect(() => {
    const currentFull = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (typedText.length < currentFull.length) {
        timeout = setTimeout(() => {
          setTypedText(currentFull.slice(0, typedText.length + 1));
        }, 55);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentFull.slice(0, typedText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleExitAdmin = () => {
    setIsAdmin(false);
    if (window.location.hash.includes("admin")) {
      window.location.hash = "";
    } else {
      window.history.pushState(null, "", "/");
    }
  };

  if (isAdmin) {
    if (!isAdminAuthenticated) {
      return (
        <AdminAuthModal
          onSuccess={() => setIsAdminAuthenticated(true)}
          onCancel={handleExitAdmin}
        />
      );
    }
    return <AdminDashboard onExit={handleExitAdmin} />;
  }

  const { personalInfo, projects, certs, skills } = store;

  // Theme dynamic colors
  const bgMain = isDark ? "#040806" : "#f8f9fc";
  const textMain = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const cardBg = isDark ? "rgba(8, 20, 16, 0.8)" : "rgba(255, 255, 255, 0.88)";
  const cardBorder = isDark ? "rgba(52, 211, 153, 0.16)" : "rgba(16, 185, 129, 0.15)";
  const navBg = isDark
    ? scrolled ? "rgba(4, 8, 6, 0.9)" : "transparent"
    : scrolled ? "rgba(255, 255, 255, 0.92)" : "transparent";

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: bgMain,
        color: textMain,
        overflowX: "hidden",
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.35s ease, color 0.35s ease",
      }}
    >
      {/* 3D Particle Canvas */}
      <ParticleCanvas isDark={isDark} />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "-10%",
          left: "15%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 1,
          animation: "pulseGlow 12s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "45%",
          right: "-5%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(52, 211, 153, 0.14) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 1,
          animation: "pulseGlow 14s ease-in-out infinite 3s",
        }}
      />

      {/* ── Top Glowing Scroll Progress Bar ── */}
      <ScrollProgress isDark={isDark} />

      {/* ── Interactive Cursor Spotlight Glow ── */}
      <CursorGlow isDark={isDark} />

      {/* ── Back to Top Floating Button with Progress Ring ── */}
      <BackToTop isDark={isDark} />

      {/* ── Welcome Screen ── */}
      {showWelcome && (
        <WelcomeScreen
          name={personalInfo.name}
          title={personalInfo.title}
          cgpa={personalInfo.cgpa}
          problemsCount={personalInfo.problemsCount}
          university={personalInfo.university}
          isDark={isDark}
          onEnter={() => setShowWelcome(false)}
        />
      )}

      {/* ── Live Date & Time Bottom Button ── */}
      <DateTimeWidget email={personalInfo.email} isDark={isDark} />

      {/* ── Certificate Preview Modal ── */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: isDark ? "rgba(5, 5, 10, 0.88)" : "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            animation: "widgetPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark ? "rgba(15, 14, 28, 0.95)" : "#ffffff",
              border: `2px solid ${selectedCert.color}`,
              borderRadius: "28px",
              maxWidth: "560px",
              width: "100%",
              padding: "2.25rem",
              boxShadow: `0 25px 80px rgba(0,0,0,0.8), 0 0 50px ${selectedCert.color}33`,
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedCert(null)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                color: isDark ? "#ffffff" : "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "20px",
                  background: `${selectedCert.color}22`,
                  border: `2px solid ${selectedCert.color}66`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                {selectedCert.icon}
              </div>
              <div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: selectedCert.color, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                  {selectedCert.issuer} · {selectedCert.year}
                </span>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: textMain, margin: "4px 0 0 0" }}>
                  {selectedCert.name}
                </h3>
              </div>
            </div>

            <div style={{ background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(99, 102, 241, 0.04)", borderRadius: "16px", padding: "1.25rem", border: `1px solid ${cardBorder}` }}>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace", color: textMuted }}>
                Credential Verification & Drive Access:
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: textMain, lineHeight: 1.5 }}>
                {selectedCert.credentialUrl
                  ? "This credential has an official Google Drive document link attached. Click below to view or verify."
                  : "Credential verification registered. Attach a Google Drive link in /admin to display direct view."}
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              {selectedCert.credentialUrl ? (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textAlign: "center",
                    background: `linear-gradient(135deg, ${selectedCert.color} 0%, #06b6d4 100%)`,
                    color: "#ffffff",
                    padding: "0.95rem 1.5rem",
                    borderRadius: "14px",
                    textDecoration: "none",
                    boxShadow: `0 8px 25px ${selectedCert.color}44`,
                  }}
                >
                  Open Certificate Document (Drive) ↗
                </a>
              ) : (
                <button
                  onClick={() => alert("Add your certificate drive link in /admin to view it instantly!")}
                  style={{
                    flex: 1,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    background: "rgba(99, 102, 241, 0.1)",
                    color: "#6366f1",
                    border: "none",
                    padding: "0.95rem",
                    borderRadius: "14px",
                    cursor: "pointer",
                  }}
                >
                  Add Drive Link in /admin
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Project Detail Modal ── */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: isDark ? "rgba(5, 5, 10, 0.88)" : "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            animation: "widgetPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark ? "rgba(15, 14, 28, 0.95)" : "#ffffff",
              border: `2px solid ${selectedProject.accent}`,
              borderRadius: "28px",
              maxWidth: "680px",
              width: "100%",
              overflow: "hidden",
              boxShadow: `0 25px 80px rgba(0,0,0,0.8), 0 0 50px ${selectedProject.accent}33`,
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ position: "relative", height: "260px", background: "#111022", flexShrink: 0 }}>
              <img
                src={selectedProject.img}
                alt={selectedProject.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(5, 5, 10, 0.8)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
              <span
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: selectedProject.accent,
                  background: isDark ? "rgba(15, 14, 28, 0.9)" : "rgba(255, 255, 255, 0.9)",
                  border: `1px solid ${selectedProject.accent}66`,
                  padding: "0.3rem 0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "8px",
                }}
              >
                {selectedProject.tag}
              </span>
            </div>

            <div style={{ padding: "2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.9rem", fontWeight: 800, color: textMain, margin: 0 }}>
                {selectedProject.name}
              </h3>

              <p style={{ color: textMuted, fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                {selectedProject.details || selectedProject.desc}
              </p>

              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#818cf8", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.6rem", fontWeight: 700 }}>
                  Architecture & Technologies
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {(selectedProject.stack || []).map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        color: textMain,
                        background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(99, 102, 241, 0.06)",
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "8px",
                        padding: "0.35rem 0.75rem",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.85rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.88rem",
                      background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                      color: "#ffffff",
                      padding: "0.85rem 1.75rem",
                      borderRadius: "12px",
                      textDecoration: "none",
                      fontWeight: 700,
                      boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                    }}
                  >
                    View Live Deployment ↗
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.88rem",
                      background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                      color: textMain,
                      border: `1px solid ${cardBorder}`,
                      padding: "0.85rem 1.75rem",
                      borderRadius: "12px",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    GitHub Repository ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TOP NAVIGATION ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          height: 70,
          padding: "0 clamp(1rem, 4vw, 3.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navBg,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${cardBorder}` : "none",
          transition: "all 0.35s ease",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 900,
            border: "none",
            background: "none",
            cursor: "pointer",
            letterSpacing: "-0.03em",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span className={isDark ? "gradient-logo-dark" : "gradient-logo-light"}>
            VSB
          </span>
          <span style={{ color: "#06b6d4" }}>.dev</span>
        </button>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }} className="hidden md:flex">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: activeSection === id ? (isDark ? "#a5b4fc" : "#4338ca") : textMuted,
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
                position: "relative",
                padding: "0.25rem 0",
                fontWeight: activeSection === id ? 700 : 500,
              }}
            >
              {label}
              {activeSection === id && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, #6366f1, #06b6d4)",
                    borderRadius: "999px",
                    boxShadow: "0 0 10px #6366f1",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons: Theme Toggle + Resume + Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Dark / Light Mode Toggle */}
          <ThemeToggle
            isDark={isDark}
            onToggle={toggleTheme}
          />

          {personalInfo.resumeUrl && (
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: isDark ? "#ffffff" : "#4338ca",
                background: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
                border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.45)" : "rgba(99, 102, 241, 0.3)"}`,
                borderRadius: "10px",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all 0.2s",
              }}
            >
              <span>📄</span> Resume
            </a>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              color: textMain,
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 70,
              left: 0,
              right: 0,
              background: isDark ? "rgba(6, 20, 15, 0.96)" : "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderBottom: `1px solid ${isDark ? "rgba(52, 211, 153, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
              borderRadius: "0 0 28px 28px",
              padding: "1.5rem clamp(1rem, 4vw, 2rem) 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: isDark ? "0 25px 60px rgba(0, 0, 0, 0.9)" : "0 20px 40px rgba(0, 0, 0, 0.15)",
              animation: "widgetPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Quick Action Pills in Mobile Menu */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", paddingBottom: "1rem", borderBottom: `1px solid ${cardBorder}` }}>
              <button
                onClick={() => toggleTheme()}
                style={{
                  flex: 1,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: textMain,
                  background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
                  border: `1px solid ${cardBorder}`,
                  borderRadius: "10px",
                  padding: "0.55rem 0.75rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                <span>{isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
              </button>

              {personalInfo.resumeUrl && (
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                    borderRadius: "10px",
                    padding: "0.55rem 0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.35rem",
                    textDecoration: "none",
                  }}
                >
                  <span>📄</span> CV
                </a>
              )}
            </div>

            {/* Nav Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {NAV.map(({ id, label }, i) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollTo(id);
                  }}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1rem",
                    fontWeight: activeSection === id ? 800 : 600,
                    color: activeSection === id ? (isDark ? "#34d399" : "#4f46e5") : textMain,
                    background: activeSection === id
                      ? (isDark ? "rgba(52, 211, 153, 0.12)" : "rgba(99, 102, 241, 0.08)")
                      : "transparent",
                    border: activeSection === id
                      ? `1px solid ${isDark ? "rgba(52, 211, 153, 0.3)" : "rgba(99, 102, 241, 0.2)"}`
                      : "1px solid transparent",
                    borderRadius: "12px",
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: textMuted }}>
                      0{i + 1}
                    </span>
                    <span>{label}</span>
                  </div>
                  {activeSection === id && (
                    <span style={{ fontSize: "0.8rem", color: isDark ? "#34d399" : "#6366f1" }}>●</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 3D HERO SECTION ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7.5rem clamp(1.5rem, 5vw, 6rem) 4rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3.5rem",
            alignItems: "center",
          }}
        >
          {/* Hero Typography */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: isDark ? "rgba(99, 102, 241, 0.12)" : "rgba(99, 102, 241, 0.08)",
                border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.35)" : "rgba(99, 102, 241, 0.25)"}`,
                borderRadius: "999px",
                padding: "0.4rem 1rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 10px #06b6d4" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: isDark ? "#e2e8f0" : "#4338ca", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                {personalInfo.title}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.8rem)",
                lineHeight: 1.05,
                fontWeight: 900,
                color: textMain,
                letterSpacing: "-0.03em",
                margin: "0 0 1rem 0",
              }}
            >
              Venkata <br />
              <span className={isDark ? "gradient-name-dark" : "gradient-name-light"}>
                Srujith
              </span> <br />
              Bellamkonda
            </h1>

            {/* Dynamic Typewriter Role Subtitle */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "1.25rem",
                minHeight: "28px",
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#34d399", fontWeight: 700 }}>
                &gt;
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
                  fontWeight: 700,
                  color: isDark ? "#38bdf8" : "#0284c7",
                  letterSpacing: "0.02em",
                }}
              >
                {typedText}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 18,
                  background: isDark ? "#34d399" : "#6366f1",
                  borderRadius: "2px",
                  animation: "pulseGlow 0.8s ease-in-out infinite",
                }}
              />
            </div>

            <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: textMuted, lineHeight: 1.75, maxWidth: 520, margin: "0 0 2.25rem 0" }}>
              {personalInfo.tagline}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => {
                  scrollTo("projects");
                }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "1rem 2.4rem",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(99, 102, 241, 0.45)",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(99, 102, 241, 0.65)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(99, 102, 241, 0.45)";
                }}
              >
                View Works ({projects.length}) →
              </button>

              {personalInfo.resumeUrl && (
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    background: isDark ? "rgba(255, 255, 255, 0.06)" : "#ffffff",
                    color: textMain,
                    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(99, 102, 241, 0.3)"}`,
                    borderRadius: "14px",
                    padding: "1rem 2rem",
                    textDecoration: "none",
                    transition: "all 0.25s",
                    boxShadow: isDark ? "none" : "0 4px 15px rgba(99, 102, 241, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#a5b4fc";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(99, 102, 241, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Download CV 📄
                </a>
              )}
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "1.25rem", marginTop: "3rem", alignItems: "center", flexWrap: "wrap" }}>
              {[
                { label: "GitHub", href: personalInfo.github },
                { label: "LinkedIn", href: personalInfo.linkedin },
                { label: "LeetCode", href: personalInfo.leetcode },
                { label: "Email", href: `mailto:${personalInfo.email}` },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: textMuted,
                    textDecoration: "none",
                    transition: "color 0.2s",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* 3D Levitating Profile Console */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card3D maxTilt={16} accentColor="#6366f1" isDark={isDark} style={{ maxWidth: 460, width: "100%" }}>
              <div
                style={{
                  background: cardBg,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.35)" : "rgba(99, 102, 241, 0.25)"}`,
                  borderRadius: "28px",
                  padding: "2rem",
                  boxShadow: isDark
                    ? "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(99, 102, 241, 0.25)"
                    : "0 25px 60px rgba(99, 102, 241, 0.12)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f43f5e" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.1em" }}>
                    srujith_core.sh
                  </span>
                </div>

                <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", marginBottom: "1.5rem", transform: "translateZ(25px)" }}>
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: "20px",
                      background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                      padding: "2px",
                      boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)",
                    }}
                  >
                    <img
                      src={personalInfo.github ? `${personalInfo.github}.png` : "https://github.com/Bvs2006.png"}
                      alt={personalInfo.name}
                      style={{ width: "100%", height: "100%", borderRadius: "18px", objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 800, color: textMain, margin: 0 }}>
                      {personalInfo.name}
                    </h3>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#38bdf8", margin: "2px 0 0 0" }}>
                      @{(personalInfo.university || "Aditya University").split(",")[0]}
                    </p>
                  </div>
                </div>

                {/* Code Snippet */}
                <div
                  style={{
                    background: isDark ? "rgba(5, 5, 10, 0.75)" : "rgba(241, 245, 249, 0.8)",
                    borderRadius: "16px",
                    padding: "1.1rem",
                    border: `1px solid ${cardBorder}`,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    lineHeight: 1.6,
                    transform: "translateZ(35px)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <p style={{ margin: 0, color: isDark ? "#a5b4fc" : "#4338ca" }}>
                    <span style={{ color: "#f43f5e" }}>const</span> engineer = {"{"}
                  </p>
                  <p style={{ margin: 0, paddingLeft: "1rem", color: textMain }}>
                    focus: <span style={{ color: "#0284c7" }}>"AI / ML & Systems"</span>,
                  </p>
                  <p style={{ margin: 0, paddingLeft: "1rem", color: textMain }}>
                    cgpa: <span style={{ color: "#f59e0b" }}>{personalInfo.cgpa}</span>,
                  </p>
                  <p style={{ margin: 0, paddingLeft: "1rem", color: textMain }}>
                    solvedProblems: <span style={{ color: "#10b981" }}>"{personalInfo.problemsCount}"</span>,
                  </p>
                  <p style={{ margin: 0, paddingLeft: "1rem", color: textMain }}>
                    status: <span style={{ color: "#06b6d4" }}>"Open for Roles"</span>,
                  </p>
                  <p style={{ margin: 0, color: isDark ? "#a5b4fc" : "#4338ca" }}>{"};"}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", transform: "translateZ(30px)" }}>
                  <div style={{ background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(99, 102, 241, 0.05)", borderRadius: "14px", padding: "0.85rem", border: `1px solid ${cardBorder}` }}>
                    <p style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: textMuted, margin: 0, textTransform: "uppercase" }}>Core Stack</p>
                    <p style={{ fontSize: "0.9rem", fontWeight: 800, color: isDark ? "#a5b4fc" : "#4338ca", margin: "4px 0 0 0", fontFamily: "'Outfit', sans-serif" }}>C++ · Py · React</p>
                  </div>
                  <div style={{ background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(99, 102, 241, 0.05)", borderRadius: "14px", padding: "0.85rem", border: `1px solid ${cardBorder}` }}>
                    <p style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: textMuted, margin: 0, textTransform: "uppercase" }}>Certifications</p>
                    <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#38bdf8", margin: "4px 0 0 0", fontFamily: "'Outfit', sans-serif" }}>{(certs || []).length} Credentials</p>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" style={{ padding: "clamp(4.5rem, 8vh, 6rem) clamp(1rem, 4vw, 6rem)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#6366f1", letterSpacing: "0.2em", fontWeight: 700 }}>
              01
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(99, 102, 241, 0.5), transparent)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              About & Background
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2.2rem, 4vw, 3.8rem)", fontWeight: 800, lineHeight: 1.08, color: textMain, marginBottom: "1.5rem" }}>
                Where algorithms <br />
                <span className="gradient-cyan">meet</span> the real world.
              </h2>
              <p style={{ color: textMuted, fontSize: "1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
                {personalInfo.bio1}
              </p>
              <p style={{ color: textMuted, fontSize: "1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                {personalInfo.bio2}
              </p>

              {/* Stat Chips */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.75rem" }}>
                {[
                  { v: personalInfo.cgpa, l: "CGPA", c: "#6366f1" },
                  { v: personalInfo.problemsCount, l: "Problems", c: "#06b6d4" },
                  { v: String(projects.length), l: "Projects", c: "#f43f5e" },
                  { v: personalInfo.class12Score || "95.8%", l: "Class XII", c: "#f59e0b" },
                ].map(({ v, l, c }) => (
                  <Card3D key={l} maxTilt={10} accentColor={c} isDark={isDark}>
                    <div
                      style={{
                        background: cardBg,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "16px",
                        padding: "1rem 0.5rem",
                        textAlign: "center",
                      }}
                    >
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.65rem", fontWeight: 800, color: c, margin: 0, lineHeight: 1 }}>
                        {v}
                      </p>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "6px 0 0 0", fontWeight: 600 }}>
                        {l}
                      </p>
                    </div>
                  </Card3D>
                ))}
              </div>
            </div>

              {/* Academic Journey Card */}
              <Card3D maxTilt={12} accentColor="#06b6d4" isDark={isDark}>
                <div
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${isDark ? "rgba(6, 182, 212, 0.3)" : "rgba(6, 182, 212, 0.25)"}`,
                    borderRadius: "28px",
                    padding: "2.25rem",
                    boxShadow: isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 50px rgba(6, 182, 212, 0.08)",
                  }}
                >
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: textMain, marginBottom: "1.5rem" }}>
                    Academic & Technical Path
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {[
                      { label: "University", value: personalInfo.university },
                      { label: "Degree Program", value: personalInfo.degree },
                      { label: "CGPA (Current)", value: personalInfo.cgpa },
                      { label: "Pre-University (XII)", value: personalInfo.class12 },
                      { label: "Competitive Stats", value: `${personalInfo.problemsCount} Solved across 6 Platforms` },
                      { label: "Primary Email", value: personalInfo.email },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}` }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                          {label}
                        </span>
                        <span style={{ fontSize: "0.88rem", color: textMain, fontWeight: 500, textAlign: "right" }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </section>

      {/* ── WORK EXPERIENCE SECTION ── */}
      <ExperienceSection experiences={store.experiences} isDark={isDark} />

      {/* ── PROJECTS SECTION ── */}
      <section id="projects" style={{ padding: "clamp(4.5rem, 8vh, 6rem) clamp(1rem, 4vw, 6rem)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#f43f5e", letterSpacing: "0.2em", fontWeight: 700 }}>
              03
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(244, 63, 94, 0.5), transparent)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Featured Systems & Works
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.08, color: textMain, margin: 0 }}>
                Things I've <span className="gradient-rose">built</span>
              </h2>
              <p style={{ color: textMuted, fontSize: "0.95rem", margin: "0.5rem 0 0 0" }}>
                Click any 3D card for deep-dive architecture breakdown and source code.
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", background: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.04)", padding: "4px", borderRadius: "14px", border: `1px solid ${cardBorder}` }}>
              {["All", "AI / ML", "Full Stack", "Systems", "Desktop"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setProjectFilter(cat);
                  }}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: projectFilter === cat ? 800 : 500,
                    color: projectFilter === cat ? "#ffffff" : textMuted,
                    background: projectFilter === cat ? "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)" : "transparent",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.4rem 0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: projectFilter === cat ? "0 4px 15px rgba(244, 63, 94, 0.45)" : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "2rem" }}>
            {((projects || []).filter((p) => {
              if (projectFilter === "All") return true;
              if (projectFilter === "AI / ML") return p.tag.includes("AI") || p.tag.includes("ML") || (p.stack || []).some((s) => s.toLowerCase().includes("python") || s.toLowerCase().includes("scikit") || s.toLowerCase().includes("nltk"));
              if (projectFilter === "Full Stack") return p.tag.includes("Full Stack") || (p.stack || []).some((s) => s.toLowerCase().includes("react") || s.toLowerCase().includes("node") || s.toLowerCase().includes("firebase"));
              if (projectFilter === "Systems") return p.tag.includes("Systems") || (p.stack || []).some((s) => s.toLowerCase().includes("c++"));
              if (projectFilter === "Desktop") return p.tag.includes("Desktop") || (p.stack || []).some((s) => s.toLowerCase().includes("java") || s.toLowerCase().includes("swing"));
              return true;
            })).map((p) => (
              <Card3D
                key={p.id}
                maxTilt={12}
                accentColor={p.accent || "#6366f1"}
                isDark={isDark}
                onClick={() => {
                  setSelectedProject(p);
                }}
                style={{ height: "100%" }}
              >
                <div
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: `1px solid ${p.accent || "#6366f1"}33`,
                    borderRadius: "26px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: isDark ? "0 20px 50px rgba(0, 0, 0, 0.6)" : "0 15px 40px rgba(99, 102, 241, 0.08)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Realistic Browser Window Bar */}
                  <div
                    style={{
                      background: isDark ? "rgba(0, 0, 0, 0.45)" : "rgba(241, 245, 249, 0.9)",
                      padding: "0.65rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`,
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ef4444" }} />
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#f59e0b" }} />
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981" }} />
                    </div>
                    <div
                      style={{
                        background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                        borderRadius: "999px",
                        padding: "0.15rem 0.75rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        color: textMuted,
                        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
                      }}
                    >
                      bvs://work/{p.id}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: p.accent || "#6366f1", fontWeight: 700 }}>↗</span>
                  </div>

                  {/* Image with subtle gradient overlay */}
                  <div style={{ position: "relative", height: "185px", overflow: "hidden", background: "#111022" }}>
                    <img
                      src={p.img}
                      alt={p.alt || p.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(to bottom, transparent 35%, rgba(15, 14, 28, 0.95) 100%)" : "linear-gradient(to bottom, transparent 35%, rgba(255, 255, 255, 0.95) 100%)" }} />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0.85rem",
                        left: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.62rem",
                        color: p.accent || "#6366f1",
                        background: isDark ? "rgba(15, 14, 28, 0.92)" : "rgba(255, 255, 255, 0.92)",
                        border: `1px solid ${p.accent || "#6366f1"}55`,
                        borderRadius: "8px",
                        padding: "0.25rem 0.75rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <div style={{ padding: "1.6rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.35rem", fontWeight: 800, color: textMain, margin: "0 0 0.5rem 0", letterSpacing: "-0.01em" }}>
                        {p.name}
                      </h3>
                      <p style={{ color: textMuted, fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                        {p.desc}
                      </p>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {(p.stack || []).map((s) => (
                        <span
                          key={s}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.65rem",
                            color: isDark ? "#cbd5e1" : "#475569",
                            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(99, 102, 241, 0.06)",
                            border: `1px solid ${cardBorder}`,
                            borderRadius: "6px",
                            padding: "0.22rem 0.55rem",
                            fontWeight: 500,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section id="skills" style={{ padding: "clamp(4.5rem, 8vh, 6rem) clamp(1rem, 4vw, 6rem)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#a855f7", letterSpacing: "0.2em", fontWeight: 700 }}>
              04
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(168, 85, 247, 0.5), transparent)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Technical Arsenal
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.08, color: textMain, margin: 0 }}>
                Skills & <span className="gradient-purple">Technologies</span>
              </h2>
              <p style={{ color: textMuted, fontSize: "0.95rem", margin: "0.5rem 0 0 0" }}>
                Production-tested tools, frameworks, algorithms, and infrastructure systems.
              </p>
            </div>

            {/* Skill Live Filter Input */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.04)", border: `1px solid ${cardBorder}`, padding: "0.45rem 1rem", borderRadius: "14px", width: "100%", maxWidth: 320 }}>
              <span style={{ fontSize: "0.9rem", color: isDark ? "#a855f7" : "#7c3aed" }}>🔍</span>
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Filter tech stack..."
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.85rem",
                  color: textMain,
                  width: "100%",
                }}
              />
              {skillSearch && (
                <button
                  onClick={() => setSkillSearch("")}
                  style={{ background: "none", border: "none", color: textMuted, cursor: "pointer", fontSize: "0.75rem" }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.75rem" }}>
            {Object.entries(skills || {}).map(([cat, items], idx) => {
              const categoryColors = ["#10b981", "#06b6d4", "#6366f1", "#a855f7", "#f59e0b", "#f43f5e"];
              const categoryIcons: Record<string, string> = {
                languages: "💻",
                frontend: "🌐",
                backend: "🗄️",
                "ai/ml": "🧠",
                tools: "🛠️",
                databases: "⚡",
              };
              const accent = categoryColors[idx % categoryColors.length];
              const icon = categoryIcons[cat.toLowerCase()] || "⚡";

              const filteredItems = (Array.isArray(items) ? items : []).filter((s) =>
                s.toLowerCase().includes(skillSearch.toLowerCase())
              );

              if (skillSearch && filteredItems.length === 0) return null;

              return (
                <Card3D key={cat} maxTilt={10} accentColor={accent} isDark={isDark}>
                  <div
                    style={{
                      background: cardBg,
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${accent}33`,
                      borderRadius: "24px",
                      padding: "1.75rem",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: isDark ? `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${accent}15` : "0 10px 30px rgba(99, 102, 241, 0.08)",
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: textMain, fontWeight: 800, margin: 0 }}>
                          {cat}
                        </p>
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: accent, background: `${accent}18`, border: `1px solid ${accent}33`, padding: "0.15rem 0.5rem", borderRadius: "6px", fontWeight: 700 }}>
                        {filteredItems.length} skills
                      </span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {filteredItems.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.72rem",
                            color: isDark ? "#ffffff" : "#0f172a",
                            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(99, 102, 241, 0.05)",
                            border: `1px solid ${cardBorder}`,
                            borderRadius: "8px",
                            padding: "0.35rem 0.75rem",
                            transition: "all 0.2s ease",
                            cursor: "default",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = accent;
                            e.currentTarget.style.background = `${accent}22`;
                            e.currentTarget.style.color = accent;
                            e.currentTarget.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = cardBorder;
                            e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(99, 102, 241, 0.05)";
                            e.currentTarget.style.color = isDark ? "#ffffff" : "#0f172a";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS SECTION (WITH DRIVE LINKS) ── */}
      <section id="certifications" style={{ padding: "clamp(4.5rem, 8vh, 6rem) clamp(1rem, 4vw, 6rem)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#f59e0b", letterSpacing: "0.2em", fontWeight: 700 }}>
              05
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(245, 158, 11, 0.5), transparent)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Verified Certifications & Drive Credentials
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.08, color: textMain, margin: 0 }}>
                Certifications & <span className="gradient-amber">Credentials</span>
              </h2>
              <p style={{ color: textMuted, fontSize: "0.95rem", margin: "0.5rem 0 0 0" }}>
                Click any certificate to view details or open the official attached Google Drive document directly.
              </p>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#f59e0b", background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)", padding: "0.35rem 0.85rem", borderRadius: "999px", fontWeight: 600 }}>
              {(certs || []).length} VERIFIED CREDENTIALS
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "1.5rem" }}>
            {(certs || []).map((cert) => (
              <HoloCard
                key={cert.id || cert.name}
                color={cert.color || "#f59e0b"}
                isDark={isDark}
                onClick={() => setSelectedCert(cert)}
                style={{ height: "100%" }}
              >
                <div
                  style={{
                    background: cardBg,
                    backdropFilter: "blur(24px)",
                    border: `1px solid ${cert.color}44`,
                    borderRadius: "24px",
                    padding: "1.6rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1.25rem",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem" }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "16px",
                        background: `${cert.color}22`,
                        border: `1.5px solid ${cert.color}66`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.6rem",
                        flexShrink: 0,
                        boxShadow: `0 0 15px ${cert.color}33`,
                      }}
                    >
                      {cert.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: cert.color, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
                        {cert.issuer} · {cert.year}
                      </p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: textMain, margin: 0, lineHeight: 1.35 }}>
                        {cert.name}
                      </p>
                    </div>
                  </div>

                  {/* Drive Badge Bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: `1px solid ${cardBorder}`,
                      paddingTop: "0.85rem",
                      marginTop: "auto",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        color: cert.credentialUrl ? "#10b981" : textMuted,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: 600,
                      }}
                    >
                      <span>{cert.credentialUrl ? "✓" : "●"}</span>
                      {cert.credentialUrl ? "Drive Document Attached" : "Verified Record"}
                    </span>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#ffffff",
                          background: `${cert.color}dd`,
                          border: `1px solid ${cert.color}66`,
                          borderRadius: "8px",
                          padding: "0.35rem 0.8rem",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.2s",
                          boxShadow: `0 4px 15px ${cert.color}44`,
                        }}
                      >
                        <span>📄</span> View ↗
                      </a>
                    )}
                  </div>
                </div>
              </HoloCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE COMPETITIVE SECTION ── */}
      <LiveProfiles isDark={isDark} />

      {/* ── CONTACT SECTION ── */}
      <ContactSection
        personalInfo={personalInfo}
        isDark={isDark}
        cardBg={cardBg}
        cardBorder={cardBorder}
        textMain={textMain}
        textMuted={textMuted}
      />

      {/* ── FOOTER ── */}
      <footer style={{ padding: "2rem clamp(1.5rem, 5vw, 6rem) 3.5rem", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", paddingTop: "2rem", borderTop: `1px solid ${cardBorder}` }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted }}>
            © {new Date().getFullYear()} {personalInfo.name} · All rights reserved.
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted }}>
            3D PERSPECTIVE · DARK & LIGHT MODE · MODERN TYPOGRAPHY
          </span>
        </div>
      </footer>
    </div>
  );
}
