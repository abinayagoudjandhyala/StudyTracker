
import React from 'react';
import { StudyEntry } from '../types';

interface SubjectBreakdownProps {
  entries: StudyEntry[];
}

const SubjectBreakdown: React.FC<SubjectBreakdownProps> = ({ entries }) => {
  const breakdown = entries.reduce((acc, entry) => {
    const subject = entry.subject.trim();
    acc[subject] = (acc[subject] || 0) + entry.duration;
    return acc;
  }, {} as Record<string, number>);

  // Explicitly cast Object.entries to [string, number][] to fix arithmetic operation errors in sort and map
  const sortedBreakdown = (Object.entries(breakdown) as [string, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Top 5 subjects

  const totalTime = entries.reduce((sum, e) => sum + e.duration, 0);

  if (entries.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-layer-group text-indigo-500"></i>
        Subject Breakdown
      </h3>
      <div className="space-y-4">
        {sortedBreakdown.map(([subject, minutes]) => {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          const percentage = totalTime > 0 ? (minutes / totalTime) * 100 : 0;

          return (
            <div key={subject}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-bold text-slate-700 truncate mr-4">{subject}</span>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  {hours > 0 ? `${hours}h ` : ''}{mins}m
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        {Object.keys(breakdown).length > 5 && (
          <p className="text-[10px] text-center text-slate-400 font-medium italic mt-2">
            + {Object.keys(breakdown).length - 5} more subjects
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectBreakdown;
