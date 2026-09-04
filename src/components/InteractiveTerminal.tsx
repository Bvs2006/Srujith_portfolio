import { useState, useEffect } from "react";
import Card3D from "./Card3D";
import { soundManager } from "./SoundFX";

interface Snippet {
  id: string;
  name: string;
  lang: string;
  icon: string;
  color: string;
  code: string;
  output: string[];
}

const SNIPPETS: Snippet[] = [
  {
    id: "ai-sentiment",
    name: "SentimentModel.py",
    lang: "Python",
    icon: "🧠",
    color: "#10b981",
    code: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# 50k IMDb Dataset Training Pipeline
vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2))
X_train_vec = vectorizer.fit_transform(raw_reviews)
model = LogisticRegression(C=1.5, max_iter=200)
model.fit(X_train_vec, labels)

accuracy = model.score(X_test_vec, y_test)
print(f"Convergence verified. Accuracy: {accuracy * 100:.2f}%")`,
    output: [
      "[INFO] Loading IMDb 50k dataset...",
      "[TRAIN] Fitting TF-IDF Vectorizer (10,000 bi-gram features)...",
      "[OPTIM] Running L-BFGS optimizer (C=1.5)...",
      "[EVAL] Test Accuracy: 88.42% · Loss: 0.124",
      "[SUCCESS] Inference Pipeline ready · Latency: 4.2ms",
    ],
  },
  {
    id: "nextjs-action",
    name: "serverAction.ts",
    lang: "TypeScript",
    icon: "⚡",
    color: "#06b6d4",
    code: `'use server';
import { db } from "@/lib/postgres";
import { revalidatePath } from "next/cache";

export async function dispatchTelemetry(event: TelemetryPayload) {
  const result = await db.query(
    \`INSERT INTO event_stream (type, latency_ms, timestamp)
     VALUES ($1, $2, NOW()) RETURNING id, status\`,
    [event.type, event.latency]
  );
  revalidatePath('/dashboard');
  return { ok: true, eventId: result.rows[0].id };
}`,
    output: [
      "[POSTGRES] Pool connected to neon.tech instance",
      "[SERVER-ACTION] 'dispatchTelemetry' invoked",
      "[QUERY] INSERT INTO event_stream (latency: 18ms)...",
      "[CACHE] Revalidating path '/dashboard'...",
      "[HTTP] 200 OK · Payload verified & synced",
    ],
  },
  {
    id: "cpp-dsa",
    name: "SegmentTree.cpp",
    lang: "C++",
    icon: "⚙️",
    color: "#f59e0b",
    code: `#include <vector>
using namespace std;

class SegmentTree {
    vector<long long> tree;
    int n;
public:
    SegmentTree(int size) : n(size), tree(4 * size, 0) {}
    void update(int node, int start, int end, int idx, long long val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2*node, start, mid, idx, val);
        else update(2*node+1, mid+1, end, idx, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
};`,
    output: [
      "[G++] Compiling with -O3 optimizations...",
      "[BENCHMARK] Building Segment Tree of size N = 200,000",
      "[QUERY] 100,000 point updates + range queries...",
      "[METRIC] Time elapsed: 12.8ms · Memory: 6.4 MB",
      "[VERIFIED] Time Complexity: O(log N) per query",
    ],
  },
];

export default function InteractiveTerminal({ isDark = true }: { isDark?: boolean }) {
  const [activeSnippet, setActiveSnippet] = useState<Snippet>(SNIPPETS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(SNIPPETS[0].output);

  const handleRunCode = () => {
    soundManager.playClick(850, 0.08);
    setIsRunning(true);
    setConsoleLogs([]);

    const logs = activeSnippet.output;
    logs.forEach((log, index) => {
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, log]);
        soundManager.playHover();
        if (index === logs.length - 1) {
          setIsRunning(false);
          soundManager.playSuccess();
        }
      }, (index + 1) * 220);
    });
  };

  const handleSelectSnippet = (s: Snippet) => {
    soundManager.playClick();
    setActiveSnippet(s);
    setConsoleLogs(s.output);
    setIsRunning(false);
  };

  const cardBg = isDark ? "rgba(10, 24, 18, 0.92)" : "rgba(255, 255, 255, 0.95)";
  const textMain = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "#94a3b8" : "#64748b";

  return (
    <Card3D maxTilt={10} accentColor={activeSnippet.color} isDark={isDark} style={{ width: "100%" }}>
      <div
        style={{
          background: cardBg,
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
          borderRadius: "26px",
          padding: "clamp(1.25rem, 3vw, 2rem)",
          boxShadow: isDark
            ? "0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(16, 185, 129, 0.2)"
            : "0 20px 50px rgba(99, 102, 241, 0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Terminal Header Tabs Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, paddingBottom: "0.85rem" }}>
          {/* File Snippet Tabs */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {SNIPPETS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectSnippet(s)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  fontWeight: activeSnippet.id === s.id ? 700 : 500,
                  color: activeSnippet.id === s.id ? "#ffffff" : textMuted,
                  background: activeSnippet.id === s.id ? `linear-gradient(135deg, ${s.color}, #06b6d4)` : "transparent",
                  border: `1px solid ${activeSnippet.id === s.id ? "transparent" : isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0,0,0,0.06)"}`,
                  borderRadius: "8px",
                  padding: "0.4rem 0.75rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.2s ease",
                  boxShadow: activeSnippet.id === s.id ? `0 4px 15px ${s.color}44` : "none",
                }}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          {/* Run Code CTA Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 800,
              color: "#ffffff",
              background: isRunning
                ? "rgba(100, 116, 139, 0.5)"
                : "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
              border: "none",
              borderRadius: "10px",
              padding: "0.45rem 1.1rem",
              cursor: isRunning ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: isRunning ? "none" : "0 4px 18px rgba(16, 185, 129, 0.4)",
              transition: "all 0.2s ease",
            }}
          >
            <span>{isRunning ? "⚙️ Executing..." : "▶ Run Sandbox"}</span>
          </button>
        </div>

        {/* Code Editor Preview */}
        <div
          style={{
            background: isDark ? "rgba(0, 0, 0, 0.55)" : "rgba(15, 23, 42, 0.95)",
            borderRadius: "16px",
            padding: "1.2rem",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.15)"}`,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(0.72rem, 1.2vw, 0.8rem)",
            color: "#e2e8f0",
            lineHeight: 1.65,
            overflowX: "auto",
            position: "relative",
          }}
        >
          <pre style={{ margin: 0 }}>
            <code>{activeSnippet.code}</code>
          </pre>
        </div>

        {/* Live Terminal Output Console */}
        <div
          style={{
            background: isDark ? "rgba(3, 15, 10, 0.9)" : "rgba(241, 245, 249, 0.95)",
            borderRadius: "16px",
            padding: "1rem 1.25rem",
            border: `1px solid ${isDark ? "rgba(52, 211, 153, 0.2)" : "rgba(0, 0, 0, 0.08)"}`,
            minHeight: "110px",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: isDark ? "#34d399" : "#059669", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ⚡ Simulated Live Output Stream
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: textMuted }}>
              {consoleLogs.length} logs · status: active
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {consoleLogs.map((log, idx) => (
              <p
                key={idx}
                style={{
                  margin: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: log.includes("[SUCCESS]") || log.includes("[VERIFIED]")
                    ? "#34d399"
                    : log.includes("[ERROR]")
                      ? "#f43f5e"
                      : isDark
                        ? "#93c5fd"
                        : "#1e40af",
                  animation: "fadeIn 0.2s ease-out forwards",
                }}
              >
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
