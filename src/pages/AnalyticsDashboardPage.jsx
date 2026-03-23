import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  Download,
  FileText,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Filter,
  Zap,
  ArrowRight,
  PanelRightClose,
  PanelRightOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import { toast } from 'sonner';

export default function AnalyticsDashboardPage() {
  const navigate = useNavigate();
  const {
    analyticsKpi,
    analyticsFunnel,
    analyticsAttribution,
    analyticsCampaignRevenue,
    analyticsCampaignTargets,
    analyticsSuggestedActions,
    loading,
  } = useAppContext();

  const [dateRange, setDateRange] = useState('Last 30 days');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isExporting, setIsExporting] = useState(null);

  const handleExport = (type) => {
    setIsExporting(type);
    const toastId = toast.loading(`Preparing ${type} export...`);
    
    setTimeout(() => {
      toast.success(`${type} report downloaded successfully.`, { id: toastId });
      setIsExporting(null);
    }, 2000);
  };

  const engagementKpis = analyticsKpi.filter(k => k.group === 'Engagement' || k.groupName === 'Engagement');
  const conversionKpis = analyticsKpi.filter(k => k.group === 'Conversion & Revenue' || k.groupName === 'Conversion & Revenue');
  const unitKpis = analyticsKpi.filter(k => k.group === 'Unit Economics' || k.groupName === 'Unit Economics');

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-[#2563EB] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Analytics Dashboard</h1>
          <p className="text-[#64748B] mt-1">Multi-channel performance and attribution insights</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#64748B] mr-2">Last updated: Mar 23, 2026 · 14:30 ICT</span>
          <button 
            onClick={() => handleExport('PDF')}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-[#F8FAFC] text-sm font-medium transition-colors disabled:opacity-50"
          >
            <FileText className="w-4 h-4" />
            {isExporting === 'PDF' ? 'Exporting...' : 'Export PDF'}
          </button>
          <button 
            onClick={() => handleExport('CSV')}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-[#F8FAFC] text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting === 'CSV' ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* TOP FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-[#F8FAFC] text-sm font-medium">
              <Calendar className="w-4 h-4 text-[#64748B]" />
              {dateRange}
              <ChevronDown className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
          <div className="relative">
            <select className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-8">
              <option>All Campaigns</option>
              <option>Gold Win-Back (Running 🔵)</option>
              <option>Points Expiry (Completed ✓)</option>
              <option>VIP Churn Prevention (Running 🔵)</option>
              <option>Welcome Series (Active 🟢)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-2.5 pointer-events-none" />
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-[#F8FAFC] text-sm font-medium">
              <Filter className="w-4 h-4 text-[#64748B]" />
              All Segments
              <ChevronDown className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-[#F8FAFC] text-sm font-medium">
              <Filter className="w-4 h-4 text-[#64748B]" />
              All Channels
              <ChevronDown className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* KPI Row 1: Engagement */}
          <h2 className="text-lg font-semibold text-[#0F172A] mt-2 mb-4">Engagement</h2>
          <div className="grid grid-cols-4 gap-4">
            {engagementKpis.map(kpi => (
              <KpiCard key={kpi.id} title={kpi.title} value={kpi.value} change={kpi.change} tooltip={kpi.tooltip} color={kpi.color} target={kpi.target} progress={kpi.progress} />
            ))}
          </div>

          {/* KPI Row 2: Conversion & Revenue */}
          <h2 className="text-lg font-semibold text-[#0F172A] mt-8 mb-4">Conversion & Revenue</h2>
          <div className="grid grid-cols-4 gap-4">
            {conversionKpis.map(kpi => (
              <KpiCard key={kpi.id} title={kpi.title} value={kpi.value} change={kpi.change} tooltip={kpi.tooltip} color={kpi.color} target={kpi.target} progress={kpi.progress} />
            ))}
          </div>

          {/* KPI Row 3: Unit Economics */}
          <h2 className="text-lg font-semibold text-[#0F172A] mt-8 mb-4">Unit Economics</h2>
          <div className="grid grid-cols-4 gap-4">
            {unitKpis.map(kpi => (
              <KpiCard key={kpi.id} title={kpi.title} value={kpi.value} change={kpi.change} tooltip={kpi.tooltip} color={kpi.color} target={kpi.target} progress={kpi.progress} />
            ))}
          </div>

          {/* CHARTS Row 1 */}
          <div className="grid grid-cols-5 gap-6 mt-6">
            {/* Funnel Chart */}
            <div className="col-span-3 bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-6">Conversion Funnel — All Campaigns</h3>
              <div className="space-y-4">
                {analyticsFunnel.map(row => (
                  <FunnelBar key={row.id} label={row.label} value={row.value} percent={row.percent} fraction={row.fraction}
                    color={row.label === 'Reached' ? 'bg-blue-500' : row.label === 'Impressions' ? 'bg-blue-400' : row.label === 'Clicks' ? 'bg-teal-500' : row.label === 'Conversions' ? 'bg-teal-400' : 'bg-green-500'} />
                ))}
              </div>
            </div>

            {/* CTR Trend */}
            <div className="col-span-2 bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-6">CTR Trend — Last 30 Days</h3>
              <div className="h-48 w-full border-b border-l border-[#E2E8F0] relative flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path d="M0,28 L30,42 L100,34" fill="none" stroke="#2563EB" strokeWidth="2" />
                  <path d="M0,18 L25,31 L100,22" fill="none" stroke="#EAB308" strokeWidth="2" />
                  <path d="M0,8 L40,15 L100,11" fill="none" stroke="#EF4444" strokeWidth="2" />
                  <path d="M0,15 L60,20 L100,24" fill="none" stroke="#10B981" strokeWidth="2" />
                </svg>
                <div className="absolute inset-0 flex flex-col justify-between py-2 pl-2">
                  <span className="text-[10px] text-[#64748B]">50%</span>
                  <span className="text-[10px] text-[#64748B]">25%</span>
                  <span className="text-[10px] text-[#64748B] translate-y-2">0%</span>
                </div>
              </div>
              <div className="flex gap-4 mt-4 text-xs text-[#64748B]">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#2563EB]" /> Push</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EAB308]" /> Popup</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EF4444]" /> Banner</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#10B981]" /> Reco</span>
              </div>
            </div>
          </div>

          {/* CHARTS Row 2 */}
          <div className="grid grid-cols-10 gap-6 mt-6">
            {/* Bar Chart */}
            <div className="col-span-4 bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-6">Revenue Attributed per Campaign</h3>
              <div className="space-y-3">
                {analyticsCampaignRevenue.map(row => (
                  <HorizBar
                    key={row.id}
                    label={row.label}
                    value={row.value}
                    width={`${row.widthPct}%`}
                    color={row.widthPct === 100 ? 'bg-[#EAB308]' : 'bg-[#2563EB]'}
                    onClick={() => navigate(`/campaigns/${row.campaignId}`)}
                  />
                ))}
              </div>
            </div>

            {/* Donut */}
            <div className="col-span-3 bg-white p-6 rounded-xl border border-[#E2E8F0] flex flex-col items-center">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-6 w-full text-left">Budget Allocation vs Actual</h3>
              <div className="relative w-48 h-48 mt-4 rounded-full border-[16px] border-[#2563EB] flex items-center justify-center">
                <div className="absolute inset-[-16px] rounded-full border-[16px] border-[#38BDF8] border-r-transparent border-t-transparent origin-center rotate-45"></div>
                <div className="absolute inset-[-16px] rounded-full border-[16px] border-[#F472B6] border-b-transparent border-t-transparent border-l-transparent origin-center rotate-12"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#0F172A]">฿4.2M</div>
                  <div className="text-xs text-[#64748B]">฿3.18M spent</div>
                  <div className="text-xs font-semibold text-[#10B981]">75.7%</div>
                </div>
              </div>
              <div className="mt-8 text-sm space-y-2 w-full">
                <div className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#2563EB]"></div>Cashback</span><span className="font-medium text-[#0F172A]">47% (฿1.97M)</span></div>
                <div className="flex justify-between items-center"><span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#38BDF8]"></div>Perf Ads</span><span className="font-medium text-[#0F172A]">19% (฿798K)</span></div>
              </div>
            </div>

            {/* Gauge */}
            <div className="col-span-3 bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-6">Campaign KPIs vs Target</h3>
              <div className="space-y-6">
                {analyticsCampaignTargets.map(row => (
                  <ProgressRow key={row.id} label={row.label} current={row.current} target={row.target} percent={`${row.percent}%`} color={row.percent >= 100 ? 'bg-green-500' : 'bg-amber-400'} check={row.check} />
                ))}
              </div>
            </div>
          </div>

          {/* ATTRIBUTION TABLE */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] mt-6 overflow-hidden">
            <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">Multi-Touch Attribution</h3>
                <p className="text-sm text-[#64748B] mt-1">7-day lookback window · Last-click model</p>
              </div>
              <div className="flex bg-[#F1F5F9] p-1 rounded-lg">
                <button className="px-3 py-1 bg-white shadow-sm rounded-md text-sm font-medium text-[#0F172A]">Last Click</button>
                <button className="px-3 py-1 rounded-md text-sm font-medium text-[#64748B] hover:text-[#0F172A]">First Click</button>
                <button className="px-3 py-1 rounded-md text-sm font-medium text-[#64748B] hover:text-[#0F172A]">Linear</button>
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-[#64748B] font-medium border-b border-[#E2E8F0]">
                <tr>
                  <th className="px-6 py-4">Channel</th>
                  <th className="px-6 py-4 text-right">Touchpoints</th>
                  <th className="px-6 py-4 text-right">Assisted Conv.</th>
                  <th className="px-6 py-4 text-right">Direct Conv.</th>
                  <th className="px-6 py-4 text-right">Revenue Assisted</th>
                  <th className="px-6 py-4 text-right">Revenue Direct</th>
                  <th className="px-6 py-4 text-right">Attribution %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {analyticsAttribution.map(row => (
                  <AttrRow
                    key={row.id}
                    channel={row.channel}
                    touches={row.touches}
                    ast={row.ast}
                    dir={row.dir}
                    revAst={row.revAst}
                    revDir={row.revDir}
                    attr={row.attr}
                    onClick={row.navigateTo ? () => navigate(row.navigateTo) : null}
                  />
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-[#F8FAFC] text-xs text-[#64748B] border-t border-[#E2E8F0]">
              Note: Assisted: member saw this channel before converting via another channel. Direct: last touch before conversion.
            </div>
          </div>
        </div>

        {/* SIDE PANELS */}
        <div className="flex flex-col gap-6 items-end shrink-0 relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-10 h-10 bg-white border border-[#E2E8F0] shadow-sm rounded-full flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors z-20"
          >
            {sidebarOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
          </button>

          {sidebarOpen && (
            <div className="w-[280px] bg-amber-50 rounded-xl border border-amber-200 p-5 mt-2 animate-in slide-in-from-right fade-in sticky top-6 shadow-sm">
              <h3 className="text-base font-bold text-amber-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                Suggested Actions
              </h3>

              <div className="space-y-4">
                {analyticsSuggestedActions.map(action => (
                  <div key={action.id} className="bg-white rounded-lg p-3 border border-amber-200 shadow-[0_1px_2px_rgba(251,191,36,0.1)]">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-bold flex items-center gap-1 ${action.impact === 'high' ? 'text-red-600' : 'text-amber-600'}`}>
                        {action.impact === 'high' ? '🔴 High Impact' : '🟡 Medium Impact'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[#0F172A] mb-1">{action.title}</div>
                    <div className="text-xs text-[#64748B] mb-3">{action.desc}</div>
                    <button onClick={() => navigate(action.navigateTo)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                      Apply fix <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={() => navigate('/optimize')} className="w-full mt-4 text-xs font-semibold text-amber-800 hover:text-amber-900 border border-amber-200 bg-amber-100 hover:bg-amber-200 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                View all suggestions <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper components
function KpiCard({ title, value, change, tooltip, color, target, progress }) {
  const isUp = change?.includes('↑');
  const isGreen = color === 'green';
  return (
    <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs relative group">
      <div className="flex items-center gap-1.5 mb-1 text-[#64748B] font-medium text-sm">
        {title}
        <HelpCircle className="w-3.5 h-3.5" />
      </div>
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded p-2 top-0 left-0 -translate-y-full translate-x-4 z-10 w-48 shadow-lg pointer-events-none">
        {tooltip}
      </div>
      <div className="text-2xl font-bold text-[#0F172A] my-1">{value}</div>
      <div className="flex items-center gap-2 text-sm mt-2">
        <span className={`flex items-center font-semibold ${isGreen ? 'text-[#10B981]' : (isUp ? 'text-[#10B981]' : 'text-[#EF4444]')}`}>
          {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {change}
        </span>
        <span className="text-[#64748B]">vs prev</span>
      </div>
      {target && <div className="text-xs text-[#64748B] mt-2 pt-2 border-t border-[#E2E8F0]">{target}</div>}
      {progress && (
        <div className="mt-2 pt-2 border-t border-[#E2E8F0]">
          <div className="flex justify-between text-xs text-[#64748B] mb-1">
            <span>{progress.current} / {progress.target}</span>
            <span>82.7% to target</span>
          </div>
          <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '82.7%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

function FunnelBar({ label, value, percent, fraction, color }) {
  const numFraction = parseInt(fraction.split('/')[0]);
  const width = `${(numFraction / 20) * 100}%`;
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="w-24 text-[#64748B] font-medium">{label}</div>
      <div className="flex-1 h-8 bg-[#F1F5F9] rounded-sm overflow-hidden flex items-center">
        <div className={`h-full ${color} flex items-center px-4 font-mono text-xs text-white bg-opacity-90`} style={{ width }}></div>
      </div>
      <div className="w-20 text-right font-medium text-[#0F172A]">{value}</div>
      <div className="w-20 text-right text-[#64748B]">{percent}</div>
    </div>
  );
}

function HorizBar({ label, value, width, color, onClick }) {
  return (
    <div className={`flex items-center gap-3 text-sm hover:bg-gray-50 p-1 -mx-1 rounded transition-colors ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <div className="w-28 text-[#0F172A] truncate font-medium">{label}</div>
      <div className="flex-1 flex items-center">
        <div className={`h-4 ${color} rounded-sm`} style={{ width }}></div>
      </div>
      <div className="w-20 text-right font-medium text-[#0F172A]">{value}</div>
    </div>
  );
}

function ProgressRow({ label, current, target, percent, color, check }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[#0F172A] font-medium flex items-center gap-2">
          {label}
          {check && <div className="w-4 h-4 bg-green-100 text-[#10B981] rounded-full flex items-center justify-center text-[10px]">✓</div>}
        </span>
        <span className="text-[#64748B]">Cur: <strong className="text-[#0F172A]">{current}</strong> <span className="mx-1">|</span> Tgt: {target}</span>
      </div>
      <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: percent }}></div>
      </div>
    </div>
  );
}

function AttrRow({ channel, touches, ast, dir, revAst, revDir, attr, onClick }) {
  return (
    <tr className={`hover:bg-[#F8FAFC] transition-colors group ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <td className="px-6 py-3 font-medium text-[#0F172A] group-hover:text-blue-600 transition-colors">
        {channel}
        {onClick && <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>}
      </td>
      <td className="px-6 py-3 text-right text-[#64748B]">{touches}</td>
      <td className="px-6 py-3 text-right text-[#64748B]">{ast}</td>
      <td className="px-6 py-3 text-right font-medium text-[#0F172A]">{dir}</td>
      <td className="px-6 py-3 text-right text-[#64748B]">{revAst}</td>
      <td className="px-6 py-3 text-right text-[#10B981] font-medium">{revDir}</td>
      <td className="px-6 py-3 text-right">
        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-[#F1F5F9] font-medium text-[#0F172A]">{attr}</span>
      </td>
    </tr>
  );
}
