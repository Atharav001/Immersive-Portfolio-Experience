import React, { useEffect, useRef } from 'react';

/** Scroll-pinned film stage. Drop a file at /media/life-story.mp4 when it is ready. */
export default function StorySection({ src = null }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    if (!src) return undefined;
    let frame = 0;
    const scrub = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video || !Number.isFinite(video.duration)) return;
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (section.offsetHeight - innerHeight)));
        if (Math.abs(video.currentTime - progress * video.duration) > 0.035) video.currentTime = progress * video.duration;
      });
    };
    const ready = () => scrub();
    window.addEventListener('scroll', scrub, { passive: true });
    window.addEventListener('resize', scrub);
    videoRef.current?.addEventListener('loadedmetadata', ready);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', scrub); window.removeEventListener('resize', scrub); videoRef.current?.removeEventListener('loadedmetadata', ready); };
  }, [src]);

  return (
    <section id="origin-story" ref={sectionRef} className="story-scroll-stage" aria-label="Life story film">
      <div className="story-sticky">
        {src ? <video ref={videoRef} className="story-film" src={src} muted playsInline preload="metadata" aria-label="Scroll-controlled life story film" /> : null}
        <div className="story-ambient" aria-hidden="true" />
        <div className="story-topline"><span>PERSONAL ARCHIVE</span><span>01 — 06</span></div>
        <div className="story-caption"><span className="story-index">A LIFE IN FRAMES</span><p>The story unfolds<br />one moment at a time.</p></div>
        <div className="story-scroll-cue"><span>SCROLL TO MOVE THROUGH THE STORY</span><i /></div>
      </div>
    </section>
  );
}
