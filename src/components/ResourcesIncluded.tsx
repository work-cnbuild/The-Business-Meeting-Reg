import React from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export const ResourcesIncluded: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white text-slate-900 border-b border-slate-200">
      {/* Blueprint Grid & Glow */}
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-100/30 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-700 uppercase mb-2">
            <span className="w-2 h-0.5 bg-blue-600" />
            COMPLIMENTARY ASSETS // ATTENDEE KIT
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight mb-4 text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            HERE'S WHAT YOU'LL GET
          </h2>
          <div className="space-y-2 text-lg sm:text-xl text-slate-600">
            <p>Because you're part of The Business Meeting, you're not just getting the six live sessions.</p>
            <p>We're putting together practical resources to help you apply what you learn.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 01 - THE BUSINESS BOOKS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-lg flex flex-col justify-between group cursor-default relative overflow-hidden transition-all"
          >
            <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-300 group-hover:text-blue-500 transition-colors">+</span>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  REF // KIT-01
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  FREE
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3
                  className="text-2xl font-bold uppercase tracking-wide text-slate-900 group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  THE BUSINESS BOOKS
                </h3>
              </div>

              <div className="space-y-4 pt-2 text-base leading-relaxed text-slate-600">
                <p>
                  You'll receive <strong className="text-slate-900 font-semibold">two business books</strong>:
                </p>

                <div className="pl-4 border-l-2 border-blue-600 space-y-2 py-2 bg-blue-50/50 rounded-r-xl">
                  <p className="font-semibold text-slate-900">
                    The Billionaire Business That Really Works
                  </p>
                  <p className="text-xs text-blue-700 font-mono">and</p>
                  <p className="font-semibold text-slate-900">
                    A Billion-Dollar Digital Strategy for African Businesses
                  </p>
                </div>

                <p className="pt-2 text-sm text-slate-500">
                  Both books will be provided <strong className="text-emerald-600 font-semibold">FREE</strong> to qualifying attendees.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 02 - THE BUSINESS MEETING WORKBOOK */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-lg flex flex-col justify-between group cursor-default relative overflow-hidden transition-all"
          >
            <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-300 group-hover:text-blue-500 transition-colors">+</span>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  REF // KIT-02
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  COMPLETE SUITE
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h3
                  className="text-2xl font-bold uppercase tracking-wide text-slate-900 group-hover:text-blue-600 transition-colors"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  THE BUSINESS MEETING WORKBOOK
                </h3>
              </div>

              <div className="space-y-4 pt-2 text-base leading-relaxed text-slate-600">
                <p>
                  You'll receive the complete <strong className="text-slate-900 font-semibold">Training Workbook, Training Notes and Practical Workbook</strong> to follow along during the six weeks.
                </p>
                <p>
                  This isn't just something to read.
                </p>
                <p className="font-medium text-slate-900 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  It's designed to help you work through your own business as we go.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

