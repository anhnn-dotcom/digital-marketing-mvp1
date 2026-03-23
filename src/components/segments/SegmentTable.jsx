import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Toggle from '../ui/Toggle';
import ActionsMenu from '../ui/ActionsMenu';
import Table from '../ui/Table';
import SearchBar from '../ui/SearchBar';
import { Heart, TrendingUp, TrendingDown, Info, MoveUpRight, MoveDownRight } from 'lucide-react';

const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);

export default function SegmentTable({ segments, onDelete, onEdit, onDuplicate, onSync, onToggleStatus, onView, onViewCampaigns }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredSegments = segments.filter(seg => 
    seg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seg.datasets.some(ds => ds.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusVariant = (status) => {
    switch(status) {
      case 'active': return 'green';
      case 'syncing': return 'blue';
      case 'inactive': return 'gray';
      default: return 'gray';
    }
  };

  const getDatasetColor = (dataset) => {
    switch(dataset) {
      case 'Customer Profile': return 'bg-[#1D4ED8] text-white border-[#1E3A8A]'; // blue
      case 'Loyalty Status': return 'bg-[#7C3AED] text-white border-[#5B21B6]'; // purple
      case 'Transaction Behavior': return 'bg-[#0F766E] text-white border-[#115E59]'; // teal
      case 'App Engagement': return 'bg-[#B45309] text-white border-[#92400E]'; // amber
      case 'Custom List': return 'bg-[#6B7280] text-white border-[#4B5563]'; // gray
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSparklineOrTrend = (count) => {
    // Deterministic mock trend for MVP based on count
    const isUp = count % 2 === 0;
    return isUp ? 
      <MoveUpRight className="w-3 h-3 text-emerald-500 inline ml-1" /> : 
      <MoveDownRight className="w-3 h-3 text-rose-500 inline ml-1" />;
  };

  const DatasetPills = ({ datasets }) => {
    const visible = datasets.slice(0, 2);
    const hidden = datasets.length - 2;

    return (
      <div className="flex flex-wrap gap-1.5 items-center">
        {visible.map(ds => (
          <span key={ds} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap shadow-sm border ${getDatasetColor(ds)}`}>
            {ds}
          </span>
        ))}
        {hidden > 0 && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            +{hidden} more
          </span>
        )}
      </div>
    );
  };

  const SyncColumn = ({ row }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className="relative inline-flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Toggle checked={row.autoSync} disabled />
        {isHovered && row.autoSync && (
          <div className="absolute left-1/2 -top-10 -translate-x-1/2 px-2.5 py-1 bg-slate-800 text-white text-xs rounded z-50 whitespace-nowrap fade-in shadow-lg">
            Syncs {row.syncFrequency} | Last: {row.lastSync}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 h-0 w-0" />
          </div>
        )}
      </div>
    );
  };

  const HealthColumn = ({ row }) => {
    const isGreen = row.name.length % 3 === 0 || row.name.includes('At Risk');
    const isAmber = row.name.length % 3 === 1;
    const typeofLength = row.name.length;
    const dotColor = isGreen ? 'bg-green-500' : isAmber ? 'bg-amber-500' : 'bg-red-500';
    const tooltipText = isGreen ? 'Last sync 2h ago · CTR healthy' : isAmber ? 'Synced > 3 days OR CTR declining' : 'Synced > 7 days OR CTR < 8%';
    
    return (
      <div className="relative flex justify-start pl-2 group w-full">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
        <div className="absolute left-6 -top-2 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 bg-slate-800 text-white text-xs rounded z-50 whitespace-nowrap shadow-lg pointer-events-none">
          {tooltipText}
        </div>
      </div>
    );
  };

  const AvgCtrColumn = ({ row }) => {
    const isGreen = row.name.length % 3 === 0 || row.name.includes('At Risk');
    const isAmber = row.name.length % 3 === 1;
    const val = isGreen ? '20.0%' : isAmber ? '9.2%' : '6.4%';
    const color = isGreen ? 'text-green-600' : isAmber ? 'text-amber-600' : 'text-red-500';
    
    return (
      <div className={`font-semibold ${color}`}>
        {val}
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
          <div className="font-semibold text-[#0F172A] hover:text-[#2563EB] cursor-pointer transition-colors" onClick={() => onView(row)}>
            {row.name}
          </div>
          <div className="text-[11px] text-[#64748B] mt-1 capitalize flex items-center gap-2">
            <span>{row.conditions} conditions</span>
            <span>•</span>
            <span>Updated {row.updated}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Datasets',
      accessorKey: 'datasets',
      width: '20%',
      cell: (row) => <DatasetPills datasets={row.datasets} />
    },
    {
      header: 'Members',
      accessorKey: 'memberCount',
      width: '10%',
      cell: (row) => (
        <div className="flex items-center font-medium text-[#0F172A]">
          {formatNumber(row.memberCount)}
          {getSparklineOrTrend(row.memberCount)}
        </div>
      )
    },
    {
      header: 'Avg CTR',
      accessorKey: 'avgCtr',
      width: '10%',
      cell: (row) => <AvgCtrColumn row={row} />
    },
    {
      header: 'Health',
      accessorKey: 'health',
      width: '10%',
      cell: (row) => <HealthColumn row={row} />
    },
    {
      header: 'Auto-Sync',
      accessorKey: 'autoSync',
      width: '10%',
      cell: (row) => <SyncColumn row={row} />
    },
    {
      header: 'Status',
      accessorKey: 'status',
      width: '10%',
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.status === 'syncing' ? (
             <div className="flex items-center gap-1.5">
               <span className="flex h-2 w-2 relative">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               <span className="text-xs font-medium text-blue-600">Syncing</span>
             </div>
          ) : (
            <Badge variant={getStatusVariant(row.status)} className="capitalize">
              {row.status}
            </Badge>
          )}
        </div>
      )
    },
    {
      header: '',
      accessorKey: 'actions',
      width: '5%',
      cell: (row) => (
        <div className="flex justify-end">
          <ActionsMenu 
            onView={() => onView(row)}
            onEdit={() => onEdit(row)}
            onDuplicate={() => onDuplicate(row)}
            onSync={() => onSync(row)}
            onToggleStatus={() => onToggleStatus(row)}
            status={row.status}
            onDelete={() => onDelete(row)}
            options={[
              { type: 'divider' },
              { label: 'Insights ↗', onClick: () => navigate('/insights') },
              { label: 'View Campaigns', onClick: () => onViewCampaigns(row) },
              { label: 'View Performance', onClick: () => {} }
            ]}
          />
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
          placeholder="Search segments or datasets..."
          className="max-w-[320px]"
        />
        <div className="text-sm text-[#64748B]">
          Showing {filteredSegments.length} of {segments.length} segments
        </div>
      </div>
      <Table columns={columns} data={filteredSegments} rowKey="id" />
    </div>
  );
}
