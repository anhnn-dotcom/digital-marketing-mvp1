import { forwardRef } from 'react';

const Toggle = forwardRef(({ 
  className = '', 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
      ${checked ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
        ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
