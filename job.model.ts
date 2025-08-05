export interface Job {
  id?: number;
  company: string;
  role: string;
  location: string;
  status: string;
  notes?: string;
  dateApplied?: string;
  favorite?: boolean;
}