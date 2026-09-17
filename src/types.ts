export type AgeRange = 'Under 18' | '18–24' | '25–34' | '35–44' | '45–54' | '55+';

export type ParticipantType =
  | 'I have a business idea but haven\'t started yet'
  | 'I currently run a business'
  | 'I run more than one business'
  | 'I work in/manage a business but I\'m not the owner'
  | 'I\'m here primarily to learn about business';

export type BusinessAge =
  | 'Less than 1 year'
  | '1–2 years'
  | '3–5 years'
  | '6–10 years'
  | 'More than 10 years';

export type MonthlyRevenue =
  | 'Less than ₦500,000'
  | '₦500,000 – ₦1 million'
  | '₦1 million – ₦5 million'
  | '₦5 million – ₦10 million'
  | '₦10 million – ₦50 million'
  | 'Above ₦50 million';

export type TeamSize =
  | 'Just me'
  | '2–5'
  | '6–10'
  | '11–20'
  | '21–50'
  | '51–100'
  | '100+';

export type CoachingInterest =
  | 'Yes, I\'d like to be considered'
  | 'No';

export type PaidCoachingInterest =
  | 'Yes, definitely'
  | 'Possibly — I\'d like to know more'
  | 'No, not at the moment';

export type LeadSource =
  | 'Instagram'
  | 'Facebook'
  | 'WhatsApp'
  | 'YouTube'
  | 'LinkedIn'
  | 'Friend / Referral'
  | 'Other';

export interface RegistrationFormData {
  // Personal Info
  fullName: string;
  email: string;
  whatsApp: string;
  ageRange: AgeRange | '';
  location: string;

  // Business Info
  participantType: ParticipantType | '';
  businessIndustry?: string;
  businessAge?: BusinessAge | '';
  monthlyRevenue?: MonthlyRevenue | '';
  teamSize?: TeamSize | '';
  biggestChallenge: string[]; // up to 2

  // Coaching Opportunity
  coachingInterest: CoachingInterest | '';
  coachingChallenge?: string;

  // Future Support
  paidCoachingInterest: PaidCoachingInterest | '';

  // Source
  source?: LeadSource | '';

  // Meta
  timestamp?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
}
