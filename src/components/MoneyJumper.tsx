import { useState, useEffect, useRef } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
}

interface PopupText {
  id: number;
  text: string;
  x: number;
  y: number;
}

export default function MoneyJumper({ isDark = true }: { isDark?: boolean }) {
  const [pos, setPos] = useState({ x: 140, y: 360 });
  const [isJumping, setIsJumping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [squash, setSquash] = useState({ sx: 1, sy: 1 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [popups, setPopups] = useState<PopupText[]>([]);
  const [coinCount, setCoinCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [coinType, setCoinType] = useState<"gold" | "diamond" | "gem">("gold");
  const [isVisible, setIsVisible] = useState(true);

  const requestRef = useRef<number | null>(null);
  const startPosRef = useRef({ x: 140, y: 360 });
  const targetPosRef = useRef({ x: 140, y: 360 });
  const jumpStartTimeRef = useRef<number>(0);
  const jumpDurationRef = useRef<number>(850);
  const jumpHeightRef = useRef<number>(130);
  const lastSparkleTimeRef = useRef<number>(0);

  // Pick random target location on screen, preferring cards area
  const pickNewTarget = () => {
    const margin = 90;
    const maxX = Math.max(window.innerWidth - margin, 220);
    const maxY = Math.max(window.innerHeight - margin, 220);

    const newX = Math.floor(Math.random() * (maxX - margin) + margin);
    const newY = Math.floor(Math.random() * (maxY - margin) + margin);

    startPosRef.current = { ...pos };
    targetPosRef.current = { x: newX, y: newY };

    const dist = Math.hypot(newX - pos.x, newY - pos.y);
    jumpDurationRef.current = Math.min(Math.max(dist * 2.2, 700), 1300);
    jumpHeightRef.current = Math.min(Math.max(dist * 0.42, 90), 200);

    jumpStartTimeRef.current = performance.now();
    setIsJumping(true);
  };

  // Periodic autonomous jumps around the cards
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isJumping && !isHovered) {
        if (Math.random() > 0.2) {
          pickNewTarget();
        }
      }
    }, 2600);

    return () => clearInterval(timer);
  }, [isJumping, isHovered, pos]);

  // Jump animation loop with physics
  useEffect(() => {
    const animate = (time: number) => {
      if (isJumping) {
        const elapsed = time - jumpStartTimeRef.current;
        const progress = Math.min(elapsed / jumpDurationRef.current, 1);

        // Parabolic arc
        const arc = 4 * progress * (1 - progress);
        const currentHeight = arc * jumpHeightRef.current;

        const currentX = startPosRef.current.x + (targetPosRef.current.x - startPosRef.current.x) * progress;
        const currentBaseY = startPosRef.current.y + (targetPosRef.current.y - startPosRef.current.y) * progress;
        const currentY = currentBaseY - currentHeight;

        setPos({ x: currentX, y: currentY });
        setRotation(progress * 360 * (targetPosRef.current.x > startPosRef.current.x ? 1 : -1));

        // Squash & stretch physics
        if (progress < 0.15) {
          setSquash({ sx: 0.82, sy: 1.25 });
        } else if (progress > 0.85) {
          setSquash({ sx: 1.15, sy: 0.88 });
        } else {
          setSquash({ sx: 1.05, sy: 1.05 });
        }

        // Spawn golden sparkles mid-flight
        if (time - lastSparkleTimeRef.current > 50) {
          lastSparkleTimeRef.current = time;
          const colors = ["#fbbf24", "#f59e0b", "#10b981", "#38bdf8", "#ffffff", "#f43f5e"];
          setSparkles((prev) => [
            ...prev.slice(-18),
            {
              id: Math.random(),
              x: currentX + (Math.random() - 0.5) * 16,
              y: currentY + (Math.random() - 0.5) * 16,
              size: Math.random() * 8 + 4,
              alpha: 0.9,
              color: colors[Math.floor(Math.random() * colors.length)],
            },
          ]);
        }

        if (progress >= 1) {
          setIsJumping(false);
          // Landing impact squash
          setSquash({ sx: 1.35, sy: 0.65 });
          setTimeout(() => {
            setSquash({ sx: 1, sy: 1 });
          }, 180);
        }
      }

      // Fade existing sparkles
      setSparkles((prev) =>
        prev
          .map((s) => ({ ...s, y: s.y + 0.6, alpha: s.alpha - 0.035, size: Math.max(0, s.size - 0.2) }))
          .filter((s) => s.alpha > 0.05)
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isJumping]);

  // Click handler: super jump + fun reward
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = coinCount + 1;
    setCoinCount(newCount);

    const praises = ["+🪙 100", "✨ Ka-ching!", "🚀 Super Jump!", "+💰 Level Up", "💎 Jackpot!", "⚡ Speed Boost!"];
    const text = praises[Math.floor(Math.random() * praises.length)];

    const id = Date.now();
    setPopups((prev) => [...prev, { id, text, x: pos.x, y: pos.y - 40 }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1100);

    // Cycle coin appearance
    if (newCount % 4 === 0) {
      setCoinType((prev) => (prev === "gold" ? "diamond" : prev === "diamond" ? "gem" : "gold"));
    }

    pickNewTarget();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Sparkles Canvas */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
          overflow: "hidden",
        }}
      >
        {sparkles.map((s) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
              opacity: s.alpha,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              transition: "opacity 0.1s ease",
            }}
          />
        ))}

        {/* Floating Reward Popups */}
        {popups.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: "translate(-50%, -50%)",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              fontWeight: 900,
              color: "#fbbf24",
              textShadow: "0 0 12px rgba(245, 158, 11, 0.8), 0 2px 4px rgba(0,0,0,0.8)",
              animation: "floatUpFade 1.1s ease-out forwards",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* The Jumping Money / Coin Character */}
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${squash.sx}, ${squash.sy})`,
          zIndex: 9999,
          cursor: "pointer",
          userSelect: "none",
          transition: isJumping ? "none" : "transform 0.2s ease-out",
        }}
        title="Jumping Money! Click me to leap & collect!"
      >
        {/* Dynamic Contact Shadow */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: isJumping ? 22 : 42,
            height: isJumping ? 6 : 12,
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.35)",
            filter: "blur(4px)",
            opacity: isJumping ? 0.3 : 0.8,
            transition: "all 0.15s ease",
          }}
        />

        {/* 3D Coin Sprite */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background:
              coinType === "gold"
                ? "linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #b45309 100%)"
                : coinType === "diamond"
                  ? "linear-gradient(135deg, #e0f2fe 0%, #38bdf8 50%, #0284c7 100%)"
                  : "linear-gradient(135deg, #a7f3d0 0%, #10b981 50%, #047857 100%)",
            boxShadow:
              coinType === "gold"
                ? "0 8px 25px rgba(245, 158, 11, 0.55), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(180, 83, 9, 0.6)"
                : coinType === "diamond"
                  ? "0 8px 25px rgba(56, 189, 248, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(2, 132, 199, 0.6)"
                  : "0 8px 25px rgba(16, 185, 129, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(4, 120, 87, 0.6)",
            border: "2.5px solid rgba(255, 255, 255, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${rotation}deg)`,
            position: "relative",
          }}
        >
          {/* Inner embossed metallic ring */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px dashed rgba(255, 255, 255, 0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Currency Symbol / Mascot */}
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.3rem",
                fontWeight: 900,
                color: "#ffffff",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
                lineHeight: 1,
              }}
            >
              {coinType === "gold" ? "₹" : coinType === "diamond" ? "💎" : "$"}
            </span>
          </div>

          {/* Glossy Specular Highlight Sweep */}
          <div
            style={{
              position: "absolute",
              top: 3,
              left: 6,
              width: 14,
              height: 7,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.75)",
              transform: "rotate(-35deg)",
              filter: "blur(0.5px)",
            }}
          />

          {/* Flying Wings when Jumping */}
          {isJumping && (
            <>
              <span
                style={{
                  position: "absolute",
                  left: -11,
                  top: 9,
                  fontSize: "0.9rem",
                  transform: "scaleX(-1) rotate(20deg)",
                  animation: "flutterWing 0.15s ease-in-out infinite alternate",
                }}
              >
                🪽
              </span>
              <span
                style={{
                  position: "absolute",
                  right: -11,
                  top: 9,
                  fontSize: "0.9rem",
                  transform: "rotate(20deg)",
                  animation: "flutterWing 0.15s ease-in-out infinite alternate",
                }}
              >
                🪽
              </span>
            </>
          )}

          {/* Click hint tooltip */}
          {!isJumping && isHovered && (
            <div
              style={{
                position: "absolute",
                top: -30,
                left: "50%",
                transform: "translateX(-50%)",
                background: isDark ? "rgba(0, 0, 0, 0.88)" : "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(245, 158, 11, 0.5)",
                padding: "2px 8px",
                borderRadius: "999px",
                fontSize: "0.62rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: isDark ? "#fbbf24" : "#b45309",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              Click to Leap! ⚡
            </div>
          )}
        </div>

        {/* Total Collected badge */}
        {coinCount > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: -18,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#ffffff",
              fontSize: "0.58rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 800,
              padding: "1px 6px",
              borderRadius: "999px",
              boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)",
              whiteSpace: "nowrap",
            }}
          >
            ×{coinCount}
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatUpFade {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scale(0.6);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -20px) scale(1.15);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -65px) scale(0.9);
          }
        }
        @keyframes flutterWing {
          0% {
            transform: translateY(-2px) rotate(15deg);
          }
          100% {
            transform: translateY(3px) rotate(35deg);
          }
        }
      `}</style>
    </>
  );
}
