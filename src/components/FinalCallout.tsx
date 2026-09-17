import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const FinalCallout: React.FC = () => {
  const { openRegister } = useApp();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 border-b border-slate-200">
      {/* Blueprint grid overlay */}
      <div 
        className="absolute inset-0 blueprint-grid-accent opacity-20 pointer-events-none"
        aria-hidden="true" 
      />
      
      {/* Atmospheric center glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-700 uppercase">
            <span className="w-2 h-0.5 bg-blue-600" />
            FINAL DIRECTIVE // CONVOCATION
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            THE BUSINESS MEETING 2026
          </h2>

          <div className="space-y-3">
            <p className="text-xl sm:text-2xl font-semibold text-blue-700">
              6 Weeks. 6 Conversations. One Goal:
            </p>
            <p
              className="text-2xl sm:text-4xl font-bold uppercase tracking-wide text-slate-900"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Build a Business That Actually Works.
            </p>
          </div>

          {/* Schedule & Access Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto pt-2">
            <span className="px-4 py-2 rounded-xl text-sm sm:text-base font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs">
              Every Wednesday
            </span>
            <span className="px-4 py-2 rounded-xl text-sm sm:text-base font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs">
              Starting 16 September 2026
            </span>
            <span className="px-4 py-2 rounded-xl text-sm sm:text-base font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs">
              Live on YouTube
            </span>
            <span className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-sm sm:text-base font-bold text-emerald-700 shadow-xs">
              Completely FREE
            </span>
          </div>

          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openRegister}
              className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg sm:text-xl font-bold uppercase tracking-wider transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-600/30 group"
              style={{ fontFamily: 'Oswald, sans-serif' }}
              id="callout-join-btn"
            >
              {/* Shimmer sweep animation */}
              <span 
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep pointer-events-none" 
                aria-hidden="true" 
              />
              <span className="relative z-10 flex items-center gap-2.5">
                JOIN THE BUSINESS MEETING
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </motion.button>
            <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Clicking opens the quick registration form popup
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

