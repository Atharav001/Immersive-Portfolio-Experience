import React, { useEffect, useRef } from 'react';

/** Scroll-pinned film stage with an extended hold on the final frame. */
export default function StorySection({ src = '/media/life-story.mp4' }) {
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
        const filmProgress = Math.min(1, progress / 0.78);
        const targetTime = filmProgress >= 1 ? Math.max(0, video.duration - 0.025) : filmProgress * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime;
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
      <div className={`story-sticky${src ? ' has-film' : ''}`}>
        {src ? <video ref={videoRef} className="story-film" src={src} muted playsInline preload="auto" aria-label="Scroll-controlled life story film" /> : null}
        <div className="story-ambient" aria-hidden="true" />
        <div className="story-caption"><span className="story-index">A LIFE IN FRAMES</span><p>The story unfolds<br />one moment at a time.</p></div>
        <div className="story-scroll-cue"><span>SCROLL TO MOVE THROUGH THE STORY</span><i /></div>
      </div>
    </section>
  );
}
