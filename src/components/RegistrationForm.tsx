import React, { useState, useEffect } from 'react';
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
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

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

export const RegistrationForm: React.FC = () => {
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

  // Determine if participant runs/manages a business
  const isBusinessRunner =
    formData.participantType === 'I currently run a business' ||
    formData.participantType === 'I run more than one business' ||
    formData.participantType === 'I work in/manage a business but I\'m not the owner';

  // 4-second countdown on successful submission
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

  if (isSuccess) {
    return (
      <section id="register" className="py-24 sm:py-32 bg-[#060c1c] text-white scroll-mt-20">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-white/15 shadow-2xl backdrop-blur-md space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2
              className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              You're In.
            </h2>

            <p className="text-xl sm:text-2xl text-slate-200 font-medium">
              Your details have been received successfully.
            </p>

            <p className="text-base sm:text-lg text-slate-300">
              You'll now be redirected to the Business Meeting WhatsApp Channel.
            </p>

            {/* Countdown Badge */}
            <div className="py-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-sm font-semibold">
                <span>Redirecting in</span>
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
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
                onClick={() => openWhatsAppChannel()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] transition-all shadow-lg shadow-emerald-900/30 cursor-pointer animate-pulse"
                style={{ fontFamily: 'Oswald, sans-serif' }}
                id="direct-whatsapp-btn"
              >
                JOIN THE WHATSAPP CHANNEL NOW
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                If you are not automatically redirected, tap the green button above to enter the official WhatsApp Channel.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 sm:py-32 bg-[#060c1c] text-white border-t border-white/10 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Form Heading & Supporting Text */}
        <div className="text-center mb-12 space-y-3">
          <h2
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            JOIN THE BUSINESS MEETING
          </h2>
          <p className="text-lg sm:text-xl text-slate-300">
            Tell us a little about yourself and your business.
          </p>
        </div>

        {submitError && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
            <div className="text-sm">
              <p className="font-semibold">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-12">
          {/* PERSONAL INFORMATION */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
            <h3
              className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Personal Information
            </h3>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-slate-200 mb-2">
                Full Name <span className="text-blue-400">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-[#091124] border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.fullName ? 'border-red-500 form-error-marker' : 'border-white/15'
                }`}
                placeholder="Your First & Last Name"
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1.5">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-2">
                Email Address <span className="text-blue-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-[#091124] border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? 'border-red-500 form-error-marker' : 'border-white/15'
                }`}
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label htmlFor="whatsApp" className="block text-sm font-semibold text-slate-200 mb-2">
                WhatsApp Number <span className="text-blue-400">*</span>
              </label>
              <input
                type="tel"
                id="whatsApp"
                value={formData.whatsApp}
                onChange={(e) => {
                  setFormData({ ...formData, whatsApp: e.target.value });
                  if (errors.whatsApp) setErrors({ ...errors, whatsApp: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-[#091124] border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.whatsApp ? 'border-red-500 form-error-marker' : 'border-white/15'
                }`}
                placeholder="+234..."
              />
              {errors.whatsApp && <p className="text-xs text-red-400 mt-1.5">{errors.whatsApp}</p>}
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Age Range <span className="text-blue-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AGE_RANGES.map((range) => (
                  <label
                    key={range}
                    className={`flex items-center justify-center p-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                      formData.ageRange === range
                        ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                        : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ageRange"
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
              {errors.ageRange && <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.ageRange}</p>}
            </div>

            {/* Where are you currently based? */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-slate-200 mb-2">
                Where are you currently based? <span className="text-blue-400">*</span>
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  if (errors.location) setErrors({ ...errors, location: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-[#091124] border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.location ? 'border-red-500 form-error-marker' : 'border-white/15'
                }`}
                placeholder="City & Country"
              />
              {errors.location && <p className="text-xs text-red-400 mt-1.5">{errors.location}</p>}
            </div>
          </div>

          {/* BUSINESS INFORMATION */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
            <h3
              className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Business Information
            </h3>

            {/* Which best describes you? */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Which best describes you? <span className="text-blue-400">*</span>
              </label>
              <div className="space-y-2.5">
                {PARTICIPANT_TYPES.map((type) => (
                  <label
                    key={type}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm cursor-pointer transition-all ${
                      formData.participantType === type
                        ? 'bg-blue-600/20 border-blue-500 text-white font-medium'
                        : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="participantType"
                      value={type}
                      checked={formData.participantType === type}
                      onChange={() => {
                        setFormData({ ...formData, participantType: type });
                        if (errors.participantType) setErrors({ ...errors, participantType: '' });
                      }}
                      className="mt-0.5 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {errors.participantType && (
                <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.participantType}</p>
              )}
            </div>

            {/* Conditional Business Owner Questions */}
            {isBusinessRunner && (
              <div className="pt-4 border-t border-white/10 space-y-6">
                {/* What industry is your business in? */}
                <div>
                  <label htmlFor="businessIndustry" className="block text-sm font-semibold text-slate-200 mb-2">
                    What industry is your business in? <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessIndustry"
                    value={formData.businessIndustry || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, businessIndustry: e.target.value });
                      if (errors.businessIndustry) setErrors({ ...errors, businessIndustry: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#091124] border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.businessIndustry ? 'border-red-500 form-error-marker' : 'border-white/15'
                    }`}
                    placeholder="e.g. Technology, Retail, Agriculture, Professional Services..."
                  />
                  {errors.businessIndustry && (
                    <p className="text-xs text-red-400 mt-1.5">{errors.businessIndustry}</p>
                  )}
                </div>

                {/* How long has your business been operating? */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    How long has your business been operating? <span className="text-blue-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {BUSINESS_AGES.map((item) => (
                      <label
                        key={item}
                        className={`flex items-center justify-center p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                          formData.businessAge === item
                            ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                            : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="businessAge"
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
                    <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.businessAge}</p>
                  )}
                </div>

                {/* What is your average monthly business revenue? */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1">
                    What is your average monthly business revenue? <span className="text-blue-400">*</span>
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Please select the closest range. This refers to business revenue, not personal income.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {MONTHLY_REVENUES.map((rev) => (
                      <label
                        key={rev}
                        className={`flex items-center justify-center p-3 rounded-xl border text-sm text-center cursor-pointer transition-all ${
                          formData.monthlyRevenue === rev
                            ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                            : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="monthlyRevenue"
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
                    <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.monthlyRevenue}</p>
                  )}
                </div>

                {/* How many people currently work in your business? */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    How many people currently work in your business? <span className="text-blue-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TEAM_SIZES.map((size) => (
                      <label
                        key={size}
                        className={`flex items-center justify-center p-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                          formData.teamSize === size
                            ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                            : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="teamSize"
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
                    <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.teamSize}</p>
                  )}
                </div>

                {/* What is the biggest challenge you're currently facing in your business? (Select up to 2) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-slate-200">
                      What is the biggest challenge you're currently facing in your business? <span className="text-blue-400">*</span>
                    </label>
                    <span className="text-xs text-slate-400">
                      Select up to 2 ({formData.biggestChallenge.length}/2)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CHALLENGES.map((challenge) => {
                      const selected = formData.biggestChallenge.includes(challenge);
                      const disabled = !selected && formData.biggestChallenge.length >= 2;
                      return (
                        <label
                          key={challenge}
                          onClick={() => {
                            if (!disabled || selected) handleChallengeToggle(challenge);
                          }}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-all cursor-pointer ${
                            selected
                              ? 'bg-blue-600/30 border-blue-400 text-white font-semibold'
                              : disabled
                              ? 'bg-[#080e1e] border-white/5 text-slate-500 opacity-60 cursor-not-allowed'
                              : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            disabled={disabled}
                            onChange={() => {}}
                            className="rounded text-blue-600 focus:ring-blue-500 bg-slate-800 border-white/20"
                          />
                          <span>{challenge}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.biggestChallenge && (
                    <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.biggestChallenge}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* COACHING OPPORTUNITY */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
            <h3
              className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Coaching Opportunity
            </h3>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">
                Would you like to be considered for a FREE 45-minute Business Coaching Session? <span className="text-blue-400">*</span>
              </label>
              <p className="text-xs text-slate-400 mb-3">
                10 attendees will be selected for a free 45-minute business coaching session.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['Yes, I\'d like to be considered', 'No'] as CoachingInterest[]).map((option) => (
                  <label
                    key={option}
                    className={`flex items-center justify-center p-3.5 rounded-xl border text-sm cursor-pointer transition-all ${
                      formData.coachingInterest === option
                        ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                        : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="coachingInterest"
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
                <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.coachingInterest}</p>
              )}
            </div>

            {/* Paragraph field if Yes */}
            {formData.coachingInterest === 'Yes, I\'d like to be considered' && (
              <div className="pt-2">
                <label htmlFor="coachingChallenge" className="block text-sm font-semibold text-slate-200 mb-2">
                  What specific business challenge would you like the coaching session to help you solve? <span className="text-blue-400">*</span>
                </label>
                <textarea
                  id="coachingChallenge"
                  rows={4}
                  value={formData.coachingChallenge || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, coachingChallenge: e.target.value });
                    if (errors.coachingChallenge) setErrors({ ...errors, coachingChallenge: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-[#091124] border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y ${
                    errors.coachingChallenge ? 'border-red-500 form-error-marker' : 'border-white/15'
                  }`}
                  placeholder="Describe your specific business challenge in detail..."
                />
                {errors.coachingChallenge && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.coachingChallenge}</p>
                )}
              </div>
            )}
          </div>

          {/* FUTURE SUPPORT */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3
              className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Future Support
            </h3>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                Would you be interested in paid business coaching or consulting after The Business Meeting? <span className="text-blue-400">*</span>
              </label>
              <div className="space-y-2.5">
                {([
                  'Yes, definitely',
                  'Possibly — I\'d like to know more',
                  'No, not at the moment',
                ] as PaidCoachingInterest[]).map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm cursor-pointer transition-all ${
                      formData.paidCoachingInterest === option
                        ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                        : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paidCoachingInterest"
                      value={option}
                      checked={formData.paidCoachingInterest === option}
                      onChange={() => {
                        setFormData({ ...formData, paidCoachingInterest: option });
                        if (errors.paidCoachingInterest) setErrors({ ...errors, paidCoachingInterest: '' });
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors.paidCoachingInterest && (
                <p className="text-xs text-red-400 mt-1.5 form-error-marker">{errors.paidCoachingInterest}</p>
              )}
            </div>
          </div>

          {/* SOURCE */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3
              className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              How Did You Hear About Us?
            </h3>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                How did you hear about The Business Meeting? <span className="text-xs text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SOURCES.map((src) => (
                  <label
                    key={src}
                    className={`flex items-center justify-center p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                      formData.source === src
                        ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                        : 'bg-[#091124] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="source"
                      value={src}
                      checked={formData.source === src}
                      onChange={() => setFormData({ ...formData, source: src })}
                      className="sr-only"
                    />
                    {src}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg sm:text-xl font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-600/30 cursor-pointer"
              style={{ fontFamily: 'Oswald, sans-serif' }}
              id="submit-registration-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Submitting Details...</span>
                </>
              ) : (
                <span>JOIN THE BUSINESS MEETING</span>
              )}
            </button>
            <p className="text-xs text-slate-400 mt-3">
              Free 6-Week Live Access • You will be redirected to the WhatsApp Channel immediately upon confirmation.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
