import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function WorkSection() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setSelected(null); };
    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('dialog-open'); window.removeEventListener('keydown', onKey); };
  }, [selected]);
  const projects = PORTFOLIO_DATA.work;
  return (
    <section ref={sectionRef} id="work" className="work-section">
      <div className="work-head"><div><span className="section-eyebrow"><i /> SELECTED WORK / 2025—26</span><h2>Built with<br /><em>intention.</em></h2></div><p>A few things I’ve been making.<br />More stories are on the way.</p></div>
      <div className="project-bento">
        {projects.map((project, index) => (
          <button key={project.id} type="button" className={`project-tile project-tile-${index + 1}`} onClick={() => setSelected(project)} aria-label={`Open case study: ${project.title}`}>
            <div className="project-visual" style={{ '--project-accent': project.color }}><img src={project.banner} alt="" loading="lazy" /><span className="project-visual-wash" /><span className="project-index">0{index + 1}</span><span className="project-open"><ArrowUpRight size={19} /></span><span className="project-visual-label">{project.category}</span></div>
            <div className="project-card-copy"><div><h3>{project.title}</h3><p>{project.tagline}</p></div><span className="project-year">{project.year}</span></div>
          </button>
        ))}
      </div>
      {selected && <div className="case-study-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
        <article className="case-study-dialog" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
          <button className="case-study-close" type="button" onClick={() => setSelected(null)} aria-label="Close case study"><X /></button>
          <div className="case-study-hero" style={{ '--project-accent': selected.color }}><img src={selected.banner} alt="" /><span>{selected.category} · {selected.year}</span></div>
          <div className="case-study-content"><span className="section-eyebrow"><i /> CASE STUDY</span><h2 id="case-study-title">{selected.title}</h2><p className="case-study-lead">{selected.description}</p><div className="case-study-columns"><div><h3>THE APPROACH</h3><p>{selected.caseStudy}</p></div><div><h3>BUILT WITH</h3><div className="case-study-tags">{selected.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div></div><a className="case-study-link" href={selected.link} target="_blank" rel="noreferrer">View GitHub repo <ArrowDownRight size={18} /></a></div>
        </article>
      </div>}
    </section>
  );
}
