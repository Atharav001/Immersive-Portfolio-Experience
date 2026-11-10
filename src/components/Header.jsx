import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ReactorDock } from './ReactorCursor';

const SECTIONS = [
  ['home', 'Home'],
  ['origin-story', 'Story'],
  ['work', 'Work'],
  ['contact', 'Contact'],
];

export default function Header() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const probe = window.scrollY + window.innerHeight * 0.5;
        let current = 'home';
        SECTIONS.forEach(([id]) => {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top + window.scrollY <= probe) current = id;
        });
        setActive(current);
      });
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive, { passive: true });
    window.addEventListener('hashchange', updateActive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
      window.removeEventListener('hashchange', updateActive);
    };
  }, []);

  return (
    <header className="site-header">
      <a href="#home" className="site-signature" aria-label={`${PORTFOLIO_DATA.firstname} ${PORTFOLIO_DATA.lastname}`}>
        <span className="site-signature-text">{PORTFOLIO_DATA.firstname} {PORTFOLIO_DATA.lastname}</span>
      </a>
      <ReactorDock />
      <svg className="nav-circuits" viewBox="0 0 220 160" aria-hidden="true"><path d="M0 24H70L90 12H210 M0 24H55L90 50H210 M0 24H40L90 90H210 M0 24H25L90 130H210" /></svg>
      <div className="site-availability"><span className="availability-dot" aria-hidden="true" /><span>available now for work</span></div>
      <nav className="site-nav" aria-label="Main navigation">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
            {label}{label === 'Work' && <span className="nav-star" aria-hidden="true">✳</span>}
          </a>
        ))}
      </nav>
    </header>
  );
}
