import React, { useState, useEffect, useRef } from 'react';

export default function CapsuleLoader({ onFinish, brandTitle = "WISPR FLOW / PORTFOLIO" }) {
  const [percent, setPercent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const wrapRef = useRef(null);

  // Mouse tracking for dynamic spotlight glow
  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wrapRef.current.style.setProperty('--mouse-x', `${x}px`);
    wrapRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Progressive simulated loader (0 to 100%)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Fast start, natural easing near 90%, then smooth finish to 100%
      if (current < 45) {
        current += Math.floor(Math.random() * 6) + 3;
      } else if (current < 85) {
        current += Math.floor(Math.random() * 4) + 2;
      } else if (current < 99) {
        current += 1;
      } else {
        current = 100;
        clearInterval(interval);
      }

      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);

        // Sequence after reaching 100%:
        // 1. Reveal "Welcome" by collapsing loading-container
        setTimeout(() => {
          setIsComplete(true);

          // 2. Trigger expansion into homepage
          setTimeout(() => {
            triggerOpenHomepage();
          }, 1100);
        }, 500);
      } else {
        setPercent(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const triggerOpenHomepage = () => {
    if (isClicked) return;
    setIsClicked(true);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 300);
    }, 950);
  };

  // Allow instant click to open if complete
  const handleCapsuleClick = () => {
    if (isComplete && !isClicked) {
      triggerOpenHomepage();
    }
  };

  return (
    <div className={`loading-screen ${isExiting ? 'opacity-0 pointer-events-none transition-opacity duration-300' : ''}`}>
      {/* Top Header with title and retro bouncing ball widget */}
      <div className="loading-header">
        <a href="#welcome" className="loader-title">
          <span className="w-2 h-2 rounded-full bg-[#a87cff] animate-ping inline-block mr-1"></span>
          {brandTitle}
        </a>

        {/* Bouncing Ball Loader Game */}
        <div className={`loaderGame ${isClicked ? 'loader-out' : ''}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, i) => (
                <div key={i} className="loaderGame-line" />
              ))}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>

      {/* Moving Background Marquee */}
      <div className="loading-marquee">
        <div className="loading-marquee-track">
          <span>WISPR FLOW</span>
          <span>VOICE ARCHITECT</span>
          <span>CREATIVE CAMPAIGNS</span>
          <span>STORYTELLER</span>
          <span>WISPR FLOW</span>
          <span>VOICE ARCHITECT</span>
          <span>CREATIVE CAMPAIGNS</span>
          <span>STORYTELLER</span>
        </div>
        <div className="loading-marquee-track" aria-hidden="true">
          <span>WISPR FLOW</span>
          <span>VOICE ARCHITECT</span>
          <span>CREATIVE CAMPAIGNS</span>
          <span>STORYTELLER</span>
          <span>WISPR FLOW</span>
          <span>VOICE ARCHITECT</span>
          <span>CREATIVE CAMPAIGNS</span>
          <span>STORYTELLER</span>
        </div>
      </div>

      {/* Center Capsule Pill Button */}
      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onClick={handleCapsuleClick}
        className={`loading-wrap ${isClicked ? 'loading-clicked' : ''}`}
        title={isComplete ? "Click to enter" : "Loading portfolio..."}
      >
        {/* Mouse interactive purple radial blur */}
        <div className="loading-hover" />

        <div className={`loading-button ${isComplete ? 'loading-complete' : ''}`}>
          {/* Phase 1: Loading XX% with blinking cursor */}
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-content-in">
                <span>LOADING</span>
                <span className="ml-2">{percent}%</span>
              </div>
            </div>
            <div className="loading-box" />
          </div>

          {/* Phase 2: Reveals "WELCOME" when loading finishes */}
          <div className="loading-content2">
            <span>WELCOME</span>
          </div>
        </div>
      </div>
    </div>
  );
}
