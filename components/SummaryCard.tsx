
import React from 'react';

interface SummaryCardProps {
  totalMinutes: number;
  entryCount: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ totalMinutes, entryCount }) => {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const getProgressMessage = () => {
    if (totalMinutes === 0) return "Ready to start your first session?";
    if (totalMinutes < 60) return "Good start! Every minute counts.";
    if (totalMinutes < 180) return "Keep going! You're making real progress.";
    return "Great consistency! You're crushing your goals today.";
  };

  const getProgressColor = () => {
    if (totalMinutes === 0) return "text-slate-500";
    if (totalMinutes < 60) return "text-blue-500";
    if (totalMinutes < 180) return "text-indigo-600";
    return "text-emerald-600";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">Today's Summary</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900">{hours}h {mins}m</span>
            <span className="text-slate-400 font-medium">studied</span>
          </div>
          <p className={`mt-2 font-medium ${getProgressColor()}`}>
            <i className="fa-solid fa-bolt-lightning mr-2"></i>
            {getProgressMessage()}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-50 rounded-xl p-4 flex-1 md:flex-none md:w-32 text-center">
            <span className="block text-2xl font-bold text-slate-800">{entryCount}</span>
            <span className="text-xs text-slate-500 font-medium uppercase">Sessions</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 flex-1 md:flex-none md:w-32 text-center">
            <span className="block text-2xl font-bold text-slate-800">{Math.round(totalMinutes / (entryCount || 1))}</span>
            <span className="text-xs text-slate-500 font-medium uppercase">Avg Mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
