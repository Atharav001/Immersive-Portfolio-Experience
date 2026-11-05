import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function HeroSection() {
  const fullName = `${PORTFOLIO_DATA.firstname} ${PORTFOLIO_DATA.lastname}`;
  return (
    <section className="home-hero" aria-labelledby="hero-name">
      <div className="hero-copy">
        <h1 id="hero-name" className="sr-only">{fullName}</h1>
        <div className="magnetic-wordmark" aria-hidden="true">
          <div className="wordmark-base">
            <span data-fluid-text>{PORTFOLIO_DATA.firstname.toUpperCase()}</span>
            <span data-fluid-text>{PORTFOLIO_DATA.lastname.toUpperCase()}</span>
          </div>
        </div>
        <div className="hero-location"><p>Located in {PORTFOLIO_DATA.location}</p><i className="india-rule" aria-hidden="true"><span /><span /><span /></i></div>
      </div>
      <a href="#origin-story" className="hero-scroll" aria-label="Scroll to the story"><span>Scroll down to explore</span><span className="hero-scroll-arrow" aria-hidden="true">↓</span></a>
    </section>
  );
}
