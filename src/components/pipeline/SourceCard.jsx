import React from 'react';
import { Database, Cloud, CreditCard, Smartphone, Plug, UploadCloud, RefreshCw, Trash2, StopCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function SourceCard({ source, onSync, onDisconnect }) {
  const getIcon = (type) => {
    switch (type) {
      case 'CRM': return <Cloud className="w-5 h-5 text-blue-500" />;
      case 'Transactions': return <CreditCard className="w-5 h-5 text-indigo-500" />;
      case 'Loyalty': return <Database className="w-5 h-5 text-purple-500" />;
      case 'App Events': return <Smartphone className="w-5 h-5 text-green-500" />;
      case 'Manual Upload': return <UploadCloud className="w-5 h-5 text-orange-500" />;
      default: return <Plug className="w-5 h-5 text-slate-500" />;
    }
  };

  const isConnected = source.status === 'Connected';
  const isError = source.status === 'Error';

  return (
    <div className={`bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${isError ? 'border-red-200' : 'border-[#E2E8F0]'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100`}>
            {getIcon(source.type)}
          </div>
          <div>
            <h4 className="font-semibold text-[#0F172A] leading-tight">{source.name}</h4>
            <span className="text-xs font-medium text-[#64748B]">{source.type}</span>
          </div>
        </div>
        <Badge variant={isConnected ? 'green' : isError ? 'red' : 'gray'}>
          {source.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5">
        <div>
          <div className="text-xs text-[#64748B] mb-0.5">Records</div>
          <div className="text-sm font-semibold text-[#0F172A]">{new Intl.NumberFormat('en-US').format(source.recordCount)}</div>
        </div>
        <div>
          <div className="text-xs text-[#64748B] mb-0.5">Automated Sync</div>
          <div className="text-sm font-semibold text-[#0F172A]">{source.syncFrequency}</div>
        </div>
        <div className="col-span-2">
          <div className="text-xs text-[#64748B] flex items-center gap-1.5">
            Last synced: <span className="font-medium text-[#0F172A]">{source.lastSync}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-[#F1F5F9] mt-auto">
        {isConnected || isError ? (
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => onSync(source)}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Sync Now
          </Button>
        ) : (
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => onSync(source)}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Connect
          </Button>
        )}
        <button 
          onClick={() => onDisconnect(source)}
          className="p-2 text-[#94A3B8] hover:text-[#DC2626] hover:bg-red-50 rounded-md transition-colors"
          title="Disconnect Source"
        >
          {isConnected ? <StopCircle className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
