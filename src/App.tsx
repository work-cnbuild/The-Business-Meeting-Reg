import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BusinessNeed } from './components/BusinessNeed';
import { WhatWeWorkOn } from './components/WhatWeWorkOn';
import { WhyListen } from './components/WhyListen';
import { ResourcesIncluded } from './components/ResourcesIncluded';
import { AttendeeOpportunities } from './components/AttendeeOpportunities';
import { WhoThisIsFor } from './components/WhoThisIsFor';
import { NotMotivation } from './components/NotMotivation';
import { FinalCallout } from './components/FinalCallout';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';

function MainContent() {
  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Subtle Tactile Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 texture-grain opacity-25 mix-blend-multiply" 
        aria-hidden="true" 
      />

      {/* Ambient background soft light gradients */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow"
        aria-hidden="true" 
      />
      <div 
        className="fixed top-1/2 left-[-200px] w-[600px] h-[600px] bg-sky-100/30 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true" 
      />
      <div 
        className="fixed bottom-0 right-[-100px] w-[700px] h-[700px] bg-indigo-50/40 rounded-full blur-[180px] pointer-events-none -z-10"
        aria-hidden="true" 
      />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BusinessNeed />
        <WhatWeWorkOn />
        <WhyListen />
        <ResourcesIncluded />
        <AttendeeOpportunities />
        <WhoThisIsFor />
        <NotMotivation />
        <FinalCallout />
      </main>
      <Footer />

      {/* Pop-up Registration Form Modal (Opens on any CTA click) */}
      <RegistrationModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

