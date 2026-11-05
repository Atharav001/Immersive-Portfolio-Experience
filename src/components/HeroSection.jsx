import React, { useId, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/** A full wordmark filtered through a pointer-following vertical ribbon of fluid displacement. */
function MagneticWordmark({ children }) {
  const id = useId().replace(/:/g, '');
  const surface = useRef(null);
  const displacementRef = useRef(null);
  const stretchRef = useRef(null);
  const turbulenceRef = useRef(null);
  const words = children.split(' ');
  const renderWords = () => words.map((word) => <span key={word}>{word}</span>);
  const reset = () => {
    if (!surface.current) return;
    surface.current.classList.remove('is-active');
    surface.current.style.setProperty('--mx', '-180px');
    if (displacementRef.current) displacementRef.current.setAttribute('scale', '0');
    if (stretchRef.current) stretchRef.current.setAttribute('dx', '0');
  };
  const move = (event) => {
    const node = surface.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const hitText = [...node.querySelectorAll('.wordmark-base > span')].some((word) => {
      const bounds = word.getBoundingClientRect();
      return event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    });
    if (!hitText) { reset(); return; }
    const x = event.clientX - rect.left;
    const speed = Math.min(1, Math.hypot(event.movementX || 0, event.movementY || 0) / 24);
    node.style.setProperty('--mx', `${x}px`);
    node.classList.add('is-active');
    if (displacementRef.current) displacementRef.current.setAttribute('scale', `${(38 + speed * 54).toFixed(1)}`);
    if (stretchRef.current) stretchRef.current.setAttribute('dx', `${Math.max(-24, Math.min(24, (event.movementX || 0) * -0.7)).toFixed(1)}`);
    if (turbulenceRef.current) {
      const frequency = 0.009 + speed * 0.018;
      turbulenceRef.current.setAttribute('baseFrequency', `${frequency.toFixed(4)} ${(frequency * 3.5).toFixed(4)}`);
    }
  };
  return (
    <div ref={surface} className="magnetic-wordmark" onPointerMove={move} onPointerLeave={reset} onFocus={() => { surface.current?.classList.add('is-active'); surface.current?.style.setProperty('--mx', '50%'); displacementRef.current?.setAttribute('scale', '34'); }} onBlur={reset} tabIndex={0} role="img" aria-label={children} style={{ '--wordmark-filter': `url(#wordmark-liquid-${id})` }}>
      <svg className="wordmark-filter-defs" aria-hidden="true" focusable="false">
        <filter id={`wordmark-liquid-${id}`} x="-12%" y="-25%" width="124%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="13" result="liquid-noise" />
          <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="liquid-noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="warped-letter" />
          <feOffset ref={stretchRef} in="warped-letter" dx="0" dy="0" result="jelly-stretch" />
        </filter>
      </svg>
      <span className="wordmark-base" aria-hidden="true">{renderWords()}</span>
      <span className="wordmark-lens" aria-hidden="true" style={{ filter: 'var(--wordmark-filter) drop-shadow(0 0 7px #b3f2ff90)' }}>{renderWords()}</span>
    </div>
  );
}

export default function HeroSection() {
  const fullName = `${PORTFOLIO_DATA.firstname} ${PORTFOLIO_DATA.lastname}`;
  return (
    <section className="home-hero" aria-labelledby="hero-name">
      <div className="hero-copy">
        <h1 id="hero-name" className="sr-only">{fullName}</h1>
        <MagneticWordmark>{fullName.toUpperCase()}</MagneticWordmark>
        <div className="hero-location"><p>Located in {PORTFOLIO_DATA.location}</p><i className="india-rule" aria-hidden="true"><span /><span /><span /></i></div>
      </div>
      <a href="#origin-story" className="hero-scroll" aria-label="Scroll to the story"><span>Scroll down to explore</span><span className="hero-scroll-arrow" aria-hidden="true">↓</span></a>
    </section>
  );
}
