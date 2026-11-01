import React, { useState } from 'react';
import CapsuleLoader from './components/CapsuleLoader';
import Header from './components/Header';
import MagneticHeroText from './components/MagneticHeroText';
import AudioVisualizer from './components/AudioVisualizer';
import ContactSection from './components/ContactSection';
import { Sparkles, Mic } from 'lucide-react';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(true);

  const replayLoader = () => {
    setShowLoader(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans selection:bg-[#a87cff] selection:text-black relative flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Capsule Loader (Speed-Optimized) */}
      {showLoader && (
        <CapsuleLoader
          brandTitle="ATHARAV NARANG / WISPR FLOW"
          onFinish={() => setShowLoader(false)}
        />
      )}

      {/* 2. Top-Left Animated Logo Header */}
      <Header
        firstName="Atharav"
        lastName="Narang"
        hoverMessage="• with passion"
        onReplayLoader={replayLoader}
        isVoiceActive={isVoiceActive}
        onToggleVoice={() => setIsVoiceActive(!isVoiceActive)}
      />

      {/* Ambient background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-[#a87cff]/10 rounded-full blur-[160px]" />
        <div className="absolute top-[45%] -left-40 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
      </div>

      {/* 3. Hero Section (Cursor-Reactive Magnetic Liquid Typography) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 sm:pt-40 px-6 max-w-7xl mx-auto w-full">
        
        {/* Voice Frequency Energy Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-md mb-6 shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a87cff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a87cff]"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
            Wispr Flow Challenge • Voice Storytelling
          </span>
        </div>

        {/* Cursor-Reactive Hero Text */}
        <MagneticHeroText
          firstName="ATHARAV"
          lastName="NARANG"
        />

        {/* Voice Frequency Spectrum Visualizer */}
        <div className="flex flex-col items-center mt-6 w-full max-w-lg">
          <AudioVisualizer isActive={isVoiceActive} />
          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
            Voice Capture Active • Spoken with Wispr Flow
          </p>
        </div>
      </main>

      {/* 4. Contact & Get In Touch Section (Anchor Footer) */}
      <ContactSection email="atharavnarang@gmail.com" />

    </div>
  );
}
