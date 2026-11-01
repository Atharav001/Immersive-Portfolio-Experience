import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Header({ onReplayLoader }) {
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.pause();
      setSoundOn(false);
    } else {
      audioRef.current.play().then(() => {
        setSoundOn(true);
      }).catch((e) => {
        console.warn('Audio play prevented:', e);
        setSoundOn(false);
      });
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src={PORTFOLIO_DATA.audio} loop preload="auto" />

      {/* Awwwards & CSS Design Awards Badges */}
      <div id="awwwards-badge-container" className="fixed top-1/2 -translate-y-1/2 left-0 z-40 flex flex-col gap-1 select-none pointer-events-auto">
        <a
          href="https://www.cssdesignawards.com/sites/yanne-sidibe-portfolio/45661/"
          target="_blank"
          rel="noopener noreferrer"
          title="CSS Design Awards"
          className="group block"
        >
          <div className="w-10 sm:w-12 h-14 sm:h-16 bg-[#141516]/80 backdrop-blur-md border border-white/10 rounded-r-lg flex flex-col items-center justify-center text-[9px] font-bold tracking-wider text-zinc-300 hover:text-white hover:bg-black transition-all">
            <span className="text-[10px] text-[#b4f16b]">CSS</span>
            <span className="text-[8px] opacity-70">DA</span>
          </div>
        </a>
        <a
          href="https://www.awwwards.com/sites/yanne-sidibe-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          title="Awwwards Site of the Day"
          className="group block"
        >
          <div className="w-10 sm:w-12 h-20 sm:h-24 bg-[#141516]/80 backdrop-blur-md border border-white/10 rounded-r-lg flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black transition-all">
            <span className="text-[9px] font-mono tracking-widest -rotate-90 whitespace-nowrap uppercase">
              HONORS
            </span>
          </div>
        </a>
      </div>

      {/* Top Header Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 h-24 px-6 sm:px-12 flex items-start justify-between pt-6 pointer-events-none">
        
        {/* Top-Left Signature Logo with Exact Hover Morph */}
        <a
          href="#home"
          aria-label={`${PORTFOLIO_DATA.firstname} ${PORTFOLIO_DATA.lastname}`}
          className="logo-link group flex items-center select-none pointer-events-auto cursor-pointer"
        >
          {/* Morphing Name Container */}
          <div className="name-container flex items-center h-7 overflow-hidden text-sm sm:text-base font-semibold tracking-tight text-[#f0f1fa]">
            <p className="first-name transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
              {PORTFOLIO_DATA.firstname}
            </p>
            <p className="last-name pl-1.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-zinc-300 group-hover:text-white">
              {PORTFOLIO_DATA.lastname}
            </p>
            <p className="msg-name absolute left-[125px] flex items-center gap-1.5 pl-1.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-[#a87cff]">
              <span>•</span>
              <span>with</span>
              <span>❤</span>
            </p>
          </div>

          {/* Rotating Geometric Emblem (Authentic Yanne Sidibé SVG glyph) */}
          <div className="logo-emblem ml-2.5 w-7 h-7 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
            <svg width="26" height="28" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M17 3.96C17 1.77295 15.3256 0 13.26 0H3.74C1.67446 0 0 1.77295 0 3.96V14.1695C0 16.3565 1.67446 18.1294 3.74 18.1294H13.26C15.3256 18.1294 17 19.9024 17 22.0894V32.04C17 34.227 18.6745 36 20.74 36H30.26C32.3255 36 34 34.227 34 32.04V21.8304C34 19.6434 32.3255 17.8705 30.26 17.8705H20.74C18.6745 17.8705 17 16.0975 17 13.9105V3.96Z"
                fill="#F0F1FA"
                fillRule="evenodd"
              />
              <path
                d="M6.92 12.7H6.3V12.05H7.05C7.3 12.05 7.48 12.01 7.6 11.92C7.73 11.84 7.84 11.7 7.93 11.49L8.31 10.69L8.22 11.1L5.72 6.06H6.5L7.95 9L8.5 10.21H8.56L9.09 8.99L10.46 6.06H11.24L8.56 11.69C8.44 11.94 8.31 12.13 8.15 12.28C8.01 12.43 7.83 12.54 7.63 12.6C7.43 12.67 7.2 12.7 6.92 12.7Z"
                fill="#141516"
              />
              <path
                d="M25.62 30.1C24.87 30.1 24.28 29.95 23.85 29.66C23.43 29.36 23.22 28.92 23.22 28.35V28.33H23.93V28.39C23.93 28.8 24.06 29.09 24.32 29.26C24.59 29.43 25.02 29.51 25.63 29.51C26.18 29.51 26.57 29.44 26.79 29.31C27.01 29.17 27.12 28.96 27.12 28.68C27.12 28.42 27.03 28.24 26.86 28.13C26.69 28.02 26.4 27.93 25.99 27.86L24.67 27.67C24.22 27.61 23.86 27.48 23.59 27.29C23.33 27.1 23.2 26.79 23.2 26.38C23.2 26.09 23.29 25.84 23.46 25.63C23.64 25.42 23.89 25.25 24.22 25.14C24.55 25.02 24.94 24.96 25.39 24.96C25.86 24.96 26.27 25.03 26.62 25.16C26.97 25.29 27.25 25.48 27.44 25.74C27.63 26 27.73 26.33 27.73 26.72V26.74H27.02V26.69C27.02 26.44 26.97 26.23 26.87 26.06C26.77 25.89 26.6 25.77 26.36 25.68C26.12 25.59 25.79 25.55 25.37 25.55C24.85 25.55 24.47 25.62 24.24 25.75C24.01 25.88 23.9 26.1 23.9 26.39C23.9 26.64 23.98 26.83 24.13 26.94C24.29 27.05 24.57 27.13 24.98 27.2L26.19 27.37C26.72 27.44 27.12 27.58 27.4 27.78C27.68 27.98 27.82 28.28 27.82 28.68C27.82 28.99 27.72 29.25 27.53 29.46C27.34 29.67 27.08 29.83 26.75 29.94C26.42 30.05 26.05 30.1 25.62 30.1Z"
                fill="#141516"
              />
            </svg>
          </div>
        </a>

        {/* Right Section: Sound Toggle & Stacked Right Navigation */}
        <div className="pointer-events-auto flex items-start gap-8 sm:gap-12 text-xs sm:text-sm font-medium">
          {/* Sound Toggle (Exact "Sound | OFF" / "Sound | ON") */}
          <button
            onClick={toggleSound}
            className="text-zinc-400 hover:text-white transition-colors font-sans pt-0.5 cursor-pointer flex items-center gap-1.5"
            title="Toggle background ambient sound"
          >
            <span>Sound |</span>
            <span className={soundOn ? 'text-[#b4f16b] font-bold' : 'text-zinc-500'}>
              {soundOn ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Stacked Vertical Right Nav */}
          <nav className="flex flex-col items-end gap-1.5 text-right font-sans">
            <a href="#home" className="rolling-link text-[#f0f1fa]" data-replace="Home">
              <span>Home</span>
            </a>
            <a href="#about" className="rolling-link text-[#f0f1fa]" data-replace="About">
              <span>About</span>
            </a>
            
            {/* Work link with rotating yellow-green 8-pointed star */}
            <a href="#work" className="rolling-link text-[#f0f1fa] flex items-center gap-1.5" data-replace="Work">
              <span>Work</span>
              <span className="inline-block text-[#d4f933] text-sm animate-[spin_8s_linear_infinite] select-none">
                ✱
              </span>
            </a>

            <a href="#contact" className="rolling-link text-[#f0f1fa]" data-replace="Contact">
              <span>Contact</span>
            </a>

          </nav>
        </div>

      </header>
    </>
  );
}
