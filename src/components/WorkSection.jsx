import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function WorkSection() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    let frame = 0;
    const stage = node.parentElement.parentElement;
    const sizeStage = () => {
      stage.style.height = `${node.offsetHeight + window.innerHeight}px`;
    };
    sizeStage();
    const observer = new ResizeObserver(sizeStage);
    observer.observe(node);
    const updateReveal = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / window.innerHeight));
        const slide = progress * progress * (3 - 2 * progress);
        // A viewport-sized sticky shell owns the pin, not the tall grid.
        // After the horizontal travel, move the grid upward inside that shell.
        const vertical = Math.min(Math.max(0, node.offsetHeight - window.innerHeight), Math.max(0, -rect.top - window.innerHeight));
        node.style.setProperty('--work-content-y', `${-vertical}px`);
        node.style.setProperty('--work-clip', '0%');
        node.style.setProperty('--work-shift', `${(1 - slide) * 100}vw`);
        node.style.setProperty('--work-pin', `${Math.min(window.innerHeight, Math.max(0, -rect.top))}px`);
        const film = document.querySelector('.story-sticky');
        if (film) film.style.transform = `translate(${-slide * 100}vw, ${progress * window.innerHeight}px)`;
        node.classList.toggle('is-visible', progress > 0.12);
      });
    };
    updateReveal();
    window.addEventListener('scroll', updateReveal, { passive: true });
    window.addEventListener('resize', updateReveal);
    window.addEventListener('resize', sizeStage);
    window.addEventListener('hashchange', updateReveal);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', sizeStage);
      window.removeEventListener('scroll', updateReveal);
      window.removeEventListener('resize', updateReveal);
      window.removeEventListener('hashchange', updateReveal);
    };
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
    <div className="work-slide-stage"><div className="work-slide-viewport"><section ref={sectionRef} id="work" className="work-section">
      <div className="work-head"><div><span className="section-eyebrow">PROJECTS</span><h2>Things I’ve<br /><em>built.</em></h2></div><p>Browser tools, applied AI, and experiments.<br />Pick a project to see how it works.</p></div>
      <div className="project-bento">
        {projects.map((project, index) => (
          <button key={project.id} type="button" className={`project-tile project-tile-${index + 1}`} onClick={() => setSelected(project)} aria-label={`Open case study: ${project.title}`}>
            <div className="project-visual" style={{ '--project-accent': project.color }}><img src={project.banner} alt="" loading="lazy" /><span className="project-visual-wash" /><span className="project-open"><ArrowUpRight size={19} /></span><span className="project-visual-label">{project.category}</span></div>
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
    </section></div></div>
  );
}
