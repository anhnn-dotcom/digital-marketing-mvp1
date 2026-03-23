import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Drawer({ 
  isOpen, 
  onClose, 
  title, 
  children,
  width = 'md' // sm, md, lg
}) {

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end outline-none focus:outline-none">
      <div 
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity fade-in" 
        onClick={onClose}
      />
      <div className={`relative w-full ${widthClasses[width]} bg-white h-full shadow-2xl flex flex-col slide-in-right transform`}>
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <h3 className="text-xl font-semibold text-[#0F172A]">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 ml-auto text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-full transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="relative p-6 flex-auto overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
