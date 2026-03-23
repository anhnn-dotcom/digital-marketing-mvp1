import { Users, Info, Settings } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function SegmentPreviewCard({ isCalculating, memberCount, syncTime, onRunPreview, groups }) {
  const formattedCount = new Intl.NumberFormat('en-US').format(memberCount);
  
  // Create dynamic stats breakdown based on current builder state
  const breakdown = groups.reduce((acc, curr) => {
    if (!acc[curr.dataset]) {
       acc[curr.dataset] = 0;
    }
    // Simulated count penalty per condition
    acc[curr.dataset] += Math.floor((150000 / (curr.conditions.length + 1)) * (Math.random() * 0.5 + 0.5));
    return acc;
  }, {});

  return (
    <Card className="sticky top-6 border-[#2563EB] shadow-md relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#DBEAFE] rounded-full opacity-50 pointer-events-none blur-3xl"></div>

      <div className="flex flex-col items-center justify-center p-6 text-center z-10 relative border-b border-[#E2E8F0]">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-blue-100 transform -rotate-3">
          <Users className="w-7 h-7 text-[#2563EB] transform rotate-3" />
        </div>
        
        <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-3">
          Estimated Audience
        </h2>
        
        <div className="h-16 flex items-center justify-center w-full">
           {isCalculating ? (
            <div className="flex flex-col items-center gap-3 fade-in">
               <div className="w-6 h-6 border-3 border-[#2563EB] border-t-transparent rounded-full animate-spin spin-slow" />
               <span className="text-xl font-bold text-[#0F172A]">Computing Data...</span>
            </div>
          ) : (
            <span className="text-5xl font-black text-[#0F172A] tracking-tighter drop-shadow-sm fade-in">{formattedCount}</span>
          )}
        </div>

        {!isCalculating && (
          <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full uppercase tracking-wide border border-emerald-200 shadow-sm fade-in">
            <CheckIcon className="w-3 h-3" /> High Confidence
          </div>
        )}
      </div>

      <div className="p-6 bg-[#F8FAFC]">
         <div className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#64748B]" /> Audience Composition
         </div>

         {!isCalculating && Object.keys(breakdown).length > 0 ? (
           <div className="space-y-3 mb-6 fade-in">
             {Object.entries(breakdown).map(([ds, count], index) => (
                <div key={ds} className="flex justify-between items-center text-sm border border-[#E2E8F0] bg-white px-3 py-2 rounded-lg shadow-sm">
                  <span className="font-medium text-[#475569] truncate flex-1 flex items-center gap-2">
                     {index > 0 && <span className="text-[#94A3B8] font-bold text-xs uppercase px-1">AND</span>}
                     {ds}
                  </span>
                  <span className="font-bold text-[#0F172A] ml-4 shrink-0">{new Intl.NumberFormat('en-US').format(count)}</span>
                </div>
             ))}
              <div className="flex justify-between items-center text-sm pt-3 border-t-2 border-dashed border-[#CBD5E1] mt-3 font-black text-[#0F172A] px-2">
                  <span>Match Total</span>
                  <span className="text-[#2563EB] text-xl">{formattedCount}</span>
              </div>
           </div>
         ) : (
           <div className="text-sm text-[#94A3B8] mb-6 italic text-center p-4 bg-white rounded-lg border border-[#E2E8F0] border-dashed">
            Run preview to see dataset overlap estimation.
           </div>
         )}

         <div className="text-[11px] font-medium text-[#64748B] flex items-center gap-2 mb-5 p-2 bg-slate-100 rounded border border-slate-200">
           <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
           <span className="truncate">Data updated: {syncTime}</span>
         </div>

         <Button 
          className="w-full shadow-md font-bold text-base py-6 transition-transform active:scale-[0.98]" 
          onClick={onRunPreview}
          isLoading={isCalculating}
        >
          {isCalculating ? 'Computing Segments...' : 'Run Preview Engine'}
        </Button>
      </div>

    </Card>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
