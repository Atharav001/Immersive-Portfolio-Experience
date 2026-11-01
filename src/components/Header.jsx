import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function Header({ onReplayLoader }) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 h-20 px-6 sm:px-10 flex items-center justify-between backdrop-blur-md bg-[#0a0a0a]/60 border-b border-white/5 transition-all">
      {/* 1. Top-Left Logo with Exact Yanne Sidibé Hover Animation */}
      <a href="#home" className="logo-link group flex items-center select-none" aria-label="Atharav Narang">
        {/* Rotating Geometric Emblem */}
        <div className="logo-emblem w-7 h-7 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
          <svg width="24" height="26" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 3.96C17 1.77295 15.3256 0 13.26 0H3.74C1.67446 0 0 1.77295 0 3.96V14.1695C0 16.3565 1.67446 18.1294 3.74 18.1294H13.26C15.3256 18.1294 17 19.9024 17 22.0894V32.04C17 34.227 18.6745 36 20.74 36H30.26C32.3255 36 34 34.227 34 32.04V21.8304C34 19.6434 32.3255 17.8705 30.26 17.8705H20.74C18.6745 17.8705 17 16.0975 17 13.9105V3.96Z"
              fill="#F0F1FA"
            />
          </svg>
        </div>

        {/* Sliding Name Mask Container */}
        <div className="name-container ml-2.5 flex items-center h-6 overflow-hidden text-sm sm:text-base font-semibold tracking-tight text-[#f0f1fa]">
          <p className="first-name transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
            Atharav
          </p>
          <p className="last-name pl-1.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
            Narang
          </p>
          <p className="msg-name absolute left-[120px] flex items-center gap-1.5 pl-1.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-[#a87cff]">
            <span>•</span>
            <span>with</span>
            <span>❤</span>
          </p>
        </div>
      </a>

      {/* 2. Center Availability Status Pill */}
      <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#219653]/40 bg-[#219653]/15 text-xs font-medium text-[#f0f1fa]">
        <span className="text-[11px] uppercase tracking-wider text-zinc-300">available now for work</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#219653] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#219653]"></span>
        </span>
      </div>

      {/* 3. Right Navigation with Exact Rolling Text-Swap Hover Links */}
      <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium">
        <a href="#home" className="rolling-link" data-replace="Home">
          <span>Home</span>
        </a>
        <a href="#about" className="rolling-link" data-replace="About">
          <span>About</span>
        </a>
        <a href="#contact" className="rolling-link" data-replace="Contact">
          <span>Contact</span>
        </a>

        {/* Fast Replay Capsule Loader button */}
        <button
          onClick={onReplayLoader}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-[#a87cff]/50 transition-colors"
          title="Replay fast capsule loader"
        >
          <RotateCcw className="w-3 h-3 text-[#a87cff]" />
          <span className="hidden sm:inline">Loader</span>
        </button>
      </nav>
    </header>
  );
}
