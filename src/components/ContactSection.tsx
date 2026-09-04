import { useState } from "react";
import Card3D from "./Card3D";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  leetcode?: string;
  codechef?: string;
  location?: string;
}

interface ContactSectionProps {
  personalInfo: PersonalInfo;
  isDark: boolean;
  cardBg: string;
  cardBorder: string;
  textMain: string;
  textMuted: string;
}

const TOPICS = [
  { id: "project", label: "💼 Project Inquiry", subjectPrefix: "[Project Inquiry]" },
  { id: "job", label: "🚀 Job / Internship", subjectPrefix: "[Job Opportunity]" },
  { id: "collab", label: "🤝 Collaboration", subjectPrefix: "[Collaboration]" },
  { id: "chat", label: "💬 Quick Chat", subjectPrefix: "[General Inquiry]" },
];

export default function ContactSection({
  personalInfo,
  isDark,
  cardBg,
  cardBorder,
  textMain,
  textMuted,
}: ContactSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].id);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const activeTopic = TOPICS.find((t) => t.id === selectedTopic) || TOPICS[0];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatusFeedback("⚠️ Please write a message before sending.");
      setTimeout(() => setStatusFeedback(null), 3000);
      return;
    }

    const fullSubject = subject.trim()
      ? `${activeTopic.subjectPrefix} ${subject}`
      : `${activeTopic.subjectPrefix} Message from ${senderName.trim() || "Visitor"}`;

    const fullBody = `Hi ${personalInfo.name},\n\n${message.trim()}\n\n---\nFrom: ${senderName.trim() || "Anonymous"}\nContact Email: ${senderEmail.trim() || "Not provided"}\nTopic: ${activeTopic.label}`;

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(fullBody)}`;

    window.location.href = mailtoUrl;

    setStatusFeedback("🚀 Email composer opened! Check your mail app to hit send.");
    setTimeout(() => setStatusFeedback(null), 5000);
  };

  const handleCopyFormattedMessage = () => {
    if (!message.trim()) {
      setStatusFeedback("⚠️ Please type your message first.");
      setTimeout(() => setStatusFeedback(null), 3000);
      return;
    }

    const fullSubject = subject.trim()
      ? `${activeTopic.subjectPrefix} ${subject}`
      : `${activeTopic.subjectPrefix} Message from ${senderName.trim() || "Visitor"}`;

    const formattedText = `To: ${personalInfo.email}\nSubject: ${fullSubject}\n\nHi ${personalInfo.name},\n\n${message.trim()}\n\n---\nFrom: ${senderName.trim() || "Anonymous"}\nEmail: ${senderEmail.trim() || "Not provided"}`;

    navigator.clipboard.writeText(formattedText);
    setMessageCopied(true);
    setStatusFeedback("📋 Formatted message copied to clipboard!");
    setTimeout(() => {
      setMessageCopied(false);
      setStatusFeedback(null);
    }, 4000);
  };

  const handleClear = () => {
    setSenderName("");
    setSenderEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <section id="contact" style={{ padding: "clamp(4.5rem, 8vh, 6rem) clamp(1rem, 4vw, 6rem) 5rem", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#10b981", letterSpacing: "0.2em", fontWeight: 700 }}>
            06
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(16, 185, 129, 0.5), transparent)" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: textMuted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Get in Touch
          </span>
        </div>

        {/* 2-Column Responsive Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {/* Left Column: Direct Info & Social Channels */}
          <Card3D maxTilt={6} accentColor="#10b981" isDark={isDark}>
            <div
              style={{
                height: "100%",
                background: cardBg,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.25)" : "rgba(16, 185, 129, 0.2)"}`,
                borderRadius: "28px",
                padding: "clamp(1.75rem, 4vw, 3rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: isDark
                  ? "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.12)"
                  : "0 20px 50px rgba(16, 185, 129, 0.08)",
              }}
            >
              <div>
                {/* Live Availability Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: isDark ? "rgba(16, 185, 129, 0.14)" : "rgba(16, 185, 129, 0.08)",
                    border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.35)" : "rgba(16, 185, 129, 0.25)"}`,
                    borderRadius: "999px",
                    padding: "0.35rem 0.9rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
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
                      letterSpacing: "0.06em",
                      color: isDark ? "#6ee7b7" : "#047857",
                      fontWeight: 600,
                    }}
                  >
                    Open to Opportunities · Fast Response
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                    fontWeight: 900,
                    lineHeight: 1.06,
                    color: textMain,
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Let's build something{" "}
                  <span
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, #34d399 0%, #06b6d4 50%, #818cf8 100%)"
                        : "linear-gradient(135deg, #059669 0%, #0284c7 50%, #4f46e5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    extraordinary
                  </span>
                  .
                </h2>

                <p
                  style={{
                    color: textMuted,
                    fontSize: "1rem",
                    lineHeight: 1.65,
                    marginBottom: "2rem",
                  }}
                >
                  Have an internship, full-time role, freelance project, or collaboration in mind? Send me a message using the form or reach out directly via email.
                </p>

                {/* Info Cards Grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                  {/* Email row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      padding: "0.85rem 1.15rem",
                      borderRadius: "16px",
                      background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(16, 185, 129, 0.04)",
                      border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(16, 185, 129, 0.15)"}`,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <span style={{ fontSize: "1.2rem" }}>✉️</span>
                      <div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: textMuted, textTransform: "uppercase" }}>
                          Direct Email
                        </div>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: isDark ? "#6ee7b7" : "#047857",
                            textDecoration: "none",
                            wordBreak: "break-all",
                          }}
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(personalInfo.email);
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 2400);
                      }}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        background: emailCopied
                          ? (isDark ? "rgba(16, 185, 129, 0.25)" : "rgba(16, 185, 129, 0.15)")
                          : (isDark ? "rgba(255, 255, 255, 0.08)" : "#ffffff"),
                        color: emailCopied ? (isDark ? "#34d399" : "#059669") : textMain,
                        border: `1px solid ${emailCopied ? (isDark ? "#34d399" : "#059669") : cardBorder}`,
                        borderRadius: "10px",
                        padding: "0.45rem 0.85rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>{emailCopied ? "✓" : "📋"}</span>
                      <span>{emailCopied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>

                  {/* Location row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.85rem 1.15rem",
                      borderRadius: "16px",
                      background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(16, 185, 129, 0.04)",
                      border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(16, 185, 129, 0.15)"}`,
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>📍</span>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: textMuted, textTransform: "uppercase" }}>
                        Location
                      </div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.92rem", fontWeight: 700, color: textMain }}>
                        {personalInfo.location || "Andhra Pradesh, India"} (Open to Relocation & Remote)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 600 }}>
                  Profiles & Repositories
                </div>
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                  {personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        background: isDark ? "rgba(255, 255, 255, 0.06)" : "#ffffff",
                        color: textMain,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "12px",
                        padding: "0.6rem 1.1rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <span>💼</span> LinkedIn ↗
                    </a>
                  )}
                  {personalInfo.github && (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        background: isDark ? "rgba(255, 255, 255, 0.06)" : "#ffffff",
                        color: textMain,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "12px",
                        padding: "0.6rem 1.1rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <span>🐙</span> GitHub ↗
                    </a>
                  )}
                  {personalInfo.leetcode && (
                    <a
                      href={personalInfo.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        background: isDark ? "rgba(255, 255, 255, 0.06)" : "#ffffff",
                        color: textMain,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "12px",
                        padding: "0.6rem 1.1rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <span>⚡</span> LeetCode ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card3D>

          {/* Right Column: Interactive Contact Form & Text Area */}
          <Card3D maxTilt={6} accentColor="#10b981" isDark={isDark}>
            <form
              onSubmit={handleSendEmail}
              style={{
                height: "100%",
                background: cardBg,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.25)" : "rgba(16, 185, 129, 0.2)"}`,
                borderRadius: "28px",
                padding: "clamp(1.75rem, 4vw, 3rem)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                boxShadow: isDark
                  ? "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.12)"
                  : "0 20px 50px rgba(16, 185, 129, 0.08)",
              }}
            >
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.35rem", fontWeight: 800, color: textMain, marginBottom: "0.25rem" }}>
                  Send a Direct Message ✉️
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: textMuted }}>
                  Fill out the details below to dispatch an email directly to my inbox.
                </div>
              </div>

              {/* Topic Selector Chips */}
              <div>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", fontWeight: 600 }}>
                  Inquiry Type
                </label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {TOPICS.map((topic) => {
                    const isSelected = selectedTopic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopic(topic.id)}
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          padding: "0.45rem 0.85rem",
                          borderRadius: "10px",
                          border: isSelected
                            ? "1px solid #10b981"
                            : `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                          background: isSelected
                            ? (isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.12)")
                            : (isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff"),
                          color: isSelected ? (isDark ? "#34d399" : "#059669") : textMuted,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", fontWeight: 600 }}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                      border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"}`,
                      color: textMain,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#10b981";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", fontWeight: 600 }}>
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                      border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"}`,
                      color: textMain,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#10b981";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="contact-subject" style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", fontWeight: 600 }}>
                  Subject (Optional)
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Frontend Internship / Full-Stack Project Collaboration"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"}`,
                    color: textMain,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#10b981";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message Text Area */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label htmlFor="contact-message" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: textMuted, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                    Your Message *
                  </label>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted }}>
                    {message.length} chars
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Srujith, I came across your portfolio and would like to discuss..."
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    borderRadius: "14px",
                    background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"}`,
                    color: textMain,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    outline: "none",
                    resize: "vertical",
                    minHeight: 110,
                    boxSizing: "border-box",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#10b981";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Status Alert Toast */}
              {statusFeedback && (
                <div
                  style={{
                    padding: "0.65rem 1rem",
                    borderRadius: "10px",
                    background: isDark ? "rgba(16, 185, 129, 0.18)" : "rgba(16, 185, 129, 0.12)",
                    border: "1px solid #10b981",
                    color: isDark ? "#6ee7b7" : "#047857",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  {statusFeedback}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", marginTop: "0.5rem" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    minWidth: 160,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "14px",
                    padding: "0.95rem 1.6rem",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>🚀</span> Send via Email ↗
                </button>

                <button
                  type="button"
                  onClick={handleCopyFormattedMessage}
                  title="Copy full message to paste in Gmail or Outlook"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    background: isDark ? "rgba(255, 255, 255, 0.07)" : "#ffffff",
                    color: messageCopied ? (isDark ? "#34d399" : "#059669") : textMain,
                    border: `1px solid ${messageCopied ? "#10b981" : cardBorder}`,
                    borderRadius: "14px",
                    padding: "0.95rem 1.25rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{messageCopied ? "✓" : "📋"}</span>
                  <span>{messageCopied ? "Copied!" : "Copy Text"}</span>
                </button>

                {(senderName || senderEmail || subject || message) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      color: textMuted,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.5rem 0.75rem",
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
