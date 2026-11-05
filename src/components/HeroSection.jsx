import React, { useId, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/** A sharp base wordmark with a small, pointer-local liquid lens above it. */
function MagneticWordmark({ children }) {
  const id = useId().replace(/:/g, '');
  const surface = useRef(null);
  const filterRef = useRef(null);
  const [active, setActive] = useState(false);
  const words = children.split(' ');
  const renderWords = () => words.map((word) => <span key={word}>{word}</span>);
  const move = (event) => {
    const rect = surface.current?.getBoundingClientRect();
    if (!rect) return;
    surface.current.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    surface.current.style.setProperty('--my', `${event.clientY - rect.top}px`);
    setActive(true);
    if (filterRef.current) filterRef.current.setAttribute('scale', '74');
  };
  const release = () => {
    setActive(false);
    if (filterRef.current) filterRef.current.setAttribute('scale', '0');
  };
  return (
    <div
      ref={surface}
      className={`magnetic-wordmark${active ? ' is-active' : ''}`}
      onPointerMove={move}
      onPointerLeave={release}
      onPointerEnter={() => setActive(true)}
      onFocus={() => setActive(true)}
      onBlur={release}
      tabIndex={0}
      role="img"
      aria-label={children}
      style={{ '--wordmark-filter': `url(#wordmark-liquid-${id})` }}
    >
      <svg className="wordmark-filter-defs" aria-hidden="true" focusable="false">
        <filter id={`wordmark-liquid-${id}`} x="-12%" y="-18%" width="124%" height="136%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.025" numOctaves="2" seed="13" result="noise" />
          <feDisplacementMap ref={filterRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <span className="wordmark-base" aria-hidden="true">{renderWords()}</span>
      <span className="wordmark-lens" aria-hidden="true">{renderWords()}</span>
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
        <div className="hero-location">
          <p>Located in {PORTFOLIO_DATA.location}</p>
          <i className="india-rule" aria-hidden="true"><span /><span /><span /></i>
        </div>
      </div>
      <a href="#origin-story" className="hero-scroll" aria-label="Scroll to the story">
        <span>Scroll down to explore</span><span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
