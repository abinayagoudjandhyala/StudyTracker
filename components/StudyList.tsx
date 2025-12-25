
import React from 'react';
import { StudyEntry } from '../types';

interface StudyListProps {
  entries: StudyEntry[];
  onDelete: (id: string) => void;
  filterDate: string;
  onFilterChange: (date: string) => void;
}

const StudyList: React.FC<StudyListProps> = ({ entries, onDelete, filterDate, onFilterChange }) => {
  const filteredEntries = filterDate 
    ? entries.filter(e => e.date === filterDate)
    : entries;

  const sortedEntries = [...filteredEntries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-800">Recent Entries</h3>
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Filter:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => onFilterChange(e.target.value)}
            className="text-sm px-2 py-1 bg-white border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
          />
          {filterDate && (
            <button 
              onClick={() => onFilterChange('')}
              className="text-xs text-indigo-600 font-semibold hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {sortedEntries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-book-open text-slate-300 text-2xl"></i>
          </div>
          <p className="text-slate-500 font-medium">No sessions found for this selection.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedEntries.map((entry) => (
            <div 
              key={entry.id} 
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:border-indigo-200 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded">
                      {entry.date}
                    </span>
                    <span className="text-slate-400 text-sm font-medium">
                      <i className="fa-regular fa-clock mr-1"></i>
                      {entry.duration} mins
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{entry.subject}</h4>
                  {entry.notes && (
                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                      "{entry.notes}"
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                  title="Delete entry"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyList;
