import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';

export const WhyListen: React.FC = () => {
  const stats = [
    { label: 'EXPERIENCE', value: '10 YEARS', desc: 'Hands-on enterprise building' },
    { label: 'VENTURES LAUNCHED', value: '7+ VENTURES', desc: 'Real battle-tested lessons' },
    { label: 'ACTIVE ENTERPRISES', value: '3 COMPANIES', desc: 'Live clients, teams & revenue' },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* Background blueprint details */}
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-100/40 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <BrandLogo variant="shield" className="scale-90" />
            <span className="text-xs uppercase tracking-widest text-blue-700 font-mono font-semibold">
              SPEAKER DOSSIER // CHIGOZIE NKWO
            </span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            WHY LISTEN TO ME?
          </h2>

          <div className="w-16 h-1 rounded-full bg-blue-600 shadow-xs shadow-blue-500/30" />

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md transition-all group cursor-default"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1 font-semibold">
                  {s.label}
                </span>
                <span 
                  className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors block"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {s.value}
                </span>
                <span className="text-xs text-slate-600 mt-1 block">
                  {s.desc}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="pt-2 text-lg sm:text-xl leading-relaxed space-y-5 text-slate-700">
            <p>
              I've been building businesses for <strong className="font-bold text-slate-900">10 years</strong>.
            </p>
            <p>
              I've started <strong className="font-bold text-slate-900">more than 7 businesses</strong>.
            </p>
            <p className="text-slate-500 italic">
              Most of them failed.
            </p>
            <p>
              But those failures taught me just as much as the businesses that worked.
            </p>
            <p>
              Today, I currently run{' '}
              <strong className="font-bold text-slate-900">
                3 businesses with real clients, teams and revenue
              </strong>
              .
            </p>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="font-medium p-5 border-l-4 border-blue-600 bg-blue-50 rounded-r-2xl text-slate-900 shadow-xs"
            >
              The Business Meeting is where I'll bring together the lessons, mistakes, strategies and practical experiences I've gathered over those 10 years and share them with you.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

