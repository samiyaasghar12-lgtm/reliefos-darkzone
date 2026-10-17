import React from 'react';

/**
 * Skeleton loading placeholder in light mode.
 */
export default function Skeleton({ className = '', variant = 'rect', count = 1 }) {
  const baseStyles = 'animate-pulse bg-slate-200 rounded';
  
  const variantStyles = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rect: 'rounded-xl',
  };

  const items = Array.from({ length: count });

  if (count === 1) {
    return <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} />;
  }

  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <div key={i} className={`${baseStyles} ${variantStyles[variant]} ${className}`} />
      ))}
    </div>
  );
}
