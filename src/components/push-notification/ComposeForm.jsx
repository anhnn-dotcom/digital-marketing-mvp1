import { useState } from 'react';
import { PUSH_HISTORY } from '../../constants/mockData';
import { Send, Clock, Info, Search, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

import Input from '../ui/Input';
import Select from '../ui/Select';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';

const CAMPAIGNS = ['Gold Member Win-Back', 'Points Expiry Push', 'VIP Churn Prevention', 'KYC Completion Push'];

export default function ComposeForm({ data, onUpdate }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSend = () => {
    if (!data.title || !data.body || !data.campaign) {
      toast.error('Please fill in required fields (Campaign, Title, Body)');
      return;
    }
    setShowConfirm(true);
  };

  const confirmSend = () => {
    toast.success('Push notification successfully queued!');
    setShowConfirm(false);
  };

  const getSegmentForCampaign = (campaignName) => {
    switch(campaignName) {
      case 'Gold Member Win-Back': return 'Gold & Platinum — At Risk';
      case 'Points Expiry Push': return 'Points Expiry Alert — 30 Days';
      case 'VIP Churn Prevention': return 'VIP Churning — Priority';
      case 'KYC Completion Push': return 'Unverified KYC — Returning';
      default: return 'No campaign selected';
    }
  };

  return (
    <div className="space-y-8 w-full max-w-2xl fade-in">
      
      {/* Target */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">1. Target Audience</h3>
        
        <Select 
          label="Campaign*"
          options={['', ...CAMPAIGNS]}
          value={data.campaign}
          onChange={(e) => onUpdate({ ...data, campaign: e.target.value })}
        />

        {data.campaign && (
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] animate-in fade-in slide-in-from-top-1">
            <div className="text-sm font-medium text-[#0F172A] mb-1">Target Segment</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">
                {getSegmentForCampaign(data.campaign)}
              </span>
            </div>
            <div className="text-xs text-[#64748B] flex items-center gap-1.5 mt-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span>3,847 members · ~3,412 with push enabled (88.4%)</span>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium text-[#0F172A]">Send to:</label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="radio" className="peer sr-only" checked={data.sendTo === 'all'} onChange={() => onUpdate({ ...data, sendTo: 'all' })} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <span className="text-sm text-[#475569]">All members</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="radio" className="peer sr-only" checked={data.sendTo === 'pushEnabled'} onChange={() => onUpdate({ ...data, sendTo: 'pushEnabled' })} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <span className="text-sm text-[#475569]">Members with push enabled only</span>
          </label>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">2. Message Content</h3>
        
        <div className="space-y-1">
          <Input 
            label="Title*"
            value={data.title}
            onChange={(e) => {
              if (e.target.value.length <= 65) onUpdate({ ...data, title: e.target.value });
            }}
            placeholder="e.g. Your points expire in 3 days!"
          />
          <div className="text-right text-xs text-[#64748B] mt-1 pr-1">{data.title.length}/65</div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium text-[#0F172A]">Body*</label>
          <textarea
            className="flex w-full rounded-md border border-[#E2E8F0] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 min-h-[100px] resize-y bg-white text-[#0F172A]"
            placeholder="e.g. You have 2,450 points expiring on Mar 31. Redeem now..."
            value={data.body}
            onChange={(e) => {
              if (e.target.value.length <= 240) onUpdate({ ...data, body: e.target.value });
            }}
          />
          <div className="text-right text-xs text-[#64748B] mt-1 pr-1">{data.body.length}/240</div>
        </div>

        <Input 
          label="Image (optional)"
          value={data.imageUrl}
          onChange={(e) => onUpdate({ ...data, imageUrl: e.target.value })}
          placeholder="https://..."
        />
        <p className="text-xs text-[#64748B] -mt-3">Recommended: 1200×628px JPG/PNG</p>

        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4 mt-2">
          <label className="text-sm font-medium text-[#0F172A]">Show app icon badge</label>
          <Toggle checked={data.showBadge} onChange={(v) => onUpdate({ ...data, showBadge: v })} />
        </div>
      </section>

      {/* Action */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">3. On Tap Action</h3>
        
        <div className="space-y-4 pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" checked={data.actionType === 'Open app home'} onChange={() => onUpdate({ ...data, actionType: 'Open app home' })} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <span className="text-sm text-[#475569] pt-0.5">Open app home</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" checked={data.actionType === 'Deep link'} onChange={() => onUpdate({ ...data, actionType: 'Deep link' })} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <div className="flex-1 space-y-2 pt-0.5">
              <span className="text-sm text-[#475569]">Deep link</span>
              {data.actionType === 'Deep link' && (
                <div className="animate-in fade-in slide-in-from-top-1">
                  <Select 
                    options={['notifications', 'scanQRCode', 'registerMerchant', 'transferToBank', 'point']}
                    value={data.actionValue}
                    onChange={(e) => onUpdate({ ...data, actionValue: e.target.value })}
                  />
                </div>
              )}
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" checked={data.actionType === 'URL'} onChange={() => onUpdate({ ...data, actionType: 'URL' })} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <div className="flex-1 space-y-2 pt-0.5">
              <span className="text-sm text-[#475569]">Web URL</span>
              {data.actionType === 'URL' && (
                <div className="animate-in fade-in slide-in-from-top-1">
                  <Input 
                    value={data.actionValue}
                    onChange={(e) => onUpdate({ ...data, actionValue: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              )}
            </div>
          </label>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">4. Schedule</h3>
        
        <div className="space-y-4 pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" checked={data.scheduleType === 'immediately'} onChange={() => onUpdate({ ...data, scheduleType: 'immediately' })} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <span className="text-sm text-[#475569] pt-0.5">Send immediately</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" checked={data.scheduleType === 'later'} onChange={() => onUpdate({ ...data, scheduleType: 'later' })} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <div className="flex-1 space-y-3 pt-0.5">
              <span className="text-sm text-[#475569]">Schedule for later</span>
              {data.scheduleType === 'later' && (
                <div className="animate-in fade-in slide-in-from-top-1 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#64748B]" />
                    <span className="text-sm font-medium text-[#0F172A]">Mar 25, 2026</span>
                    <span className="text-[#E2E8F0]">|</span>
                    <span className="text-sm font-medium text-[#0F172A]">09:00</span>
                  </div>
                  <span className="text-xs text-[#64748B]">ICT</span>
                </div>
              )}
            </div>
          </label>
        </div>

        <div className="pt-4 border-t border-[#E2E8F0]">
          <Button className="w-full justify-center h-12" onClick={handleSend}>
             {data.scheduleType === 'later' ? (
               <><Clock className="w-4 h-4 mr-2" /> Schedule Notification</>
             ) : (
               <><Send className="w-4 h-4 mr-2" /> Send Now</>
             )}
          </Button>
        </div>
      </section>

      {/* History */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <h3 className="text-base font-bold text-[#0F172A] p-6 pb-2">Recent Broadcasts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-y border-[#E2E8F0] text-[#64748B]">
              <tr>
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium text-right">Sent</th>
                <th className="px-6 py-3 font-medium text-right">Delivered</th>
                <th className="px-6 py-3 font-medium text-right">Failed</th>
                <th className="px-6 py-3 font-medium text-right">Open Rate</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {PUSH_HISTORY.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer group">
                  <td className="px-6 py-4 font-medium text-[#0F172A] flex items-center gap-2">
                    {row.campaign}
                    <ChevronRight className="w-4 h-4 text-transparent group-hover:text-blue-500 transition-colors" />
                  </td>
                  <td className="px-6 py-4 text-right text-[#475569]">{row.sent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-[#10B981] font-medium">{row.delivered.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-[#EF4444] font-medium">{row.failed}</td>
                  <td className="px-6 py-4 text-right font-medium text-[#0F172A]">{row.openRate}</td>
                  <td className="px-6 py-4 text-[#64748B] text-xs">{row.sentAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">Confirm Send</h2>
              <p className="text-[#475569] mb-1">
                Send push notification to <strong>3,412</strong> members now?
              </p>
              <p className="text-sm font-medium text-red-500">This cannot be undone.</p>
            </div>
            <div className="bg-[#F8FAFC] p-4 border-t border-[#E2E8F0] flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button className="bg-[#2563EB]" onClick={confirmSend}>Confirm Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
