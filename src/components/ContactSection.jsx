import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection({ email = PORTFOLIO_DATA.email }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    services: [],
    budget: '',
    message: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const toggleService = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== serviceName)
          : [...prev.services, serviceName],
      };
    });
  };

  const selectBudget = (budget) => {
    setFormData((prev) => ({
      ...prev,
      budget: prev.budget === budget ? '' : budget,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="contact-panel mt-20">
      <div className="contact-inner">
        
        {/* Top Banner Row */}
        <div className="contact-cta-row">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <p className="contact-kicker">HAVE A PROJECT IN MIND?</p>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-[#b4f16b]" />
              <span>{PORTFOLIO_DATA.availability}</span>
            </div>
          </div>

          <a className="contact-cta group" href={`mailto:${email}`}>
            <span>
              Let's work<br className="sm:hidden" /> together
            </span>
            <ArrowUpRight aria-hidden="true" className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
          </a>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <a className="contact-email hover:text-[#a87cff] transition-colors" href={`mailto:${email}`}>
              {email}
            </a>

            {/* Video Drone Capsule Preview from yannesidibe.com */}
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-10 h-6 rounded-md overflow-hidden bg-black/40 relative">
                <video
                  src={PORTFOLIO_DATA.droneVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Studio Reel
              </span>
            </div>
          </div>
        </div>

        {/* 6-Step Interactive Project Inquiry Form (From Yanne Sidibé Contact System) */}
        <div className="my-16 p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0e0e11]/80 backdrop-blur-xl">
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-[#a87cff] mb-2">
              Project Inquiry
            </p>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Tell me about your project
            </h3>
          </div>

          {submitted ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-16 h-16 text-[#b4f16b] mb-4 animate-bounce" />
              <h4 className="text-2xl font-bold text-white mb-2">
                Message Received!
              </h4>
              <p className="text-sm text-zinc-400 max-w-md">
                Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 rounded-full border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-white transition-all"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              
              {/* 01. What's your name? */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10 pb-6 border-b border-white/10">
                <span className="text-xl sm:text-2xl font-mono text-zinc-500 w-12">
                  01.
                </span>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    What's your name? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-lg sm:text-xl text-white placeholder-zinc-600 focus:outline-none focus:placeholder-zinc-700"
                  />
                </div>
              </div>

              {/* 02. What's the name of your organization? */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10 pb-6 border-b border-white/10">
                <span className="text-xl sm:text-2xl font-mono text-zinc-500 w-12">
                  02.
                </span>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    What's the name of your organization?
                  </label>
                  <input
                    type="text"
                    placeholder="John & Co"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent text-lg sm:text-xl text-white placeholder-zinc-600 focus:outline-none focus:placeholder-zinc-700"
                  />
                </div>
              </div>

              {/* 03. What services are you looking for? */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 pb-6 border-b border-white/10">
                <span className="text-xl sm:text-2xl font-mono text-zinc-500 w-12 pt-1">
                  03.
                </span>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    What services are you looking for?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {PORTFOLIO_DATA.services.map((service) => {
                      const isSelected = formData.services.includes(service.name);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.name)}
                          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black font-semibold'
                              : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {service.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 04. What's your budget? */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 pb-6 border-b border-white/10">
                <span className="text-xl sm:text-2xl font-mono text-zinc-500 w-12 pt-1">
                  04.
                </span>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    What's your budget?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {PORTFOLIO_DATA.budgetOptions.map((budget) => {
                      const isSelected = formData.budget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => selectBudget(budget)}
                          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#a87cff] text-black font-bold'
                              : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 05. Tell me about your project */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 pb-6 border-b border-white/10">
                <span className="text-xl sm:text-2xl font-mono text-zinc-500 w-12 pt-1">
                  05.
                </span>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Tell me about your project *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Hello Yanne, can you help me with..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent text-lg text-white placeholder-zinc-600 focus:outline-none focus:placeholder-zinc-700 resize-none"
                  />
                </div>
              </div>

              {/* 06. What's your email? */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10 pb-6 border-b border-white/10">
                <span className="text-xl sm:text-2xl font-mono text-zinc-500 w-12">
                  06.
                </span>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    What's your email? *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@doe.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent text-lg sm:text-xl text-white placeholder-zinc-600 focus:outline-none focus:placeholder-zinc-700"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="group px-8 py-4 rounded-full bg-white text-black font-semibold text-sm sm:text-base flex items-center gap-3 hover:bg-[#a87cff] hover:text-black transition-all duration-300 cursor-pointer shadow-xl hover:scale-105"
                >
                  <span>Send message</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Metadata Footer Grid */}
        <div className="contact-meta-grid">
          <div>
            <h3>Local Time</h3>
            <p>Paris / CET · <CETClock /></p>
          </div>
          <div>
            <h3>Version</h3>
            <p>{PORTFOLIO_DATA.version}</p>
          </div>
          <div>
            <h3>Social media</h3>
            {PORTFOLIO_DATA.socials.map((s, idx) => (
              <a key={idx} href={s.url} target="_blank" rel="noreferrer">
                {s.name} ↗
              </a>
            ))}
          </div>
          <div>
            <h3>Say hello</h3>
            <a href={`mailto:${email}`}>Email ↗</a>
            <p>Based in France<br />Available worldwide</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="contact-bottom">
          <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.firstname} {PORTFOLIO_DATA.lastname}</span>
          <span>Designed & built with care</span>
          <a href="#home" className="hover:text-white transition-colors">Back to top ↑</a>
        </div>

      </div>
    </footer>
  );
}

function CETClock() {
  const [time, setTime] = React.useState(() =>
    new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
    })
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return <>{time}</>;
}
