import React from 'react';

/**
 * ScoreGauge component for composite scores (0-100) in light mode.
 */
export default function ScoreGauge({ score = 0, label = 'Score', size = 'md' }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  let color = 'text-emerald-700 border-emerald-200 bg-emerald-50';
  let strokeColor = '#10B981';

  if (clamped >= 75) {
    color = 'text-rose-700 border-rose-200 bg-rose-50';
    strokeColor = '#EF4444';
  } else if (clamped >= 50) {
    color = 'text-amber-800 border-amber-200 bg-amber-50';
    strokeColor = '#F59E0B';
  } else if (clamped >= 25) {
    color = 'text-sky-700 border-sky-200 bg-sky-50';
    strokeColor = '#0284C7';
  }

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-bold ${color}`}>
        <span>{clamped}</span>
        {label && <span className="text-[10px] opacity-75 font-normal uppercase">{label}</span>}
      </div>
    );
  }

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className={`inline-flex items-center gap-3 rounded-xl border p-2.5 shadow-2xs ${color}`}>
      <div className="relative h-12 w-12 flex items-center justify-center">
        <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={strokeColor}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <span className="absolute text-sm font-black text-slate-800">{clamped}</span>
      </div>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
        <div className="text-xs font-bold text-slate-900">
          {clamped >= 75 ? 'Critical Risk' : clamped >= 50 ? 'Elevated' : 'Moderate'}
        </div>
      </div>
    </div>
  );
}
