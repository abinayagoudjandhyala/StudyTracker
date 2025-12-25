
import React, { useState, useEffect, useMemo } from 'react';
import { StudyEntry } from './types';
import { storageService } from './services/storageService';
import SummaryCard from './components/SummaryCard';
import StudyForm from './components/StudyForm';
import StudyList from './components/StudyList';
import WeeklySummary from './components/WeeklySummary';
import SubjectBreakdown from './components/SubjectBreakdown';

const App: React.FC = () => {
  const [entries, setEntries] = useState<StudyEntry[]>([]);
  const [filterDate, setFilterDate] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load entries on mount
  useEffect(() => {
    const savedEntries = storageService.getEntries();
    setEntries(savedEntries);
    setIsLoaded(true);
  }, []);

  // Save entries whenever they change
  useEffect(() => {
    if (isLoaded) {
      storageService.saveEntries(entries);
    }
  }, [entries, isLoaded]);

  const addEntry = (newEntry: Omit<StudyEntry, 'id'>) => {
    const entryWithId: StudyEntry = {
      ...newEntry,
      id: crypto.randomUUID()
    };
    setEntries((prev) => [entryWithId, ...prev]);
  };

  const deleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this study session?')) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear ALL study data? This cannot be undone.')) {
      setEntries([]);
      storageService.clearAll();
    }
  };

  // Calculate today's total minutes
  const todayTotal = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return entries
      .filter((e) => e.date === today)
      .reduce((sum, e) => sum + e.duration, 0);
  }, [entries]);

  const todayCount = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return entries.filter((e) => e.date === today).length;
  }, [entries]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-6 mb-8 sticky top-0 z-30 shadow-sm sm:shadow-none">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-graduation-cap text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">StudyTracker</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Daily Progress Dashboard</p>
            </div>
          </div>
          
          <button 
            onClick={clearAllData}
            className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <i className="fa-solid fa-trash-can text-[10px]"></i>
            Clear All Data
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Summary and Form */}
          <div className="lg:col-span-4 space-y-6">
            <SummaryCard totalMinutes={todayTotal} entryCount={todayCount} />
            <div className="hidden lg:block">
              <SubjectBreakdown entries={entries} />
            </div>
            <StudyForm onAdd={addEntry} />
          </div>

          {/* Right Column: Weekly Stats and List */}
          <div className="lg:col-span-8 space-y-6">
            <WeeklySummary entries={entries} />
            
            <div className="lg:hidden">
              <SubjectBreakdown entries={entries} />
            </div>

            <StudyList 
              entries={entries} 
              onDelete={deleteEntry} 
              filterDate={filterDate}
              onFilterChange={setFilterDate}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">
          Built for learners. Stay consistent. 🚀
        </p>
      </footer>
    </div>
  );
};

export default App;
