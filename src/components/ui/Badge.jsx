import { forwardRef } from 'react';

const Badge = forwardRef(({ 
  className = '', 
  variant = 'gray', 
  children, 
  ...props 
}, ref) => {
  
  const variants = {
    gray: 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]',
    green: 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]',
    blue: 'bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE]',
    amber: 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]',
  };

  return (
    <span
      ref={ref}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
