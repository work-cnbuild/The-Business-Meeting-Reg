import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { openRegister } = useApp();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 text-slate-900 shadow-xs"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <a 
          href="#" 
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group"
          aria-label="Chigozie Nkwo Home"
        >
          <BrandLogo variant="full" showUploadTrigger={true} />
        </a>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Starts 16 Sept 2026</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live on YouTube • Free
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openRegister}
            className="relative overflow-hidden inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white group"
            style={{ fontFamily: 'Oswald, sans-serif' }}
            id="nav-join-btn"
          >
            <span 
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep pointer-events-none" 
              aria-hidden="true" 
            />
            <span className="relative z-10">JOIN NOW</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

