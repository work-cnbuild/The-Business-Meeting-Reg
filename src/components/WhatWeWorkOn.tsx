import React from 'react';
import { motion } from 'motion/react';

export const WhatWeWorkOn: React.FC = () => {
  const pillars = [
    {
      step: '01',
      title: 'START',
      description: 'Turn an idea into a real business with a clear customer, offer and business model.',
    },
    {
      step: '02',
      title: 'BUILD',
      description: 'Create the foundation your business needs to operate properly.',
    },
    {
      step: '03',
      title: 'GET CUSTOMERS',
      description: 'Understand practical ways to attract leads, make sales and build a consistent customer base.',
    },
    {
      step: '04',
      title: 'GROW REVENUE',
      description: 'Understand the different ways to increase sales and make more money from your business.',
    },
    {
      step: '05',
      title: 'BUILD SYSTEMS & TEAMS',
      description: 'Move from doing everything yourself to creating processes and people that help the business operate.',
    },
    {
      step: '06',
      title: 'SCALE',
      description: 'Understand what it takes to take a working business to the next level.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white text-slate-900 border-b border-slate-200">
      {/* Background blueprint pattern */}
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-700 uppercase">
            <span className="w-2 h-0.5 bg-blue-600" />
            SYLLABUS ARCHITECTURE // 6 PHASES
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            WHAT WE'LL WORK ON
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">
            Over six weeks, we'll break down the practical side of building a business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-lg flex flex-col justify-between group cursor-default relative overflow-hidden transition-all"
            >
              {/* Corner crosshairs for technical blueprint feel */}
              <span className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-300 group-hover:text-blue-500 transition-colors">+</span>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 group-hover:border-blue-300 transition-colors">
                    WEEK {pillar.step}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    STAGE // 0{idx + 1}
                  </span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-3 text-slate-900 group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:bg-emerald-500 transition-colors" />
                  Live Interactive Session
                </span>
                <span className="font-mono text-blue-700 font-semibold">90 Mins</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

