
import React from 'react';
import { StudyEntry } from '../types';

interface WeeklySummaryProps {
  entries: StudyEntry[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ entries }) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const dayTotals = last7Days.map(date => {
    const total = entries
      .filter(e => e.date === date)
      .reduce((sum, e) => sum + e.duration, 0);
    
    // Format label (e.g., "Mon")
    const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    return { date, total, label: dayLabel };
  });

  const maxDuration = Math.max(...dayTotals.map(d => d.total), 60); // min scale of 60 mins

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
        <i className="fa-solid fa-chart-simple text-indigo-500"></i>
        Weekly Activity
      </h3>
      <div className="flex items-end justify-between gap-2 h-32">
        {dayTotals.map((day, idx) => {
          const heightPercent = (day.total / maxDuration) * 100;
          const isToday = idx === 6;
          
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group relative">
              <div 
                className="w-full bg-slate-100 rounded-t-lg transition-all duration-500 relative overflow-hidden"
                style={{ height: '100%' }}
              >
                <div 
                  className={`absolute bottom-0 w-full transition-all duration-700 ease-out rounded-t-lg ${isToday ? 'bg-indigo-500' : 'bg-indigo-200 group-hover:bg-indigo-300'}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className={`text-[10px] font-bold uppercase ${isToday ? 'text-indigo-600' : 'text-slate-400'}`}>
                {day.label}
              </span>
              
              {/* Tooltip */}
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                {Math.floor(day.total / 60)}h {day.total % 60}m
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklySummary;
