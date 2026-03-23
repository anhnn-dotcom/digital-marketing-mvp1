import React, { useState } from 'react';
import {
  Search,
  Users,
  Settings,
  AlertCircle,
  Download,
  Plus,
  RefreshCw,
  Bell,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Eye,
  Activity,
  Flame,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppContext } from '../context/AppContext';

export default function AudienceInsightsPage() {
  const navigate = useNavigate();
  const { audienceSegments, audienceMembers, audienceCampaignHistory, loading } = useAppContext();

  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedSegmentId, setSelectedSegmentId] = useState('gold-at-risk');

  const selectedSegment = audienceSegments.find(s => s.id === selectedSegmentId) || audienceSegments[0];
  const segmentMembers = audienceMembers.filter(m => m.segmentId === selectedSegmentId || m.segment_id === selectedSegmentId);
  const segmentHistory = audienceCampaignHistory.filter(h => h.segmentId === selectedSegmentId || h.segment_id === selectedSegmentId);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-[#2563EB] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden bg-[#F8FAFC]">
      {/* LEFT: Segment Selector Panel */}
      <div className="w-[320px] bg-white border-r border-[#E2E8F0] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Select Segment</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search segments..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-[#0F172A] font-medium">Compare</span>
            <button className="w-8 h-4 bg-[#E2E8F0] rounded-full relative transition-colors duration-200 focus:outline-none">
              <span className="w-4 h-4 bg-white rounded-full absolute left-0 top-0 shadow transform transition-transform duration-200 block border border-[#CBD5E1]"></span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {audienceSegments.map(seg => (
            <SegmentCard
              key={seg.id}
              name={seg.name}
              count={seg.count}
              active={seg.active}
              selected={selectedSegmentId === seg.id}
              onClick={() => { setSelectedSegmentId(seg.id); setActiveTab('Overview'); }}
              colors={seg.colors}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Segment Detail */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1200px] mx-auto">
          {/* HEADER */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-[#0F172A]">{selectedSegment?.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedSegment?.active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {selectedSegment?.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#64748B]">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {selectedSegment?.count} members</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Updated 2h ago</span>
                <span className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4" /> Auto-sync ON</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-[#F8FAFC] text-sm"><RefreshCw className="w-4 h-4" /> Sync Now</button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] hover:bg-[#F8FAFC] text-sm"><Download className="w-4 h-4" /> Export List</button>
              <button
                onClick={() => { toast.success('Segment pre-filled.'); navigate('/campaigns/create', { state: { segment: selectedSegment?.name } }); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1D4ED8] font-medium text-sm shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Create Campaign
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="flex space-x-1 border-b border-[#E2E8F0] mb-6">
            {['Overview', 'Performance', 'Journey', 'Members'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Overlap Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-amber-800 font-semibold text-sm">⚠️ Segment Overlap Detected</h4>
                  <div className="mt-2 bg-white rounded border border-amber-100 divide-y divide-amber-100 text-sm">
                    <div className="p-3 flex items-center justify-between">
                      <div className="text-[#0F172A]"><span className="font-medium">VIP Churning — Priority</span></div>
                      <div className="text-amber-700 font-medium">234 members (6.1% overlap)</div>
                    </div>
                    <div className="p-3 bg-amber-50/50 flex items-center justify-between text-xs">
                      <span className="text-amber-800">These members will receive messages from campaigns targeting both segments.</span>
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-white border border-amber-200 rounded text-amber-700 hover:bg-amber-50 font-medium">View</button>
                        <button className="px-2 py-1 bg-white border border-amber-200 rounded text-amber-700 hover:bg-amber-50 font-medium">Exclude</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-4 gap-4">
                <StatCard title="Avg Points Balance" value="4,230 pts" icon={Award} trend="↑ 12%" />
                <StatCard title="Avg Tier" value="Gold / Plat" sub="72% / 28%" icon={Award} />
                <StatCard title="Avg Days Inactive" value="74 days" icon={Clock} trend="↑ 4d" downIsBad />
                <StatCard title="Avg Transaction Value" value="฿2,840/mo" icon={Activity} trend="↓ 14%" downIsBad />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#E2E8F0]">
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Demographics: Age & City</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-[#64748B] mb-2 font-medium uppercase tracking-wider">Age Distribution</div>
                      <div className="flex items-end h-32 gap-2 border-b border-[#E2E8F0] pb-2">
                        <Bar value={40} label="25-29" text="18%" />
                        <Bar value={80} label="30-34" text="31%" active />
                        <Bar value={70} label="35-39" text="28%" />
                        <Bar value={40} label="40-44" text="16%" />
                        <Bar value={15} label="45+" text="7%" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="text-xs text-[#64748B] mb-2 font-medium uppercase tracking-wider">Top Cities</div>
                      <CityRow city="Bangkok" pct="58%" bg="bg-[#2563EB]" />
                      <CityRow city="Chiang Mai" pct="19%" bg="bg-[#38BDF8]" />
                      <CityRow city="Phuket" pct="12%" bg="bg-[#94A3B8]" />
                      <CityRow city="Other" pct="11%" bg="bg-[#CBD5E1]" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] flex flex-col">
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-4 flex justify-between">
                    Behavior Profile
                    <span className="text-xs font-normal text-[#64748B] flex items-center gap-2">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> Segment</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-dashed border-[#94A3B8]"></span> Avg</span>
                    </span>
                  </h3>
                  <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full" viewBox="-120 -120 240 240">
                        <polygon points="0,-100 86.6,-50 86.6,50 0,100 -86.6,50 -86.6,-50" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                        <polygon points="0,-80 69.3,-40 69.3,40 0,80 -69.3,40 -69.3,-40" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                        <polygon points="0,-40 34.6,-20 34.6,20 0,40 -34.6,20 -34.6,-20" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                        <polygon points="0,-20 17.3,-10 17.3,10 0,20 -17.3,10 -17.3,-10" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="0" y2="-100" stroke="#E2E8F0" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="86.6" y2="-50" stroke="#E2E8F0" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="86.6" y2="50" stroke="#E2E8F0" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="0" y2="100" stroke="#E2E8F0" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="-86.6" y2="50" stroke="#E2E8F0" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="-86.6" y2="-50" stroke="#E2E8F0" strokeWidth="1"/>
                        <polygon points="0,-70 52,-30 43.3,25 0,55 -52,30 -60,-35" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4"/>
                        <polygon points="0,-62 70,-40 25.9,15 0,78 -43.3,25 -34,-20" fill="rgba(37,99,235,0.2)" stroke="#2563EB" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mt-4">
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-1"><span>Tx Freq</span><span className="font-semibold">6.2 <span className="text-[#64748B] font-normal">/10</span></span></div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-1"><span>Avg Spend</span><span className="font-semibold">8.1 <span className="text-[#64748B] font-normal">/10</span></span></div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-1 text-red-600"><span>App Eng.</span><span className="font-semibold">3.4 <span className="text-red-400 font-normal">/10</span></span></div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-1"><span>Loyalty</span><span className="font-semibold">7.8 <span className="text-[#64748B] font-normal">/10</span></span></div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-1 text-red-600"><span>Push Open</span><span className="font-semibold">5.1 <span className="text-red-400 font-normal">/10</span></span></div>
                    <div className="flex justify-between border-b border-[#F1F5F9] pb-1 text-red-600"><span>Reward Red.</span><span className="font-semibold">4.2 <span className="text-red-400 font-normal">/10</span></span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Performance */}
          {activeTab === 'Performance' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
                <div className="p-4 border-b border-[#E2E8F0]"><h3 className="font-semibold text-[#0F172A]">Campaign History for Segment</h3></div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8FAFC] text-[#64748B]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Campaign</th>
                      <th className="px-4 py-3 font-medium">Period</th>
                      <th className="px-4 py-3 font-medium text-right">Impressions</th>
                      <th className="px-4 py-3 font-medium text-right">CTR</th>
                      <th className="px-4 py-3 font-medium text-right">CVR</th>
                      <th className="px-4 py-3 font-medium text-right">Revenue</th>
                      <th className="px-4 py-3 font-medium text-right">ROAS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {segmentHistory.length > 0 ? segmentHistory.map(h => (
                      <tr key={h.id} className="hover:bg-[#F8FAFC] cursor-pointer group" onClick={() => navigate(`/campaigns/${h.campaignId || h.campaign_id}`)}>
                        <td className="px-4 py-3 font-medium text-[#2563EB] group-hover:underline">{h.campaign}</td>
                        <td className="px-4 py-3 text-[#64748B]">{h.period}</td>
                        <td className="px-4 py-3 text-right">{h.impressions}</td>
                        <td className={`px-4 py-3 text-right font-medium ${(h.ctrStatus || h.ctr_status) === 'good' ? 'text-[#10B981]' : (h.ctrStatus || h.ctr_status) === 'bad' ? 'text-red-500' : 'text-[#0F172A]'}`}>{h.ctr}</td>
                        <td className="px-4 py-3 text-right text-[#0F172A]">{h.cvr}</td>
                        <td className="px-4 py-3 text-right font-medium">{h.revenue}</td>
                        <td className={`px-4 py-3 text-right font-medium ${(h.roasStatus || h.roas_status) === 'good' ? 'text-[#10B981]' : (h.roasStatus || h.roas_status) === 'bad' ? 'text-red-500' : 'text-[#0F172A]'}`}>{h.roas}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={7} className="px-4 py-8 text-center text-[#64748B]">No campaign history for this segment yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                  <h3 className="font-semibold text-[#0F172A] mb-4">Content Affinity</h3>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                      <div className="text-xs text-green-700 font-bold mb-1 uppercase tracking-wider">Best Performing Content</div>
                      <div className="flex justify-between items-center bg-white p-2 rounded border border-green-100 mb-2 shadow-sm">
                        <span className="font-medium text-[#0F172A]">"Gold Member Win-Back Banner"</span>
                        <span className="text-[#10B981] font-bold">CTR 28.4%</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2 rounded border border-green-100 shadow-sm">
                        <span className="font-medium text-[#0F172A]">"VIP Churn Prevention Popup"</span>
                        <span className="text-[#10B981] font-bold">CTR 22.1%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                      <div className="text-xs text-red-700 font-bold mb-1 uppercase tracking-wider">Worst Performing</div>
                      <div className="flex justify-between items-center bg-white p-2 rounded border border-red-100 shadow-sm">
                        <span className="font-medium text-[#0F172A]">"Dormant Reactivation Banner"</span>
                        <span className="text-red-600 font-bold">CTR 6.2%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-sm">
                  <h3 className="font-semibold text-[#0F172A] mb-4">Optimal Send Times</h3>
                  <div className="text-[#64748B] mb-4 text-xs font-medium">Warm map based on highest CTR historical data</div>
                  <div className="grid grid-cols-7 gap-1">
                    {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="text-xs text-center text-[#64748B]">{d}</div>)}
                    <div className="h-6 bg-[#DBEAFE] rounded-sm"></div>
                    <div className="h-6 bg-[#3B82F6] rounded-sm"></div>
                    <div className="h-6 bg-[#DBEAFE] rounded-sm"></div>
                    <div className="h-6 bg-[#BFDBFE] rounded-sm"></div>
                    <div className="h-6 bg-[#EFF6FF] rounded-sm"></div>
                    <div className="h-6 bg-amber-50 rounded-sm w-full border border-amber-100"></div>
                    <div className="h-6 bg-amber-50 rounded-sm w-full border border-amber-100"></div>
                    <div className="h-6 bg-[#1D4ED8] rounded-sm ring-2 ring-blue-600 mt-1"></div>
                    <div className="h-6 bg-[#2563EB] rounded-sm mt-1"></div>
                    <div className="h-6 bg-[#3B82F6] rounded-sm mt-1"></div>
                    <div className="h-6 bg-[#93C5FD] rounded-sm mt-1"></div>
                    <div className="h-6 bg-[#EFF6FF] rounded-sm mt-1"></div>
                    <div className="h-6 bg-amber-50 rounded-sm w-full border border-amber-100 mt-1"></div>
                    <div className="h-6 bg-amber-50 rounded-sm w-full border border-amber-100 mt-1"></div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs leading-relaxed font-medium">
                    🎯 Best time to reach this segment: <br/><strong className="text-sm">Tuesday 09:00 - 10:00</strong> or <strong className="text-sm">Monday 20:00 - 21:00</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Journey */}
          {activeTab === 'Journey' && (
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-8">Member Lifecycle Funnel</h3>

              <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-1 bg-[#E2E8F0] z-0"></div>
                <div className="absolute left-[5%] right-[25%] top-1/2 -translate-y-1/2 h-1 bg-amber-400 z-0 opacity-40"></div>

                <JourneyStep title="Acquired" sub="Onboarded" active icon={TrendingUp} />
                <JourneyStep title="First GD" sub="Activated" active icon={CheckCircle2} />
                <JourneyStep title="Regular" sub="6+ months" active icon={Flame} />
                <JourneyStep title="At Risk" sub="Current State" active isCurrent icon={AlertCircle} color="text-amber-500" />
                <JourneyStep title="Churned/Reactivated" sub="Predicted Next" pending icon={TrendingDown} />
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-4">State Dynamics</h4>
                  <div className="space-y-4">
                    <div className="bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
                      <div className="text-sm text-[#64748B]">Avg days from Regular to At Risk</div>
                      <div className="text-xl font-bold text-[#0F172A]">187 days</div>
                    </div>
                    <div className="bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
                      <div className="text-sm text-[#64748B]">Predicted Next State (14-day horizon)</div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs font-semibold mb-1"><span className="text-red-500">Churned (No action)</span><span className="text-[#0F172A]">61%</span></div>
                          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden"><div className="h-full bg-red-400 rounded-full w-[61%]"></div></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs font-semibold mb-1"><span className="text-green-500">Reactivated (With campaign)</span><span className="text-[#0F172A]">39%</span></div>
                          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden"><div className="h-full bg-green-400 rounded-full w-[39%]"></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-blue-800 font-bold mb-3">
                      <span className="text-xl">💡</span> Recommended: Escalate win-back
                    </div>
                    <p className="text-sm text-blue-900 mb-4 leading-relaxed">
                      74% of similar segments responded to personalized cashback offers within 7 days. Consider:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1.5 mb-5 font-medium">
                      <li>Increase cashback cap ฿150 → ฿250</li>
                      <li>Add LINE OA message as 2nd touch</li>
                      <li>Reduce push frequency 1/day → 2/day</li>
                    </ul>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-bold text-green-700 bg-white px-2 py-1 rounded border border-green-200">
                        Projected lift: +12% reactivation
                      </span>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100">Dismiss</button>
                        <button
                          onClick={() => { toast.success('Segment and content pre-filled.'); navigate('/campaigns/create', { state: { segment: selectedSegment?.name } }); }}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700"
                        >
                          Apply Suggestions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Members */}
          {activeTab === 'Members' && (
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center">
                <h3 className="font-semibold text-[#0F172A]">Segment Members ({selectedSegment?.count})</h3>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search member..." className="pl-9 pr-4 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                </div>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-[#F8FAFC] text-[#64748B]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Member ID</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Tier</th>
                    <th className="px-4 py-3 font-medium text-right">Points</th>
                    <th className="px-4 py-3 font-medium text-center">Last GD</th>
                    <th className="px-4 py-3 font-medium text-center">Days Inactive</th>
                    <th className="px-4 py-3 font-medium text-center">Push</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {segmentMembers.length > 0 ? segmentMembers.map(m => (
                    <MemberRow key={m.id} id={m.id} name={m.name} tier={m.tier} pts={m.pts} last={m.lastTransaction || m.last_transaction || m.last} days={m.daysInactive || m.days_inactive || m.days} push={m.pushEnabled ?? m.push_enabled ?? m.push} status={m.status} />
                  )) : (
                    <tr><td colSpan={9} className="px-4 py-8 text-center text-[#64748B]">No member data for this segment yet.</td></tr>
                  )}
                </tbody>
              </table>
              <div className="p-4 border-t border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC] text-sm text-[#64748B]">
                <span>Showing {segmentMembers.length} of {selectedSegment?.count} members</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 bg-white border border-[#E2E8F0] rounded-md disabled:opacity-50" disabled>Prev</button>
                  <button className="px-3 py-1 bg-[#2563EB] text-white border border-[#2563EB] rounded-md">1</button>
                  <button className="px-3 py-1 bg-white border border-[#E2E8F0] rounded-md hover:bg-[#F1F5F9]">Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Components
function SegmentCard({ name, count, active, selected, onClick, colors }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer border ${selected ? 'border-[#2563EB] bg-[#EFF6FF] shadow-sm' : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-semibold text-sm ${selected ? 'text-[#1D4ED8]' : 'text-[#0F172A]'}`}>{name}</h3>
        {active ? <div className="w-2 h-2 rounded-full bg-[#10B981]"></div> : <div className="w-2 h-2 rounded-full bg-[#94A3B8]"></div>}
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="bg-[#E2E8F0] text-[#475569] px-2 py-0.5 rounded font-medium">{count}</span>
        <div className="flex -space-x-1">
          {colors?.map((c, i) => <div key={i} className={`w-3 h-3 rounded-full border border-white ${c}`}></div>)}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, trend, downIsBad }) {
  const isUp = trend?.includes('↑');
  const positive = trend ? (downIsBad ? !isUp : isUp) : false;

  return (
    <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium text-[#64748B]">{title}</div>
        <div className="p-2 bg-[#F1F5F9] rounded-lg"><Icon className="w-4 h-4 text-[#2563EB]" /></div>
      </div>
      <div>
        <div className="text-2xl font-bold text-[#0F172A]">{value}</div>
        {sub && <div className="text-xs text-[#64748B] mt-1">{sub}</div>}
        {trend && (
          <div className={`text-xs mt-1 font-medium ${positive ? 'text-[#10B981]' : 'text-red-500'}`}>
            {trend} vs system avg
          </div>
        )}
      </div>
    </div>
  );
}

function Bar({ value, label, text, active }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1 relative group">
      <div className="absolute top-0 transform -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none mb-1 z-10">{text}</div>
      <div className={`w-full ${active ? 'bg-[#2563EB]' : 'bg-[#93C5FD]'} rounded-t-sm transition-all hover:opacity-80`} style={{ height: `${value}%` }}></div>
      <div className="text-[10px] text-[#64748B] truncate w-full text-center">{label}</div>
    </div>
  );
}

function CityRow({ city, pct, bg }) {
  return (
    <div className="flex items-center gap-3 text-xs mb-3 font-medium">
      <div className="w-20 text-[#0F172A] truncate">{city}</div>
      <div className="flex-1 h-3 bg-[#F1F5F9] rounded overflow-hidden">
        <div className={`h-full ${bg} rounded`} style={{ width: pct }}></div>
      </div>
      <div className="w-8 text-right text-[#64748B]">{pct}</div>
    </div>
  );
}

function JourneyStep({ title, sub, icon: Icon, active, isCurrent, pending, color }) {
  return (
    <div className="flex flex-col items-center relative z-10 w-24">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white mb-2 shadow-sm ${isCurrent ? 'bg-amber-100 ring-2 ring-amber-400' : (active ? 'bg-[#DBEAFE]' : 'bg-[#F1F5F9] opacity-50')}`}>
        <Icon className={`w-5 h-5 ${isCurrent ? color : (active ? 'text-[#2563EB]' : 'text-[#94A3B8]')}`} />
      </div>
      <div className={`text-sm font-bold text-center ${isCurrent ? 'text-amber-600' : (active ? 'text-[#0F172A]' : 'text-[#94A3B8]')}`}>{title}</div>
      <div className="text-xs text-[#64748B] text-center mt-0.5">{sub}</div>
    </div>
  );
}

function MemberRow({ id, name, tier, pts, last, days, push, status }) {
  return (
    <tr className="hover:bg-[#F8FAFC] group cursor-pointer">
      <td className="px-4 py-3 font-mono text-xs text-[#64748B]">{id}</td>
      <td className="px-4 py-3 font-medium text-[#0F172A]">{name}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${tier === 'Gold' ? 'bg-amber-100 text-amber-800 border border-amber-200' : tier === 'Platinum' ? 'bg-slate-200 text-slate-800 border border-slate-300' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>{tier}</span>
      </td>
      <td className="px-4 py-3 text-right font-medium text-[#0F172A]">{pts}</td>
      <td className="px-4 py-3 text-center text-[#64748B]">{last}</td>
      <td className="px-4 py-3 text-center font-medium text-[#0F172A]">{days}</td>
      <td className="px-4 py-3 text-center">
        {push ? <span className="text-[#10B981] font-bold">✓</span> : <span className="text-[#94A3B8] font-bold">✗</span>}
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'At Risk' ? 'bg-amber-100 text-amber-700' : status === 'Critical' ? 'bg-red-100 text-red-700' : status === 'Lapsed' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <button className="opacity-0 group-hover:opacity-100 text-[#2563EB] hover:bg-[#DBEAFE] p-1.5 rounded transition-all">
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
