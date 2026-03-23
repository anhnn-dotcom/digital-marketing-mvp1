import React, { useState } from 'react';
import { Download, Search, Filter, TrendingUp, ChevronDown, BarChart2 } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { CAMPAIGN_PERFORMANCE, SEGMENT_PERFORMANCE } from '../constants/mockData';

export default function ReportsPage() {
  const [dateRangeMode, setDateRangeMode] = useState('Last 30 days');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const handleExport = () => {
    toast.success('Report export started. It will download shortly.');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Running': return 'blue';
      case 'Completed': return 'green';
      case 'Active': return 'purple';
      case 'Inactive': return 'gray';
      default: return 'gray';
    }
  };

  const filteredCampaigns = CAMPAIGN_PERFORMANCE.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 max-w-[1400px] mx-auto h-full flex flex-col fade-in pb-24 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">Performance Report</h1>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-1">
            {['Today', 'Last 7 days', 'Last 30 days', 'Custom'].map(range => (
               <button 
                 key={range}
                 onClick={() => setDateRangeMode(range)}
                 className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${dateRangeMode === range ? 'bg-[#F1F5F9] text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
               >
                 {range}
               </button>
            ))}
          </div>
          {dateRangeMode === 'Custom' ? (
            <div className="bg-white border border-[#E2E8F0] px-4 py-2 text-sm font-medium rounded-lg text-gray-700">Feb 23 – Mar 23, 2026</div>
          ) : (
             <div className="bg-white border text-transparent border-transparent px-4 py-2 text-sm pointer-events-none select-none">Feb 23</div>
          )}
          <Button variant="secondary" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
           <div className="text-sm font-medium text-[#64748B] mb-2">Impressions</div>
           <div className="text-3xl font-bold text-[#0F172A] mb-2">284,521</div>
           <div className="flex items-center gap-2">
             <span className="flex items-center text-sm font-medium text-[#10B981] bg-green-50 px-1.5 py-0.5 rounded">
               <TrendingUp className="w-3.5 h-3.5 mr-1" /> 12.4%
             </span>
             <span className="text-xs text-[#64748B]">vs previous period</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
           <div className="text-sm font-medium text-[#64748B] mb-2">Clicks</div>
           <div className="text-3xl font-bold text-[#0F172A] mb-2">35,281</div>
           <div className="flex items-center gap-2">
             <span className="flex items-center text-sm font-medium text-[#10B981] bg-green-50 px-1.5 py-0.5 rounded">
               <TrendingUp className="w-3.5 h-3.5 mr-1" /> 8.7%
             </span>
             <span className="text-xs text-[#64748B]">CTR: 12.4%</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
           <div className="text-sm font-medium text-[#64748B] mb-2">Conversions</div>
           <div className="text-3xl font-bold text-[#0F172A] mb-2">9,123</div>
           <div className="flex items-center gap-2">
             <span className="flex items-center text-sm font-medium text-[#10B981] bg-green-50 px-1.5 py-0.5 rounded">
               <TrendingUp className="w-3.5 h-3.5 mr-1" /> 22.1%
             </span>
             <span className="text-xs text-[#64748B]">Conv. Rate: 3.2%</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
           <div className="text-sm font-medium text-[#64748B] mb-2">Members Reached</div>
           <div className="text-3xl font-bold text-[#0F172A] mb-2">28,450 <span className="text-lg font-normal text-gray-400 ml-1">unique</span></div>
           <div className="flex items-center gap-2">
             <span className="flex items-center text-sm font-medium text-[#10B981] bg-green-50 px-1.5 py-0.5 rounded">
               <TrendingUp className="w-3.5 h-3.5 mr-1" /> 5.3%
             </span>
             <span className="text-xs text-[#64748B]">Coverage: 72.1%</span>
           </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* LEFT CHART */}
        <div className="w-full xl:w-[65%] bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 relative h-[380px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Timeline: Impressions vs Clicks</h3>
            <div className="flex items-center gap-4 text-xs font-medium">
               <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-blue-600 rounded"></div> Impressions</div>
               <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-teal-400 rounded"></div> Clicks</div>
            </div>
          </div>
          
          <div className="flex-1 relative border-l border-b border-gray-100 flex items-end">
             {/* Mock visual implementation of chart */}
             <div className="absolute left-[-30px] bottom-0 text-[10px] text-gray-400">0</div>
             <div className="absolute left-[-30px] bottom-[50%] text-[10px] text-gray-400">10K</div>
             <div className="absolute left-[-30px] top-0 text-[10px] text-gray-400">25K</div>
             
             <svg className="absolute inset-0 w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none">
                <path d="M0,80 Q50,70 100,20 T200,80 T300,40 T400,60 T500,20 T600,10 T700,40 T800,20 T900,10" fill="none" stroke="#2563EB" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                <path d="M0,95 Q50,90 100,80 T200,90 T300,75 T400,85 T500,75 T600,70 T700,85 T800,75 T900,70" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
             </svg>
             
             {/* Tooltip trigger mock at Bangkok promo Date */}
             <div className="absolute left-[55%] bottom-0 w-px h-full bg-gray-200 group flex items-start justify-center cursor-pointer">
                <div className="w-3 h-3 bg-blue-600 border-2 border-white rounded-full absolute top-[10%] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-20 pointer-events-none">
                  Mar 10 · 12,450 impressions · 1,823 clicks (Bangkok Promo)
                </div>
                <div className="mt-auto pt-2 text-[#64748B] text-[10px]">Mar 10</div>
             </div>

             <div className="absolute left-0 bottom-[-20px] text-[10px] text-gray-400">Feb 23</div>
             <div className="absolute right-0 bottom-[-20px] text-[10px] text-gray-400">Mar 23</div>
          </div>
        </div>

        {/* RIGHT CHART */}
        <div className="w-full xl:w-[35%] bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col items-center">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider w-full mb-6">Channel Breakdown</h3>
          
          <div className="relative w-48 h-48 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="20" />
              {/* Push 38% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="95.5 251.2" strokeDashoffset="0" />
              {/* Popup 31% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="77.8 251.2" strokeDashoffset="-95.5" />
              {/* Banner 22% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#2DD4BF" strokeWidth="20" strokeDasharray="55.2 251.2" strokeDashoffset="-173.3" />
              {/* Recommendation 9% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="22.6 251.2" strokeDashoffset="-228.5" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-xl font-bold text-gray-900">284k</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Total</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
             <div className="flex items-center justify-between text-sm">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#3B82F6]"></div> <span className="text-[#475569]">Push</span></div>
               <span className="font-medium">38%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#A855F7]"></div> <span className="text-[#475569]">Popup</span></div>
               <span className="font-medium">31%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#2DD4BF]"></div> <span className="text-[#475569]">Banner</span></div>
               <span className="font-medium">22%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#F59E0B]"></div> <span className="text-[#475569]">Recom.</span></div>
               <span className="font-medium">9%</span>
             </div>
          </div>
        </div>
      </div>

      {/* CAMPAIGN PERFORMANCE TABLE */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-lg font-semibold text-[#0F172A]">Campaign Performance</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-[240px]"
              />
            </div>
            <Button variant="secondary" className="px-3" onClick={() => {}}>
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
              <tr>
                <th className="px-5 py-4 font-medium">Campaign Name</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Segment</th>
                <th className="px-5 py-4 font-medium text-right">Impressions</th>
                <th className="px-5 py-4 font-medium text-right">Clicks</th>
                <th className="px-5 py-4 font-medium text-right" title="Click-through rate = Clicks / Impressions. Benchmark: 12.4%">CTR <InfoIcon /></th>
                <th className="px-5 py-4 font-medium text-right">Conv.</th>
                <th className="px-5 py-4 font-medium text-right">Conv. Rate</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredCampaigns.map((row) => (
                <React.Fragment key={row.id}>
                  <tr 
                    className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                    onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                  >
                    <td className="px-5 py-4 font-medium text-[#0F172A] flex items-center gap-2">
                       <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === row.id ? 'rotate-180 text-blue-500' : ''}`} />
                       {row.name}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[#64748B] bg-slate-100 px-2 py-0.5 rounded text-xs">{row.type}</span>
                    </td>
                    <td className="px-5 py-4 text-[#475569]">{row.segment}</td>
                    <td className="px-5 py-4 text-right tabular-nums">{row.impressions.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right tabular-nums">{row.clicks !== null ? row.clicks.toLocaleString() : '—'}</td>
                    <td className="px-5 py-4 text-right font-medium text-[#0F172A] group/ctr relative">
                      {row.ctr !== null ? row.ctr : '—'}
                      {/* Tooltip on hover CTR */}
                      {row.ctr && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover/ctr:opacity-100 pointer-events-none transition-opacity bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-xl whitespace-nowrap z-10 font-normal">
                          vs 12.4% avg
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-green-600 font-medium">{row.conversions.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right text-green-600 font-medium">{row.convRate}</td>
                    <td className="px-5 py-4"><Badge variant={getStatusBadge(row.status)}>{row.status}</Badge></td>
                  </tr>
                  {/* Expanded Detail View */}
                  {expandedId === row.id && (
                    <tr className="bg-[#F8FAFC]">
                      <td colSpan="9" className="p-0 border-b border-gray-200 shadow-inner">
                        <div className="p-6 grid grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
                          {/* Mini chart area */}
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm col-span-1 flex flex-col items-center justify-center min-h-[140px]">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 w-full text-center">Daily Impressions</span>
                            <div className="w-full flex items-end justify-center gap-1 h-16 px-4">
                              {[30, 45, 20, 80, 50, 60, 40].map((h, i) => (
                                <div key={i} className="flex-1 bg-blue-100 hover:bg-blue-300 transition-colors rounded-t-sm" style={{ height: `${h}%` }}></div>
                              ))}
                            </div>
                            <div className="w-full flex justify-between px-4 mt-2 text-[10px] text-gray-400">
                               <span>Mon</span><span>Sun</span>
                            </div>
                          </div>
                          
                          {/* Channel/Segment detailed breakdown */}
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm col-span-1">
                             <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">Top Channel & Deliverability</span>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Primary Channel:</span>
                                  <span className="font-medium text-gray-900">{row.type === 'DM' ? 'Push Notification' : 'In-App Modal'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Delivery Success:</span>
                                  <span className="font-medium text-green-600">98.2%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Failed (Offline/Invalid):</span>
                                  <span className="font-medium text-red-500">1.8%</span>
                                </div>
                             </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm col-span-1">
                             <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 block">Conversion Actions</span>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Viewed Item:</span>
                                  <span className="font-medium text-gray-900">42%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Began Action:</span>
                                  <span className="font-medium text-gray-900">35%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Completed:</span>
                                  <span className="font-medium text-green-600">23%</span>
                                </div>
                             </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEGMENT PERFORMANCE */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]">Segment Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
              <tr>
                <th className="px-5 py-4 font-medium">Segment Name</th>
                <th className="px-5 py-4 font-medium text-right">Campaigns</th>
                <th className="px-5 py-4 font-medium text-right">Members Reached</th>
                <th className="px-5 py-4 font-medium text-right">Avg CTR</th>
                <th className="px-5 py-4 font-medium">Top Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {SEGMENT_PERFORMANCE.map(row => (
                 <tr key={row.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-5 py-4 font-medium text-[#0F172A]">{row.name}</td>
                    <td className="px-5 py-4 text-right tabular-nums text-[#475569]">{row.campaigns}</td>
                    <td className="px-5 py-4 text-right tabular-nums text-[#0F172A]">{row.membersReached.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-medium text-green-600">{row.avgCtr}</td>
                    <td className="px-5 py-4 text-[#475569]">
                      <Badge variant="gray">{row.topChannel}</Badge>
                    </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <div className="inline-flex w-3.5 h-3.5 items-center justify-center rounded-full bg-gray-200 text-gray-500 font-bold ml-1 text-[8px] cursor-help">i</div>
  );
}
