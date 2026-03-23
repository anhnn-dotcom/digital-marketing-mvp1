export default function ProgressBar({ value = 0, className = '' }) {
  const percentage = Math.min(100, Math.max(0, value));
  
  return (
    <div className={`flex items-center gap-3 w-full ${className}`}>
      <div className="flex-1 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-[#64748B] w-8">
        {percentage}%
      </span>
    </div>
  );
}
