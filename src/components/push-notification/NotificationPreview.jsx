import { Wifi, Battery, Signal, ChevronRight, X } from 'lucide-react';

export default function NotificationPreview({ data, style }) {
  const isIOS = style === 'iOS Lock Screen';
  const isAndroid = style === 'Android';
  const isInApp = style === 'In-App';

  const title = data.title || 'Push Notification Title';
  const body = data.body || 'Push Notification Body Content here. This updates live as you type.';

  return (
    <div className="flex flex-col items-center justify-center w-full h-[640px] mt-4 fade-in">
      <div className="w-[320px] h-full bg-black rounded-[3rem] p-3 shadow-2xl relative flex-shrink-0 border-black border-4">
        {/* Notch */}
        {isIOS || isInApp ? (
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
            <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
          </div>
        ) : (
          <div className="absolute top-3 inset-x-0 flex justify-center z-20">
             <div className="w-4 h-4 bg-black rounded-full border border-gray-800"></div>
          </div>
        )}
        
        {/* Screen */}
        <div className={`w-full h-full rounded-[2.25rem] overflow-hidden relative border border-gray-800 transition-colors duration-500
          ${isIOS ? 'bg-gradient-to-br from-[#1E293B] to-[#0F172A]' : 
            isAndroid ? 'bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#0F172A]' :
            'bg-[#F8FAFC]'
          }`}
        >
          
          {/* Status Bar */}
          <div className={`h-12 w-full px-6 flex justify-between items-center text-xs font-semibold absolute top-0 z-10 pt-1 transition-colors
            ${isIOS || isAndroid ? 'text-white' : 'text-black'}`}
          >
            <span>9:41</span>
            <div className="flex space-x-1.5 items-center">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Background Content for In-App */}
          {isInApp && (
            <div className="pt-14 px-4 space-y-4 pointer-events-none filter blur-sm">
              <div className="h-10 bg-white rounded-lg opacity-80"></div>
              <div className="h-40 bg-white rounded-xl shadow-sm opacity-80"></div>
              <div className="h-40 bg-white rounded-xl shadow-sm opacity-80"></div>
            </div>
          )}

          {/* NOTIFICATION UI OVERLAY */}
          
          {isIOS && (
            <div className="w-full flex flex-col items-center pt-24 space-y-8 animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col items-center space-y-2 text-white text-center">
                <span className="text-5xl font-light tabular-nums">09:41</span>
                <span className="text-xl font-medium tracking-wide">Wednesday, March 25</span>
              </div>
              
              <div className="w-[90%] bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/10 overflow-hidden transform hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-2 opacity-80">
                  <div className="flex items-center gap-2">
                    {data.showBadge && (
                      <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center shadow-inner">
                        <span className="text-[10px] text-white font-bold tracking-tighter">DM</span>
                      </div>
                    )}
                    <span className="text-[11px] font-bold tracking-widest text-white/90 uppercase">DM platform</span>
                  </div>
                  <span className="text-xs text-white/75">now</span>
                </div>
                
                <h4 className="text-[15px] font-bold text-white mb-1.5 leading-snug">{title}</h4>
                <p className="text-sm text-white/90 leading-tight line-clamp-4">{body}</p>

                {data.imageUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden h-32 w-full border border-white/10 relative">
                     <img src={data.imageUrl} className="w-full h-full object-cover" alt="Push Attachment" />
                     <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isAndroid && (
            <div className="w-full h-full relative group cursor-pointer animate-in fade-in duration-300">
              {/* Android notification panel pull-down look */}
              <div className="absolute top-12 inset-x-2 bg-[#2D333B]/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/5 overflow-hidden transform group-hover:scale-[1.01] transition-transform">
                <div className="flex items-start gap-3">
                  {data.showBadge ? (
                     <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg mt-1">
                       <span className="text-xs text-white font-bold">DM</span>
                     </div>
                  ) : (
                     <div className="w-8 h-8 rounded-full bg-transparent flex-shrink-0 mt-1"></div>
                  )}
                  <div className="flex-1 w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-white/80 flex items-center gap-1.5">
                        DM Platform <span className="w-1 h-1 rounded-full bg-white/40"></span> 9:41 AM
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-wide mb-1 flex items-start justify-between">
                      <span className="truncate pr-2">{title}</span>
                    </h4>
                    <p className="text-[13px] text-white/80 leading-snug line-clamp-3 mb-2">{body}</p>
                    
                    {data.imageUrl && (
                      <div className="rounded-[10px] overflow-hidden w-full h-28 border border-white/10 mt-1 relative">
                         <img src={data.imageUrl} className="w-full h-full object-cover" alt="Push Attachment" />
                         <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[10px]"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mock Android Home Screen UI below */}
              <div className="absolute bottom-6 inset-x-0 px-6 space-y-6 flex flex-col items-center filter opacity-40">
                 <div className="w-full h-10 bg-white/10 rounded-full"></div>
                 <div className="grid grid-cols-4 gap-4 w-full px-2">
                   {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-white/10 rounded-2xl"></div>)}
                 </div>
                 <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
              </div>
            </div>
          )}

          {isInApp && (
            <div className="absolute top-12 inset-x-3 animate-in slide-in-from-top-6 duration-300">
              <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-[#E2E8F0] overflow-hidden transform hover:scale-[1.02] transition-transform cursor-pointer">
                {/* Close Button UI */}
                <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full z-10 text-gray-500">
                  <X className="w-3 h-3" />
                </div>
                
                <div className="p-4 flex gap-3 relative">
                  {data.showBadge && (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-inner mt-0.5">
                      <span className="text-xs text-white font-bold">DM</span>
                    </div>
                  )}
                  <div className="flex-1 w-0 pr-4">
                    <h4 className="text-sm font-bold text-[#0F172A] mb-1 line-clamp-1">{title}</h4>
                    <p className="text-[13px] text-[#475569] leading-snug line-clamp-2">{body}</p>
                  </div>
                </div>
                {data.imageUrl && (
                  <div className="h-32 w-full bg-gray-100">
                     <img src={data.imageUrl} className="w-full h-full object-cover" alt="Push Attachment" />
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
