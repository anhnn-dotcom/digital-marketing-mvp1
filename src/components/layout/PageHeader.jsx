import { ChevronRight } from 'lucide-react';

export default function PageHeader({ 
  title, 
  breadcrumbs = [], 
  action 
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={index === breadcrumbs.length - 1 ? 'text-[#0F172A] font-medium' : ''}>
                  {crumb}
                </span>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">{title}</h1>
      </div>
      
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
