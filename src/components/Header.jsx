import React from 'react';
import { useAppStore } from '../store/index.jsx';

export default function Header() {
  const { role, setRole, isOnline, isDemoData, pendingSyncCount } = useAppStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-6 shadow-xs">
      {/* Left: Brand / Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A] text-white shadow-xs">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-[#0F172A]">ReliefOS</span>
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
              DARK ZONE
            </span>
          </div>
          <p className="text-[10px] font-medium text-slate-500">Finding who needs help most</p>
        </div>
      </div>

      {/* Right: Chips & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Demo Data Chip */}
        {isDemoData && (
          <div className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
            <span>Demo data</span>
          </div>
        )}

        {/* Online / Offline Status Chip */}
        <div
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
            isOnline
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-amber-300 bg-amber-50 text-amber-800 animate-pulse'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'
            }`}
          />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
          {pendingSyncCount > 0 && (
            <span className="ml-1 rounded-full bg-amber-200 px-1.5 py-0.2 text-[10px] font-bold text-amber-900">
              {pendingSyncCount} pending
            </span>
          )}
        </div>

        {/* Role Switcher: "Admin" and "Volunteer" */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs">
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
              role === 'admin'
                ? 'bg-white text-[#0F172A] shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Admin</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('volunteer')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
              role === 'volunteer'
                ? 'bg-white text-[#0F172A] shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Volunteer</span>
          </button>
        </div>
      </div>
    </header>
  );
}
