import React from 'react';
import { ArrowRight, Calendar, Play, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { openRegister } = useApp();

  return (
    <header className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
      {/* Blueprint grid overlay */}
      <div 
        className="absolute inset-0 blueprint-grid-accent opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 dot-matrix opacity-25 pointer-events-none"
        aria-hidden="true"
      />

      {/* Atmospheric luminous glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[440px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[360px] h-[360px] bg-sky-100/40 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Technical corner coordinate ticks */}
      <div className="absolute top-24 left-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden lg:block">
        GRID // REF: TBM-2026 • 06-WK-INTENSIVE
      </div>
      <div className="absolute top-24 right-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden lg:block">
        STATUS // ADMISSION OPEN • YOUTUBE LIVE
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Column with Staggered Entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Event Schedule & Access Badges */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2 mb-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                A 6-Week Live Business Training
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-slate-100 border border-slate-200 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Every Wednesday from 16 September 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 font-semibold">
                <Play className="w-3 h-3 fill-current text-emerald-600" />
                Live on YouTube • Completely FREE
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.05] text-slate-900"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              THE BUSINESS MEETING 2026
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl font-semibold leading-snug text-blue-700"
            >
              For People Serious About Building Businesses That Actually Work.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg leading-relaxed space-y-4 max-w-2xl text-slate-600"
            >
              <p>
                You can start a business in a day.
              </p>
              <p>
                Building one that gets customers, makes money, has a team, runs on systems and can still exist years from now is a different challenge.
              </p>
              <p className="font-semibold text-lg sm:text-xl text-slate-900">
                That is what The Business Meeting is about.
              </p>
            </motion.div>

            {/* Event Format Details Box with Tactile Blueprint Texture */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="py-4 px-5 rounded-2xl max-w-xl bg-white border border-slate-200 shadow-sm relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm relative z-10">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Format
                  </span>
                  <p className="font-semibold text-slate-900">A 6-Week Live Business Training</p>
                  <p className="text-slate-500 text-xs">Every Wednesday from 16 September 2026</p>
                </div>
                <div className="space-y-1 sm:border-l sm:pl-4 sm:border-slate-200">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Access
                  </span>
                  <p className="font-semibold text-slate-900">Live on YouTube</p>
                  <p className="text-emerald-600 font-semibold text-xs">Completely FREE</p>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA Button -> Opens Registration Popup */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openRegister}
                className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-bold uppercase tracking-wider transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/25 group"
                style={{ fontFamily: 'Oswald, sans-serif' }}
                id="hero-cta-btn"
              >
                {/* Shimmer sweep effect */}
                <span 
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep pointer-events-none" 
                  aria-hidden="true" 
                />
                <span className="relative z-10 flex items-center gap-2.5">
                  JOIN THE BUSINESS MEETING
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Click to open registration popup • Instant confirmation
              </span>
            </motion.div>
          </motion.div>

          {/* Supporting Flyer-Style Visual Card with Floating Motion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="w-full max-w-sm rounded-3xl p-7 relative overflow-hidden bg-white border border-slate-200 shadow-xl group"
            >
              {/* Card blueprint lines */}
              <div 
                className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
                aria-hidden="true"
              />

              {/* Glowing highlight corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Cardinal corner crosshairs */}
              <span className="absolute top-3 left-3 text-[10px] font-mono text-slate-300">+</span>
              <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-300">+</span>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-300">+</span>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-300">+</span>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <BrandLogo variant="shield" className="scale-90 origin-left" />
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                    6-Week Live Training
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    With
                  </span>
                  <p
                    className="text-2xl font-bold uppercase tracking-wide text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    CHIGOZIE NKWO
                  </p>
                  <p className="text-xs text-slate-500">
                    10 Years Building Businesses • 3 Active Companies
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>LIVE BUSINESS CONVERSATIONS</span>
                    <span className="text-[10px] font-mono text-blue-700 font-bold">SESSION MATRIX</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-600 font-bold">▸</span>
                      <span>How to Build Customer Retention</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-600 font-bold">▸</span>
                      <span>Building Teams That Execute Without You</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-600 font-bold">▸</span>
                      <span>Systems, Cash Flow & Scalability</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openRegister}
                    className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    RESERVE YOUR FREE SEAT
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

