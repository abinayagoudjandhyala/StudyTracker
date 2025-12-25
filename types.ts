
export interface StudyEntry {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  subject: string;
  duration: number; // in minutes
  notes: string;
}

export type FilterType = 'all' | 'today' | 'week' | 'custom';
