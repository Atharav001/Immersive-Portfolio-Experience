import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import LiquidText from './LiquidText';

export default function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="hero-name">
      <div className="hero-copy">
        <LiquidText as="h1" id="hero-name" intensity={42} className="hero-name">
          {PORTFOLIO_DATA.firstname.toUpperCase()}
        </LiquidText>
        <div className="hero-location">
          <p>{PORTFOLIO_DATA.role} <span aria-hidden="true">·</span> {PORTFOLIO_DATA.city}</p>
          <p>Located in {PORTFOLIO_DATA.location}</p>
        </div>
      </div>

      <a href="#contact" className="hero-scroll" aria-label="Scroll to contact">
        <span>Scroll</span><span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
