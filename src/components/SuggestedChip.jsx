import React from 'react';

/**
 * SuggestedChip component with light theme colors.
 */
export default function SuggestedChip({ text = 'Suggested', tooltip = 'Automated recommendation — requires human confirmation' }) {
  return (
    <span
      title={tooltip}
      className="inline-flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 shadow-2xs"
    >
      <svg className="h-3 w-3 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span>{text}</span>
    </span>
  );
}
