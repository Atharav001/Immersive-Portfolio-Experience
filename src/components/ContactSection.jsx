import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import LiquidText from './LiquidText';

export default function ContactSection({ email = PORTFOLIO_DATA.email }) {
  return (
    <footer id="contact" className="contact-panel">
      <div className="contact-inner">
        <div className="contact-cta-row">
          <p className="contact-kicker">Have an idea or a project?</p>
          <LiquidText as="a" intensity={28} className="contact-cta" href={`mailto:${email}`}>
            <span>Let’s build something.</span>
            <ArrowUpRight aria-hidden="true" strokeWidth={1.25} />
          </LiquidText>
          <LiquidText as="a" intensity={18} className="contact-email" href={`mailto:${email}`}>
            {email}
          </LiquidText>
        </div>

        <div className="contact-meta-grid">
          <div>
            <h3>Based in</h3>
            <p>{PORTFOLIO_DATA.city}, {PORTFOLIO_DATA.location}</p>
          </div>
          <div>
            <h3>Availability</h3>
            <p>{PORTFOLIO_DATA.availability}</p>
          </div>
          <div>
            <h3>Email</h3>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div>
            <h3>Elsewhere</h3>
            {PORTFOLIO_DATA.socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                {social.name} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="contact-bottom">
          <span>{PORTFOLIO_DATA.firstname} {PORTFOLIO_DATA.lastname}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
