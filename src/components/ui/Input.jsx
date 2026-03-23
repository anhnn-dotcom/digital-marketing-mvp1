import { forwardRef } from 'react';

const Input = forwardRef(({ 
  className = '', 
  label,
  error,
  helpText,
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-[#0F172A]">{label}</label>}
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-md border text-sm placeholder:text-[#94A3B8] 
        focus:outline-none focus:ring-2 focus:ring-offset-0 px-3 transition-colors
        ${error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
          : 'border-[#E2E8F0] focus:border-blue-500 focus:ring-blue-100 bg-white'
        }
        disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500
        ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1 slide-in-right">{error}</p>}
      {!error && helpText && <p className="text-sm text-[#64748B] mt-1">{helpText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
