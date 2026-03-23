import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, Copy, RefreshCw, FileText, Play, Settings } from 'lucide-react';

export default function ActionsMenu({ 
  onManage, 
  onRunNow, 
  onEdit, 
  onDuplicate, 
  onSync, 
  onToggleStatus, 
  status, 
  onDelete,
  options // New: Array of { label, onClick, icon: IconComponent, danger, type: 'divider' }
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#E2E8F0] rounded-md opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 focus:outline-none"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none fade-in">
          <div className="py-1">
            {onRunNow && (
              <button
                onClick={() => { onRunNow(); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <Play className="mr-3 h-4 w-4 text-[#64748B]" />
                Run Now
              </button>
            )}
            {onManage && (
              <button
                onClick={() => { onManage(); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <Settings className="mr-3 h-4 w-4 text-[#64748B]" />
                Manage
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => { onEdit(); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <Edit className="mr-3 h-4 w-4 text-[#64748B]" />
                Edit
              </button>
            )}
            {onDuplicate && (
              <button
                onClick={() => { onDuplicate(); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <Copy className="mr-3 h-4 w-4 text-[#64748B]" />
                Duplicate
              </button>
            )}
            {onSync && (
              <button
                onClick={() => { onSync(); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <RefreshCw className="mr-3 h-4 w-4 text-[#64748B]" />
                Sync Now
              </button>
            )}
            
            {(onToggleStatus || onDelete) && <div className="my-1 border-t border-[#E2E8F0]"></div>}

            {onToggleStatus && (
              <button
                onClick={() => { onToggleStatus(); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <div className="mr-3 h-4 w-4 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-gray-400' : 'bg-green-500'}`} />
                </div>
                {status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => { onDelete(); setIsOpen(false); }}
                className="flex items-center w-full px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2]"
              >
                <Trash2 className="mr-3 h-4 w-4 text-[#DC2626]" />
                Delete
              </button>
            )}

            {/* Custom Options Array Rendering */}
            {options && options.map((opt, i) => {
              if (opt.type === 'divider') {
                return <div key={i} className="my-1 border-t border-[#E2E8F0]"></div>;
              }
              const Icon = opt.icon;
              return (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); opt.onClick(); setIsOpen(false); }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${opt.danger ? 'text-[#DC2626] hover:bg-[#FEF2F2]' : 'text-[#0F172A] hover:bg-[#F8FAFC]'}`}
                >
                  {Icon && <Icon className={`mr-3 h-4 w-4 ${opt.danger ? 'text-[#DC2626]' : 'text-[#64748B]'}`} />}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
