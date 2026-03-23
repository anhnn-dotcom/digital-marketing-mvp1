import { useState } from 'react';
import { Clock, Calendar, Repeat, CheckCircle2, Loader2, StopCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import ActionsMenu from '../ui/ActionsMenu';
import Table from '../ui/Table';
import SearchBar from '../ui/SearchBar';

export default function CampaignTable({ campaigns, onManage, onEdit, onDelete, onRunNow, onStop, onDuplicate, onToggleStatus }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = campaigns.filter(cmp => 
    cmp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmp.segment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Running': return 'bg-blue-100 text-blue-700';
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-indigo-100 text-indigo-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Inactive': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderSchedule = (schedule) => {
    if (schedule.includes('One-time')) {
      const parts = schedule.split(':');
      if (parts.length > 1) {
        return (
          <div className="flex items-center text-sm text-[#0F172A]">
            <Calendar className="w-3 h-3 text-[#64748B] mr-1.5" />
            {parts[1].trim()}
          </div>
        );
      }
    }
    return (
      <div className="flex items-center text-sm text-[#0F172A]">
        <Repeat className="w-3 h-3 text-[#64748B] mr-1.5" />
        {schedule}
      </div>
    );
  };

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      width: '25%',
      cell: (row) => (
        <div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-medium text-[#0F172A]">{row.name}</span>
            <span className={`text-[10px] font-semibold px-2 border rounded-full py-0.5 whitespace-nowrap ${
              row.type === 'DM Delivery' 
                ? 'bg-[#0891B2] text-white border-transparent' 
                : 'bg-[#7C3AED] text-white border-transparent'
            }`}>
              {row.type}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Segment',
      accessorKey: 'segment',
      width: '15%',
      cell: (row) => <div className="text-sm text-[#0F172A] border rounded-md px-2 py-1 bg-[#F8FAFC] w-fit border-[#E2E8F0] whitespace-nowrap">{row.segment}</div>
    },
    {
      header: 'Schedule',
      accessorKey: 'schedule',
      width: '15%',
      cell: (row) => renderSchedule(row.schedule)
    },
    {
      header: 'Progress',
      accessorKey: 'progress',
      width: '20%',
      cell: (row) => {
        const percent = row.totalMembers > 0 ? Math.round((row.processed / row.totalMembers) * 100) : 0;
        let colorClass = 'bg-[#E2E8F0] [&>div]:bg-gray-400';
        if (row.status === 'Running') colorClass = 'bg-blue-100 [&>div]:bg-blue-600';
        if (row.status === 'Completed') colorClass = 'bg-green-100 [&>div]:bg-green-600';

        return (
          <div className="flex flex-col gap-1.5">
            <div className={`h-1.5 w-[140px] rounded-full overflow-hidden ${colorClass}`}>
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
            </div>
            <div className="text-xs text-[#64748B]">
              <span className="font-medium text-[#0F172A]">{new Intl.NumberFormat('en-US').format(row.processed)}</span> / {new Intl.NumberFormat('en-US').format(row.totalMembers)} ({percent}%)
            </div>
          </div>
        )
      }
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '10%',
      cell: (row) => {
        const colorClass = getStatusColor(row.status);
        return (
          <div className={`flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
            {row.status === 'Running' && <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />}
            {row.status === 'Scheduled' && <Clock className="w-3 h-3 mr-1.5" />}
            {row.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
            {row.status}
          </div>
        )
      }
    },
    {
      header: 'Next Run',
      accessorKey: 'nextRun',
      width: '10%',
      cell: (row) => <span className="text-xs font-medium text-[#0F172A]">{row.nextRun || '—'}</span>
    },
    {
      header: '',
      accessorKey: 'actions',
      width: '5%',
      cell: (row) => (
        <div className="flex justify-end pr-2">
          {row.status === 'Running' ? (
            <button
              onClick={() => onStop(row)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200"
            >
              <StopCircle className="w-3.5 h-3.5" />
              Stop
            </button>
          ) : (
            <ActionsMenu 
              onManage={() => onManage(row.id)}
              onRunNow={(row.status === 'Active' || row.status === 'Scheduled') ? () => onRunNow(row) : undefined}
              onEdit={row.status !== 'Running' ? () => onEdit(row) : undefined}
              onDuplicate={() => onDuplicate(row)}
              onToggleStatus={() => onToggleStatus(row)}
              status={row.status}
              onDelete={(row.status === 'Inactive' || row.status === 'Completed') ? () => onDelete(row) : undefined}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SearchBar 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search campaigns..."
          className="max-w-[320px]"
        />
        <div className="text-sm text-[#64748B]">
          Showing {filteredCampaigns.length} tracking campaigns
        </div>
      </div>
      
      {/* Custom render table rows for running state styling */}
      <div className="w-full overflow-x-auto rounded-lg border border-[#E2E8F0] bg-white shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E2E8F0]">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 font-medium text-xs tracking-wider uppercase" style={{ width: col.width }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-[#64748B]">No campaigns found</td>
              </tr>
            ) : (
              filteredCampaigns.map((row) => (
                <tr 
                  key={row.id}
                  className={`transition-colors group ${row.status === 'Running' ? 'bg-[#EFF6FF]' : 'hover:bg-[#F8FAFC]'}`}
                >
                  {columns.map((col, index) => (
                    <td key={index} className="px-6 py-3 text-[#0F172A] align-middle">
                      {col.cell ? col.cell(row) : row[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
