
import { StudyEntry } from '../types';

const STORAGE_KEY = 'study_tracker_entries';

export const storageService = {
  getEntries: (): StudyEntry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  },

  saveEntries: (entries: StudyEntry[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  },

  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
