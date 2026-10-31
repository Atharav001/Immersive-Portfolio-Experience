import React, { useState } from 'react';
import CapsuleLoader from './components/CapsuleLoader';
import AudioVisualizer from './components/AudioVisualizer';
import {
  Mic,
  Sparkles,
  Compass,
  Lightbulb,
  Heart,
  Brain,
  RotateCcw,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Volume2
} from 'lucide-react';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(true);

  const replayLoader = () => {
    setShowLoader(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans selection:bg-[#a87cff] selection:text-black relative">
      {/* 1. Exact Capsule Loader from Redoyanul Haque */}
      {showLoader && (
        <CapsuleLoader
          brandTitle="WISPR FLOW / ATHARAV"
          onFinish={() => setShowLoader(false)}
        />
      )}

      {/* Ambient background glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#a87cff]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-32 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 bg-[#090a0f]/80 z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#a87cff] to-indigo-500 flex items-center justify-center font-bold text-black shadow-lg shadow-[#a87cff]/30">
              W
            </div>
            <div>
              <div className="font-semibold tracking-tight text-sm text-white">Wispr Flow Challenge</div>
              <div className="text-[11px] text-zinc-400 font-mono">Immersive Storytelling Engine</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Replay Capsule Loader Button */}
            <button
              onClick={replayLoader}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-[#a87cff]/50 transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,124,255,0.25)]"
              title="Test & watch the capsule loader animation again"
            >
              <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300 text-[#a87cff]" />
              <span>Replay Capsule Loader</span>
            </button>

            <a
              href="https://wisprflow.ai"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
            >
              <span>Wispr Flow</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 max-w-7xl mx-auto px-6 pt-16 pb-24 w-full">
          {/* Voice Prompt Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-md shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a87cff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a87cff]"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Spoken With Voice • Built for Emergent
              </span>
              <button
                onClick={() => setIsVoiceActive(!isVoiceActive)}
                className="ml-1 p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="Toggle Voice Pulse"
              >
                {isVoiceActive ? <Volume2 className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-zinc-600" />}
              </button>
            </div>
          </div>

          {/* Hero Typography */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              Not a standard resume.{' '}
              <span className="bg-gradient-to-r from-[#a87cff] via-indigo-400 to-pink-400 bg-clip-text text-transparent">
                An interactive window into who I am.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Crafted to grow Wispr Flow across India. A living canvas forged from the finest web experiences, powered by voice-first thought.
            </p>

            {/* Voice Wave Visualizer */}
            <div className="flex flex-col items-center pt-2 pb-4">
              <AudioVisualizer isActive={isVoiceActive} />
              <span className="text-[11px] font-mono text-zinc-500 tracking-wider">
                AUDIO FREQUENCY RESPONSE • WISPR FLOW VOICE CAPTURE
              </span>
            </div>
          </div>

          {/* Challenge Brief Interactive Blueprint */}
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#a87cff]" />
                  The Wispr Story Pillars
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Ready to be populated with your chosen website references and animations
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-500">
                PHASE 01: CAPSULE LOADER ACTIVE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1: The Chances I Took */}
              <div className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-[#a87cff]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,124,255,0.1)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#a87cff]/10 border border-[#a87cff]/20 flex items-center justify-center text-[#a87cff]">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#a87cff]">Pillar 01</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#a87cff] transition-colors">
                      The Chances I Took
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Unconventional leaps, building in the open, and betting on high-conviction ideas before anyone else did.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Slot for Web Reference #2</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 2: The Mistakes I Learned From */}
              <div className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">Pillar 02</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-indigo-400 transition-colors">
                      Mistakes Learned From
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Failed launches, misjudged timelines, and the brutal feedback loops that forged resilient product instinct.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Slot for Web Reference #3</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 3: What I Care About */}
              <div className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-pink-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-pink-400">Pillar 03</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-pink-400 transition-colors">
                      What I Care About
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Product taste, the exponential growth of Indian tech, and human-computer interfaces that disappear.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Slot for Web Reference #4</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Pillar 4: How I Think */}
              <div className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-teal-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">Pillar 04</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-teal-400 transition-colors">
                      How I Think
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    First principles reasoning, compounding daily experiments, and translating wild creative thoughts into reality.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Slot for Web Reference #5</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Status Box */}
          <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-zinc-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#a87cff]/10 flex items-center justify-center text-[#a87cff]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Next Link & Element Ready</h4>
                <p className="text-xs text-zinc-400">
                  Paste the next website link anytime. We will extract its best interactive or 3D elements and merge them seamlessly into this stack!
                </p>
              </div>
            </div>
            <button
              onClick={replayLoader}
              className="px-4 py-2 rounded-xl bg-[#a87cff] text-black font-semibold text-xs hover:bg-[#b994ff] transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Preview Capsule Loader</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-white/5 py-8 text-center text-xs text-zinc-500 font-mono">
          BUILT FOR WISPR FLOW CHALLENGE • VOICE FIRST • REACT + VITE + TAILWIND
        </footer>
      </div>
    </div>
  );
}
