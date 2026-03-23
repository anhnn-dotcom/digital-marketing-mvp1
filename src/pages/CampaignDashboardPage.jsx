import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Edit, Power, CheckCircle2, Loader2, XCircle, Clock } from 'lucide-react';
import { CAMPAIGNS } from '../constants/mockData';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';

const EXECUTION_DATA = [
  { id: 'TH-001234', name: 'Somchai P.', status: 'Delivered', channel: 'Push + Popup', sentAt: 'Mar 23 09:02', delivered: true },
  { id: 'TH-001891', name: 'Nattaporn K.', status: 'Delivered', channel: 'Push', sentAt: 'Mar 23 09:02', delivered: true },
  { id: 'TH-002341', name: 'Wiroj S.', status: 'Failed', channel: 'Push', sentAt: 'Mar 23 09:03', delivered: false },
  { id: 'TH-003102', name: 'Pranee L.', status: 'In Progress', channel: 'Push + Popup', sentAt: 'Mar 23 09:05', delivered: null },
  { id: 'TH-004521', name: 'Apinya T.', status: 'Delivered', channel: 'Popup only', sentAt: 'Mar 23 09:06', delivered: true },
  { id: 'TH-005612', name: 'Kittisak V.', status: 'Pending', channel: 'Push', sentAt: '—', delivered: null },
  { id: 'TH-006734', name: 'Sunisa B.', status: 'Delivered', channel: 'Push', sentAt: 'Mar 23 09:07', delivered: true },
  { id: 'TH-007890', name: 'Narong M.', status: 'In Progress', channel: 'Push', sentAt: 'Mar 23 09:08', delivered: null },
  { id: 'TH-008453', name: 'Thida C.', status: 'Delivered', channel: 'Push + Popup', sentAt: 'Mar 23 09:10', delivered: true },
  { id: 'TH-009122', name: 'Anon P.', status: 'Failed', channel: 'Push', sentAt: 'Mar 23 09:12', delivered: false },
];

export default function CampaignDashboardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = CAMPAIGNS.find(c => c.id === id) || CAMPAIGNS[0];
  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' ? EXECUTION_DATA : EXECUTION_DATA.filter(d => d.status === filter);

  const stats = [
    { label: 'Completed', value: '612', percent: '15.9%', color: 'text-green-600', icon: CheckCircle2, bg: 'bg-green-50' },
    { label: 'In Progress', value: '235', percent: '6.1%', color: 'text-[#2563EB]', icon: Loader2, bg: 'bg-blue-50', spin: true },
    { label: 'Failed', value: '12', percent: '0.3%', color: 'text-red-600', icon: XCircle, bg: 'bg-red-50' },
    { label: 'Pending', value: '2,988', percent: '77.7%', color: 'text-[#64748B]', icon: Clock, bg: 'bg-gray-100' },
  ];

  const columns = [
    { header: 'Member ID', accessorKey: 'id', width: '15%', cell: row => <span className="font-medium text-[#0F172A]">{row.id}</span> },
    { header: 'Member Name', accessorKey: 'name', width: '20%' },
    { header: 'Status', accessorKey: 'status', width: '15%', cell: row => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
        row.status === 'Delivered' ? 'bg-green-100 text-green-700' :
        row.status === 'Failed' ? 'bg-red-100 text-red-700' :
        row.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {row.status === 'In Progress' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
        {row.status}
      </span>
    )},
    { header: 'Channel', accessorKey: 'channel', width: '15%' },
    { header: 'Sent At', accessorKey: 'sentAt', width: '15%' },
    { header: 'Delivered', accessorKey: 'delivered', width: '10%', cell: row => (
      <div className="flex justify-center text-lg font-bold">
        {row.delivered === true && <span className="text-green-500">✓</span>}
        {row.delivered === false && <span className="text-red-500">✗</span>}
        {row.delivered === null && <span className="text-gray-400">—</span>}
      </div>
    )},
    { header: 'Action', accessorKey: 'action', width: '10%', cell: () => (
      <button className="text-[#2563EB] hover:underline text-sm font-medium">View</button>
    )}
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col h-full fade-in pb-24">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/campaigns')} className="p-2 hover:bg-[#E2E8F0] rounded-lg transition-colors text-[#64748B] hover:text-[#0F172A]">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-[#0F172A]">{campaign.name}</h1>
              <span className={`text-[10px] font-semibold px-2 border rounded-full py-0.5 whitespace-nowrap ${
                campaign.type === 'DM Delivery' ? 'bg-[#0891B2] text-white border-transparent' : 'bg-[#7C3AED] text-white border-transparent'
              }`}>
                {campaign.type}
              </span>
              <Badge variant={
                campaign.status === 'Running' ? 'blue' : 
                campaign.status === 'Active' ? 'green' : 
                campaign.status === 'Scheduled' ? 'amber' : 'gray'
              }>
                {campaign.status}
              </Badge>
            </div>
            <p className="text-sm text-[#64748B]">Targeting: <strong>{campaign.segment}</strong> · Scheduled: {campaign.schedule}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" /> Run Now
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="secondary" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Power className="w-4 h-4 mr-2" /> Deactivate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-[#64748B]">{stat.label}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon className={`w-4 h-4 ${stat.spin ? 'animate-spin' : ''}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-[#0F172A] mb-1">{stat.value}</div>
              <div className={`text-sm font-medium ${stat.color}`}>({stat.percent})</div>
            </Card>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col flex-1 min-h-0">
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0F172A]">Execution Details</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#64748B] mr-2">Filter by status:</span>
            {['All', 'Delivered', 'Failed', 'In Progress', 'Pending'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  filter === f ? 'bg-[#2563EB] text-white' : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 overflow-y-auto">
          <Table columns={columns} data={filteredData} rowKey="id" />
          <div className="mt-4 flex items-center justify-between text-sm text-[#64748B]">
            <div>Showing 1–{filteredData.length} of 847 results</div>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
              <button className="px-3 py-1 border rounded hover:bg-slate-50">2</button>
              <button className="px-3 py-1 border rounded hover:bg-slate-50">3</button>
              <span className="px-2">...</span>
              <button className="px-3 py-1 border rounded hover:bg-slate-50">85</button>
              <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
