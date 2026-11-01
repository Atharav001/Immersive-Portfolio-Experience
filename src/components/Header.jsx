import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function Header({ onReplayLoader }) {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <>
      {/* 1. Left Edge Fixed Awards & Honors Tab (Exact yannesidibe.com sidebar) */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center bg-white text-[#141516] rounded-r-xl py-3 px-1.5 shadow-2xl border-y border-r border-white/20 select-none">
        {/* CSSDA Logo */}
        <div className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-[8px] font-bold mb-2">
          ★
        </div>

        {/* Awwwards W. Logo */}
        <div className="font-serif font-black text-xs leading-none mb-3">
          W.
        </div>

        {/* Vertical "Honors" text */}
        <div className="text-[10px] font-medium tracking-widest [writing-mode:vertical-rl] rotate-180 text-zinc-700 py-1">
          Honors
        </div>
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

        {/* Center Pill: "available now for work 🟢" (Exact screenshot design) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-2xl border-2 border-[#219653] bg-[#219653]/20 backdrop-blur-md text-xs font-semibold text-[#f0f1fa] shadow-[0_0_20px_rgba(33,150,83,0.2)]">
          <span className="tracking-wide text-zinc-200">available now for work</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#219653] shadow-[0_0_8px_#219653]" />
        </div>

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

            {/* Quick Replay Loader */}
            <button
              onClick={onReplayLoader}
              className="mt-2 text-[10px] font-mono text-zinc-500 hover:text-[#a87cff] flex items-center gap-1 transition-colors cursor-pointer"
              title="Test fast capsule loader"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>
          </nav>
        </div>

      </header>
    </>
  );
}
