import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ReactorDock } from './ReactorCursor';

export default function Header() {
  return (
    <header className="site-header">
      <a href="#home" className="site-signature" aria-label={`${PORTFOLIO_DATA.firstname} ${PORTFOLIO_DATA.lastname}`}>
        <span className="site-signature-text">{PORTFOLIO_DATA.firstname} {PORTFOLIO_DATA.lastname}</span>
      </a>
      <ReactorDock />
      <div className="site-availability"><span className="availability-dot" aria-hidden="true" /><span>available now for work</span></div>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#home">Home</a><a href="#origin-story">Story</a><a href="#work">Work<span className="nav-star" aria-hidden="true">✳</span></a><a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
