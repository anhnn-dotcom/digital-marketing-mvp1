import { MessageSquare, Mail, Bell, Gift, Smartphone, Zap } from 'lucide-react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';

export default function DeliveryStep({ data, onUpdate, errors }) {
  const toggleChannel = (channelId) => {
    onUpdate({
      ...data,
      channels: data.channels.includes(channelId)
        ? data.channels.filter(id => id !== channelId)
        : [...data.channels, channelId]
    });
  };

  const isDM = data.campaignType === 'DM Delivery';

  return (
    <div className="space-y-6 fade-in max-w-2xl text-left">
      <div>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
          {isDM ? 'Delivery Configuration' : 'Loyalty Action Configuration'}
        </h3>
        <p className="text-sm text-[#64748B] mb-6">
          {isDM ? "Configure where and what your members will see." : "Configure the action and reward for this campaign."}
        </p>
      </div>

      {isDM ? (
        <div className="space-y-4">
          <label className="text-sm font-medium text-[#0F172A] flex items-center justify-between">
            Delivery channels
            {errors.channels && <span className="text-xs text-red-500 font-normal">Select at least one channel</span>}
          </label>

          {/* Push Notification */}
          <div className={`border rounded-xl overflow-hidden transition-all ${data.channels.includes('push') ? 'border-[#2563EB] ring-1 ring-[#2563EB]' : 'border-[#E2E8F0]'}`}>
            <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#F8FAFC]">
              <input 
                type="checkbox" 
                checked={data.channels.includes('push')}
                onChange={() => toggleChannel('push')}
                className="w-5 h-5 text-[#2563EB] rounded"
              />
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB]">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#0F172A]">Push Notification</div>
                <div className="text-xs text-[#64748B]">Send a native alert to user's device</div>
              </div>
            </label>
            {data.channels.includes('push') && (
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-4 fade-in">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Notification Title *</label>
                    <span className="text-xs text-[#64748B]">{(data.pushTitle || '').length}/65</span>
                  </div>
                  <input 
                    type="text" 
                    className="flex w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white"
                    value={data.pushTitle || ''} 
                    onChange={e => e.target.value.length <= 65 && onUpdate({ ...data, pushTitle: e.target.value })} 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Notification Body *</label>
                    <span className="text-xs text-[#64748B]">{(data.pushBody || '').length}/240</span>
                  </div>
                  <textarea 
                    className="flex w-full rounded-md border border-[#E2E8F0] p-2.5 text-sm bg-white resize-none" rows="3"
                    value={data.pushBody || ''} 
                    onChange={e => e.target.value.length <= 240 && onUpdate({ ...data, pushBody: e.target.value })} 
                  />
                </div>
                <Select 
                  label="On tap action"
                  options={['Open App', 'Deep link', 'URL']}
                  value={data.pushAction || 'Open App'}
                  onChange={e => onUpdate({ ...data, pushAction: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Popup / Banner */}
          <div className={`border rounded-xl overflow-hidden transition-all ${data.channels.includes('popup') ? 'border-[#2563EB] ring-1 ring-[#2563EB]' : 'border-[#E2E8F0]'}`}>
            <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#F8FAFC]">
              <input 
                type="checkbox" 
                checked={data.channels.includes('popup')}
                onChange={() => toggleChannel('popup')}
                className="w-5 h-5 text-[#2563EB] rounded"
              />
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#0F172A]">Popup / Banner</div>
                <div className="text-xs text-[#64748B]">Show a dynamic graphic inside the app</div>
              </div>
            </label>
            {data.channels.includes('popup') && (
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-4 fade-in">
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-md flex flex-col items-center justify-center text-center">
                  <span className="text-sm text-[#0F172A] mb-1">No content yet.</span>
                  <button className="text-sm font-medium text-[#2563EB] hover:underline">Create Dynamic Content first →</button>
                </div>
              </div>
            )}
          </div>

          {/* Product Recommendation */}
          <div className={`border rounded-xl overflow-hidden transition-all ${data.channels.includes('recommendation') ? 'border-[#2563EB] ring-1 ring-[#2563EB]' : 'border-[#E2E8F0]'}`}>
            <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#F8FAFC]">
              <input 
                type="checkbox" 
                checked={data.channels.includes('recommendation')}
                onChange={() => toggleChannel('recommendation')}
                className="w-5 h-5 text-[#2563EB] rounded"
              />
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#0F172A]">Product Recommendation</div>
                <div className="text-xs text-[#64748B]">Inject tailored products into standard views</div>
              </div>
            </label>
            {data.channels.includes('recommendation') && (
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-4 fade-in">
                <Select 
                  label="Recommendation Rule *"
                  options={['Trending Loan Products', 'High Yield Interest Deals']}
                  value={data.recRule || 'Trending Loan Products'}
                  onChange={e => onUpdate({ ...data, recRule: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    type="number" label="Max items to show" min="1" max="10"
                    value={data.recMax || '3'} onChange={e => onUpdate({ ...data, recMax: e.target.value })}
                  />
                  <Select 
                    label="Placement"
                    options={['Home Screen', 'After Login', 'Product Detail', 'Search Results']}
                    value={data.recPlace || 'Home Screen'}
                    onChange={e => onUpdate({ ...data, recPlace: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
           <label className="text-sm font-medium text-[#0F172A] block">Action type *</label>

           <div className="flex flex-col gap-3">
             {['Award Points', 'Upgrade Tier', 'Assign Reward Voucher'].map(type => (
               <label key={type} className="flex items-center gap-3 cursor-pointer p-3 border rounded-xl hover:bg-[#F8FAFC] transition-colors border-[#E2E8F0]">
                 <input 
                   type="radio" name="loyaltyType" value={type}
                   checked={data.loyaltyAction === type}
                   onChange={() => onUpdate({ ...data, loyaltyAction: type })}
                   className="w-5 h-5 text-[#2563EB]"
                 />
                 <span className="font-medium text-[#0F172A]">{type}</span>
               </label>
             ))}
           </div>

           <div className="pt-6 border-t border-[#E2E8F0]">
             {data.loyaltyAction === 'Award Points' && (
               <div className="grid grid-cols-2 gap-4 fade-in">
                 <Input type="number" label="Points to award *" value={data.pointsAward || ''} onChange={e => onUpdate({...data, pointsAward: e.target.value})} />
                 <Input type="number" label="Points expiry (days from award)" value={data.pointsExpiry || '90'} onChange={e => onUpdate({...data, pointsExpiry: e.target.value})} />
                 <div className="col-span-2">
                   <Input label="Reason / Label" placeholder="e.g. Win-back bonus — March 2026" value={data.pointsReason || ''} onChange={e => onUpdate({...data, pointsReason: e.target.value})} />
                 </div>
               </div>
             )}

             {data.loyaltyAction === 'Upgrade Tier' && (
               <div className="space-y-4 fade-in">
                 <Select label="Upgrade to tier *" options={['Silver', 'Gold', 'Platinum']} value={data.upgradeTier || 'Gold'} onChange={e => onUpdate({...data, upgradeTier: e.target.value})} />
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Duration</label>
                   <div className="flex items-center gap-4">
                     <label className="flex items-center gap-2"><input type="radio" checked={data.tierDuration !== 'until'} onChange={() => onUpdate({...data, tierDuration: 'permanent'})} /> Permanent</label>
                     <label className="flex items-center gap-2"><input type="radio" checked={data.tierDuration === 'until'} onChange={() => onUpdate({...data, tierDuration: 'until'})} /> Until Date</label>
                   </div>
                   {data.tierDuration === 'until' && <div className="mt-2 w-1/2"><Input type="date" value={data.tierUntilDate || ''} onChange={e => onUpdate({...data, tierUntilDate: e.target.value})} /></div>}
                 </div>
                 <p className="text-xs text-[#64748B]">Members already at or above selected tier will be skipped</p>
               </div>
             )}

             {data.loyaltyAction === 'Assign Reward Voucher' && (
               <div className="grid grid-cols-2 gap-4 fade-in">
                 <div className="col-span-2">
                   <Select label="Voucher / Reward *" options={['10% Off Coffee', 'Free Delivery', '$50 Cash Rebate']} value={data.voucherType || '10% Off Coffee'} onChange={e => onUpdate({...data, voucherType: e.target.value})} />
                 </div>
                 <Input type="number" label="Quantity per member" value={data.voucherQty || '1'} onChange={e => onUpdate({...data, voucherQty: e.target.value})} />
                 <Input type="number" label="Expiry (days from assignment)" value={data.voucherExpiry || '30'} onChange={e => onUpdate({...data, voucherExpiry: e.target.value})} />
               </div>
             )}
           </div>
        </div>
      )}
    </div>
  );
}
