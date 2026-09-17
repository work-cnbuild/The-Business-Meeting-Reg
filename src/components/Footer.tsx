import React from 'react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="py-14 relative overflow-hidden bg-slate-100 text-slate-900 border-t border-slate-200">
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-15 pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <BrandLogo variant="full" />
          <div className="hidden sm:block w-px h-6 bg-slate-300" />
          <span className="text-xs text-slate-500 font-mono">
            THE BUSINESS MEETING 2026 • LIVE ON YOUTUBE
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500 font-mono">
          <p>© 2026 Chigozie Nkwo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


