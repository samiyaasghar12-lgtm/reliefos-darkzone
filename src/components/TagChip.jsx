import React from 'react';

/**
 * TagChip component for categorized badges in light mode.
 */
export default function TagChip({ tag, variant }) {
  const normTag = (tag || '').toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (variant === 'silent_risk' || normTag.includes('silent') || normTag.includes('dark')) {
    styles = 'bg-purple-50 text-purple-800 border-purple-200';
  } else if (variant === 'reported' || normTag.includes('reported')) {
    styles = 'bg-sky-50 text-sky-800 border-sky-200';
  } else if (variant === 'danger' || normTag.includes('critical')) {
    styles = 'bg-rose-50 text-rose-800 border-rose-200';
  } else if (variant === 'success' || normTag.includes('safe') || normTag.includes('verified')) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide border ${styles}`}
    >
      {tag}
    </span>
  );
}
