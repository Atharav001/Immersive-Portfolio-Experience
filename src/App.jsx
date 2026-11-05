import React, { lazy, Suspense, useState } from 'react';
import CapsuleLoader from './components/CapsuleLoader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import WorkSection from './components/WorkSection';
import ContactSection from './components/ContactSection';
import ReactorCursor from './components/ReactorCursor';
import { PORTFOLIO_DATA } from './data/portfolioData';

const FluidDisplacementEffect = lazy(() => import('./components/FluidDisplacementEffect'));

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  return (
    <div className="portfolio-shell min-h-screen bg-[#0a0a0a] text-[#f0f1fa] font-sans selection:bg-[#a87cff] selection:text-black relative flex flex-col">
      {showLoader && <CapsuleLoader brandTitle={`${PORTFOLIO_DATA.firstname.toUpperCase()} ${PORTFOLIO_DATA.lastname.toUpperCase()} / ${PORTFOLIO_DATA.jobTitle.toUpperCase()}`} onFinish={() => setShowLoader(false)} />}
      <Header />
      <main id="home" className="relative z-10 w-full"><HeroSection /></main>
      <StorySection />
      <WorkSection />
      <ContactSection email={PORTFOLIO_DATA.email} />
      <ReactorCursor />
      {!showLoader && <Suspense fallback={null}><FluidDisplacementEffect /></Suspense>}
    </div>
  );
}
