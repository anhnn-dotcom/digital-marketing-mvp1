import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  User, 
  FileEdit, 
  PlusCircle, 
  Trash2, 
  Play, 
  Pause, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';

const LOGS = [
  { id: 1, user: 'Nam A.', action: 'Created Segment', target: 'High LTV — Tier Upgrade Candidate', type: 'create', time: '2026-03-23 15:45:12', details: 'Added 3 conditions: Loyalty Status, Tx Behavior' },
  { id: 2, user: 'System (AI)', action: 'Optimization Applied', target: 'Gold Win-Back', type: 'system', time: '2026-03-23 14:30:05', details: 'Replaced banner creative based on fatigue alert (sug_1)' },
  { id: 3, user: 'Nam A.', action: 'Managed Campaign', target: 'Points Expiry Push', type: 'edit', time: '2026-03-23 11:20:44', details: 'Edited schedule: frequency changed from 1d to 2d' },
  { id: 4, user: 'Admin', action: 'Connected Source', target: 'Offline Store Purchases', type: 'system', time: '2026-03-22 17:15:33', details: 'New CSV upload source configured' },
  { id: 5, user: 'Nam A.', action: 'Started Campaign', target: 'Loan Product Retargeting', type: 'run', time: '2026-03-22 09:00:12', details: 'Manual run trigger for 2,156 members' },
  { id: 6, user: 'System', action: 'Sync Completed', target: 'Salesforce CRM', type: 'system', time: '2026-03-22 08:00:00', details: '1,500 records updated' },
  { id: 7, user: 'Wiroj S.', action: 'Deleted Draft', target: 'Flash Deal Friday — Archive', type: 'delete', time: '2026-03-21 16:20:11', details: 'Cleaning up unused templates' },
  { id: 8, user: 'Nam A.', action: 'Paused Campaign', target: 'KYC Completion Push', type: 'pause', time: '2026-03-21 14:10:00', details: 'Temporary pause for creative review' },
  { id: 9, user: 'Admin', action: 'Updated Settings', target: 'Frequency Cap', type: 'edit', time: '2026-03-20 10:30:22', details: 'Global cap increased to 4 per week' },
  { id: 10, user: 'System (AI)', action: 'A/B Test Deployed', target: 'Loan Retargeting', type: 'system', time: '2026-03-20 09:00:00', details: 'Variant B winner deployed (+2.8% CTR)' },
];

const TYPE_ICONS = {
  create: { icon: PlusCircle, color: 'text-green-500', bg: 'bg-green-50' },
  edit: { icon: FileEdit, color: 'text-blue-500', bg: 'bg-blue-50' },
  delete: { icon: Trash2, color: 'text-red-500', bg: 'bg-red-50' },
  run: { icon: Play, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  pause: { icon: Pause, color: 'text-orange-500', bg: 'bg-orange-50' },
  system: { icon: RefreshCw, color: 'text-slate-500', bg: 'bg-slate-50' },
};

export default function ActivityLogPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = LOGS.filter(log => {
    const matchSearch = log.target.toLowerCase().includes(search.toLowerCase()) || 
                      log.action.toLowerCase().includes(search.toLowerCase()) ||
                      log.user.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || log.type === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto fade-in h-full flex flex-col">
      <PageHeader 
        title="Activity Log" 
        subtitle="Audit trail of all changes and system actions"
        action={
          <Button variant="secondary" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Audit Log
          </Button>
        }
      />

      {/* Stats & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <div className="text-xs font-medium text-[#64748B] uppercase mb-1">Today</div>
          <div className="text-2xl font-bold text-[#0F172A]">24</div>
          <div className="text-xs text-[#10B981] font-medium mt-1">Actions performed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <div className="text-xs font-medium text-[#64748B] uppercase mb-1">System (AI)</div>
          <div className="text-2xl font-bold text-[#0F172A]">182</div>
          <div className="text-xs text-[#64748B] font-medium mt-1">Autonomous actions</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <div className="text-xs font-medium text-[#64748B] uppercase mb-1">Users</div>
          <div className="text-2xl font-bold text-[#0F172A]">8</div>
          <div className="text-xs text-[#64748B] font-medium mt-1">Active contributors</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <div className="text-xs font-medium text-[#64748B] uppercase mb-1">Alerts</div>
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-xs text-red-400 font-medium mt-1">Requires review</div>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl flex-1 flex flex-col overflow-hidden shadow-sm">
        {/* Table Controls */}
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Filter by user, target or action..." 
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#64748B]" />
            {['All', 'System', 'Create', 'Edit', 'Run'].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  filter === t ? 'bg-[#0F172A] text-white shadow-sm' : 'bg-transparent text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[#F8FAFC] text-[#64748B] font-medium border-b border-[#E2E8F0] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Target Entity</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((log) => {
                const typeInfo = TYPE_ICONS[log.type] || TYPE_ICONS.system;
                const Icon = typeInfo.icon;
                return (
                  <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeInfo.bg}`}>
                          <Icon className={`w-4 h-4 ${typeInfo.color}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0F172A]">{log.action}</p>
                          <div className="flex items-center gap-1 text-xs text-[#64748B]">
                            <User className="w-3 h-3" />
                            {log.user}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#0F172A]">{log.target}</span>
                        <span className="text-xs text-[#94A3B8] uppercase tracking-wider">Entity ID: {log.id * 1234}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#64748B]">
                      {log.time}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[#64748B] text-xs leading-relaxed italic line-clamp-2 max-w-xs">{log.details}</span>
                        <button className="p-2 hover:bg-[#E2E8F0] rounded-md transition-colors text-[#94A3B8]" title="View full history">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <History className="w-12 h-12 text-[#CBD5E1] mx-auto mb-4" />
              <p className="text-[#64748B] font-medium">No activity matching your search</p>
            </div>
          )}
        </div>

        {/* Pagination mock */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs text-[#64748B]">
          <span>Showing 1 to {filtered.length} of 1,248 entries</span>
          <div className="flex gap-2">
            <button className="px-2 py-1 border border-[#E2E8F0] rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-2 py-1 border border-[#E2E8F0] rounded bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
