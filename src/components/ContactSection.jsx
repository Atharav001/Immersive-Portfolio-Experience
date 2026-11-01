import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ContactSection({ email = 'atharavnarang@gmail.com' }) {
  return (
    <footer id="contact" className="contact-panel">
      <div className="contact-inner">
        <div className="contact-cta-row">
          <p className="contact-kicker">HAVE A PROJECT IN MIND?</p>
          <a className="contact-cta" href={`mailto:${email}`}>
            <span>Ready to level up<br className="sm:hidden" /> your project?</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="contact-email" href={`mailto:${email}`}>{email}</a>
        </div>
        <div className="contact-meta-grid">
          <div><h3>Local time</h3><p>India · <IndiaClock /></p></div>
          <div><h3>Version</h3><p>Portfolio · 2026</p></div>
          <div><h3>Social media</h3><a href="https://github.com/Atharav001" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
          <div><h3>Say hello</h3><a href={`mailto:${email}`}>Email ↗</a><p>Based in India<br />Available worldwide</p></div>
        </div>
        <div className="contact-bottom"><span>© {new Date().getFullYear()} Atharav Narang</span><span>Designed & built with care</span><a href="#home">Back to top ↑</a></div>
      </div>
    </footer>
  );
}

function IndiaClock() {
  const [time, setTime] = React.useState(() => new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })), 30000);
    return () => clearInterval(timer);
  }, []);
  return <>{time} IST</>;
}
