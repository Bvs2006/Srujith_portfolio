import React, { useRef, useState, useCallback } from "react";

interface HoloCardProps {
  children: React.ReactNode;
  color?: string;
  isDark?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function HoloCard({
  children,
  color = "#6366f1",
  isDark = true,
  onClick,
  style = {},
}: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50, opacity: 0 });

  const dragStartRef = useRef<{ x: number; y: number; moved: boolean }>({ x: 0, y: 0, moved: false });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      setTilt({ x: rotateX, y: rotateY });

      const holoX = (x / rect.width) * 100;
      const holoY = (y / rect.height) * 100;
      setHoloPos({ x: holoX, y: holoY, opacity: 0.8 });
    },
    [isDragging]
  );

  const handleMouseEnter = () => {
    if (!isDragging) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
      setHoloPos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  // Pointer Drag
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button, input")) return;
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

    const swingY = Math.max(-25, Math.min(25, dx * 0.2));
    const swingX = Math.max(-25, Math.min(25, -dy * 0.2));

    setDragOffset({ x: dx, y: dy });
    setTilt({ x: swingX, y: swingY });
    setHoloPos({
      x: 50 + (dx / 4),
      y: 50 + (dy / 4),
      opacity: 0.9,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    setDragOffset({ x: 0, y: 0 });
    setTilt({ x: 0, y: 0 });

    if (!dragStartRef.current.moved && onClick) {
      onClick();
    }
  };

  const currentTransform = isDragging
    ? `perspective(1000px) translate3d(${dragOffset.x}px, ${dragOffset.y}px, 60px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.06, 1.06, 1.06)`
    : isHovered
    ? `perspective(1000px) translate3d(0px, -6px, 15px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`
    : "perspective(1000px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  return (
    <div
      ref={cardRef}
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
        borderRadius: "24px",
        cursor: isDragging ? "grabbing" : onClick ? "pointer" : "grab",
        transition: isDragging
          ? "none"
          : "transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.25), box-shadow 0.4s ease",
        boxShadow: isDragging
          ? `0 35px 70px rgba(0, 0, 0, ${isDark ? 0.85 : 0.3}), 0 0 40px ${color}55`
          : isHovered
          ? `0 20px 50px rgba(0, 0, 0, ${isDark ? 0.75 : 0.2}), 0 0 25px ${color}33`
          : `0 15px 35px rgba(0, 0, 0, ${isDark ? 0.5 : 0.08})`,
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        zIndex: isDragging ? 50 : 1,
        ...style,
      }}
    >
      {/* 3D Holographic Rainbow Specular Foil */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 10,
          background: `
            radial-gradient(
              circle at ${holoPos.x}% ${holoPos.y}%,
              rgba(255, 255, 255, 0.4) 0%,
              rgba(254, 240, 138, 0.3) 20%,
              rgba(165, 243, 252, 0.3) 40%,
              rgba(244, 114, 182, 0.3) 60%,
              rgba(167, 139, 250, 0.2) 80%,
              transparent 100%
            ),
            linear-gradient(
              ${holoPos.x * 2.5}deg,
              transparent 25%,
              rgba(255, 255, 255, 0.25) 45%,
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0.25) 55%,
              transparent 75%
            )
          `,
          opacity: holoPos.opacity,
          mixBlendMode: isDark ? "screen" : "overlay",
          transition: isDragging ? "none" : "opacity 0.25s ease",
        }}
      />

      {/* Rim bevel */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 11,
          border: isDragging ? `2px solid ${color}` : isHovered ? `1.5px solid ${color}` : `1px solid ${color}44`,
          boxShadow: isDark
            ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)"
            : "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)",
          transition: "border 0.3s ease",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
