import { FolderX } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ 
  icon: Icon = FolderX, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center fade-in">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#2563EB]" />
      </div>
      <h3 className="text-lg font-medium text-[#0F172A] mb-2">{title}</h3>
      <p className="text-[#64748B] text-sm max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
