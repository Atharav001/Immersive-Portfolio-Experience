import React, { useEffect, useRef } from 'react';

/** Scroll-pinned film stage with an extended hold on the final frame. */
export default function StorySection({ src = '/media/life-story.mp4' }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    if (!src) return undefined;
    let frame = 0;
    let targetTime = 0.6;
    const seek = () => {
      const video = videoRef.current;
      if (!video || video.seeking || video.readyState < 2) return;
      if (Math.abs(video.currentTime - targetTime) > 0.02) video.currentTime = targetTime;
    };
    const mapTimeline = (progress, duration) => {
      const visibleStart = Math.min(0.6, duration * 0.06);
      const visibleEnd = Math.max(visibleStart, duration - 0.04);
      return visibleStart + (visibleEnd - visibleStart) * progress;
    };
    const scrub = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;
        const rect = section.getBoundingClientRect();
        const entrance = Math.min(1, Math.max(0, (innerHeight - rect.top) / (innerHeight * 1.65)));
        const reveal = entrance * entrance * (3 - 2 * entrance);
        section.style.setProperty('--film-reveal', reveal.toFixed(4));
        if (!Number.isFinite(video.duration)) return;
        const progress = Math.min(1, Math.max(0, -rect.top / (section.offsetHeight - innerHeight)));
        section.querySelectorAll('.story-chapter').forEach((chapter, index) => {
          const center = 0.16 + index * 0.25;
          const visibility = Math.max(0, Math.min(1, (0.14 - Math.abs(progress - center)) / 0.055));
          chapter.style.opacity = visibility;
          chapter.style.transform = `translateY(${(1 - visibility) * 18}px)`;
          chapter.setAttribute('aria-hidden', visibility < 0.1 ? 'true' : 'false');
        });
        const filmProgress = Math.min(1, progress / 0.78);
        targetTime = mapTimeline(filmProgress, video.duration);
        seek();
      });
    };
    const ready = () => scrub();
    window.addEventListener('scroll', scrub, { passive: true });
    window.addEventListener('resize', scrub);
    const video = videoRef.current;
    scrub();
    video?.addEventListener('loadedmetadata', ready);
    video?.addEventListener('loadeddata', ready);
    video?.addEventListener('seeked', seek);
    if (video?.readyState >= 1) ready();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scrub);
      window.removeEventListener('resize', scrub);
      video?.removeEventListener('loadedmetadata', ready);
      video?.removeEventListener('loadeddata', ready);
      video?.removeEventListener('seeked', seek);
    };
  }, [src]);

  return (
    <section id="origin-story" ref={sectionRef} className="story-scroll-stage" aria-label="Life story film">
      <div className={`story-sticky${src ? ' has-film' : ''}`}>
        {src ? <video ref={videoRef} className="story-film" src={src} poster="/media/life-story-poster.jpg" muted playsInline preload="auto" aria-label="Scroll-controlled life story film" /> : null}
        <div className="story-chapters">
          <article className="story-chapter"><span>ABOUT ME</span><h2>Curiosity comes first.</h2><p>I’m Atharav, a computer science student in Bengaluru. I like understanding how things work — then building something of my own.</p></article>
          <article className="story-chapter"><span>WHAT I BUILD</span><h2>Ideas I can put to work.</h2><p>From tools that remember your browser tabs to research assistants and mindful scrolling apps, I explore problems through working projects.</p></article>
          <article className="story-chapter"><span>WHAT’S NEXT</span><h2>More to learn.<br />More to make.</h2><p>I’m exploring applied AI, frontend engineering, and interactive experiences. I’m open to collaborating with people who enjoy making useful things.</p></article>
        </div>
        <div className="story-scroll-cue"><span>SCROLL TO MOVE THROUGH THE STORY</span><i /></div>
      </div>
    </section>
  );
}
