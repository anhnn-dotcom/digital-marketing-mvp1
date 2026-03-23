import { useEffect } from 'react';
import Button from './Button';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  actionLabel = 'Confirm',
  onAction,
  isDestructive = false
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center fade-in">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 transform transition-all scale-100 m-4">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{title}</h3>
        <div className="text-sm text-[#64748B] mb-6">
          {children}
        </div>
        <div className="flex items-center justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant={isDestructive ? 'danger' : 'primary'} 
            onClick={() => {
              onAction();
              onClose();
            }}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
