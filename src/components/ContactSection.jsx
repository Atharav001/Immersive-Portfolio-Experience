import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactSection({ email = "atharavnarang@gmail.com" }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative w-full mt-32 z-20">
      {/* Top curved card with backdrop blur and ambient lighting */}
      <div className="relative w-full max-w-7xl mx-auto rounded-t-[36px] sm:rounded-t-[54px] bg-gradient-to-b from-zinc-900/90 via-[#0e0f16]/95 to-[#08080c] border-t border-x border-white/10 backdrop-blur-2xl p-8 sm:p-14 lg:p-20 shadow-[0_-25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Soft radial background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#a87cff]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Eyebrow Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800/60 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#a87cff]" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Have a bold idea? Let's build it.
            </span>
          </div>

          {/* Monumental Headline */}
          <h2 className="text-[clamp(3.2rem,9.5vw,9rem)] font-black uppercase tracking-tight leading-[0.92] text-zinc-100 selection:bg-[#a87cff] selection:text-black transition-transform duration-500 hover:scale-[1.01]">
            Get In <span className="bg-gradient-to-r from-[#a87cff] via-indigo-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Ready to shape creative campaigns, launch voice-first products, or turn ambitious stories into interactive reality.
          </p>

          {/* Central Interactive Magnetic Email Card */}
          <div className="mt-12 w-full max-w-2xl p-4 sm:p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 pl-2">
              <div className="w-12 h-12 rounded-2xl bg-[#a87cff]/15 border border-[#a87cff]/30 flex items-center justify-center text-[#a87cff]">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Direct Email</span>
                <a
                  href={`mailto:${email}`}
                  className="text-base sm:text-lg font-mono font-medium text-white hover:text-[#a87cff] transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono font-medium text-zinc-200 border border-zinc-700/60 transition-all active:scale-95"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#a87cff] hover:bg-[#b994ff] text-black font-semibold text-xs transition-all shadow-lg shadow-[#a87cff]/20 active:scale-95"
              >
                <span>Write Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono">
            <a
              href="https://github.com/Atharav001"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#a87cff]/50 transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-colors flex items-center gap-1.5"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-pink-500/50 transition-colors flex items-center gap-1.5"
            >
              <span>Twitter / X</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="https://wisprflow.ai"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-[#a87cff] hover:border-[#a87cff]/50 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#a87cff]" />
              <span>Wispr Flow Story</span>
            </a>
          </div>

          {/* Clean Bottom Copyright & Credentials */}
          <div className="mt-16 pt-8 w-full border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for campaigns & engineering roles</span>
            </div>
            <div>
              © {new Date().getFullYear()} Atharav Narang • Built with Voice
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
