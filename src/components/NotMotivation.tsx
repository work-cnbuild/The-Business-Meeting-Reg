import React from 'react';
import { motion } from 'motion/react';

export const NotMotivation: React.FC = () => {
  const businessElements = [
    'Customers',
    'Sales',
    'Revenue',
    'Offers',
    'Marketing',
    'Teams',
    'Systems',
    'Growth',
    'Scale',
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* Blueprint background grid */}
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-700 uppercase">
            <span className="w-2 h-0.5 bg-blue-600" />
            OPERATIONAL DOCTRINE // NO HYPE
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            THIS IS NOT ANOTHER BUSINESS MOTIVATION SESSION.
          </h2>

          <div className="w-16 h-1 rounded-full bg-blue-600 shadow-xs shadow-blue-500/30" />

          <p className="text-xl sm:text-2xl font-medium text-slate-800">
            We're not meeting for six weeks to tell you to "dream bigger."
          </p>

          <p className="text-lg sm:text-xl text-slate-600">
            We're going to talk about the actual business.
          </p>

          {/* Grid of the 9 core topics with interactive motion */}
          <div className="py-4">
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {businessElements.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 hover:border-blue-500 hover:text-blue-700 hover:shadow-md text-lg sm:text-xl font-bold tracking-wide transition-all shadow-xs cursor-default"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {item}.
                </motion.span>
              ))}
            </div>
          </div>

          <p className="text-xl sm:text-2xl font-bold pt-2 text-blue-700 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            The things that determine whether a business actually works.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

