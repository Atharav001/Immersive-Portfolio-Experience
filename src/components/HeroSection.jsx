import React, { useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

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
    return <span className="inline-block w-[2.5vw] sm:w-[3.5vw]" />;
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
  firstName = PORTFOLIO_DATA.firstname,
  lastName = PORTFOLIO_DATA.lastname,
  jobTitle = PORTFOLIO_DATA.jobTitle
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  const handleMouseMove = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  const chars = (text, key) => text.split('').map((char, index) => (
    <AvoidanceCharacter key={`${key}-${index}`} char={char} mouseRef={mouseRef} />
  ));

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 pt-28 pb-12 overflow-hidden z-10"
    >
      {/* SVG Liquid Filter */}
      <svg className="hero-filter-defs" aria-hidden="true" focusable="false">
        <filter id="hero-liquid" x="-8%" y="-18%" width="116%" height="136%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.035" numOctaves="2" seed="4" result="noise">
            <animate attributeName="baseFrequency" values="0.012 0.035;0.024 0.065;0.012 0.035" dur="2.2s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" values="0;24;14;0" dur="1.15s" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>
      </svg>

      {/* 1. Availability Pill */}
      <div className="hero-availability" aria-label="Available now for work">
        <span>{PORTFOLIO_DATA.availability}</span>
        <i />
      </div>

      {/* 2. Center Hero: Outlined Job Title + Massive Display Name */}
      <div className="my-auto w-full flex flex-col items-center justify-center z-20 py-8 select-none">
        
        {/* Outlined Job Title from Yanne Sidibé */}
        <div className="mb-2 sm:mb-4">
          <p className="font-august text-transparent [-webkit-text-stroke:1.5px_#f0f1fa] sm:[-webkit-text-stroke:2px_#f0f1fa] uppercase tracking-wider text-xl sm:text-3xl md:text-5xl text-center">
            {jobTitle.toUpperCase()}
          </p>
        </div>

        {/* Condensed, massive display name with liquid hover */}
        <div className="hero-name-wrap relative w-full flex items-center justify-center py-2 select-none">
          <h1 className="hero-name font-august uppercase" aria-label={`${firstName} ${lastName}`}>
            <span className="hero-word">{chars(firstName, 'first')}</span>
            <span className="inline-block w-[2vw]" />
            <span className="hero-word">{chars(lastName, 'last')}</span>
          </h1>
        </div>
      </div>

      {/* 3. Location and scroll cue */}
      <div className="flex flex-col items-center gap-5 z-20 pb-4">
        {/* LOCATED IN FRANCE / GLOBAL */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.28em] text-white uppercase">
            LOCATED IN {PORTFOLIO_DATA.location}
          </p>

          {/* Authentic Tricolor Pill Bar (Blue, White, Red) */}
          <div className="flex w-16 h-1.5 overflow-hidden rounded-full shadow-[0_0_12px_rgba(255,255,255,0.2)]">
            <span className="flex-1 bg-[#0055A4]" />
            <span className="flex-1 bg-[#FFFFFF]" />
            <span className="flex-1 bg-[#EF4135]" />
          </div>
        </div>

        {/* Scroll Down To Explore */}
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 mt-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer group"
        >
          <span className="text-[11px] font-sans tracking-wider text-zinc-300 group-hover:text-white">
            Scroll down to explore
          </span>
          <span className="hero-scroll-arrow text-zinc-300 group-hover:text-white">↓</span>
        </a>
      </div>
    </section>
  );
}
