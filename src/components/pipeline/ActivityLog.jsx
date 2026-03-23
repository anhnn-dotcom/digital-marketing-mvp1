import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw, Layers } from 'lucide-react';
import Button from '../ui/Button';

export default function ActivityLog({ logs, onClear }) {
  const getLogIcon = (type) => {
    switch (type) {
      case 'sync': return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'job': return <Layers className="w-4 h-4 text-indigo-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'info':
      default: return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  const formatTime = (isoString) => {
    try {
      return formatDistanceToNow(new Date(isoString), { addSuffix: true });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col h-full max-h-[600px]">
      <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC] rounded-t-xl">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            Activity Log
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Real-time pipeline events and anomalies.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-sm font-medium hover:text-red-600 hover:bg-red-50 py-1 px-3">
          Clear log
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {logs.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-sm text-slate-500">
            No active logs in the pipeline.
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {logs.map((log) => (
              <div key={log.id} className="relative flex items-start gap-4 z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-slate-100 shadow-sm shrink-0">
                  {getLogIcon(log.type)}
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm w-full transition-all hover:border-[#CBD5E1]">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-[#0F172A] text-sm">{log.message}</span>
                    <span className="text-[11px] font-medium text-[#94A3B8] whitespace-nowrap ml-4">{formatTime(log.timestamp)}</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                    {log.source}
                  </div>
                  {log.details && (
                    <div className="text-sm text-[#64748B] leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                      {log.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
