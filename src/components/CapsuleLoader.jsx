import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function CapsuleLoader({ onFinish, brandTitle = "ATHARAV NARANG / WISPR FLOW" }) {
  const [percent, setPercent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const wrapRef = useRef(null);
  const marqueeItems = [
    `${PORTFOLIO_DATA.firstname} ${PORTFOLIO_DATA.lastname}`,
    PORTFOLIO_DATA.role,
    PORTFOLIO_DATA.city,
    PORTFOLIO_DATA.location,
  ];

  // Mouse tracking for dynamic spotlight glow
  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wrapRef.current.style.setProperty('--mouse-x', `${x}px`);
    wrapRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Ultra-fast and snappy progressive loader (completes in ~600ms)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < 50) {
        current += Math.floor(Math.random() * 12) + 10;
      } else if (current < 90) {
        current += Math.floor(Math.random() * 8) + 8;
      } else if (current < 99) {
        current += Math.floor(Math.random() * 4) + 3;
      } else {
        current = 100;
      }

      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);

        // Fast transition into "Welcome"
        setTimeout(() => {
          setIsComplete(true);

          // Fast iris zoom expansion into homepage
          setTimeout(() => {
            triggerOpenHomepage();
          }, 450);
        }, 150);
      } else {
        setPercent(current);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const triggerOpenHomepage = () => {
    if (isClicked) return;
    setIsClicked(true);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 150);
    }, 550);
  };

  // Allow instant click to open once complete
  const handleCapsuleClick = () => {
    if (isComplete && !isClicked) {
      triggerOpenHomepage();
    }
  };

  return (
    <div className={`loading-screen ${isExiting ? 'opacity-0 pointer-events-none transition-opacity duration-150' : ''}`}>
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
          {marqueeItems.map((item, index) => <span key={`marquee-a-${index}`}>{item}</span>)}
          {marqueeItems.map((item, index) => <span key={`marquee-b-${index}`}>{item}</span>)}
        </div>
        <div className="loading-marquee-track" aria-hidden="true">
          {marqueeItems.map((item, index) => <span key={`marquee-c-${index}`}>{item}</span>)}
          {marqueeItems.map((item, index) => <span key={`marquee-d-${index}`}>{item}</span>)}
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
