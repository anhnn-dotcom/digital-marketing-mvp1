import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm',
    secondary: 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] shadow-sm',
    ghost: 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]',
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      ref={ref}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin spin-slow" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
