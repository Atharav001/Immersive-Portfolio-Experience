import React, { useEffect, useId, useRef } from 'react';

/** Shared SVG displacement interaction used by the hero, contact heading and links. */
export default function LiquidText({ as: Tag = 'span', intensity = 24, className = '', children, ...props }) {
  const id = useId().replace(/:/g, '');
  const displacementRef = useRef(null);
  const turbulenceRef = useRef(null);
  const animationRef = useRef(0);
  const targetRef = useRef(0);
  const scaleRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(animationRef.current), []);

  const animateTo = (target) => {
    targetRef.current = target;
    cancelAnimationFrame(animationRef.current);
    const tick = () => {
      scaleRef.current += (targetRef.current - scaleRef.current) * 0.12;
      if (displacementRef.current) {
        displacementRef.current.setAttribute('scale', scaleRef.current.toFixed(2));
      }
      if (Math.abs(targetRef.current - scaleRef.current) > 0.1) {
        animationRef.current = requestAnimationFrame(tick);
      }
    };
    animationRef.current = requestAnimationFrame(tick);
  };

  const updateFlow = (event) => {
    if (!turbulenceRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const frequency = 0.008 + position * 0.015;
    turbulenceRef.current.setAttribute('baseFrequency', `${frequency.toFixed(4)} ${(frequency * 2).toFixed(4)}`);
  };

  return (
    <>
      <svg className="liquid-filter-defs" aria-hidden="true" focusable="false">
        <filter id={`liquid-${id}`} x="-18%" y="-28%" width="136%" height="156%">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.012 0.024"
            numOctaves="2"
            seed="7"
            result="liquid-noise"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="liquid-noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <Tag
        {...props}
        className={`liquid-text ${className}`}
        style={{ ...props.style, '--liquid-filter': `url(#liquid-${id})` }}
        onPointerEnter={(event) => {
          props.onPointerEnter?.(event);
          animateTo(intensity);
        }}
        onPointerMove={(event) => {
          props.onPointerMove?.(event);
          updateFlow(event);
        }}
        onPointerLeave={(event) => {
          props.onPointerLeave?.(event);
          animateTo(0);
        }}
      >
        {children}
      </Tag>
    </>
  );
}
