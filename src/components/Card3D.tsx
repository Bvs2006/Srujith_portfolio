import React, { useRef, useState, useCallback, useEffect } from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  glare?: boolean;
  accentColor?: string;
  isDark?: boolean;
  onClick?: () => void;
}

export default function Card3D({
  children,
  className = "",
  style = {},
  maxTilt = 14,
  glare = true,
  accentColor = "#10b981",
  isDark = true,
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const dragStartRef = useRef<{ x: number; y: number; moved: boolean }>({ x: 0, y: 0, moved: false });

  // ── Mouse Hover Tilt ──
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTilt({ x: rotateX, y: rotateY });

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlarePos({ x: glareX, y: glareY, opacity: isDark ? 0.3 : 0.45 });
      }
    },
    [maxTilt, glare, isDark, isDragging]
  );

  const handleMouseEnter = () => {
    if (!isDragging) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  // ── 3D Movable Drag Mechanics (Mouse Only to preserve natural mobile scroll) ──
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Avoid triggering on links or buttons inside card
    if ((e.target as HTMLElement).closest("a, button, input")) {
      return;
    }
    if (e.pointerType === "touch") {
      // Allow natural touch scrolling on mobile without hijacking
      return;
    }
    dragStartRef.current = { x: e.clientX, y: e.clientY, moved: false };
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragStartRef.current.moved = true;
    }

    // Dynamic swing rotation while moving
    const swingY = Math.max(-24, Math.min(24, dx * 0.18));
    const swingX = Math.max(-24, Math.min(24, -dy * 0.18));

    setDragOffset({ x: dx, y: dy });
    setTilt({ x: swingX, y: swingY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // Elastic spring return
    setDragOffset({ x: 0, y: 0 });
    setTilt({ x: 0, y: 0 });

    if (!dragStartRef.current.moved && onClick) {
      onClick();
    }
  };

  const currentTransform = isDragging
    ? `perspective(1200px) translate3d(${dragOffset.x}px, ${dragOffset.y}px, 65px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.06, 1.06, 1.06)`
    : isHovered
    ? `perspective(1200px) translate3d(0px, -6px, 20px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    : "perspective(1200px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  const dynamicShadow = isDragging
    ? `${-dragOffset.x * 0.3}px ${35 + dragOffset.y * 0.2}px 60px rgba(0, 0, 0, ${isDark ? 0.85 : 0.3}), 0 0 35px ${accentColor}44`
    : isHovered
    ? `0 24px 50px -10px rgba(0, 0, 0, ${isDark ? 0.75 : 0.2}), 0 0 25px ${accentColor}25`
    : `0 15px 35px -8px rgba(0, 0, 0, ${isDark ? 0.5 : 0.08})`;

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        transform: currentTransform,
        boxShadow: dynamicShadow,
        borderRadius: "26px",
        transition: isDragging
          ? "none"
          : "transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.25), box-shadow 0.5s ease",
        willChange: "transform, box-shadow",
        cursor: isDragging ? "grabbing" : onClick ? "pointer" : "grab",
        userSelect: "none",
        touchAction: "none",
        zIndex: isDragging ? 50 : 1,
        ...style,
      }}
    >
      {/* Specular Glare */}
      {glare && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 12,
            background: isDark
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.06) 35%, transparent 65%)`
              : `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 35%, transparent 70%)`,
            opacity: isDragging ? 0.5 : glarePos.opacity,
            transition: isDragging ? "none" : "opacity 0.25s ease",
            mixBlendMode: isDark ? "screen" : "overlay",
          }}
        />
      )}

      {/* Realistic Rim Highlight around edges */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 11,
          border: isDragging
            ? `1.5px solid ${accentColor}`
            : isHovered
            ? `1px solid ${accentColor}88`
            : isDark
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(99, 102, 241, 0.2)",
          boxShadow: isDark
            ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)"
            : "inset 0 1px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 1px 0 rgba(99, 102, 241, 0.1)",
          transition: "border 0.3s ease",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          borderRadius: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}
