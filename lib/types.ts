// Lead status enum - matches database ENUM
export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'APPOINTMENT_SCHEDULED'
  | 'NOT_RELEVANT'
  | 'NO_RESPONSE';

// Database types
export interface Business {
  id: string;
  name: string;
  owner_user_id: string;
  created_at: string;
}

export interface Lead {
  id: string;
  business_id: string;
  name: string;
  phone: string;
  instagram: string | null;
  treatment_type: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  next_followup_at: string | null;
}

// Form types
export interface CreateBusinessInput {
  name: string;
}

export interface CreateLeadInput {
  name: string;
  phone: string;
  instagram?: string;
  treatment_type?: string;
  notes?: string;
}

export interface UpdateLeadInput {
  name?: string;
  phone?: string;
  instagram?: string | null;
  treatment_type?: string | null;
  status?: LeadStatus;
  notes?: string | null;
  next_followup_at?: string | null;
}

// Stats types
export interface MonthlyStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
  conversionRate: number;
}

// Constants
export const LEAD_STATUSES: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'APPOINTMENT_SCHEDULED',
  'NOT_RELEVANT',
  'NO_RESPONSE',
];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: 'חדש',
  CONTACTED: 'נוצר קשר',
  APPOINTMENT_SCHEDULED: 'נקבע תור',
  NOT_RELEVANT: 'לא רלוונטי',
  NO_RESPONSE: 'אין מענה',
};

export const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: 'bg-blue-500',
  CONTACTED: 'bg-orange-500',
  APPOINTMENT_SCHEDULED: 'bg-green-500',
  NOT_RELEVANT: 'bg-red-500',
  NO_RESPONSE: 'bg-gray-500',
};

// Follow-up days constant
export const FOLLOW_UP_DAYS = 3;
