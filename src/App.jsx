import React, { lazy, Suspense, useState } from 'react';
import CapsuleLoader from './components/CapsuleLoader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ContactSection from './components/ContactSection';
import { PORTFOLIO_DATA } from './data/portfolioData';

const SuitUpExperience = lazy(() => import('./components/SuitUpExperience'));

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="portfolio-shell min-h-screen bg-[#0a0a0a] text-[#f0f1fa] font-sans selection:bg-[#a87cff] selection:text-black relative flex flex-col">
      
      {/* 1. Fast Capsule Loader (Kept as requested) */}
      {showLoader && (
        <CapsuleLoader
          brandTitle={`${PORTFOLIO_DATA.firstname.toUpperCase()} ${PORTFOLIO_DATA.lastname.toUpperCase()} / ${PORTFOLIO_DATA.jobTitle.toUpperCase()}`}
          onFinish={() => setShowLoader(false)}
        />
      )}

      {/* 2. Signature and availability header */}
      <Header />

      {/* 3. Homepage */}
      <main id="home" className="relative z-10 w-full flex-1 flex flex-col justify-center items-center">
        <HeroSection />
      </main>

      {/* Scroll-driven origin story sequence */}
      <Suspense fallback={<div id="origin-story" className="suitup-story suitup-fallback" aria-hidden="true" />}>
        <SuitUpExperience />
      </Suspense>

      {/* 4. About & Services Section */}
      <AboutSection />

      {/* 5. Selected Works & Projects Showcase */}
      <WorkSection />

      {/* 6. Contact */}
      <ContactSection email={PORTFOLIO_DATA.email} />

    </div>
  );
}
