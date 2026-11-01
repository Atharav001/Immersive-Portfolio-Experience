import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import LiquidText from './LiquidText';

export default function Header() {
  return (
    <header className="site-header">
      <a href="#home" className="site-signature" aria-label={`${PORTFOLIO_DATA.firstname} ${PORTFOLIO_DATA.lastname}`}>
        <LiquidText as="span" intensity={12} className="site-signature-text">
          {PORTFOLIO_DATA.firstname}
        </LiquidText>
      </a>
      <div className="site-availability">
        <span className="availability-dot" aria-hidden="true" />
        <span>{PORTFOLIO_DATA.availability}</span>
      </div>
    </header>
  );
}
