import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send } from 'lucide-react';

export default function ContactSection({ email = "atharavnarang@gmail.com" }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3500);
  };

  return (
    <footer id="contact" className="relative w-full mt-24 z-20">
      {/* Top curved card with backdrop blur and subtle top glow border (Exact Yanne Sidibé style) */}
      <div className="relative w-full rounded-t-[36px] sm:rounded-t-[48px] bg-[#0c0d12]/95 border-t border-x border-white/10 backdrop-blur-[50px] shadow-[0_-15px_50px_rgba(0,0,0,0.8)] px-6 sm:px-12 lg:px-20 pt-16 sm:pt-24 pb-12 overflow-hidden">
        
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#a87cff]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Section Title Row: Avatar + Outlined Monumental Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pb-12 border-b border-white/10">
          {/* Avatar Icon */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#a87cff] via-indigo-600 to-purple-800 p-0.5 shrink-0 shadow-lg shadow-[#a87cff]/20">
            <div className="w-full h-full rounded-full bg-[#141516] flex items-center justify-center font-august text-2xl sm:text-3xl font-bold text-white">
              AN
            </div>
          </div>

          {/* Outlined Monumental Title (Exact Yanne Sidibé style) */}
          <h2 className="outlined-title font-august text-[clamp(2.5rem,7vw,6.5rem)] leading-none uppercase text-left tracking-[0.04em]">
            Let's build your idea together :)
          </h2>
        </div>

        {/* Two-Column Grid: Left Contact Form, Right Direct Details & Social Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pt-12">
          
          {/* Column 1: Interactive Message / Project Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name Input */}
              <div className="relative border-b border-white/15 focus-within:border-[#a87cff] transition-colors pb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                  01 • What's your name?
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent text-lg sm:text-xl text-white placeholder-zinc-600 focus:outline-none font-sans"
                />
              </div>

              {/* Email Input */}
              <div className="relative border-b border-white/15 focus-within:border-[#a87cff] transition-colors pb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                  02 • What's your email?
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent text-lg sm:text-xl text-white placeholder-zinc-600 focus:outline-none font-sans"
                />
              </div>

              {/* Message Input */}
              <div className="relative border-b border-white/15 focus-within:border-[#a87cff] transition-colors pb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                  03 • Tell me about your project or idea
                </label>
                <textarea
                  rows={3}
                  placeholder="Hello Atharav, I'd like to talk about..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent text-lg sm:text-xl text-white placeholder-zinc-600 focus:outline-none font-sans resize-none"
                />
              </div>

              {/* Send Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#f0f1fa] text-[#0a0a0a] font-semibold text-sm hover:bg-white transition-all shadow-xl hover:shadow-[#a87cff]/20 active:scale-95 cursor-pointer"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Direct Contact & Social Links (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            {/* Contact Details */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9BA2AF]">
                Contact Details
              </span>

              <div className="mt-2 flex items-center gap-3">
                <a
                  href={`mailto:${email}`}
                  className="rolling-link text-lg sm:text-xl font-medium text-[#f0f1fa]"
                  data-replace={email}
                >
                  <span>{email}</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="text-sm font-sans text-zinc-400 mt-1">
                Based in India • Available Worldwide
              </p>
            </div>

            {/* Social Media Links with Exact Rolling Hover Effect */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9BA2AF]">
                Social Media
              </span>

              <div className="mt-2 flex flex-col items-start gap-3 text-base sm:text-lg">
                <a
                  href="https://github.com/Atharav001"
                  target="_blank"
                  rel="noreferrer"
                  className="rolling-link"
                  data-replace="GitHub"
                >
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rolling-link"
                  data-replace="LinkedIn"
                >
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rolling-link"
                  data-replace="Twitter / X"
                >
                  <span>Twitter / X</span>
                </a>

                <a
                  href="https://wisprflow.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="rolling-link text-[#a87cff]"
                  data-replace="Wispr Flow Story"
                >
                  <span>Wispr Flow Story</span>
                </a>
              </div>
            </div>

            {/* Availability Note */}
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#219653] animate-pulse" />
              <span>Available for freelance & full-time roles</span>
            </div>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} ATHARAV NARANG</p>
          <p>BUILT FOR WISPR FLOW CHALLENGE • VOICE FIRST</p>
        </div>
      </div>
    </footer>
  );
}
