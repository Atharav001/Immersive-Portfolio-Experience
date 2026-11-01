import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * MagneticCharacter: Individual character that fluidly displaces, tilts,
 * and stretches in response to cursor proximity.
 */
function MagneticCharacter({ char, mousePos }) {
  const spanRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, r: 0, s: 1, skew: 0 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!spanRef.current || !mousePos.x || !mousePos.y) return;

    const rect = spanRef.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - charCenterX;
    const dy = mousePos.y - charCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 180; // Distance of magnetic influence

    if (dist < radius) {
      const power = Math.pow((radius - dist) / radius, 1.8);
      // Gentle liquid displacement away from or pulled toward cursor
      const pullX = (dx / dist) * power * 38;
      const pullY = (dy / dist) * power * 32;
      const rotate = -(dx / radius) * 22 * power;
      const scale = 1 + power * 0.18;
      const skew = -(dx / radius) * 15 * power;

      setTransform({ x: pullX, y: pullY, r: rotate, s: scale, skew });
      setIsNear(true);
    } else {
      if (isNear) {
        setTransform({ x: 0, y: 0, r: 0, s: 1, skew: 0 });
        setIsNear(false);
      }
    }
  }, [mousePos, isNear]);

  if (char === ' ') {
    return <span className="inline-block w-[2vw] sm:w-[3vw]" />;
  }

  return (
    <span
      ref={spanRef}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${transform.r}deg) scale(${transform.s}) skewX(${transform.skew}deg)`,
        transition: isNear ? 'transform 0.08s ease-out' : 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      className={`inline-block select-none will-change-transform transition-colors duration-300 ${
        isNear
          ? 'text-white drop-shadow-[0_0_25px_rgba(168,124,255,0.8)]'
          : 'text-zinc-200/90'
      }`}
    >
      {char}
    </span>
  );
}

export default function MagneticHeroText({ firstName = "ATHARAV", lastName = "NARANG" }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: null, y: null });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex flex-col items-center justify-center py-6 sm:py-12 cursor-default overflow-visible"
    >
      {/* Background Liquid Atmosphere Spotlight */}
      <div
        className="pointer-events-none absolute w-[420px] h-[420px] rounded-full blur-[120px] transition-opacity duration-700 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(168,124,255,0.22) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
          left: mousePos.x ? `${mousePos.x - 210}px` : '50%',
          top: mousePos.y ? `${mousePos.y - 210}px` : '50%',
          opacity: isHovered ? 1 : 0.4,
          transform: mousePos.x ? 'none' : 'translate(-50%, -50%)',
          position: mousePos.x ? 'fixed' : 'absolute',
        }}
      />

      {/* Hero Subtitle / Role Tag */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#a87cff] animate-pulse" />
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-zinc-400">
          Voice Architect • Creative Developer
        </p>
      </div>

      {/* Line 1: First Name */}
      <div className="flex justify-center items-center font-black tracking-[-0.04em] leading-[0.88] text-[clamp(3.8rem,14vw,13rem)] uppercase text-center">
        {firstName.split('').map((char, index) => (
          <MagneticCharacter
            key={`first-${index}`}
            char={char}
            mousePos={mousePos}
          />
        ))}
      </div>

      {/* Line 2: Last Name */}
      <div className="flex justify-center items-center font-black tracking-[-0.04em] leading-[0.88] text-[clamp(3.8rem,14vw,13rem)] uppercase text-center mt-1 sm:mt-2">
        {lastName.split('').map((char, index) => (
          <MagneticCharacter
            key={`last-${index}`}
            char={char}
            mousePos={mousePos}
          />
        ))}
      </div>

      {/* Subtle bottom detail tag */}
      <div className="mt-8 sm:mt-10 flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest">
        <span>[ Interactive Canvas ]</span>
        <span className="text-zinc-700">•</span>
        <span>Hover to deform</span>
      </div>
    </div>
  );
}
