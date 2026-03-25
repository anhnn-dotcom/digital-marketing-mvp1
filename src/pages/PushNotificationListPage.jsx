import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus, Search, Edit2, Trash2, Zap } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { PUSH_TEMPLATES } from '../constants/mockData';

export default function PushNotificationListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = PUSH_TEMPLATES.filter(template => 
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.campaign.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto h-full flex flex-col fade-in">
      <PageHeader 
        title="Push Notifications"
        action={
          <Button onClick={() => navigate('/push-notifications/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Push Message
          </Button>
        }
      />
      
      <div className="mt-6 bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notifications..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC] sticky top-0 z-10 border-b border-[#E2E8F0] shadow-sm">
              <tr>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Title & Body</th>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Campaign & Segment</th>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Trigger</th>
                <th className="py-3 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map(item => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                    onClick={() => navigate(`/push-notifications/${item.id}`)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#0F172A] text-sm">{item.title}</div>
                          <div className="text-xs text-[#64748B] mt-1 line-clamp-2 whitespace-pre-wrap">{item.body}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-[#0F172A] flex items-center gap-1.5 line-clamp-1">
                          {item.campaign}
                        </span>
                        <span className="text-xs text-[#64748B] truncate max-w-[200px]">
                          Target: {item.segment}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        {item.trigger}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-2 hover:bg-[#E2E8F0] rounded-md text-[#64748B] transition-colors relative z-10" 
                          title="Edit"
                          onClick={(e) => { e.stopPropagation(); navigate(`/push-notifications/${item.id}`); }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 hover:bg-red-50 hover:text-red-600 rounded-md text-[#64748B] transition-colors relative z-10" 
                          title="Delete"
                          onClick={(e) => { e.stopPropagation(); /* mock delete action */ }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-[#64748B]">
                    No notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
