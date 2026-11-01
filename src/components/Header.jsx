import React from 'react';
import { RotateCcw, ArrowUpRight, Volume2, Mic } from 'lucide-react';

export default function Header({
  onReplayLoader,
  isVoiceActive,
  onToggleVoice,
  firstName = "Atharav",
  lastName = "Narang",
  hoverMessage = "• with passion"
}) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-[#090a0f]/75 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Top-Left Signature Name & Hover Morph */}
        <a
          href="#home"
          aria-label={`${firstName} ${lastName}`}
          className="group flex items-center gap-3 select-none cursor-pointer text-white"
        >
          {/* Rotating Monogram Emblem */}
          <div className="relative w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-[#a87cff] shadow-inner overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-[360deg] group-hover:border-[#a87cff]/40">
            <span className="relative z-10">AN</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#a87cff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Sliding Name Mask */}
          <div className="relative flex items-center h-7 overflow-hidden text-sm sm:text-base font-semibold tracking-tight">
            {/* First Name (slides left on hover) */}
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[115%]">
              {firstName}
            </span>

            {/* Last Name (shifts left into first name's spot) */}
            <span className="inline-block pl-1.5 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[64px] text-zinc-300 group-hover:text-white">
              {lastName}
            </span>

            {/* Hidden Message / Easter Egg (slides in from right) */}
            <span className="absolute left-[135px] whitespace-nowrap pl-2 text-xs font-mono text-[#a87cff] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[72px]">
              {hoverMessage}
            </span>
          </div>
        </a>

        {/* Center: Live Availability Badge */}
        <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>AVAILABLE FOR PROJECTS</span>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          {/* Voice Frequency Toggle */}
          <button
            onClick={onToggleVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#a87cff]/40 transition-colors"
            title={isVoiceActive ? "Mute Voice Visualizer" : "Activate Voice Visualizer"}
          >
            {isVoiceActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#a87cff]" />
                <span className="hidden sm:inline">Voice Pulse: On</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline">Voice Pulse: Off</span>
              </>
            )}
          </button>

          {/* Replay Capsule Loader */}
          <button
            onClick={onReplayLoader}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-[#a87cff]/50 transition-all hover:shadow-[0_0_20px_rgba(168,124,255,0.2)]"
            title="Replay Capsule Loading Sequence"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#a87cff] group-hover:-rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Replay Loader</span>
          </button>

          {/* Wispr Flow Link */}
          <a
            href="https://wisprflow.ai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <span>Wispr</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
