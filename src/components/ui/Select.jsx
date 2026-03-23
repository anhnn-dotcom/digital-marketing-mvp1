import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ 
  className = '', 
  label,
  error,
  options = [],
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      {label && <label className="text-sm font-medium text-[#0F172A]">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={`appearance-none flex h-10 w-full rounded-md border text-sm 
          focus:outline-none focus:ring-2 focus:ring-offset-0 px-3 pr-10 transition-colors
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
            : 'border-[#E2E8F0] focus:border-blue-500 focus:ring-blue-100 bg-white'
          }
          disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500
          ${className}`}
          {...props}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value !== undefined ? opt.value : opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#64748B]">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">This field is required</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
