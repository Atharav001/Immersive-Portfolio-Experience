import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Design & Development'];

  const filteredWork = activeCategory === 'All'
    ? PORTFOLIO_DATA.work
    : PORTFOLIO_DATA.work.filter(item => item.category.includes(activeCategory));

  return (
    <section id="work" className="relative w-full py-28 px-6 sm:px-12 max-w-7xl mx-auto z-20">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#b4f16b]" />
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">
              Selected Works
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-august uppercase tracking-tight text-white">
            Projects <span className="text-zinc-500 font-mono text-xl sm:text-2xl font-normal">({PORTFOLIO_DATA.work.length})</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-bold shadow-lg'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredWork.map((project, idx) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between rounded-3xl overflow-hidden border border-white/10 bg-[#101012] p-6 sm:p-8 transition-all duration-500 hover:border-white/30 hover:-translate-y-1"
          >
            {/* Top Bar: Title, Category, Year, Arrow */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#a87cff] transition-colors">
                  {project.title}
                </h3>
              </div>

              <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/15 transition-all">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Banner Media Container */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 mb-6 border border-white/5">
              <img
                src={project.banner}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity mix-blend-color"
                style={{ backgroundColor: project.color }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              {/* Overlay Tagline */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs sm:text-sm text-zinc-300 font-sans line-clamp-2">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Description & Technologies */}
            <div className="mt-auto">
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}
