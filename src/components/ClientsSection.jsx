import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Quote } from 'lucide-react';

export default function ClientsSection() {
  return (
    <section className="relative w-full py-20 px-6 sm:px-12 max-w-7xl mx-auto z-20">
      
      {/* Section Subhead */}
      <div className="flex items-center gap-3 mb-10">
        <span className="w-2 h-2 rounded-full bg-[#a87cff]" />
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">
          Client Feedback & Endorsements
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.clients.map((client, idx) => (
          <div
            key={idx}
            className="group relative rounded-3xl border border-white/10 bg-[#121214]/60 p-8 backdrop-blur-md flex flex-col justify-between hover:border-white/25 transition-all duration-300"
          >
            <div>
              <Quote className="w-8 h-8 text-white/20 mb-6 group-hover:text-[#a87cff]/40 transition-colors" />
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic mb-8">
                "{client.message}"
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white">
                {client.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {client.name}
                </h4>
                <p className="text-xs font-mono text-zinc-400">
                  {client.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
