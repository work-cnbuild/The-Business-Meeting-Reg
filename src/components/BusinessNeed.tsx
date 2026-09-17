import React from 'react';
import { motion } from 'motion/react';

export const BusinessNeed: React.FC = () => {
  const points = [
    "Maybe you have been thinking about starting a business but don't know how to turn your idea into something people will actually pay for.",
    "Maybe you already have a business, but getting customers is difficult.",
    "Maybe you are making sales, but your revenue isn't where you want it to be.",
    "Maybe everything still depends on you.",
    "Or maybe you simply know that your business can become much bigger than it is today, but you don't know what needs to change.",
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* Blueprint Grid & Ambient Texture */}
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] pointer-events-none"
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
            DIAGNOSTIC // CORE REALITY
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            YOU DON'T JUST NEED A BUSINESS. YOU NEED A BUSINESS THAT WORKS.
          </h2>

          <div className="w-20 h-1 rounded-full bg-blue-600 shadow-xs shadow-blue-500/30" />

          <div className="pt-4 space-y-4">
            {points.map((text, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md flex items-start gap-4 group cursor-default transition-all"
              >
                <span className="text-xs font-mono text-blue-600 pt-1 group-hover:text-blue-700 transition-colors font-semibold">
                  0{idx + 1}
                </span>
                <p className="text-base sm:text-lg leading-relaxed text-slate-700 group-hover:text-slate-900 transition-colors">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-6"
          >
            <p className="text-xl sm:text-2xl font-bold text-blue-700 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
              The Business Meeting was created for you.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

