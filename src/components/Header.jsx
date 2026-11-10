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
  const [circuits, setCircuits] = useState([]);
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('.site-header');
      const dock = header?.querySelector('.reactor-dock');
      if (!dock) return;
      const bounds = header.getBoundingClientRect();
      const reactor = dock.getBoundingClientRect();
      const endX = reactor.left + reactor.width / 2 - bounds.left;
      const endY = reactor.top + reactor.height / 2 - bounds.top;
      setCircuits([...header.querySelectorAll('.site-nav a')].map((link, index) => {
        const box = link.getBoundingClientRect();
        const x = box.left - bounds.left - 12;
        const y = box.top + box.height / 2 - bounds.top;
        // Separate ports on the reactor; outer lanes serve the upper labels.
        // Lower routes turn earlier, so their vertical runs cannot cross the
        // horizontal runs above them.
        const portY = endY - 15 + index * 10;
        const portX = endX + Math.sqrt(Math.max(0, (reactor.width / 2) ** 2 - (portY - endY) ** 2));
        const available = Math.max(16, x - portX);
        const lane = portX + available * (0.82 - index * 0.18);
        const bend = Math.min(5, Math.abs(y - portY) / 2, available * .08);
        const sign = y >= portY ? 1 : -1;
        return `M ${portX} ${portY} H ${lane - bend} L ${lane} ${portY + sign * bend} V ${y - sign * bend} L ${lane + bend} ${y} H ${x}`;
      }));
    };
    measure();
    const timer = window.setTimeout(measure, 500);
    const observer = new ResizeObserver(measure);
    const header = document.querySelector('.site-header');
    if (header) observer.observe(header);
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => { window.clearTimeout(timer); observer.disconnect(); window.removeEventListener('resize', measure); };
  }, []);
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
      <svg className="nav-circuits" aria-hidden="true">{circuits.map((path, index) => <g key={index} style={{ '--circuit-delay': `${index * 70}ms` }}><path className="circuit-track" d={path} /><path className="circuit-pulse" pathLength="100" d={path} /></g>)}</svg>
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
