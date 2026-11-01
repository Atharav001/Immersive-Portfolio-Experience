import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import LiquidText from './LiquidText';

export default function ContactSection({ email = PORTFOLIO_DATA.email }) {
  return (
    <footer id="contact" className="contact-panel">
      <div className="contact-inner">
        <LiquidText as="h2" intensity={34} className="contact-heading">
          Let’s build something.
        </LiquidText>
        <LiquidText as="a" intensity={18} className="contact-email" href={`mailto:${email}`}>
          {email}
        </LiquidText>

        <nav className="contact-socials" aria-label="Social links">
          {PORTFOLIO_DATA.socials.map((social) => (
            <LiquidText
              as="a"
              key={social.name}
              intensity={15}
              href={social.url}
              target="_blank"
              rel="noreferrer"
            >
              {social.name}<span aria-hidden="true"> ↗</span>
            </LiquidText>
          ))}
        </nav>

        <div className="contact-bottom">
          <span>Based in {PORTFOLIO_DATA.city}, {PORTFOLIO_DATA.location}</span>
          <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.firstname} {PORTFOLIO_DATA.lastname}</span>
        </div>
      </div>
    </footer>
  );
}
