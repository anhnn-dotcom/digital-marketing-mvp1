import { CheckCircle2, Bell, Smartphone, Zap, Star, AlertTriangle, CalendarDays } from 'lucide-react';
import { SEGMENTS } from '../../../constants/mockData';

const CHANNEL_META = {
  push:   { label: 'Push Notification', icon: Bell,       color: 'text-blue-600',    bg: 'bg-blue-50'   },
  banner: { label: 'Banner / Popup',    icon: Smartphone, color: 'text-indigo-600',  bg: 'bg-indigo-50' },
  rec:    { label: 'Recommendation',    icon: Zap,        color: 'text-emerald-600', bg: 'bg-emerald-50'},
  line:   { label: 'LINE OA',           icon: () => <span className="font-black text-green-600 text-sm">L</span>, color: 'text-green-600', bg: 'bg-green-50' },
};

function ReviewRow({ label, children }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-[#F1F5F9] last:border-0">
      <span className="text-sm text-[#64748B] w-36 shrink-0">{label}</span>
      <div className="text-sm font-medium text-[#0F172A] flex-1">{children}</div>
    </div>
  );
}

export default function ReviewLaunchStep({ data, onSaveDraft, onSchedule, onLaunch }) {
  const ch = data.channels || {};
  const enabledChannels = Object.entries(ch).filter(([, v]) => v?.enabled).map(([k]) => k);
  const selectedSegments = (data.segmentIds || []).map(id => SEGMENTS.find(s => s.id === id)).filter(Boolean);
  const totalReach = selectedSegments.reduce((sum, s) => sum + s.memberCount, 0);

  // Overlap warning (simple: if 2+ segments)
  const hasOverlap = selectedSegments.length >= 2;

  // Validation checks
  const canLaunch = data.endDate && enabledChannels.length > 0 && selectedSegments.length > 0 && data.name?.trim();

  const scheduleDesc = (() => {
    const type = data.scheduleType || 'One-time';
    const time = data.startTime || '09:00';
    const start = data.startDate ? new Date(data.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
    const end = data.endDate ? new Date(data.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
    return `${type} · ${start} at ${time} → ${end}`;
  })();

  return (
    <div className="space-y-6 fade-in max-w-2xl text-left">
      <div>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Review & Launch</h3>
        <p className="text-sm text-[#64748B] mb-6">Review your campaign configuration before going live.</p>
      </div>

      {/* Summary card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h4 className="text-white font-bold text-base">{data.name || 'Untitled Campaign'}</h4>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-blue-100 text-xs">{data.code}</span>
            <span className="w-1 h-1 bg-blue-300 rounded-full" />
            <span className="text-blue-100 text-xs">{data.campaignType}</span>
            {data.category && <>
              <span className="w-1 h-1 bg-blue-300 rounded-full" />
              <span className="text-blue-100 text-xs">{data.category}</span>
            </>}
          </div>
        </div>
        <div className="p-5 divide-y divide-[#F1F5F9]">
          <ReviewRow label="Description">{data.description || <span className="text-slate-400">No description</span>}</ReviewRow>
          <ReviewRow label="Audience">
            <div className="space-y-1">
              {selectedSegments.length === 0
                ? <span className="text-red-500">No segment selected</span>
                : selectedSegments.map(s => (
                    <div key={s.id} className="flex items-center gap-2">
                      <span>{s.name}</span>
                      <span className="text-slate-400 text-xs">({new Intl.NumberFormat('en-US').format(s.memberCount)} members)</span>
                    </div>
                  ))
              }
              {selectedSegments.length > 1 && (
                <div className="text-xs text-slate-500 mt-1">
                  Logic: <strong>{data.audienceLogic || 'Union'}</strong> · Est. total reach: <strong>{new Intl.NumberFormat('en-US').format(totalReach)}</strong>
                </div>
              )}
            </div>
          </ReviewRow>
          <ReviewRow label="Schedule">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              {scheduleDesc}
            </div>
          </ReviewRow>
          <ReviewRow label="Freq. Cap">
            {data.freqCapOverride ? `Custom: max ${data.freqCapMax || 3}/day` : 'Global default (2/day, 5/week)'}
          </ReviewRow>
          <ReviewRow label="Channels">
            {enabledChannels.length === 0
              ? <span className="text-red-500">No channels configured</span>
              : (
                <div className="flex flex-wrap gap-2">
                  {enabledChannels.map(k => {
                    const meta = CHANNEL_META[k];
                    if (!meta) return null;
                    const Icon = meta.icon;
                    return (
                      <span key={k} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.bg} ${meta.color}`}>
                        <Icon className="w-3 h-3" />
                        {meta.label}
                      </span>
                    );
                  })}
                </div>
              )
            }
          </ReviewRow>
          {data.tags?.length > 0 && (
            <ReviewRow label="Tags">
              <div className="flex flex-wrap gap-1.5">
                {data.tags.map(t => (
                  <span key={t} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </ReviewRow>
          )}
        </div>
      </div>

      {/* Channel configs summary */}
      {enabledChannels.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Channel Configuration</h4>
          {ch.push?.enabled && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-blue-800"><Bell className="w-4 h-4" /> Push Notification</div>
              <p className="text-xs text-blue-700"><strong>Title:</strong> {ch.push.title || '—'}</p>
              <p className="text-xs text-blue-700 mt-1"><strong>Body:</strong> {ch.push.body || '—'}</p>
              <p className="text-xs text-blue-600 mt-1">On tap: {ch.push.tapAction || 'Open Home'} · Fallback LINE: {ch.push.lineFallback ? 'Yes' : 'No'}</p>
            </div>
          )}
          {ch.banner?.enabled && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-indigo-800"><Smartphone className="w-4 h-4" /> {ch.banner.contentType || 'Banner'} / Popup</div>
              <p className="text-xs text-indigo-700">Content selected: {ch.banner.contentId ? '✓ Picked from library' : <span className="text-amber-600">Not selected</span>}</p>
              <p className="text-xs text-indigo-600 mt-1">Trigger: {ch.banner.displayTrigger || 'On app open'}</p>
            </div>
          )}
          {ch.rec?.enabled && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-emerald-800"><Zap className="w-4 h-4" /> Product Recommendation</div>
              <p className="text-xs text-emerald-700">Rule: {ch.rec.ruleId || '—'} · Max items: {ch.rec.maxItems || 3} · Placement: {ch.rec.placement || 'Home Screen'}</p>
            </div>
          )}
          {ch.line?.enabled && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-green-800"><span className="font-black">L</span> LINE OA</div>
              <p className="text-xs text-green-700">Template: {ch.line.template || '—'} · Rich menu: {ch.line.richMenu ? 'Yes' : 'No'}</p>
            </div>
          )}
          {data.loyaltyAction && data.campaignType === 'Loyalty Action' && (
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-purple-800"><Star className="w-4 h-4" /> {data.loyaltyAction}</div>
              {data.loyaltyAction === 'Award Points' && <p className="text-xs text-purple-700">Points: {data.pointsAward || '—'} · Expiry: {data.pointsExpiry || 90}d · Reason: {data.pointsReason || '—'}</p>}
              {data.loyaltyAction === 'Upgrade Tier' && <p className="text-xs text-purple-700">Target: {data.upgradeTier || 'Gold'} · Duration: {data.tierDuration === 'until' ? `Until ${data.tierUntilDate || '—'}` : 'Permanent'}</p>}
              {data.loyaltyAction === 'Assign Voucher' && <p className="text-xs text-purple-700">Voucher: {data.voucherType || '—'} · Qty: {data.voucherQty || 1} · Expiry: {data.voucherExpiry || 30}d</p>}
            </div>
          )}
        </div>
      )}

      {/* Warnings */}
      {!data.endDate && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700"><strong>End Date is required</strong> — go back to Step 2 to set it before launching.</p>
        </div>
      )}
      {hasOverlap && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800">Audience overlap detected. Deduplication will be applied automatically — each member receives at most 1 message per send.</p>
        </div>
      )}
      {selectedSegments.length > 0 && (
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
          <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
          Estimated frequency per member: <strong className="ml-1">{data.scheduleType === 'One-time' ? '1 message' : `~${data.freqCapOverride ? data.freqCapMax : 2}/day (capped)`}</strong>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0]">
        <button
          onClick={onSaveDraft}
          className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Save as Draft
        </button>
        <button
          onClick={onSchedule}
          disabled={!canLaunch}
          className="px-5 py-2.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Schedule
        </button>
        <button
          onClick={onLaunch}
          disabled={!canLaunch}
          className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Launch Now
        </button>
        {!canLaunch && (
          <span className="text-xs text-red-500 ml-2">
            {!data.name?.trim() ? 'Campaign name required · ' : ''}
            {!data.endDate ? 'End date required · ' : ''}
            {enabledChannels.length === 0 ? 'Select at least one channel · ' : ''}
            {selectedSegments.length === 0 ? 'Select a segment' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
