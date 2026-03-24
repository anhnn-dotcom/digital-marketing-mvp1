import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Users, Database, X, AlertTriangle, RefreshCw } from 'lucide-react';
import { SEGMENTS } from '../../../constants/mockData';
import Input from '../../ui/Input';
import Toggle from '../../ui/Toggle';

const DAYS_LABEL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const SCHEDULE_TYPES = ['One-time', 'Daily', 'Weekly', 'Monthly'];

// Detect if two segments have overlap > 20% (mock logic based on names)
function hasOverlap(seg1, seg2) {
  const smaller = Math.min(seg1.memberCount, seg2.memberCount);
  const overlap = smaller * 0.22; // mock 22% overlap for demo
  return overlap / smaller > 0.2;
}

function computeNextRuns(data, count = 5) {
  const runs = [];
  if (!data.startDate) return runs;
  const start = new Date(data.startDate);
  const time = data.startTime || '09:00';
  let cur = new Date(start);
  const [hh, mm] = time.split(':');
  cur.setHours(parseInt(hh), parseInt(mm), 0, 0);

  for (let i = 0; i < count; i++) {
    if (data.scheduleType === 'One-time') {
      if (i === 0) runs.push(new Date(cur));
      else break;
    } else if (data.scheduleType === 'Daily') {
      const d = new Date(cur);
      d.setDate(d.getDate() + i);
      runs.push(d);
    } else if (data.scheduleType === 'Weekly') {
      const d = new Date(cur);
      d.setDate(d.getDate() + i * 7);
      runs.push(d);
    } else if (data.scheduleType === 'Monthly') {
      const d = new Date(cur);
      d.setMonth(d.getMonth() + i);
      runs.push(d);
    }
  }
  return runs;
}

export default function TargetScheduleStep({ data, onUpdate, errors }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRunTime, setNewRunTime] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedSegments = (data.segmentIds || []).map(id => SEGMENTS.find(s => s.id === id)).filter(Boolean);
  const filteredSegs = SEGMENTS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleSegment = (segId) => {
    const current = data.segmentIds || [];
    const updated = current.includes(segId) ? current.filter(id => id !== segId) : [...current, segId];
    onUpdate({ ...data, segmentIds: updated });
  };

  const totalReach = selectedSegments.reduce((sum, s) => sum + s.memberCount, 0);

  // Check pairwise overlap warnings
  const overlapWarnings = [];
  for (let i = 0; i < selectedSegments.length; i++) {
    for (let j = i + 1; j < selectedSegments.length; j++) {
      if (hasOverlap(selectedSegments[i], selectedSegments[j])) {
        overlapWarnings.push(`${selectedSegments[i].name} & ${selectedSegments[j].name}`);
      }
    }
  }

  const addRunTime = () => {
    if (newRunTime && !(data.runTimes || []).includes(newRunTime)) {
      onUpdate({ ...data, runTimes: [...(data.runTimes || []), newRunTime].sort() });
    }
    setNewRunTime('');
  };
  const removeRunTime = (t) => onUpdate({ ...data, runTimes: (data.runTimes || []).filter(x => x !== t) });
  const toggleDay = (i) => {
    const days = data.repeatDays || [];
    onUpdate({ ...data, repeatDays: days.includes(i) ? days.filter(d => d !== i) : [...days, i] });
  };

  const nextRuns = computeNextRuns(data);
  const scheduleType = data.scheduleType || 'One-time';

  return (
    <div className="flex gap-8 fade-in text-left">
      <div className="flex-1 space-y-6 min-w-0">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Target & Schedule</h3>
          <p className="text-sm text-[#64748B] mb-6">Select your audience segments, dates, and delivery schedule.</p>
        </div>

        {/* Segment multi-select */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Target Segments * <span className="text-xs font-normal text-slate-400">(multi-select)</span></label>
            {selectedSegments.length > 0 && (
              <span className="text-xs text-blue-600 font-medium">
                {selectedSegments.length} segment{selectedSegments.length > 1 ? 's' : ''} · ~{new Intl.NumberFormat('en-US').format(totalReach)} est. reach
              </span>
            )}
          </div>

          {/* Selected pills */}
          {selectedSegments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedSegments.map(seg => (
                <span key={seg.id} className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Users className="w-3 h-3" />
                  {seg.name}
                  <span className="text-blue-500 font-normal">({new Intl.NumberFormat('en-US').format(seg.memberCount)})</span>
                  <button onClick={() => toggleSegment(seg.id)} className="hover:text-red-500 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          )}

          {/* Dropdown trigger */}
          <div className="relative" ref={dropdownRef}>
            <div
              className={`border rounded-lg p-3 cursor-pointer bg-white flex justify-between items-center hover:border-blue-400 transition-colors ${errors.segmentIds ? 'border-red-500' : 'border-[#E2E8F0]'} ${dropdownOpen ? 'border-blue-400 ring-1 ring-blue-100' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-sm text-[#94A3B8]">Search and add segments...</span>
              <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] shadow-xl rounded-xl z-20 max-h-72 overflow-y-auto">
                <div className="p-2 sticky top-0 bg-white border-b border-[#E2E8F0]">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search segments..."
                    className="w-full text-sm border border-[#E2E8F0] rounded-md p-2 outline-none focus:border-blue-300"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                {filteredSegs.length === 0 && <div className="p-4 text-sm text-slate-400 text-center">No segments found</div>}
                {filteredSegs.map(seg => {
                  const isSelected = (data.segmentIds || []).includes(seg.id);
                  return (
                    <div
                      key={seg.id}
                      className={`p-3 cursor-pointer border-b border-[#F1F5F9] transition-colors flex items-start gap-3 ${isSelected ? 'bg-blue-50' : 'hover:bg-[#F8FAFC]'}`}
                      onClick={() => toggleSegment(seg.id)}
                    >
                      <div className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                        {isSelected && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-[#0F172A] truncate">{seg.name}</span>
                          <span className="text-xs text-[#64748B] flex items-center shrink-0 ml-2">
                            <Users className="w-3 h-3 mr-1" />{new Intl.NumberFormat('en-US').format(seg.memberCount)}
                          </span>
                        </div>
                        <div className="flex gap-1 flex-wrap mt-1">
                          {seg.datasets.map(ds => (
                            <span key={ds} className="text-[10px] bg-[#E2E8F0] text-[#475569] px-1.5 py-0.5 rounded flex items-center">
                              <Database className="w-2.5 h-2.5 mr-1" />{ds}
                            </span>
                          ))}
                          <span className="text-[10px] text-slate-400 ml-1">· sync {seg.lastSync}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {errors.segmentIds && <span className="text-xs text-red-500 mt-1 block">{errors.segmentIds}</span>}

          {/* Overlap warning */}
          {overlapWarnings.length > 0 && (
            <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <span className="font-semibold">Audience overlap detected (&gt;20%):</span>{' '}
                {overlapWarnings.join(' · ')}. Members in both segments will only receive the message once.
              </div>
            </div>
          )}

          {/* Audience Logic (only when 2+ segments) */}
          {selectedSegments.length >= 2 && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-slate-600 font-medium">Audience Logic:</span>
              {['Union (OR)', 'Intersection (AND)'].map(opt => (
                <button
                  key={opt}
                  onClick={() => onUpdate({ ...data, audienceLogic: opt.split(' ')[0] })}
                  className={`px-3 py-1 rounded-md text-xs font-semibold border transition-all ${(data.audienceLogic || 'Union') === opt.split(' ')[0] ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                >
                  {opt}
                </button>
              ))}
              <span className="text-xs text-slate-400">
                {(data.audienceLogic || 'Union') === 'Union' ? 'All members across all segments' : 'Only members in ALL segments'}
              </span>
            </div>
          )}
        </div>

        {/* Date range */}
        <div className="pt-4 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-3 gap-4">
            <Input
              type="date"
              label="Start Date *"
              min={new Date().toISOString().split('T')[0]}
              value={data.startDate || ''}
              onChange={(e) => onUpdate({ ...data, startDate: e.target.value })}
              error={errors.startDate}
            />
            <Input
              type="time"
              label="Start Time *"
              value={data.startTime || '09:00'}
              onChange={(e) => onUpdate({ ...data, startTime: e.target.value })}
            />
            <div>
              <Input
                type="date"
                label="End Date *"
                min={data.startDate || new Date().toISOString().split('T')[0]}
                value={data.endDate || ''}
                onChange={(e) => onUpdate({ ...data, endDate: e.target.value })}
                error={errors.endDate}
              />
              <span className="text-xs text-[#64748B] block mt-1">Required to launch</span>
            </div>
          </div>
        </div>

        {/* Schedule type */}
        <div className="pt-4 border-t border-[#E2E8F0]">
          <label className="text-sm font-medium text-[#0F172A] block mb-3">Schedule Type</label>
          <div className="grid grid-cols-4 gap-2">
            {SCHEDULE_TYPES.map(type => (
              <button
                key={type}
                onClick={() => onUpdate({ ...data, scheduleType: type })}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${scheduleType === type ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">Event-triggered scheduling is available in Phase 2.</p>

          {/* Weekly day picker */}
          {scheduleType === 'Weekly' && (
            <div className="mt-3 fade-in">
              <label className="text-xs font-medium text-slate-600 block mb-2">On days</label>
              <div className="flex gap-2">
                {DAYS_SHORT.map((d, i) => {
                  const sel = (data.repeatDays || []).includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleDay(i)}
                      title={DAYS_LABEL[i]}
                      className={`w-9 h-9 rounded-full text-xs font-semibold transition-all ${sel ? 'bg-blue-600 text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-blue-300'}`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Monthly day */}
          {scheduleType === 'Monthly' && (
            <div className="mt-3 w-1/3 fade-in">
              <Input
                type="number"
                label="On day of month"
                value={data.repeatMonthDay || '1'}
                onChange={(e) => onUpdate({ ...data, repeatMonthDay: e.target.value })}
                min="1" max="31"
              />
            </div>
          )}
        </div>

        {/* Multiple run times toggle */}
        {scheduleType !== 'One-time' && (
          <div className="pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-medium text-[#0F172A] block">Multiple send times per day</span>
                <span className="text-xs text-[#64748B]">Send at specific times on scheduled days</span>
              </div>
              <Toggle
                checked={!!data.multipleRunTimes}
                onChange={(v) => onUpdate({ ...data, multipleRunTimes: v })}
              />
            </div>
            {data.multipleRunTimes && (
              <div className="flex flex-wrap gap-2 items-center min-h-[42px] p-2 border border-[#E2E8F0] rounded-lg bg-white fade-in">
                {(data.runTimes || []).map(t => (
                  <div key={t} className="flex items-center bg-[#F1F5F9] text-[#0F172A] text-sm font-medium px-2 py-1 rounded">
                    {t}
                    <button onClick={() => removeRunTime(t)} className="ml-1.5 text-[#94A3B8] hover:text-red-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center ml-2 gap-2">
                  <input
                    type="time"
                    value={newRunTime}
                    onChange={(e) => setNewRunTime(e.target.value)}
                    className="text-sm bg-transparent border border-slate-200 rounded p-1 outline-none focus:border-blue-300 w-[110px]"
                  />
                  <button onClick={addRunTime} disabled={!newRunTime} className="text-sm font-medium text-blue-600 disabled:text-slate-300 hover:text-blue-800">
                    + Add
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Frequency cap override */}
        <div className="pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm font-medium text-[#0F172A] block">Frequency Cap Override</span>
              <span className="text-xs text-[#64748B]">Global cap: 2/day, 5/week per member</span>
            </div>
            <Toggle
              checked={!!data.freqCapOverride}
              onChange={(v) => onUpdate({ ...data, freqCapOverride: v })}
            />
          </div>
          {data.freqCapOverride && (
            <div className="grid grid-cols-2 gap-4 fade-in">
              <Input
                type="number"
                label="Max messages/day for this campaign"
                value={data.freqCapMax || '3'}
                onChange={(e) => onUpdate({ ...data, freqCapMax: e.target.value })}
                min="1" max="10"
              />
              <div className="flex items-end pb-1">
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                  Override only applies to this campaign. Global cap remains as the hard ceiling.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Schedule Preview */}
      <div className="w-[280px] shrink-0">
        <div className="border border-[#E2E8F0] rounded-xl p-5 bg-[#F8FAFC] sticky top-4">
          <h4 className="text-sm font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-500" /> Schedule Preview
          </h4>

          {selectedSegments.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">Estimated Reach</p>
              <p className="text-xl font-bold text-blue-900">{new Intl.NumberFormat('en-US').format(totalReach)}</p>
              <p className="text-xs text-blue-600">{selectedSegments.length} segment{selectedSegments.length > 1 ? 's' : ''} combined</p>
            </div>
          )}

          <span className="text-xs font-semibold text-[#64748B] block mb-2 uppercase tracking-wider">
            {nextRuns.length > 0 ? 'Next runs:' : 'Set start date to preview'}
          </span>
          <ul className="space-y-2 mb-4">
            {nextRuns.map((d, i) => (
              <li key={i} className="text-sm flex items-center text-[#0F172A]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2 shrink-0" />
                <span>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="mx-1 text-[#94A3B8]">·</span>
                <span className="text-slate-500">{d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </li>
            ))}
          </ul>

          {data.endDate && (
            <div className="pt-3 border-t border-[#E2E8F0] text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#64748B]">End date:</span>
                <span className="font-medium">{new Date(data.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Type:</span>
                <span className="font-medium">{scheduleType}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
