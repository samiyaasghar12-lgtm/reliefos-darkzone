import React from 'react';

/**
 * StatCard component for summary metrics across dashboards.
 * White cards with #E2E8F0 border and light theme tokens.
 */
export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = 'default',
  highlight = false,
  onClick,
}) {
  const variantStyles = {
    default: 'border-[#E2E8F0] bg-white text-[#0F172A] hover:border-slate-300',
    danger: 'border-rose-200 bg-rose-50/60 text-rose-950 hover:border-rose-300',
    warning: 'border-amber-200 bg-amber-50/60 text-amber-950 hover:border-amber-300',
    success: 'border-emerald-200 bg-emerald-50/60 text-emerald-950 hover:border-emerald-300',
    info: 'border-sky-200 bg-sky-50/60 text-sky-950 hover:border-sky-300',
    purple: 'border-purple-200 bg-purple-50/60 text-purple-950 hover:border-purple-300',
  };

  const valueColors = {
    default: 'text-[#0F172A]',
    danger: 'text-rose-600',
    warning: 'text-amber-600',
    success: 'text-emerald-600',
    info: 'text-sky-600',
    purple: 'text-purple-600',
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border p-5 shadow-xs transition-all duration-200 ${
        variantStyles[variant] || variantStyles.default
      } ${highlight ? 'ring-2 ring-rose-400 shadow-md shadow-rose-100' : ''} ${
        onClick ? 'cursor-pointer hover:scale-[1.01]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight ${valueColors[variant] || 'text-[#0F172A]'}`}>
              {value}
            </span>
            {trend && <span className="text-xs font-medium text-slate-500">{trend}</span>}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {icon && (
          <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700 border border-slate-200">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
