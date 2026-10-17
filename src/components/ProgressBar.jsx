import React from 'react';

/**
 * ProgressBar component in light mode.
 */
export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  valueLabel,
  variant = 'auto',
  size = 'md',
}) {
  const percentage = Math.max(0, Math.min(100, Math.round((value / (max || 1)) * 100)));

  let barColor = 'bg-sky-600';
  if (variant === 'auto') {
    if (percentage >= 80) barColor = 'bg-rose-500';
    else if (percentage >= 50) barColor = 'bg-amber-500';
    else barColor = 'bg-emerald-500';
  } else if (variant === 'danger') {
    barColor = 'bg-rose-500';
  } else if (variant === 'warning') {
    barColor = 'bg-amber-500';
  } else if (variant === 'success') {
    barColor = 'bg-emerald-500';
  }

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {(label || valueLabel) && (
        <div className="mb-1.5 flex justify-between text-xs font-semibold">
          {label && <span className="text-slate-600">{label}</span>}
          <span className="text-slate-900">{valueLabel || `${percentage}%`}</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-200 border border-slate-200/80 ${heightClasses[size]}`}>
        <div
          className={`${heightClasses[size]} rounded-full ${barColor} transition-all duration-300 shadow-2xs`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
