import { useState } from 'react';
import { Bell, Smartphone, Zap, Star, Search, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { DYNAMIC_CONTENTS, RECOMMENDATION_RULES } from '../../../constants/mockData';
import Toggle from '../../ui/Toggle';

const DISPLAY_TRIGGERS = ['On app open', 'After login', 'After transaction'];
const TAP_ACTIONS = ['Open Home', 'Deep Link', 'Web URL'];
const LINE_TEMPLATES = [
  'Points expiry reminder',
  'Exclusive member offer',
  'Welcome back message',
  'Tier upgrade notification',
  'Transaction confirmation',
];

function ChannelCard({ id, icon: Icon, iconBg, iconColor, title, desc, checked, onToggle, children }) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${checked ? 'border-[#2563EB] ring-1 ring-[#2563EB]/20' : 'border-[#E2E8F0]'}`}>
      <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#F8FAFC] select-none">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${checked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}
          onClick={onToggle}
        >
          {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#0F172A] text-sm">{title}</div>
          <div className="text-xs text-[#64748B]">{desc}</div>
        </div>
        {checked ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </label>
      {checked && (
        <div className="p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-4 fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

function CharInput({ label, value, max, onChange, multiline = false }) {
  const Component = multiline ? 'textarea' : 'input';
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-end">
        <label className="text-sm font-medium text-[#0F172A]">{label}</label>
        <span className={`text-xs ${value?.length >= max * 0.9 ? 'text-amber-600 font-semibold' : 'text-[#64748B]'}`}>{value?.length || 0}/{max}</span>
      </div>
      <Component
        className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 resize-none"
        value={value || ''}
        onChange={(e) => e.target.value.length <= max && onChange(e.target.value)}
        rows={multiline ? 3 : undefined}
      />
    </div>
  );
}

function ContentLibraryPicker({ value, onChange }) {
  const [search, setSearch] = useState('');
  const published = DYNAMIC_CONTENTS.filter(dc => dc.status === 'Active' || dc.status === 'Draft');
  const filtered = published.filter(dc => dc.name.toLowerCase().includes(search.toLowerCase()));
  const selected = published.find(dc => dc.id === value);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#0F172A] block">Pick from Content Library</label>
      {selected && (
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="w-12 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded flex items-center justify-center text-white text-xs font-bold">
            {selected.type[0]}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900">{selected.name}</p>
            <p className="text-xs text-blue-600">{selected.type} · {selected.segment}</p>
          </div>
          <button onClick={() => onChange('')} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
        </div>
      )}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search content..."
          className="w-full pl-8 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:border-blue-300"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {filtered.map(dc => (
          <button
            key={dc.id}
            onClick={() => onChange(dc.id)}
            className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${value === dc.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'}`}
          >
            <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0 ${dc.type === 'Banner' ? 'bg-purple-500' : 'bg-indigo-500'}`}>
              {dc.type[0]}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{dc.name}</p>
              <p className="text-[10px] text-slate-400">{dc.type}</p>
            </div>
            {value === dc.id && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-auto" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChannelsContentStep({ data, onUpdate, errors }) {
  const isDM = data.campaignType === 'DM Delivery';
  const isLoyalty = data.campaignType === 'Loyalty Action';

  const ch = data.channels || {};
  const updateChannel = (key, val) => onUpdate({ ...data, channels: { ...ch, ...val } });
  const toggleCh = (key) => updateChannel(key, { [key]: { ...(ch[key] || {}), enabled: !(ch[key]?.enabled) } });

  return (
    <div className="space-y-6 fade-in max-w-2xl text-left">
      <div>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Channels & Content</h3>
        <p className="text-sm text-[#64748B] mb-6">
          Configure the delivery channels. At least one channel must be enabled to continue.
          {errors.channels && <span className="text-red-500 ml-2 font-semibold">{errors.channels}</span>}
        </p>
      </div>

      {/* Push Notification */}
      {isDM && (
        <ChannelCard
          id="push"
          icon={Bell}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          title="Push Notification"
          desc="Send a native alert to the user's lock screen"
          checked={!!ch.push?.enabled}
          onToggle={() => toggleCh('push')}
        >
          <CharInput
            label="Notification Title *"
            value={ch.push?.title}
            max={65}
            onChange={v => updateChannel('push', { push: { ...ch.push, title: v } })}
          />
          <CharInput
            label="Notification Body *"
            value={ch.push?.body}
            max={240}
            onChange={v => updateChannel('push', { push: { ...ch.push, body: v } })}
            multiline
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Image URL <span className="text-slate-400 font-normal">(optional)</span></label>
            <input
              type="url"
              className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              placeholder="https://..."
              value={ch.push?.imageUrl || ''}
              onChange={e => updateChannel('push', { push: { ...ch.push, imageUrl: e.target.value } })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">On Tap Action</label>
            <div className="flex gap-2">
              {TAP_ACTIONS.map(a => (
                <button
                  key={a}
                  onClick={() => updateChannel('push', { push: { ...ch.push, tapAction: a } })}
                  className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${(ch.push?.tapAction || 'Open Home') === a ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                >
                  {a}
                </button>
              ))}
            </div>
            {(ch.push?.tapAction === 'Deep Link' || ch.push?.tapAction === 'Web URL') && (
              <input
                type="text"
                className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white focus:outline-none focus:border-blue-300"
                placeholder={ch.push?.tapAction === 'Deep Link' ? 'micropay://screen/scanQRCode' : 'https://...'}
                value={ch.push?.tapUrl || ''}
                onChange={e => updateChannel('push', { push: { ...ch.push, tapUrl: e.target.value } })}
              />
            )}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div>
              <span className="text-sm font-medium text-[#0F172A]">Fallback to LINE OA</span>
              <span className="text-xs text-slate-400 block">Send LINE if push not delivered</span>
            </div>
            <Toggle
              checked={!!ch.push?.lineFallback}
              onChange={(v) => updateChannel('push', { push: { ...ch.push, lineFallback: v } })}
            />
          </div>
        </ChannelCard>
      )}

      {/* Banner / Popup */}
      {isDM && (
        <ChannelCard
          id="banner"
          icon={Smartphone}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          title="Banner / Popup"
          desc="Show a dynamic graphic inside the app"
          checked={!!ch.banner?.enabled}
          onToggle={() => toggleCh('banner')}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Content Type</label>
            <div className="flex gap-2">
              {['Banner', 'Popup'].map(t => (
                <button
                  key={t}
                  onClick={() => updateChannel('banner', { banner: { ...ch.banner, contentType: t } })}
                  className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition-all ${(ch.banner?.contentType || 'Banner') === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ContentLibraryPicker
            value={ch.banner?.contentId}
            onChange={v => updateChannel('banner', { banner: { ...ch.banner, contentId: v } })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Display Trigger</label>
            <div className="grid grid-cols-3 gap-2">
              {DISPLAY_TRIGGERS.map(t => (
                <button
                  key={t}
                  onClick={() => updateChannel('banner', { banner: { ...ch.banner, displayTrigger: t } })}
                  className={`py-2 px-2 rounded-lg border text-[11px] font-semibold transition-all text-center ${(ch.banner?.displayTrigger || 'On app open') === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </ChannelCard>
      )}

      {/* Product Recommendation */}
      {isDM && (
        <ChannelCard
          id="rec"
          icon={Zap}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          title="Product Recommendation"
          desc="Inject personalised products into standard app views"
          checked={!!ch.rec?.enabled}
          onToggle={() => toggleCh('rec')}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Recommendation Rule *</label>
            <select
              className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white focus:outline-none focus:border-blue-300"
              value={ch.rec?.ruleId || ''}
              onChange={e => updateChannel('rec', { rec: { ...ch.rec, ruleId: e.target.value } })}
            >
              <option value="">Select a rule...</option>
              {RECOMMENDATION_RULES.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0F172A]">Max items</label>
              <input
                type="number"
                className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white"
                value={ch.rec?.maxItems || '3'}
                min="1" max="10"
                onChange={e => updateChannel('rec', { rec: { ...ch.rec, maxItems: e.target.value } })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0F172A]">Placement</label>
              <select
                className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white"
                value={ch.rec?.placement || 'Home Screen'}
                onChange={e => updateChannel('rec', { rec: { ...ch.rec, placement: e.target.value } })}
              >
                {['Home Screen', 'After Login', 'Product Detail', 'Search Results'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </ChannelCard>
      )}

      {/* LINE OA */}
      {isDM && (
        <ChannelCard
          id="line"
          icon={() => <span className="text-green-600 font-black text-lg">L</span>}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          title="LINE OA"
          desc="Send a message via LINE Official Account"
          checked={!!ch.line?.enabled}
          onToggle={() => toggleCh('line')}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Message Template</label>
            <select
              className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white focus:outline-none focus:border-blue-300"
              value={ch.line?.template || ''}
              onChange={e => updateChannel('line', { line: { ...ch.line, template: e.target.value } })}
            >
              <option value="">Select template...</option>
              {LINE_TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#0F172A]">Rich Menu</span>
            <Toggle
              checked={!!ch.line?.richMenu}
              onChange={(v) => updateChannel('line', { line: { ...ch.line, richMenu: v } })}
            />
          </div>
        </ChannelCard>
      )}

      {/* Loyalty Action */}
      {isLoyalty && (
        <div className="space-y-4">
          <label className="text-sm font-medium text-[#0F172A] block">Action Type *</label>
          {['Award Points', 'Upgrade Tier', 'Assign Voucher'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer p-3 border rounded-xl hover:bg-[#F8FAFC] transition-colors border-[#E2E8F0]">
              <input
                type="radio"
                name="loyaltyType"
                value={type}
                checked={data.loyaltyAction === type}
                onChange={() => onUpdate({ ...data, loyaltyAction: type })}
                className="w-4 h-4 text-[#2563EB]"
              />
              <Star className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-[#0F172A] text-sm">{type}</span>
            </label>
          ))}

          <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
            {data.loyaltyAction === 'Award Points' && (
              <div className="grid grid-cols-2 gap-4 fade-in">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">Points to award *</label>
                  <input type="number" className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" value={data.pointsAward || ''} onChange={e => onUpdate({ ...data, pointsAward: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">Expiry (days from award)</label>
                  <input type="number" className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" value={data.pointsExpiry || '90'} onChange={e => onUpdate({ ...data, pointsExpiry: e.target.value })} />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">Reason / Label</label>
                  <input type="text" className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" placeholder="e.g. Win-back bonus — Q2 2026" value={data.pointsReason || ''} onChange={e => onUpdate({ ...data, pointsReason: e.target.value })} />
                </div>
              </div>
            )}
            {data.loyaltyAction === 'Upgrade Tier' && (
              <div className="space-y-4 fade-in">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">Upgrade to tier *</label>
                  <select className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" value={data.upgradeTier || 'Gold'} onChange={e => onUpdate({ ...data, upgradeTier: e.target.value })}>
                    {['Silver', 'Gold', 'Platinum'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={data.tierDuration !== 'until'} onChange={() => onUpdate({ ...data, tierDuration: 'permanent' })} className="w-4 h-4" /> Permanent</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={data.tierDuration === 'until'} onChange={() => onUpdate({ ...data, tierDuration: 'until' })} className="w-4 h-4" /> Until date</label>
                </div>
                {data.tierDuration === 'until' && (
                  <input type="date" className="w-1/2 rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" value={data.tierUntilDate || ''} onChange={e => onUpdate({ ...data, tierUntilDate: e.target.value })} />
                )}
              </div>
            )}
            {data.loyaltyAction === 'Assign Voucher' && (
              <div className="space-y-4 fade-in">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">Voucher *</label>
                  <select className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" value={data.voucherType || ''} onChange={e => onUpdate({ ...data, voucherType: e.target.value })}>
                    <option value="">Select voucher...</option>
                    {['฿30 Cashback', '10% Off Coffee Partner', 'Free Transfer Fee', '฿50 Cash Rebate'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#0F172A]">Qty per member</label>
                    <input type="number" className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" value={data.voucherQty || '1'} min="1" onChange={e => onUpdate({ ...data, voucherQty: e.target.value })} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#0F172A]">Expiry (days)</label>
                    <input type="number" className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white" value={data.voucherExpiry || '30'} min="1" onChange={e => onUpdate({ ...data, voucherExpiry: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
