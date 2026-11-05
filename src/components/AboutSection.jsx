import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Box, Code2, MousePointer2 } from 'lucide-react';

export default function AboutSection() {
  const serviceIcons = {
    dev: <Code2 className="w-5 h-5 text-[#a87cff]" />,
    ux: <MousePointer2 className="w-5 h-5 text-[#b4f16b]" />,
    three: <Box className="w-5 h-5 text-[#00c0ff]" />,
  };

  return (
    <section id="about" className="relative w-full py-28 px-6 sm:px-12 max-w-7xl mx-auto z-20">
      
      {/* Section Subhead */}
      <div className="flex items-center gap-3 mb-10">
        <span className="w-2 h-2 rounded-full bg-[#a87cff]" />
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">
          About & Services
        </span>
      </div>

      {/* Main Grid: Large statement + Avatar Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        
        {/* Left: Big Statement */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#f0f1fa] leading-[1.25]">
            {PORTFOLIO_DATA.about}
          </h2>

          <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-mono text-zinc-400">
            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5">Frontend Development</span>
            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5">Interactive 3D</span>
            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5">Based in India</span>
          </div>
        </div>

        {/* Right: Framed Profile Card */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative group w-64 sm:w-72 rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 to-transparent p-3 shadow-2xl backdrop-blur-md">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src={PORTFOLIO_DATA.picture}
                alt="Red and gold gauntlet concept with a glowing repulsor"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm tracking-wide">
                    Current focus
                  </p>
                  <p className="text-zinc-400 text-xs font-mono">
                    Immersive portfolio
                  </p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#b4f16b] shadow-[0_0_8px_#b4f16b]" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Current areas of focus */}
      <div className="mt-12">
        <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-6">
          Areas of Expertise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl border border-white/10 bg-[#121214]/60 p-8 backdrop-blur-md hover:border-white/25 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-sm text-zinc-500 group-hover:text-[#a87cff] transition-colors">
                  {service.number}
                </span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  {serviceIcons[service.id]}
                </div>
              </div>

              <h4 className="text-xl font-semibold text-white mb-3">
                {service.name}
              </h4>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
