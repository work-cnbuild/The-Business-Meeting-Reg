import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  RegistrationFormData,
  AgeRange,
  ParticipantType,
  BusinessAge,
  MonthlyRevenue,
  TeamSize,
  CoachingInterest,
  PaidCoachingInterest,
  LeadSource,
} from '../types';
import { submitAttendeeRegistration, WHATSAPP_CHANNEL_URL, openWhatsAppChannel } from '../services/submission';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, X, Calendar, Play } from 'lucide-react';

const AGE_RANGES: AgeRange[] = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+'];

const PARTICIPANT_TYPES: ParticipantType[] = [
  'I have a business idea but haven\'t started yet',
  'I currently run a business',
  'I run more than one business',
  'I work in/manage a business but I\'m not the owner',
  'I\'m here primarily to learn about business',
];

const BUSINESS_AGES: BusinessAge[] = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '6–10 years',
  'More than 10 years',
];

const MONTHLY_REVENUES: MonthlyRevenue[] = [
  'Less than ₦500,000',
  '₦500,000 – ₦1 million',
  '₦1 million – ₦5 million',
  '₦5 million – ₦10 million',
  '₦10 million – ₦50 million',
  'Above ₦50 million',
];

const TEAM_SIZES: TeamSize[] = [
  'Just me',
  '2–5',
  '6–10',
  '11–20',
  '21–50',
  '51–100',
  '100+',
];

const CHALLENGES = [
  'Getting more customers',
  'Increasing revenue',
  'Marketing',
  'Sales / converting leads',
  'Building a team',
  'Managing my team',
  'Creating systems and processes',
  'Managing finances / profitability',
  'Scaling the business',
  'Clarifying my business model',
  'Other',
];

const SOURCES: LeadSource[] = [
  'Instagram',
  'Facebook',
  'WhatsApp',
  'YouTube',
  'LinkedIn',
  'Friend / Referral',
  'Other',
];

export const RegistrationModal: React.FC = () => {
  const { isRegisterOpen, closeRegister } = useApp();

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    whatsApp: '',
    ageRange: '',
    location: '',
    participantType: '',
    businessIndustry: '',
    businessAge: '',
    monthlyRevenue: '',
    teamSize: '',
    biggestChallenge: [],
    coachingInterest: '',
    coachingChallenge: '',
    paidCoachingInterest: '',
    source: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isRegisterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isRegisterOpen]);

  // ESC key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRegisterOpen) {
        closeRegister();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRegisterOpen, closeRegister]);

  // Determine if participant runs/manages a business
  const isBusinessRunner =
    formData.participantType === 'I currently run a business' ||
    formData.participantType === 'I run more than one business' ||
    formData.participantType === 'I work in/manage a business but I\'m not the owner';

  // 4-second countdown on successful submission with reliable redirect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isSuccess && countdown === 0) {
      openWhatsAppChannel();
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown]);

  const handleChallengeToggle = (challenge: string) => {
    setFormData((prev) => {
      const current = prev.biggestChallenge;
      if (current.includes(challenge)) {
        return { ...prev, biggestChallenge: current.filter((c) => c !== challenge) };
      }
      if (current.length < 2) {
        return { ...prev, biggestChallenge: [...current, challenge] };
      }
      return prev;
    });
    if (errors.biggestChallenge) {
      setErrors((prev) => ({ ...prev, biggestChallenge: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.whatsApp.trim()) newErrors.whatsApp = 'WhatsApp Number is required.';
    if (!formData.ageRange) newErrors.ageRange = 'Please select your age range.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    if (!formData.participantType) newErrors.participantType = 'Please choose the option that best describes you.';

    if (isBusinessRunner) {
      if (!formData.businessIndustry?.trim()) newErrors.businessIndustry = 'Business industry is required.';
      if (!formData.businessAge) newErrors.businessAge = 'Please select how long your business has been operating.';
      if (!formData.monthlyRevenue) newErrors.monthlyRevenue = 'Please select your average monthly business revenue.';
      if (!formData.teamSize) newErrors.teamSize = 'Please select how many people work in your business.';
      if (!formData.biggestChallenge || formData.biggestChallenge.length === 0) {
        newErrors.biggestChallenge = 'Please select at least one challenge (up to 2).';
      }
    }

    if (!formData.coachingInterest) {
      newErrors.coachingInterest = 'Please indicate if you would like to be considered for coaching.';
    } else if (formData.coachingInterest === 'Yes, I\'d like to be considered' && !formData.coachingChallenge?.trim()) {
      newErrors.coachingChallenge = 'Please specify the business challenge you would like the coaching session to help you solve.';
    }

    if (!formData.paidCoachingInterest) {
      newErrors.paidCoachingInterest = 'Please select an option for future coaching or consulting.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstError = document.querySelector('.form-error-marker');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitAttendeeRegistration(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(res.error || 'Unable to submit your registration. Please try again.');
      }
    } catch (err) {
      setSubmitError('A network error occurred while submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalBg = 'bg-white text-slate-900 border-slate-200';
  const cardBg = 'bg-slate-50/90 border-slate-200 text-slate-900';
  const inputBg = 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs';
  const primaryBtn = 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-600/30';
  const activeOptionBg = 'bg-blue-50 border-blue-600 text-blue-800 font-semibold shadow-2xs';

  return (
    <AnimatePresence>
      {isRegisterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-5 overflow-y-auto bg-slate-900/60 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeRegister();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-3xl my-auto sm:my-auto rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden max-h-[calc(100vh-1rem)] sm:max-h-[90vh] flex flex-col ${modalBg}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <p
                    className="text-sm font-bold uppercase tracking-wider text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    THE BUSINESS MEETING 2026
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    FREE 6-WEEK LIVE BUSINESS TRAINING • STARTS 16 SEPT
                  </p>
                </div>
              </div>

              <button
                onClick={closeRegister}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                aria-label="Close registration modal"
                id="close-registration-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8 space-y-8 custom-scrollbar">
              {isSuccess ? (
                <div className="py-12 px-4 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                    id="modal-title"
                  >
                    You're In.
                  </h2>

                  <p className="text-xl text-slate-800 font-medium">
                    Your details have been received successfully.
                  </p>

                  <p className="text-base text-slate-600">
                    You'll now be redirected to the Business Meeting WhatsApp Channel.
                  </p>

                  {/* Countdown Badge */}
                  <div className="py-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold font-mono">
                      <span>Redirecting in</span>
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        {countdown}
                      </span>
                      <span>seconds...</span>
                    </div>
                  </div>

              {/* Direct WhatsApp button */}
              <div className="pt-4 flex flex-col items-center justify-center gap-3">
                <a
                  href={WHATSAPP_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    // Trigger custom breakout handler and let standard link fire
                    openWhatsAppChannel();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] transition-all shadow-lg shadow-emerald-600/30 cursor-pointer animate-pulse"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                  id="direct-whatsapp-btn"
                >
                  JOIN THE WHATSAPP CHANNEL NOW
                  <ArrowRight className="w-5 h-5" />
                </a>

                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  If popup blockers prevent automatic redirection, click the green button above to join immediately.
                </p>

                <button
                  onClick={closeRegister}
                  className="mt-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Form Title */}
              <div className="text-center space-y-2">
                <h2
                  className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-slate-900"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                  id="modal-title"
                >
                  JOIN THE BUSINESS MEETING
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  Tell us a little about yourself and your business.
                </p>
              </div>

              {submitError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <div className="text-sm">
                    <p className="font-semibold">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* 1. PERSONAL INFORMATION */}
                <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${cardBg}`}>
                  <h3
                    className="text-lg sm:text-xl font-bold uppercase tracking-wider pb-2 border-b border-slate-200 text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    Personal Information
                  </h3>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="modalFullName" className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="modalFullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border text-sm transition-all ${inputBg} ${
                        errors.fullName ? 'border-red-500 form-error-marker' : ''
                      }`}
                      placeholder="Your First & Last Name"
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="modalEmail" className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                      Email Address <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="modalEmail"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border text-sm transition-all ${inputBg} ${
                        errors.email ? 'border-red-500 form-error-marker' : ''
                      }`}
                      placeholder="name@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label htmlFor="modalWhatsApp" className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                      WhatsApp Number <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="modalWhatsApp"
                      value={formData.whatsApp}
                      onChange={(e) => {
                        setFormData({ ...formData, whatsApp: e.target.value });
                        if (errors.whatsApp) setErrors({ ...errors, whatsApp: '' });
                      }}
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border text-sm transition-all ${inputBg} ${
                        errors.whatsApp ? 'border-red-500 form-error-marker' : ''
                      }`}
                      placeholder="+234..."
                    />
                    {errors.whatsApp && <p className="text-xs text-red-600 mt-1">{errors.whatsApp}</p>}
                  </div>

                  {/* Age Range */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                      Age Range <span className="text-blue-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {AGE_RANGES.map((range) => (
                        <label
                          key={range}
                          className={`flex items-center justify-center p-2.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                            formData.ageRange === range ? activeOptionBg : inputBg
                          }`}
                        >
                          <input
                            type="radio"
                            name="ageRangeModal"
                            value={range}
                            checked={formData.ageRange === range}
                            onChange={() => {
                              setFormData({ ...formData, ageRange: range });
                              if (errors.ageRange) setErrors({ ...errors, ageRange: '' });
                            }}
                            className="sr-only"
                          />
                          {range}
                        </label>
                      ))}
                    </div>
                    {errors.ageRange && (
                      <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.ageRange}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="modalLocation" className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                      Where are you currently based? <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="modalLocation"
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location) setErrors({ ...errors, location: '' });
                      }}
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border text-sm transition-all ${inputBg} ${
                        errors.location ? 'border-red-500 form-error-marker' : ''
                      }`}
                      placeholder="City & Country"
                    />
                    {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
                  </div>
                </div>

                {/* 2. BUSINESS INFORMATION */}
                <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${cardBg}`}>
                  <h3
                    className="text-lg sm:text-xl font-bold uppercase tracking-wider pb-2 border-b border-slate-200 text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    Business Information
                  </h3>

                  {/* Which best describes you? */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-800">
                      Which best describes you? <span className="text-blue-600">*</span>
                    </label>
                    <div className="space-y-2">
                      {PARTICIPANT_TYPES.map((type) => (
                        <label
                          key={type}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                            formData.participantType === type ? activeOptionBg : inputBg
                          }`}
                        >
                          <input
                            type="radio"
                            name="participantTypeModal"
                            value={type}
                            checked={formData.participantType === type}
                            onChange={() => {
                              setFormData({ ...formData, participantType: type });
                              if (errors.participantType) setErrors({ ...errors, participantType: '' });
                            }}
                            className="mt-0.5 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-slate-800">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.participantType && (
                      <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.participantType}</p>
                    )}
                  </div>

                  {/* Conditional business owner questions */}
                  {isBusinessRunner && (
                    <div className="pt-3 border-t border-slate-200 space-y-5">
                      {/* Industry */}
                      <div>
                        <label htmlFor="modalBusinessIndustry" className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                          What industry is your business in? <span className="text-blue-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="modalBusinessIndustry"
                          value={formData.businessIndustry || ''}
                          onChange={(e) => {
                            setFormData({ ...formData, businessIndustry: e.target.value });
                            if (errors.businessIndustry) setErrors({ ...errors, businessIndustry: '' });
                          }}
                          className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border text-sm transition-all ${inputBg} ${
                            errors.businessIndustry ? 'border-red-500 form-error-marker' : ''
                          }`}
                          placeholder="e.g. Technology, Retail, Agriculture, Services..."
                        />
                        {errors.businessIndustry && (
                          <p className="text-xs text-red-600 mt-1">{errors.businessIndustry}</p>
                        )}
                      </div>

                      {/* Business Age */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                          How long has your business been operating? <span className="text-blue-600">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {BUSINESS_AGES.map((item) => (
                            <label
                              key={item}
                              className={`flex items-center justify-center p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                                formData.businessAge === item ? activeOptionBg : inputBg
                              }`}
                            >
                              <input
                                type="radio"
                                name="businessAgeModal"
                                value={item}
                                checked={formData.businessAge === item}
                                onChange={() => {
                                  setFormData({ ...formData, businessAge: item });
                                  if (errors.businessAge) setErrors({ ...errors, businessAge: '' });
                                }}
                                className="sr-only"
                              />
                              {item}
                            </label>
                          ))}
                        </div>
                        {errors.businessAge && (
                          <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.businessAge}</p>
                        )}
                      </div>

                      {/* Monthly Revenue */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold mb-1 text-slate-800">
                          What is your average monthly business revenue? <span className="text-blue-600">*</span>
                        </label>
                        <p className="text-[11px] text-slate-500 mb-2">
                          Select the closest range. Refers to business revenue, not personal income.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {MONTHLY_REVENUES.map((rev) => (
                            <label
                              key={rev}
                              className={`flex items-center justify-center p-2.5 rounded-xl border text-xs text-center cursor-pointer transition-all ${
                                formData.monthlyRevenue === rev ? activeOptionBg : inputBg
                              }`}
                            >
                              <input
                                type="radio"
                                name="monthlyRevenueModal"
                                value={rev}
                                checked={formData.monthlyRevenue === rev}
                                onChange={() => {
                                  setFormData({ ...formData, monthlyRevenue: rev });
                                  if (errors.monthlyRevenue) setErrors({ ...errors, monthlyRevenue: '' });
                                }}
                                className="sr-only"
                              />
                              {rev}
                            </label>
                          ))}
                        </div>
                        {errors.monthlyRevenue && (
                          <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.monthlyRevenue}</p>
                        )}
                      </div>

                      {/* Team Size */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                          How many people currently work in your business? <span className="text-blue-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TEAM_SIZES.map((size) => (
                            <label
                              key={size}
                              className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                                formData.teamSize === size ? activeOptionBg : inputBg
                              }`}
                            >
                              <input
                                type="radio"
                                name="teamSizeModal"
                                value={size}
                                checked={formData.teamSize === size}
                                onChange={() => {
                                  setFormData({ ...formData, teamSize: size });
                                  if (errors.teamSize) setErrors({ ...errors, teamSize: '' });
                                }}
                                className="sr-only"
                              />
                              {size}
                            </label>
                          ))}
                        </div>
                        {errors.teamSize && (
                          <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.teamSize}</p>
                        )}
                      </div>

                      {/* Challenges (up to 2) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                            Biggest challenge currently facing in business? <span className="text-blue-600">*</span>
                          </label>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Up to 2 ({formData.biggestChallenge.length}/2)
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {CHALLENGES.map((challenge) => {
                            const selected = formData.biggestChallenge.includes(challenge);
                            const disabled = !selected && formData.biggestChallenge.length >= 2;
                            return (
                              <button
                                key={challenge}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                  if (!disabled || selected) handleChallengeToggle(challenge);
                                }}
                                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                                  selected ? activeOptionBg : disabled ? 'opacity-40 cursor-not-allowed bg-slate-100' : inputBg
                                }`}
                              >
                                <span className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                  selected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {selected && (
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </span>
                                <span className="text-slate-800">{challenge}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.biggestChallenge && (
                          <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.biggestChallenge}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. COACHING OPPORTUNITY */}
                <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${cardBg}`}>
                  <h3
                    className="text-lg sm:text-xl font-bold uppercase tracking-wider pb-2 border-b border-slate-200 text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    Coaching Opportunity
                  </h3>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1 text-slate-800">
                      Would you like to be considered for a FREE 45-minute Business Coaching Session? <span className="text-blue-600">*</span>
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2.5">
                      10 attendees will be selected for a free 45-minute business coaching session.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(['Yes, I\'d like to be considered', 'No'] as CoachingInterest[]).map((option) => (
                        <label
                          key={option}
                          className={`flex items-center justify-center p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                            formData.coachingInterest === option ? activeOptionBg : inputBg
                          }`}
                        >
                          <input
                            type="radio"
                            name="coachingInterestModal"
                            value={option}
                            checked={formData.coachingInterest === option}
                            onChange={() => {
                              setFormData({ ...formData, coachingInterest: option });
                              if (errors.coachingInterest) setErrors({ ...errors, coachingInterest: '' });
                            }}
                            className="sr-only"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    {errors.coachingInterest && (
                      <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.coachingInterest}</p>
                    )}
                  </div>

                  {formData.coachingInterest === 'Yes, I\'d like to be considered' && (
                    <div className="pt-2">
                      <label htmlFor="modalCoachingChallenge" className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-800">
                        What specific business challenge would you like the coaching session to help you solve? <span className="text-blue-600">*</span>
                      </label>
                      <textarea
                        id="modalCoachingChallenge"
                        rows={3}
                        value={formData.coachingChallenge || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, coachingChallenge: e.target.value });
                          if (errors.coachingChallenge) setErrors({ ...errors, coachingChallenge: '' });
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-all resize-y ${inputBg} ${
                          errors.coachingChallenge ? 'border-red-500 form-error-marker' : ''
                        }`}
                        placeholder="Describe your specific business challenge..."
                      />
                      {errors.coachingChallenge && (
                        <p className="text-xs text-red-600 mt-1">{errors.coachingChallenge}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 4. FUTURE SUPPORT */}
                <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${cardBg}`}>
                  <h3
                    className="text-lg sm:text-xl font-bold uppercase tracking-wider pb-2 border-b border-slate-200 text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    Future Support
                  </h3>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-slate-800">
                      Would you be interested in paid business coaching or consulting after The Business Meeting? <span className="text-blue-600">*</span>
                    </label>
                    <div className="space-y-2">
                      {([
                        'Yes, definitely',
                        'Possibly — I\'d like to know more',
                        'No, not at the moment',
                      ] as PaidCoachingInterest[]).map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                            formData.paidCoachingInterest === option ? activeOptionBg : inputBg
                          }`}
                        >
                          <input
                            type="radio"
                            name="paidCoachingInterestModal"
                            value={option}
                            checked={formData.paidCoachingInterest === option}
                            onChange={() => {
                              setFormData({ ...formData, paidCoachingInterest: option });
                              if (errors.paidCoachingInterest) setErrors({ ...errors, paidCoachingInterest: '' });
                            }}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-slate-800">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.paidCoachingInterest && (
                      <p className="text-xs text-red-600 mt-1 form-error-marker">{errors.paidCoachingInterest}</p>
                    )}
                  </div>
                </div>

                {/* 5. SOURCE */}
                <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${cardBg}`}>
                  <h3
                    className="text-lg sm:text-xl font-bold uppercase tracking-wider pb-2 border-b border-slate-200 text-slate-900"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    How Did You Hear About Us?
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SOURCES.map((src) => (
                      <label
                        key={src}
                        className={`flex items-center justify-center p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          formData.source === src ? activeOptionBg : inputBg
                        }`}
                      >
                        <input
                          type="radio"
                          name="sourceModal"
                          value={src}
                          checked={formData.source === src}
                          onChange={() => setFormData({ ...formData, source: src })}
                          className="sr-only"
                        />
                        <span className="text-slate-800">{src}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 text-center space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-base sm:text-lg font-bold uppercase tracking-wider active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${primaryBtn}`}
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                    id="modal-submit-registration-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Details...</span>
                      </>
                    ) : (
                      <span>JOIN THE BUSINESS MEETING</span>
                    )}
                  </button>
                  <p className="text-xs text-slate-500">
                    Free 6-Week Live Access • You will be redirected to the WhatsApp Channel immediately upon confirmation.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
};
