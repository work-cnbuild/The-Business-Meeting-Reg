import React from 'react';
import { ArrowRight, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const AttendeeOpportunities: React.FC = () => {
  const { openRegister } = useApp();

  const opportunities = [
    {
      group: '10 PEOPLE',
      offer: 'Will receive a FREE 45-minute Business Coaching Session.',
      value: 'Value: ₦250,000 each',
      code: 'GRANT // CO-01',
    },
    {
      group: '2 PEOPLE',
      offer: 'Will receive 2 months of Business Consulting.',
      value: 'Value: ₦600,000 each',
      code: 'GRANT // CS-02',
    },
    {
      group: '1 BUSINESS',
      offer: 'With 20+ team members will receive a FREE team training session from SceptralHub.',
      value: 'Value: ₦450,000',
      code: 'GRANT // TR-03',
    },
    {
      group: '5 BUSINESSES',
      offer: 'Doing $1,000+ per month or its equivalent will receive a Digital Marketing Strategy Consultancy from Sceptral Go Digital.',
      value: 'Value: ₦50,000 each',
      code: 'GRANT // MK-04',
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* Blueprint Grid & Glow */}
      <div 
        className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/4 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-[130px] pointer-events-none"
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
            ATTENDEE INCENTIVES // GRANT POOL
          </div>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4 text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            AND THERE ARE MORE OPPORTUNITIES FOR ATTENDEES
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">
            During The Business Meeting, we'll also select attendees for additional business support.
          </p>
        </motion.div>

        {/* 4 Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {opportunities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md flex flex-col justify-between group cursor-default relative overflow-hidden transition-all"
            >
              <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-300 group-hover:text-blue-500 transition-colors">+</span>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold tracking-wide text-slate-900 group-hover:text-blue-700 transition-colors"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    {item.group}
                  </span>
                  <span className="text-[10px] font-mono text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                    {item.code}
                  </span>
                </div>
                <p className="text-base leading-relaxed font-medium text-slate-700">
                  {item.offer}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Support Value</span>
                <span className="text-sm font-bold px-3 py-1 rounded-md border text-blue-700 bg-blue-50 border-blue-200">
                  {item.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HOW DO I GET THESE? */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-700 uppercase">
            <Gift className="w-4 h-4 text-blue-600" />
            REGISTRATION QUALIFICATION
          </div>

          <h3
            className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-slate-900"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            HOW DO I GET THESE?
          </h3>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
            <p>
              You don't need to register again if you're already part of The Business Meeting.
            </p>
            <p className="font-semibold text-lg sm:text-xl text-slate-900">
              Simply complete your attendee registration.
            </p>
            <p>
              This helps us know who is participating in the programme and gives you access to the resources and opportunities available to attendees.
            </p>
            <p className="text-slate-500 text-sm sm:text-base">
              The additional coaching, consulting and business support opportunities will be selected and announced during the programme.
            </p>
          </div>

          <div className="pt-3">
            <motion.button
              whileHover={{ x: 4 }}
              onClick={openRegister}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-wider transition-colors cursor-pointer text-blue-600 hover:text-blue-700"
              style={{ fontFamily: 'Oswald, sans-serif' }}
              id="opportunity-register-btn"
            >
              Complete your attendee registration now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

