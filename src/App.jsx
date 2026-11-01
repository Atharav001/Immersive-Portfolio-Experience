import React, { useState } from 'react';
import CapsuleLoader from './components/CapsuleLoader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import { PORTFOLIO_DATA } from './data/portfolioData';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f1fa] font-sans selection:bg-[#a87cff] selection:text-black relative flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Fast Capsule Loader (Kept as requested) */}
      {showLoader && (
        <CapsuleLoader
          brandTitle={`${PORTFOLIO_DATA.firstname.toUpperCase()} ${PORTFOLIO_DATA.lastname.toUpperCase()} / ${PORTFOLIO_DATA.role.toUpperCase()}`}
          onFinish={() => setShowLoader(false)}
        />
      )}

      {/* 2. Minimal signature and availability bar */}
      <Header />

      {/* 3. Liquid type homepage */}
      <main id="home" className="relative z-10 w-full flex-1 flex flex-col justify-center items-center">
        <HeroSection />
      </main>

      {/* 4. About & Services Section */}
      <AboutSection />

      {/* 5. Selected Works & Projects Showcase */}
      <WorkSection />

      {/* 6. Client Endorsements & Testimonials */}
      <ClientsSection />

      {/* 7. Compact contact and social links */}
      <ContactSection email={PORTFOLIO_DATA.email} />

    </div>
  );
}
