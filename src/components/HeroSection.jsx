import React, { useRef, useState, useEffect, useCallback } from 'react';

function LiquidCharacter({ char, mousePos, mouseVelocity }) {
  const spanRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scaleX: 1, scaleY: 1, rotate: 0, skew: 0 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!spanRef.current || mousePos.x === null || mousePos.y === null) return;

    const rect = spanRef.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - charCenterX;
    const dy = mousePos.y - charCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 220; // Radius of liquid distortion field

    if (dist < radius) {
      const factor = Math.pow((radius - dist) / radius, 2);
      // Liquid push away combined with velocity momentum
      const forceX = -(dx / dist) * factor * 45 + (mouseVelocity.vx || 0) * 0.4;
      const forceY = -(dy / dist) * factor * 55 + (mouseVelocity.vy || 0) * 0.4;
      const rotate = (dx / radius) * 25 * factor;
      const skew = -(dx / radius) * 20 * factor;
      const scaleX = 1 + factor * 0.22;
      const scaleY = 1 - factor * 0.12;

      setTransform({
        x: forceX,
        y: forceY,
        scaleX,
        scaleY,
        rotate,
        skew,
      });
      setIsNear(true);
    } else {
      if (isNear) {
        setTransform({ x: 0, y: 0, scaleX: 1, scaleY: 1, rotate: 0, skew: 0 });
        setIsNear(false);
      }
    }
  }, [mousePos, mouseVelocity, isNear]);

  if (char === ' ') {
    return <span className="inline-block w-[3vw]" />;
  }

  return (
    <span
      ref={spanRef}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${transform.rotate}deg) skewX(${transform.skew}deg) scale(${transform.scaleX}, ${transform.scaleY})`,
        transition: isNear ? 'transform 0.08s ease-out' : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`inline-block select-none will-change-transform transition-all duration-300 ${
        isNear
          ? 'text-white drop-shadow-[0_0_35px_rgba(168,124,255,0.9)] scale-[1.03]'
          : 'text-[#f0f1fa]'
      }`}
    >
      {char}
    </span>
  );
}

export default function HeroSection({
  firstName = "ATHARAV",
  lastName = "NARANG",
  jobTitle = "CREATIVE DEVELOPER"
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [mouseVelocity, setMouseVelocity] = useState({ vx: 0, vy: 0 });
  const lastPosRef = useRef({ x: 0, y: 0, time: Date.now() });

  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    const dt = Math.max(now - lastPosRef.current.time, 16);
    const vx = (e.clientX - lastPosRef.current.x) / (dt / 16);
    const vy = (e.clientY - lastPosRef.current.y) / (dt / 16);

    lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
    setMousePos({ x: e.clientX, y: e.clientY });
    setMouseVelocity({ vx, vy });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: null, y: null });
    setMouseVelocity({ vx: 0, vy: 0 });
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden z-10"
    >
      {/* 1. Outlined Job Title (Exact Yanne Sidibé style: transparent fill with 1.5px white stroke) */}
      <div className="w-full text-center mb-2 sm:mb-4">
        <h2 className="outlined-title font-august text-[clamp(2.2rem,5vw,5rem)] tracking-[0.06em] leading-none uppercase">
          {jobTitle}
        </h2>
      </div>

      {/* 2. Monumental Hero Name (Exact Yanne Sidibé style: August typography with cursor-reactive liquid distortion) */}
      <div className="w-full flex flex-col items-center justify-center font-august uppercase leading-[0.85] text-center select-none">
        
        {/* Line 1: First Name */}
        <div className="flex justify-center items-center text-[clamp(4.5rem,19vw,17rem)] tracking-[-0.03em]">
          {firstName.split('').map((char, index) => (
            <LiquidCharacter
              key={`first-${index}`}
              char={char}
              mousePos={mousePos}
              mouseVelocity={mouseVelocity}
            />
          ))}
        </div>

        {/* Line 2: Last Name */}
        <div className="flex justify-center items-center text-[clamp(4.5rem,19vw,17rem)] tracking-[-0.03em] -mt-[1vw] sm:-mt-[2vw]">
          {lastName.split('').map((char, index) => (
            <LiquidCharacter
              key={`last-${index}`}
              char={char}
              mousePos={mousePos}
              mouseVelocity={mouseVelocity}
            />
          ))}
        </div>
      </div>

      {/* 3. Subtext Description & Interactive Indicator */}
      <div className="mt-8 sm:mt-12 max-w-xl text-center px-4">
        <p className="text-sm sm:text-base font-light text-zinc-400 leading-relaxed font-sans">
          Crafting visually striking web experiences with creative interaction, high-fidelity motion, and voice-driven architecture for the Wispr Flow challenge.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-[#a87cff] animate-ping" />
          <span>Interactive Fluid Canvas • Move cursor over text</span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
}
