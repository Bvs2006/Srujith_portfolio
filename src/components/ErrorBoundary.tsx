import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#05050a",
            color: "#f1f0f7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div
            style={{
              background: "rgba(15, 14, 28, 0.9)",
              border: "1px solid rgba(99, 102, 241, 0.35)",
              borderRadius: "24px",
              padding: "3rem 2rem",
              maxWidth: "540px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
            }}
          >
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>⚡</span>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#ffffff",
                margin: "0 0 0.5rem 0",
              }}
            >
              Recovering Portfolio View
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 1.75rem 0" }}>
              A temporary display error was caught. Click below to refresh with verified baseline parameters.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "0.9rem 2rem",
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
              }}
            >
              Reset Cache & Reload →
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
