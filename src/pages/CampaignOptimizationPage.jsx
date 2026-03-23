import React, { useState } from 'react';
import {
  Zap,
  Settings,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  BarChart,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  Plus,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Save,
  PlayCircle,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppContext } from '../context/AppContext';

export default function CampaignOptimizationPage() {
  const navigate = useNavigate();
  const {
    optimizationSuggestions,
    abTests,
    fatigueAlerts,
    optimizationHistory,
    frequencyOverrides,
    loading,
    dismissSuggestion,
    applySuggestion,
    deployAbTest,
  } = useAppContext();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [globalFreq, setGlobalFreq] = useState({ day: 2, week: 5, month: 15, cooldown: 48 });
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployingTest, setDeployingTest] = useState(null);

  const pendingSuggestions = optimizationSuggestions.filter(s => s.status === 'pending');
  const runningTests = abTests.filter(t => t.testStatus === 'running');
  const badFatigue = fatigueAlerts.filter(f => f.status === 'bad');

  const estimatedLift = '฿284K';

  const handleApply = (suggestion) => {
    applySuggestion(suggestion.id);
    switch (suggestion.actionKey) {
      case 'push_copy':
        toast.info('Applying variation B for Gold Win-Back...');
        navigate('/push');
        break;
      case 'send_time':
        toast.info('Adjusting send time to 08:30...');
        navigate('/campaigns');
        break;
      case 'exclude':
        toast.info('Drafting exclusion rules...');
        navigate('/campaigns');
        break;
      case 'replace_banner':
        toast.info('Drafting urgent replacement banner...');
        navigate('/content');
        break;
      default:
        toast.success('Optimization applied.');
    }
  };

  const handleDismiss = (suggestion) => {
    dismissSuggestion(suggestion.id);
    toast.success('Suggestion dismissed.');
  };

  const handleDeploy = (test) => {
    setDeployingTest(test);
    setShowDeployModal(true);
  };

  const confirmDeploy = () => {
    deployAbTest(deployingTest.id);
    toast.success(`Variant deployed successfully for ${deployingTest.campaign}`);
    setShowDeployModal(false);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-[#2563EB] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8 bg-[#F8FAFC]">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#2563EB]" fill="currentColor" opacity={0.2} />
          Campaign Optimization
        </h1>
        <p className="text-[#64748B] mt-1">AI-powered suggestions based on last 30 days performance data</p>
      </div>

      {/* SUMMARY BAR */}
      <div className="flex items-stretch gap-4">
        <div className="flex-1 bg-white border border-[#E2E8F0] p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">{pendingSuggestions.length}</div>
            <span className="font-semibold text-[#0F172A]">Suggestions pending</span>
          </div>
        </div>
        <div className="flex-1 bg-white border border-[#E2E8F0] p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">{runningTests.length}</div>
            <span className="font-semibold text-[#0F172A]">A/B tests running</span>
          </div>
        </div>
        <div className="flex-1 bg-white border border-[#E2E8F0] p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">{badFatigue.length}</div>
            <span className="font-semibold text-[#0F172A]">Fatigue alerts</span>
          </div>
        </div>
        <div className="flex-1 bg-white border border-green-200 p-4 rounded-xl flex items-center justify-between shadow-sm bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><TrendingUp className="w-5 h-5" /></div>
            <div>
              <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">Estimated Lift</div>
              <div className="font-bold text-[#0F172A] text-xl">{estimatedLift}<span className="text-xs text-[#64748B] ml-1 font-normal">/mo</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: OPTIMIZATION SUGGESTIONS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Suggestions
          </h2>
          <button className="px-4 py-2 bg-[#0F172A] text-white rounded-md text-sm font-medium hover:bg-[#1E293B] shadow-sm transition-colors">
            Apply All High Impact
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {pendingSuggestions.map(sug => (
            <SuggestionCard
              key={sug.id}
              impact={sug.impact}
              campaign={sug.campaign}
              issue={sug.issue}
              fix={sug.fix}
              lift={sug.lift}
              conf={sug.confidence}
              data={sug.data}
              onApply={() => handleApply(sug)}
              onDismiss={() => handleDismiss(sug)}
            />
          ))}
        </div>
        {pendingSuggestions.length === 0 && (
          <div className="text-center py-12 text-[#64748B]">
            <CheckCircle2 className="w-12 h-12 mx-auto text-green-400 mb-3" />
            <p className="font-semibold">All suggestions applied!</p>
          </div>
        )}
      </div>

      <div className="border-t border-[#E2E8F0] my-8"></div>

      {/* SECTION 2: A/B TESTS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <BarChart className="w-5 h-5 text-purple-600" />
            Running A/B Tests
          </h2>
          <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-md text-sm font-medium hover:bg-[#F8FAFC] shadow-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Test
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {runningTests.map(test => (
            <TestCard
              key={test.id}
              status={test.status}
              campaign={test.campaign}
              channel={test.channel}
              varA={{ name: test.variantA?.name, ctr: test.variantA?.ctr, cvr: test.variantA?.cvr, barClass: `w-[${test.variantA?.widthPct}%] ${test.variantA?.isLeading ? 'bg-purple-500' : 'bg-[#E2E8F0]'}` }}
              varB={{ name: test.variantB?.name, ctr: test.variantB?.ctr, cvr: test.variantB?.cvr, lead: test.variantB?.isLeading, barClass: `w-[${test.variantB?.widthPct}%] ${test.variantB?.isLeading ? 'bg-purple-500' : 'bg-[#E2E8F0]'}` }}
              sig={test.significance}
              winner={test.winner}
              warning={test.warning}
              daysLeft={test.daysLeft}
              onDeploy={() => handleDeploy(test)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] my-8"></div>

      {/* SECTION 3: FREQUENCY CONTROL */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-500" />
            Frequency & Fatigue Control
          </h2>
          <p className="text-sm text-[#64748B] mt-1 ml-7">Prevent over-messaging and reduce unsubscribe risk</p>
        </div>
        <div className="flex gap-8 items-start">
          <div className="w-1/3 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <h3 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-[#64748B]" /> Global Limits</h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Maximum messages per member</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex justify-between items-center border border-[#E2E8F0] px-3 py-2 rounded-md"><span>Per day:</span><div className="flex items-center gap-3 font-semibold"><button onClick={() => setGlobalFreq(f => ({ ...f, day: Math.max(1, f.day - 1) }))}>-</button><span>{globalFreq.day}</span><button className="text-[#2563EB]" onClick={() => setGlobalFreq(f => ({ ...f, day: f.day + 1 }))}>+</button></div></div>
                  <div className="flex justify-between items-center bg-[#F8FAFC] px-3 py-2 rounded-md"><span>across</span><span className="font-semibold text-[#64748B]">all</span></div>
                  <div className="flex justify-between items-center border border-[#E2E8F0] px-3 py-2 rounded-md"><span>Per week:</span><div className="flex items-center gap-3 font-semibold"><button onClick={() => setGlobalFreq(f => ({ ...f, week: Math.max(1, f.week - 1) }))}>-</button><span>{globalFreq.week}</span><button className="text-[#2563EB]" onClick={() => setGlobalFreq(f => ({ ...f, week: f.week + 1 }))}>+</button></div></div>
                  <div className="flex justify-between items-center bg-[#F8FAFC] px-3 py-2 rounded-md"><span>campaigns</span></div>
                  <div className="flex justify-between items-center border border-[#E2E8F0] px-3 py-2 rounded-md"><span>Per month:</span><div className="flex items-center gap-3 font-semibold"><button onClick={() => setGlobalFreq(f => ({ ...f, month: Math.max(1, f.month - 1) }))}>-</button><span>{globalFreq.month}</span><button className="text-[#2563EB]" onClick={() => setGlobalFreq(f => ({ ...f, month: f.month + 1 }))}>+</button></div></div>
                </div>
              </div>
              <div className="pt-2 border-t border-[#E2E8F0]">
                <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Cooldown Rules</label>
                <div className="mt-2 flex justify-between items-center border border-[#E2E8F0] px-3 py-2 rounded-md">
                  <span>After conversion:</span>
                  <div className="flex items-center gap-2">
                    <input type="text" className="w-12 text-center border border-[#E2E8F0] rounded py-1 font-semibold" value={globalFreq.cooldown} readOnly />
                    <span className="text-[#64748B]">hrs</span>
                  </div>
                </div>
                <div className="text-xs text-[#64748B] mt-2 leading-relaxed">System will temporarily suspend promotional messages to members who just completed a target action.</div>
              </div>
              <button className="w-full py-2 bg-[#F1F5F9] text-[#0F172A] rounded-md font-semibold text-sm hover:bg-[#E2E8F0] transition-colors mt-2 flex justify-center items-center gap-2">
                <Save className="w-4 h-4" /> Save Global Settings
              </button>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center">
              <h3 className="font-semibold text-[#0F172A]">Per-Segment Overrides</h3>
              <button className="text-sm font-medium text-[#2563EB] flex items-center gap-1"><Plus className="w-4 h-4" /> Add override</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-[#F8FAFC] text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-medium">Segment</th>
                  <th className="px-4 py-3 font-medium text-center">Max/Day</th>
                  <th className="px-4 py-3 font-medium text-center">Max/Week</th>
                  <th className="px-4 py-3 font-medium text-center">Cooldown</th>
                  <th className="px-4 py-3 font-medium">Override Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {frequencyOverrides.map(fo => (
                  <tr key={fo.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-medium text-[#0F172A]">{fo.segment}</td>
                    <td className="px-4 py-3 text-center"><span className="font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{fo.maxPerDay}</span></td>
                    <td className="px-4 py-3 text-center"><span className="font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{fo.maxPerWeek}</span></td>
                    <td className="px-4 py-3 text-center">{fo.cooldown}</td>
                    <td className="px-4 py-3 text-[#64748B] text-xs">{fo.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] my-8"></div>

      {/* SECTION 4: CONTENT FATIGUE MONITOR */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Content Fatigue Alerts
          </h2>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-[#64748B]">
              <tr>
                <th className="px-4 py-3 font-medium">Content Asset</th>
                <th className="px-4 py-3 font-medium">Campaign</th>
                <th className="px-4 py-3 font-medium text-center">Days Live</th>
                <th className="px-4 py-3 font-medium text-right">CTR Week 1</th>
                <th className="px-4 py-3 font-medium text-right">CTR Now</th>
                <th className="px-4 py-3 font-medium text-center">Trend Indicator</th>
                <th className="px-4 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {fatigueAlerts.map(row => (
                <FatigueRow key={row.id} name={row.name} cmp={row.campaign} days={row.daysLive} w1={row.ctrWeek1} now={row.ctrNow} drop={row.drop} status={row.status} />
              ))}
            </tbody>
          </table>
          <div className="p-3 bg-[#F8FAFC] text-xs text-[#64748B] border-t border-[#E2E8F0]">
            Rules: System flags 🔴 Replace when CTR drops &gt;40% from initial baseline. 🟡 Monitor triggers at &gt;20% drop.
          </div>
        </div>
      </div>

      {/* HISTORY LOG */}
      <div className="mt-12 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-[#F8FAFC] transition-colors"
        >
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-[#64748B]" />
            <h3 className="font-semibold text-[#0F172A]">Recent Optimizations Applied</h3>
          </div>
          {historyOpen ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
        </button>
        {historyOpen && (
          <div className="p-6 border-t border-[#E2E8F0] space-y-6 bg-[#F8FAFC]">
            {optimizationHistory.map(h => (
              <HistoryItem key={h.id} time={h.time} desc={h.desc} user={h.user} />
            ))}
          </div>
        )}
      </div>

      {/* DEPLOY MODAL */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">Deploy Winning Variant</h2>
              <p className="text-[#475569] mb-4">
                You are about to deploy the leading variant for <strong>{deployingTest?.campaign}</strong> to 100% of traffic. This will end the A/B test.
              </p>
            </div>
            <div className="bg-[#F8FAFC] p-4 border-t border-[#E2E8F0] flex gap-3 justify-end">
              <button onClick={() => setShowDeployModal(false)} className="px-4 py-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors" type="button">Cancel</button>
              <button onClick={confirmDeploy} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors" type="button">Deploy to 100%</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components
function SuggestionCard({ impact, campaign, issue, fix, lift, conf, data, onApply, onDismiss }) {
  const isHigh = impact === 'high';
  const isMed = impact === 'medium';

  return (
    <div className={`bg-white rounded-xl border p-5 flex flex-col items-start shadow-sm transition-shadow hover:shadow-md ${isHigh ? 'border-red-200' : isMed ? 'border-amber-200' : 'border-[#CBD5E1]'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2.5 h-2.5 rounded-full ${isHigh ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : isMed ? 'bg-amber-500' : 'bg-green-500'}`}></div>
        <span className={`text-xs font-bold uppercase tracking-wider ${isHigh ? 'text-red-700' : isMed ? 'text-amber-700' : 'text-green-700'}`}>
          {isHigh ? 'High Impact' : isMed ? 'Medium Impact' : 'Low Impact'}
        </span>
        <span className="text-[#E2E8F0]">|</span>
        <span className="text-xs font-semibold text-[#0F172A]">{campaign}</span>
      </div>

      <div className="mb-3">
        <div className="text-xs text-[#64748B] uppercase font-semibold mb-1">Issue Detected</div>
        <div className="text-sm font-medium text-[#0F172A] leading-relaxed">{issue}</div>
      </div>

      <div className="mb-4 flex-1">
        <div className="text-xs text-[#2563EB] uppercase font-semibold mb-1">AI Suggestion</div>
        <div className="text-sm text-[#0F172A] bg-blue-50 border border-blue-100 p-2 rounded leading-relaxed">{fix}</div>
      </div>

      <div className="flex justify-between w-full items-end mt-2">
        <div>
          <div className="text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded inline-block mb-1 border border-green-200">
            Lift: {lift}
          </div>
          <div className="text-[11px] text-[#64748B] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-green-500" /> Conf: {conf} · {data}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onDismiss} className="px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9] rounded border border-[#E2E8F0] transition-colors">Dismiss</button>
          <button onClick={onApply} className="px-3 py-1.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded shadow-sm transition-colors flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5" /> Apply</button>
        </div>
      </div>
    </div>
  );
}

function TestCard({ status, campaign, channel, varA, varB, sig, winner, warning, daysLeft, onDeploy }) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-1 text-xs font-bold text-[#64748B] tracking-wide uppercase">
          <span className="text-purple-600 flex items-center gap-1"><PlayCircle className="w-3 h-3" /> TEST RUNNING</span>
          <span>{status}</span>
        </div>
        <h3 className="font-semibold text-[#0F172A] text-lg mb-0.5 truncate">{campaign}</h3>
        <div className="text-sm text-[#64748B] mb-5">{channel}</div>

        <div className="space-y-4 text-sm relative">
          <div className="absolute left-0 top-3 bottom-8 w-0.5 bg-[#F1F5F9]"></div>

          <div className="pl-3 relative">
            <div className="absolute w-2 h-2 rounded-full bg-[#94A3B8] -left-1 top-1.5"></div>
            <div className="flex justify-between mb-1 font-medium text-[#0F172A]">
              <span>Variant A <span className="text-xs font-normal text-[#64748B]">(50%)</span></span>
              <span className="tabular-nums">CTR {varA.ctr}</span>
            </div>
            <div className="text-xs text-[#64748B] mb-2 truncate">"{varA.name}"</div>
            <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden w-full"><div className={`h-full ${varA.barClass}`}></div></div>
          </div>

          <div className="pl-3 relative">
            <div className={`absolute w-2.5 h-2.5 rounded-full -left-1.5 top-1.5 ring-2 ring-white ${varB.lead ? 'bg-purple-500' : 'bg-[#94A3B8]'}`}></div>
            <div className="flex justify-between mb-1 font-medium text-[#0F172A]">
              <span>Variant B <span className="text-xs font-normal text-[#64748B]">(50%)</span> {varB.lead && <span className="text-[10px] ml-1 bg-purple-100 text-purple-700 px-1 py-0.5 rounded font-bold uppercase">Leading</span>}</span>
              <span className="tabular-nums">CTR {varB.ctr}</span>
            </div>
            <div className="text-xs text-[#64748B] mb-2 truncate">"{varB.name}"</div>
            <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden w-full"><div className={`h-full ${varB.barClass}`}></div></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-[#64748B]">Significance: <strong className="text-[#0F172A] text-sm">{sig} ✓</strong></span>
          <span className="text-[#64748B]">Auto-deploy: <strong className="text-[#10B981] text-sm">ON</strong></span>
        </div>
        {warning && <div className="text-xs text-amber-600 mb-3 bg-amber-50 p-1.5 rounded text-center">{warning}</div>}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="py-2 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold rounded transition-colors">Stop</button>
          <button onClick={onDeploy} className="py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded shadow-sm transition-colors">Deploy Winner</button>
        </div>
      </div>
    </div>
  );
}

function FatigueRow({ name, cmp, days, w1, now, drop, status }) {
  const isBad = status === 'bad';
  const isWarn = status === 'warn';
  return (
    <tr className={`hover:bg-[#F8FAFC] ${isBad ? 'bg-red-50/30' : ''}`}>
      <td className="px-4 py-3 font-medium text-[#0F172A]">{name}</td>
      <td className="px-4 py-3 text-[#64748B]">{cmp}</td>
      <td className="px-4 py-3 text-center font-medium text-[#0F172A]">{days}</td>
      <td className="px-4 py-3 text-right text-[#64748B]">{w1}</td>
      <td className="px-4 py-3 text-right font-medium text-[#0F172A]">{now}</td>
      <td className="px-4 py-3 text-center">
        <span className={`inline-flex items-center gap-1 font-bold ${isBad ? 'text-red-600' : isWarn ? 'text-amber-500' : 'text-green-500'}`}>
          {(isBad || isWarn) ? <TrendingDown className="w-3.5 h-3.5" /> : null}
          ↓ {drop}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        {isBad ? (
          <button className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 rounded border border-red-200">Replace</button>
        ) : isWarn ? (
          <span className="text-xs font-semibold text-amber-600 px-2 py-1 bg-amber-50 rounded">Monitor</span>
        ) : (
          <span className="text-xs font-semibold text-green-600 px-2 py-1 bg-green-50 rounded"><CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />Healthy</span>
        )}
      </td>
    </tr>
  );
}

function HistoryItem({ time, desc, user }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-24 text-xs font-semibold text-[#64748B] pt-1 shrink-0">{time}</div>
      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0 ring-4 ring-white relative z-10"></div>
      <div className="flex-1 bg-white border border-[#E2E8F0] p-3 rounded-lg flex justify-between items-center -mt-1 shadow-sm">
        <div>
          <div className="text-sm font-medium text-[#0F172A]">{desc}</div>
          <div className="text-xs text-[#64748B] mt-0.5">Applied by: <span className="font-semibold">{user}</span></div>
        </div>
        <button className="text-xs text-[#2563EB] hover:underline font-medium px-3 py-1.5 rounded hover:bg-blue-50">Revert</button>
      </div>
    </div>
  );
}
