import React, { useRef, useEffect } from 'react';
import ThreeCanvas from './ThreeCanvas';

/**
 * Character that smoothly avoids the cursor using 60fps spring/lerp physics
 */
function AvoidanceCharacter({ char, mouseRef }) {
  const spanRef = useRef(null);
  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    currentRotate: 0,
    currentScale: 1,
    currentSkew: 0,
    targetX: 0,
    targetY: 0,
    targetRotate: 0,
    targetScale: 1,
    targetSkew: 0,
  });

  useEffect(() => {
    let animId;

    const updatePhysics = () => {
      const span = spanRef.current;
      const mouse = mouseRef.current;

      if (span && mouse.x !== null && mouse.y !== null) {
        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dx = mouse.x - charCenterX;
        const dy = mouse.y - charCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 240; // Proximity field

        if (dist < radius && dist > 0) {
          // Repulsion force: smoothly pushes character away from cursor
          const power = Math.pow((radius - dist) / radius, 1.6);
          const pushDistance = 45; // Max push in px

          stateRef.current.targetX = -(dx / dist) * power * pushDistance;
          stateRef.current.targetY = -(dy / dist) * power * pushDistance;
          stateRef.current.targetRotate = -(dx / radius) * 20 * power;
          stateRef.current.targetSkew = -(dx / radius) * 16 * power;
          stateRef.current.targetScale = 1 + power * 0.12;
        } else {
          stateRef.current.targetX = 0;
          stateRef.current.targetY = 0;
          stateRef.current.targetRotate = 0;
          stateRef.current.targetSkew = 0;
          stateRef.current.targetScale = 1;
        }
      } else {
        stateRef.current.targetX = 0;
        stateRef.current.targetY = 0;
        stateRef.current.targetRotate = 0;
        stateRef.current.targetSkew = 0;
        stateRef.current.targetScale = 1;
      }

      // Smooth buttery lerp damping (high-frame-rate spring physics)
      const s = stateRef.current;
      s.currentX += (s.targetX - s.currentX) * 0.12;
      s.currentY += (s.targetY - s.currentY) * 0.12;
      s.currentRotate += (s.targetRotate - s.currentRotate) * 0.1;
      s.currentSkew += (s.targetSkew - s.currentSkew) * 0.1;
      s.currentScale += (s.targetScale - s.currentScale) * 0.1;

      if (span) {
        span.style.transform = `translate3d(${s.currentX}px, ${s.currentY}px, 0) rotate(${s.currentRotate}deg) skewX(${s.currentSkew}deg) scale(${s.currentScale})`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [mouseRef]);

  if (char === ' ') {
    return <span className="inline-block w-[3vw] sm:w-[4vw]" />;
  }

  return (
    <span
      ref={spanRef}
      className="inline-block select-none will-change-transform text-white transition-colors duration-200"
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
  const mouseRef = useRef({ x: null, y: null });

  const handleMouseMove = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 pt-28 pb-12 overflow-hidden z-10"
    >
      {/* 3D Glossy Liquid Torus Knot in the Center (Exact yannesidibe.com centerpiece) */}
      <ThreeCanvas />

      {/* Top Space / Subtitle: CREATIVE DEVELOPER (Exact Yanne Sidibé style) */}
      <div className="w-full flex flex-col items-center justify-center pt-2 z-20">
        <h2
          className="font-august text-[clamp(2.5rem,5.5vw,5.5rem)] uppercase tracking-[0.05em] leading-none text-transparent"
          style={{ WebkitTextStroke: '1.5px #ffffff' }}
        >
          {jobTitle || "CREATIVE DEVELOPER"}
        </h2>
      </div>

      {/* Giant Hero Name on Single Horizontal Line with 3D Knot Between Words */}
      <div className="hero-name-wrap relative w-full flex items-center justify-center z-20 my-auto py-4 select-none">
        <div className="hero-name font-august uppercase tracking-[-0.015em] leading-[0.82] flex items-center justify-center text-center whitespace-nowrap">
          {/* First Name (ATHARAV) */}
          <div className="inline-flex">
            {firstName.split('').map((char, index) => (
              <AvoidanceCharacter
                key={`first-${index}`}
                char={char}
                mouseRef={mouseRef}
              />
            ))}
          </div>

          {/* Spacer in middle for 3D Torus Knot */}
          <div className="w-[4vw] sm:w-[6vw] shrink-0" />

          {/* Last Name (NARANG) */}
          <div className="inline-flex">
            {lastName.split('').map((char, index) => (
              <AvoidanceCharacter
                key={`last-${index}`}
                char={char}
                mouseRef={mouseRef}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Area: Location + Flag Pill + Scroll Down Indicator */}
      <div className="flex flex-col items-center gap-5 z-20 pb-4">
        {/* LOCATED IN INDIA */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.28em] text-white uppercase">
            LOCATED IN INDIA
          </p>

          {/* India Tricolor Pill Bar */}
          <div className="india-rule shadow-[0_0_15px_rgba(255,153,51,0.3)]">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Scroll Down To Explore */}
        <div className="flex flex-col items-center gap-1.5 mt-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[11px] font-sans tracking-wider text-zinc-300">
            Scroll down to explore
          </span>
          <span className="hero-scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
