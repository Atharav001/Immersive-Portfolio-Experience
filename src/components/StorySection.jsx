import React, { useEffect, useRef } from 'react';

/** Scroll-pinned film stage with an extended hold on the final frame. */
export default function StorySection({ src = '/media/life-story.mp4' }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    if (!src) return undefined;
    let frame = 0;
    const mapTimeline = (progress, duration) => {
      const visibleStart = Math.min(0.6, duration * 0.06);
      const visibleEnd = Math.max(visibleStart, duration - 0.04);
      if (progress <= 0.36) return visibleStart + (3.9 - visibleStart) * (progress / 0.36);
      if (progress <= 0.68) return 4.06 + (6.94 - 4.06) * ((progress - 0.36) / 0.32);
      return 7.06 + (visibleEnd - 7.06) * ((progress - 0.68) / 0.32);
    };
    const scrub = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video || !Number.isFinite(video.duration)) return;
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (section.offsetHeight - innerHeight)));
        const filmProgress = Math.min(1, progress / 0.78);
        const targetTime = mapTimeline(filmProgress, video.duration);
        if (Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime;
      });
    };
    const ready = () => scrub();
    window.addEventListener('scroll', scrub, { passive: true });
    window.addEventListener('resize', scrub);
    const video = videoRef.current;
    video?.addEventListener('loadedmetadata', ready);
    video?.addEventListener('loadeddata', ready);
    if (video?.readyState >= 1) ready();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scrub);
      window.removeEventListener('resize', scrub);
      video?.removeEventListener('loadedmetadata', ready);
      video?.removeEventListener('loadeddata', ready);
    };
  }, [src]);

  return (
    <section id="origin-story" ref={sectionRef} className="story-scroll-stage" aria-label="Life story film">
      <div className={`story-sticky${src ? ' has-film' : ''}`}>
        {src ? <video ref={videoRef} className="story-film" src={src} poster="/media/life-story-poster.jpg" muted playsInline preload="auto" aria-label="Scroll-controlled life story film" /> : null}
        <div className="story-caption"><span className="story-index">A LIFE IN FRAMES</span><p>The story unfolds<br />one moment at a time.</p></div>
        <div className="story-scroll-cue"><span>SCROLL TO MOVE THROUGH THE STORY</span><i /></div>
      </div>
    </section>
  );
}
