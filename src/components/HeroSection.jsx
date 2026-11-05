import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import LiquidText from './LiquidText';

export default function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="hero-name">
      <div className="hero-copy">
        <LiquidText as="h1" id="hero-name" intensity={42} className="hero-name">
          <span>{PORTFOLIO_DATA.firstname.toUpperCase()}</span>
          <span>{PORTFOLIO_DATA.lastname.toUpperCase()}</span>
        </LiquidText>
        <div className="hero-location">
          <p>Located in {PORTFOLIO_DATA.location}</p>
          <i className="india-rule" aria-hidden="true"><span /><span /><span /></i>
        </div>
      </div>

      <a href="#origin-story" className="hero-scroll" aria-label="Scroll to the origin story">
        <span>Scroll</span><span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
