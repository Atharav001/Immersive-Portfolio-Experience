import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function Header({ onReplayLoader }) {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <>
      <div className="honors-tab">
        <span>Honors</span>
      </div>

      {/* 2. Top Header Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 h-24 px-6 sm:px-12 flex items-start justify-between pt-6 pointer-events-none">
        
        {/* Top-Left Signature Logo with Exact Hover Morph */}
        <a
          href="#home"
          aria-label="Atharav Narang"
          className="logo-link group flex items-center select-none pointer-events-auto cursor-pointer"
        >
          {/* Morphing Name Container */}
          <div className="name-container flex items-center h-7 overflow-hidden text-sm sm:text-base font-semibold tracking-tight text-[#f0f1fa]">
            <p className="first-name transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
              Atharav
            </p>
            <p className="last-name pl-1.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-zinc-300 group-hover:text-white">
              Narang
            </p>
            <p className="msg-name absolute left-[125px] flex items-center gap-1.5 pl-1.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-[#a87cff]">
              <span>•</span>
              <span>with</span>
              <span>❤</span>
            </p>
          </div>

          {/* Rotating Geometric Emblem (White cube with glyph from screenshot) */}
          <div className="logo-emblem ml-2.5 w-6 h-6 rounded-md bg-[#f0f1fa] text-[#0a0a0a] flex items-center justify-center text-[10px] font-bold font-mono shadow-md transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
            <span className="relative -top-[1px]">AN</span>
          </div>
        </a>

        {/* Right Section: Sound Toggle & Stacked Right Navigation */}
        <div className="pointer-events-auto flex items-start gap-8 sm:gap-12 text-xs sm:text-sm font-medium">
          {/* Sound Toggle (Exact "Sound | OFF" / "Sound | ON") */}
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="text-zinc-400 hover:text-white transition-colors font-sans pt-0.5 cursor-pointer"
          >
            Sound | <span className={soundOn ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>{soundOn ? 'ON' : 'OFF'}</span>
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
