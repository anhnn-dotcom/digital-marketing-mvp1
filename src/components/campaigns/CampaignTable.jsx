import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Repeat, CheckCircle2, Loader2, StopCircle, Zap } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import ActionsMenu from '../ui/ActionsMenu';
import Table from '../ui/Table';
import SearchBar from '../ui/SearchBar';

export default function CampaignTable({ campaigns, onManage, onEdit, onDelete, onRunNow, onStop, onDuplicate, onToggleStatus, selectedIds, onSelectionChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCampaigns = campaigns.filter(cmp => 
    cmp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmp.segment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCampaigns.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(filteredCampaigns.map(c => c.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(i => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Running':   return 'bg-blue-100 text-blue-700';
      case 'Active':    return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-indigo-100 text-indigo-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Paused':    return 'bg-amber-100 text-amber-700';
      case 'Draft':     return 'bg-slate-100 text-slate-600';
      case 'Archived':  return 'bg-red-50 text-red-500';
      case 'Inactive':  return 'bg-orange-100 text-orange-700';
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

  const CtrCvrColumn = ({ row }) => {
    if (row.status === 'Scheduled' || row.status === 'Inactive') return <span className="text-[#94A3B8]">—</span>;
    const isGood = row.name.length % 2 === 0;
    const isBad = row.name.length % 3 === 0;
    const ctr = isGood ? '20.0%' : isBad ? '8.2%' : '14.5%';
    const cvr = isGood ? '24.1%' : isBad ? '12.0%' : '19.8%';
    const color = isGood ? 'text-[#10B981]' : isBad ? 'text-red-500' : 'text-amber-500';
    return <span className={`font-semibold ${color}`}>{ctr} / {cvr}</span>;
  };

  const RoasColumn = ({ row }) => {
    if (row.status === 'Scheduled' || row.status === 'Inactive') return <span className="text-[#94A3B8]">—</span>;
    const isGood = row.name.length % 2 === 0;
    const isBad = row.name.length % 3 === 0;
    const roas = isGood ? '4.1×' : isBad ? '1.8×' : '2.5×';
    const color = isGood ? 'text-[#10B981]' : isBad ? 'text-red-500' : 'text-amber-500';
    return <span className={`font-semibold ${color}`}>{roas}</span>;
  };

  const columns = [
    {
      header: (
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]" 
            checked={filteredCampaigns.length > 0 && selectedIds.length === filteredCampaigns.length}
            onChange={toggleSelectAll}
          />
        </div>
      ),
      accessorKey: 'selection',
      width: '40px',
      cell: (row) => (
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]" 
            checked={selectedIds.includes(row.id)}
            onChange={() => toggleSelectOne(row.id)}
          />
        </div>
      )
    },
    {
      header: 'Name',
      accessorKey: 'name',
      width: '20%',
      cell: (row) => (
        <div>
          <div className="flex flex-col gap-1 items-start">
            <div className="flex items-center">
              <span className="font-medium text-[#0F172A]">{row.name}</span>
              {row.status === 'Running' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/optimize'); }} 
                  className="ml-2 inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded border border-amber-200 hover:bg-amber-200 transition-colors"
                  title="CTR dropping — click to see suggestion"
                >
                  1 tip <Zap className="w-3 h-3 text-amber-500" />
                </button>
              )}
            </div>
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
      header: 'CTR / CVR',
      accessorKey: 'ctrcvr',
      width: '10%',
      cell: (row) => <CtrCvrColumn row={row} />
    },
    {
      header: 'ROAS',
      accessorKey: 'roas',
      width: '10%',
      cell: (row) => <RoasColumn row={row} />
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
      header: 'End Date',
      accessorKey: 'endDate',
      width: '10%',
      cell: (row) => {
        const ed = row.endDate || row.scheduleDetails?.end;
        return <span className="text-xs font-medium text-[#0F172A]">{ed ? new Date(ed).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) : '—'}</span>;
      }
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
              options={[
                { type: 'divider' },
                { label: 'View Analytics ↗', onClick: () => navigate('/analytics') },
                { label: 'Optimization Tips', onClick: () => navigate('/optimize') }
              ]}
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
                  className={`transition-colors group ${selectedIds.includes(row.id) ? 'bg-[#EFF6FF]' : row.status === 'Running' ? 'bg-[#EFF6FF]/50' : 'hover:bg-[#F8FAFC]'}`}
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
