import React, { useState } from 'react';
import CapsuleLoader from './components/CapsuleLoader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FluidCanvas from './components/FluidCanvas';
import ContactSection from './components/ContactSection';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  const replayLoader = () => {
    setShowLoader(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f1fa] font-sans selection:bg-[#a87cff] selection:text-black relative flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Fast Capsule Loader */}
      {showLoader && (
        <CapsuleLoader
          brandTitle="ATHARAV NARANG / WISPR FLOW"
          onFinish={() => setShowLoader(false)}
        />
      )}

      {/* 2. Real-Time Fluid Distortion Canvas */}
      <FluidCanvas />

      {/* 3. Header with Exact Top-Left Name Hover Morph & Rolling Nav Links */}
      <Header onReplayLoader={replayLoader} />

      {/* 4. Exact Hero Section (Outlined Title + Monumental Liquid Distorted Name) */}
      <main id="home" className="relative z-10 w-full flex-1 flex flex-col justify-center items-center">
        <HeroSection
          firstName="ATHARAV"
          lastName="NARANG"
          jobTitle="CREATIVE DEVELOPER"
        />
      </main>

      {/* 5. Exact Contact Section (Curved Card + Outlined Title + Form + Rolling Links) */}
      <ContactSection email="atharavnarang@gmail.com" />

    </div>
  );
}
