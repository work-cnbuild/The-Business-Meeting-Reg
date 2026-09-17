import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export const WhoThisIsFor: React.FC = () => {
  const criteria = [
    'You have a business idea and want to turn it into a real business.',
    'You already run a business and want to grow it.',
    'You want to get more customers.',
    'You want to increase your revenue.',
    'You want to build a team.',
    'You want to put systems around your business.',
    'You want to stop doing everything yourself.',
    'You want to build a business that can last.',
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white text-slate-900 border-b border-slate-200">
      {/* Blueprint Grid */}
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-700 uppercase mb-2">
            <span className="w-2 h-0.5 bg-blue-600" />
            ATTENDEE FIT EVALUATION
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight mb-4 text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            THIS IS FOR YOU IF...
          </h2>
          <div className="w-16 h-1 rounded-full bg-blue-600 shadow-xs shadow-blue-500/30" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {criteria.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md transition-all group cursor-default"
            >
              <div className="w-6 h-6 rounded-full border border-blue-200 bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-base sm:text-lg leading-snug text-slate-700 group-hover:text-slate-900 transition-colors">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

