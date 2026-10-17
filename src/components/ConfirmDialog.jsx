import React from 'react';

/**
 * ConfirmDialog modal component in light mode.
 */
export default function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary', // 'primary' | 'danger' | 'warning'
  onConfirm,
  onCancel,
  children,
}) {
  if (!isOpen) return null;

  const confirmColors = {
    primary: 'bg-sky-600 hover:bg-sky-500 text-white font-semibold',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white font-semibold',
    warning: 'bg-amber-600 hover:bg-amber-500 text-white font-semibold',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
        
        {children && <div className="mt-4">{children}</div>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-xs transition-colors shadow-xs ${confirmColors[confirmVariant] || confirmColors.primary}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
