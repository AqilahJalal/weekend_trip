export type StopCategory = 'Food' | 'Culture & Heritage' | 'Nature & Sight' | 'Stay' | 'Leisure';
export type ExpenseCategory = 'Stay' | 'Food' | 'Transport' | 'Activities' | 'Other';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  color: string; // e.g. 'emerald' | 'amber' | 'blue' | 'purple' | 'rose'
  avatarBg: string;
  textColor: string;
  badgeBg: string;
}

export interface TripStop {
  id: string;
  name: string;
  location: string;
  timing: string;
  category: StopCategory;
  notes?: string;
}

export interface RouteLeg {
  id: string;
  fromStopId: string;
  toStopId: string;
  fromName: string;
  toName: string;
  distanceKm: number;
}

export interface TripExpense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amountMYR: number;
  paidById: string; // profile id of person who paid
  splitWithIds: string[]; // profile ids sharing this cost
  notes?: string;
}

export interface TripDetails {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
}
