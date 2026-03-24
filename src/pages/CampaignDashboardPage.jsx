import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Play, Edit, Power, CheckCircle2, Loader2, XCircle, Clock,
  Zap, ArrowRight, BarChart3, FlaskConical, MapPin, Plus,
  Signal, Users, AlarmClock, TrendingUp, TrendingDown, Info, Smartphone, AlertCircle,
} from 'lucide-react';
import { CAMPAIGNS, CAMPAIGN_ANALYSIS } from '../constants/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';

const EXECUTION_DATA = [
  { id: 'TH-001234', name: 'Somchai P.',    status: 'Delivered',   channel: 'Push + Popup',  sentAt: 'Mar 23 09:02', delivered: true  },
  { id: 'TH-001891', name: 'Nattaporn K.',   status: 'Delivered',   channel: 'Push',          sentAt: 'Mar 23 09:02', delivered: true  },
  { id: 'TH-002341', name: 'Wiroj S.',        status: 'Failed',      channel: 'Push',          sentAt: 'Mar 23 09:03', delivered: false },
  { id: 'TH-003102', name: 'Pranee L.',       status: 'In Progress', channel: 'Push + Popup',  sentAt: 'Mar 23 09:05', delivered: null  },
  { id: 'TH-004521', name: 'Apinya T.',       status: 'Delivered',   channel: 'Popup only',    sentAt: 'Mar 23 09:06', delivered: true  },
  { id: 'TH-005612', name: 'Kittisak V.',     status: 'Pending',     channel: 'Push',          sentAt: '—',            delivered: null  },
  { id: 'TH-006734', name: 'Sunisa B.',       status: 'Delivered',   channel: 'Push',          sentAt: 'Mar 23 09:07', delivered: true  },
  { id: 'TH-007890', name: 'Narong M.',       status: 'In Progress', channel: 'Push',          sentAt: 'Mar 23 09:08', delivered: null  },
  { id: 'TH-008453', name: 'Thida C.',        status: 'Delivered',   channel: 'Push + Popup',  sentAt: 'Mar 23 09:10', delivered: true  },
  { id: 'TH-009122', name: 'Anon P.',         status: 'Failed',      channel: 'Push',          sentAt: 'Mar 23 09:12', delivered: false },
];

// ── Helpers ────────────────────────────────────────────

function HeatCell({ value, max }) {
  const intensity = max > 0 ? value / max : 0;
  const bg = intensity === 0
    ? 'bg-slate-100 text-slate-400'
    : intensity < 0.25
      ? 'bg-blue-100 text-blue-600'
      : intensity < 0.55
        ? 'bg-blue-300 text-blue-800'
        : intensity < 0.8
          ? 'bg-blue-500 text-white'
          : 'bg-blue-700 text-white';
  return (
    <div className={`rounded flex items-center justify-center text-[10px] font-semibold h-9 w-full transition-all ${bg}`}>
      {value > 0 ? `${value}%` : '—'}
    </div>
  );
}

function BarRow({ label, pct, color = 'bg-blue-500' }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500 w-36 shrink-0">{label}</span>
      <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-semibold text-slate-700 w-10 text-right">{pct}%</span>
    </div>
  );
}

// ── Sub-tabs ───────────────────────────────────────────

function DeliveryRateTab({ analysis }) {
  if (!analysis) return <EmptyState message="Không có dữ liệu phân tích cho chiến dịch này." />;
  const { delivery } = analysis;

  const isPending = delivery.delivered === 0 && delivery.pending > 0;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-200">
      {/* Top metric bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent',  value: delivery.totalSent.toLocaleString(), icon: Signal,       color: 'text-slate-600',  bg: 'bg-slate-50'  },
          { label: 'Delivered',   value: delivery.delivered.toLocaleString(), icon: CheckCircle2,  color: 'text-green-600',  bg: 'bg-green-50'  },
          { label: 'Failed',      value: delivery.failed.toLocaleString(),    icon: XCircle,       color: 'text-red-600',    bg: 'bg-red-50'    },
          { label: 'Pending',     value: delivery.pending.toLocaleString(),   icon: Clock,         color: 'text-amber-600',  bg: 'bg-amber-50'  },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} ${color} shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">{label}</div>
              <div className="text-xl font-bold text-slate-900">{value}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Delivery Rate Gauge */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Overall Delivery Rate</h3>
          <span className={`text-2xl font-bold ${delivery.deliveryRate >= 97 ? 'text-green-600' : delivery.deliveryRate >= 90 ? 'text-amber-600' : 'text-red-600'}`}>
            {delivery.deliveryRate}%
          </span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all ${delivery.deliveryRate >= 97 ? 'bg-green-500' : delivery.deliveryRate >= 90 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${delivery.deliveryRate}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1.5">
          <span>0%</span>
          <span className="text-slate-500">Benchmark: ≥97%</span>
          <span>100%</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Breakdown */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-5">Channel Breakdown</h3>
          <div className="space-y-0 divide-y divide-slate-100">
            {delivery.channelBreakdown.map(ch => (
              <div key={ch.channel} className="py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800">{ch.channel}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">Sent: <b className="text-slate-700">{ch.sent.toLocaleString()}</b></span>
                    <span className="text-red-500">✗ {ch.failed}</span>
                    <span className={`font-bold ${ch.rate >= 97 ? 'text-green-600' : ch.rate >= 90 ? 'text-amber-600' : 'text-red-600'}`}>{ch.rate}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-500 rounded-l-full" style={{ width: `${(ch.delivered / ch.sent) * 100}%` }} />
                  <div className="h-full bg-red-400" style={{ width: `${(ch.failed / ch.sent) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Device Breakdown */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-5">
            <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-blue-500" /> Device Breakdown</span>
          </h3>
          {delivery.deviceBreakdown.map(d => (
            <div key={d.device} className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full inline-block ${d.device === 'iOS' ? 'bg-blue-500' : 'bg-green-500'}`} />
                  <span className="text-sm font-medium text-slate-800">{d.device}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{d.sent.toLocaleString()} sent</span>
                  <span className="text-red-500">✗ {d.failed}</span>
                  <span className={`font-bold text-sm ${d.rate >= 97 ? 'text-green-600' : 'text-amber-600'}`}>{d.rate}%</span>
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${d.device === 'iOS' ? 'bg-blue-500' : 'bg-green-500'}`}
                  style={{ width: `${d.rate}%` }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Failure Reasons */}
      {delivery.failureReasons.length > 0 && (
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-5 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" /> Failure Reason Analysis
          </h3>
          <div className="space-y-3">
            {delivery.failureReasons.map(r => (
              <BarRow key={r.reason} label={r.reason} pct={r.pct} color="bg-red-400" />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Percentage of total failed messages. "Device Offline" tokens are retried automatically.
          </p>
        </Card>
      )}

      {isPending && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <Clock className="w-5 h-5 text-amber-500 shrink-0" />
          Campaign chưa được phân phối. Dữ liệu Delivery Rate sẽ xuất hiện sau khi thực thi.
        </div>
      )}
    </div>
  );
}

function SegmentEngagementTab({ analysis }) {
  if (!analysis) return <EmptyState message="Không có dữ liệu phân tích cho chiến dịch này." />;
  const { segmentEngagement: seg } = analysis;
  const maxCtr = Math.max(...seg.groups.map(g => g.ctr), seg.platformAvgCtr);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-200">
      {/* Platform avg reference */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm">
          <span className="text-slate-500">Platform Avg CTR:</span>
          <span className="font-bold text-slate-800">{seg.platformAvgCtr}%</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm">
          <span className="text-slate-500">Platform Avg CVR:</span>
          <span className="font-bold text-slate-800">{seg.platformAvgCvr}%</span>
        </div>
      </div>

      {/* Group comparison table */}
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sub-group Performance Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-slate-500">Group</th>
                <th className="px-5 py-3 text-right font-medium text-slate-500">Members</th>
                <th className="px-5 py-3 font-medium text-slate-500" style={{ minWidth: 200 }}>CTR</th>
                <th className="px-5 py-3 font-medium text-slate-500" style={{ minWidth: 200 }}>CVR</th>
                <th className="px-5 py-3 text-center font-medium text-slate-500">vs Avg CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {seg.groups.map(g => {
                const ctrDiff = g.ctr - seg.platformAvgCtr;
                const above = ctrDiff >= 0;
                return (
                  <tr key={g.label} className={`transition-colors ${g.highlight ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}>
                    <td className="px-5 py-4 font-medium text-slate-800 flex items-center gap-2">
                      {g.label}
                      {g.highlight && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-semibold">TOP</span>}
                    </td>
                    <td className="px-5 py-4 text-right text-slate-500 tabular-nums">{g.members.toLocaleString()}</td>
                    {/* CTR bar */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden" style={{ minWidth: 80 }}>
                          <div
                            className={`h-full rounded-full ${g.highlight ? 'bg-blue-500' : 'bg-blue-300'}`}
                            style={{ width: `${maxCtr > 0 ? (g.ctr / maxCtr) * 100 : 0}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold w-12 text-right ${g.ctr >= seg.platformAvgCtr ? 'text-blue-700' : 'text-slate-600'}`}>
                          {g.ctr > 0 ? `${g.ctr}%` : '—'}
                        </span>
                      </div>
                    </td>
                    {/* CVR bar */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden" style={{ minWidth: 80 }}>
                          <div
                            className="h-full rounded-full bg-teal-400"
                            style={{ width: `${g.cvr > 0 ? Math.min((g.cvr / 120) * 100, 100) : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-teal-700 w-12 text-right">
                          {g.cvr > 0 ? `${g.cvr}%` : '—'}
                        </span>
                      </div>
                    </td>
                    {/* vs Avg */}
                    <td className="px-5 py-4 text-center">
                      {g.ctr > 0 ? (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${above ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {above ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {above ? '+' : ''}{ctrDiff.toFixed(1)}pp
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insight card */}
      <div className="flex items-start gap-4 bg-indigo-50 border border-indigo-200 rounded-xl p-5">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-800 mb-1">AI Insight</p>
          <p className="text-sm text-indigo-700 leading-relaxed">{seg.insight}</p>
        </div>
      </div>
    </div>
  );
}

function TimingAnalysisTab({ analysis }) {
  if (!analysis) return <EmptyState message="Không có dữ liệu phân tích cho chiến dịch này." />;
  const { timingAnalysis: timing } = analysis;
  const { hourlyData, peakHour, peakOpenRate, peakClickRate, insight, bestDays } = timing;

  const maxOpen = Math.max(...hourlyData.map(h => h.openRate), 1);

  const [hoveredHour, setHoveredHour] = useState(null);
  const hovered = hoveredHour !== null ? hourlyData[hoveredHour] : null;

  const fmt = h => `${String(h).padStart(2, '0')}:00`;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-200">
      {/* Peak stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
            <AlarmClock className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Peak Hour</div>
            <div className="text-xl font-bold text-slate-900">{fmt(peakHour)}</div>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Peak Open Rate</div>
            <div className="text-xl font-bold text-slate-900">{peakOpenRate > 0 ? `${peakOpenRate}%` : '—'}</div>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-teal-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Peak Click Rate</div>
            <div className="text-xl font-bold text-slate-900">{peakClickRate > 0 ? `${peakClickRate}%` : '—'}</div>
          </div>
        </Card>
      </div>

      {/* 24h Heatmap */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">24-Hour Open Rate Heatmap</h3>
          {hovered && (
            <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-3">
              <span className="font-semibold text-slate-800">{fmt(hovered.hour)}</span>
              <span>Open: <b>{hovered.openRate}%</b></span>
              <span>Click: <b>{hovered.clickRate}%</b></span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
          <span>Low</span>
          <div className="flex gap-0.5">
            {['bg-slate-100', 'bg-blue-100', 'bg-blue-300', 'bg-blue-500', 'bg-blue-700'].map(c => (
              <div key={c} className={`w-8 h-3 ${c} rounded-sm`} />
            ))}
          </div>
          <span>High</span>
        </div>

        {/* Grid: 24 cells */}
        <div className="grid grid-cols-12 gap-1.5">
          {hourlyData.map((h, idx) => (
            <div
              key={h.hour}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredHour(idx)}
              onMouseLeave={() => setHoveredHour(null)}
            >
              {h.hour === peakHour && peakOpenRate > 0 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-amber-600 whitespace-nowrap">PEAK</div>
              )}
              <HeatCell value={h.openRate} max={maxOpen} />
              <div className="text-center text-[9px] text-slate-400 mt-0.5">{fmt(h.hour).replace(':00', '')}</div>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                {fmt(h.hour)}<br />
                Open: {h.openRate}%<br />
                Click: {h.clickRate}%
              </div>
            </div>
          ))}
        </div>

        {/* Second row: click rate mini bars */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Click Rate by Hour</p>
          <div className="grid grid-cols-12 gap-1.5">
            {hourlyData.map(h => {
              const maxClick = Math.max(...hourlyData.map(x => x.clickRate), 1);
              const ht = Math.round((h.clickRate / maxClick) * 32);
              return (
                <div key={h.hour} className="flex flex-col items-center justify-end" style={{ height: 36 }}>
                  <div className="w-full bg-teal-400 rounded-t-sm transition-all" style={{ height: `${ht}px`, minHeight: h.clickRate > 0 ? 2 : 0 }} />
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Best days */}
      {bestDays && bestDays.length > 0 && (
        <Card className="p-5 flex items-center gap-4">
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium mb-1">Best Days for This Segment</p>
            <div className="flex flex-wrap gap-2">
              {bestDays.map(d => (
                <span key={d} className="px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">{d}</span>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Insight card */}
      <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
          <AlarmClock className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-1">Timing Insight</p>
          <p className="text-sm text-amber-700 leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <BarChart3 className="w-7 h-7 text-slate-400" />
      </div>
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────

const TABS = [
  { key: 'Members',            label: 'Members' },
  { key: 'Performance Chart',  label: 'Performance Chart' },
  { key: 'Delivery Rate',      label: 'Delivery Rate',       icon: Signal },
  { key: 'Segment Engagement', label: 'Segment Engagement',  icon: Users  },
  { key: 'Timing Analysis',    label: 'Timing Analysis',     icon: AlarmClock },
  { key: 'A/B Test',           label: 'A/B Test' },
];

export default function CampaignDashboardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = CAMPAIGNS.find(c => c.id === id) || CAMPAIGNS[0];
  const analysis = CAMPAIGN_ANALYSIS[campaign.id] || null;

  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Members');

  const filteredData = filter === 'All' ? EXECUTION_DATA : EXECUTION_DATA.filter(d => d.status === filter);

  const stats = [
    { label: 'Completed',   value: '612',   percent: '15.9%', color: 'text-green-600', icon: CheckCircle2, bg: 'bg-green-50' },
    { label: 'In Progress', value: '235',   percent: '6.1%',  color: 'text-[#2563EB]', icon: Loader2,      bg: 'bg-blue-50',  spin: true },
    { label: 'Failed',      value: '12',    percent: '0.3%',  color: 'text-red-600',   icon: XCircle,      bg: 'bg-red-50'   },
    { label: 'Pending',     value: '2,988', percent: '77.7%', color: 'text-[#64748B]', icon: Clock,        bg: 'bg-gray-100' },
  ];

  const columns = [
    { header: 'Member ID',   accessorKey: 'id',        width: '15%', cell: row => <span className="font-medium text-[#0F172A]">{row.id}</span> },
    { header: 'Member Name', accessorKey: 'name',      width: '20%' },
    { header: 'Status',      accessorKey: 'status',    width: '15%', cell: row => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
        row.status === 'Delivered' ? 'bg-green-100 text-green-700'
        : row.status === 'Failed' ? 'bg-red-100 text-red-700'
        : row.status === 'In Progress' ? 'bg-blue-100 text-blue-700'
        : 'bg-gray-100 text-gray-700'
      }`}>
        {row.status === 'In Progress' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
        {row.status}
      </span>
    )},
    { header: 'Channel',     accessorKey: 'channel',   width: '15%' },
    { header: 'Sent At',     accessorKey: 'sentAt',    width: '15%' },
    { header: 'Delivered',   accessorKey: 'delivered', width: '10%', cell: row => (
      <div className="flex justify-center text-lg font-bold">
        {row.delivered === true  && <span className="text-green-500">✓</span>}
        {row.delivered === false && <span className="text-red-500">✗</span>}
        {row.delivered === null  && <span className="text-gray-400">—</span>}
      </div>
    )},
    { header: 'Action', accessorKey: 'action', width: '10%', cell: () => (
      <button className="text-[#2563EB] hover:underline text-sm font-medium">View</button>
    )},
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col h-full fade-in pb-24">
      {/* Header */}
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
                campaign.status === 'Active'  ? 'green' :
                campaign.status === 'Scheduled' ? 'amber' : 'gray'
              }>{campaign.status}</Badge>
            </div>
            <p className="text-sm text-[#64748B]">Targeting: <strong>{campaign.segment}</strong> · Scheduled: {campaign.schedule}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
            <Play className="w-4 h-4 mr-2" /> Run Now
          </Button>
          <Button variant="outline"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
          <Button variant="outline" onClick={() => navigate('/analytics')}>
            View Analytics <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button className="bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200" onClick={() => navigate('/optimize')}>
            <Zap className="w-4 h-4 mr-1 text-amber-500 fill-amber-500" /> 1 Tip
          </Button>
          <Button variant="secondary" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
            <Power className="w-4 h-4 mr-2" /> Deactivate
          </Button>
        </div>
      </div>

      {/* Stats row 1 */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        {/* Stats row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="text-sm font-medium text-[#64748B] mb-2">CTR</div>
            <div className="text-2xl font-bold text-[#0F172A] mb-1">20.0%</div>
            <div className="text-sm font-medium text-green-600">↑ vs avg</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-[#64748B] mb-2">CVR</div>
            <div className="text-2xl font-bold text-[#0F172A] mb-1">24.1%</div>
            <div className="text-sm font-medium text-green-600">↑ vs avg</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-[#64748B] mb-2">Revenue</div>
            <div className="text-2xl font-bold text-[#0F172A] mb-1">฿847,200</div>
            <div className="text-sm font-medium text-[#64748B]">attributed</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-[#64748B] mb-2">ROAS</div>
            <div className="text-2xl font-bold text-[#0F172A] mb-1">4.1×</div>
            <div className="text-sm font-medium text-green-600">{'>'} 3.2 tgt</div>
          </Card>
        </div>
      </div>

      {/* Tab panel */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col flex-1 min-h-[400px]">
        {/* Tab bar */}
        <div className="flex space-x-1 border-b border-[#E2E8F0] px-6 pt-4 bg-[#F8FAFC] overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === key
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'Members' && (
          <div className="flex flex-col h-full">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
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
        )}

        {activeTab === 'Performance Chart' && (
          <div className="p-8 h-full">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" /> Daily CTR Trend
            </h3>
            <div className="h-64 w-full border-b border-l border-[#E2E8F0] relative flex items-end ml-4">
              <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path d="M0,45 L10,35 L20,38 L30,25 L40,28 L50,20 L60,22 L70,12 L80,15 L90,8 L100,5" fill="none" stroke="#2563EB" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-between py-2 -ml-8 text-right pr-2">
                <span className="text-[10px] text-[#64748B]">30%</span>
                <span className="text-[10px] text-[#64748B]">15%</span>
                <span className="text-[10px] text-[#64748B] translate-y-2">0%</span>
              </div>
              <div className="absolute left-[30%] bottom-[50%] flex flex-col items-center translate-y-2 -translate-x-1/2 group cursor-pointer">
                <MapPin className="w-4 h-4 text-amber-500 drop-shadow" />
                <div className="absolute top-full mt-1 bg-amber-50 text-amber-800 text-[10px] font-semibold px-2 border border-amber-200 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Copy changed</div>
              </div>
              <div className="absolute left-[70%] bottom-[75%] flex flex-col items-center translate-y-2 -translate-x-1/2 group cursor-pointer">
                <MapPin className="w-4 h-4 text-purple-500 drop-shadow" />
                <div className="absolute top-full mt-1 bg-purple-50 text-purple-800 text-[10px] font-semibold px-2 border border-purple-200 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Segment synced</div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 text-xs text-[#64748B] justify-center w-full relative">
              <span className="absolute left-0">Mar 1</span>
              <span className="absolute right-0">Mar 23</span>
            </div>
          </div>
        )}

        {activeTab === 'Delivery Rate'      && <DeliveryRateTab      analysis={analysis} />}
        {activeTab === 'Segment Engagement' && <SegmentEngagementTab analysis={analysis} />}
        {activeTab === 'Timing Analysis'    && <TimingAnalysisTab    analysis={analysis} />}

        {activeTab === 'A/B Test' && (
          <div className="p-8 h-full flex items-center justify-center flex-col text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 border border-purple-100 shadow-sm">
              <FlaskConical className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Optimize with A/B Testing</h3>
            <p className="text-[#64748B] max-w-sm mb-6 text-sm">Create an experiment to test different content variants, send times, or channels against each other.</p>
            <Button className="bg-purple-600 hover:bg-purple-700 font-semibold shadow-sm">
              <Plus className="w-4 h-4 mr-2" /> Create A/B Test
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
