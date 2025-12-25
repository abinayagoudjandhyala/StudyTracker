
import React, { useState } from 'react';
import { StudyEntry } from '../types';

interface StudyFormProps {
  onAdd: (entry: Omit<StudyEntry, 'id'>) => void;
}

const StudyForm: React.FC<StudyFormProps> = ({ onAdd }) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !duration) return;

    onAdd({
      date,
      subject,
      duration: parseInt(duration, 10),
      notes
    });

    // Reset form
    setSubject('');
    setDuration('');
    setNotes('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-8">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i className="fa-solid fa-plus-circle text-indigo-500"></i>
        New Study Session
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Subject / Topic</label>
          <input
            type="text"
            required
            placeholder="e.g. Data Structures, React Basics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Time Studied (minutes)</label>
          <input
            type="number"
            required
            min="1"
            placeholder="e.g. 45, 90"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Notes (Optional)</label>
          <textarea
            rows={3}
            placeholder="What did you cover?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98]"
        >
          Add Progress
        </button>
      </form>
    </div>
  );
};

export default StudyForm;
