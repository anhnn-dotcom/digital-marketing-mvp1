import { Megaphone, Star } from 'lucide-react';
import Input from '../../ui/Input';

export default function BasicInfoStep({ data, onUpdate, errors }) {
  return (
    <div className="space-y-6 fade-in max-w-2xl text-left">
      <div>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Basic Information</h3>
        <p className="text-sm text-[#64748B] mb-6">Let's start with the base details of your new campaign.</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-1.5 w-full">
          <Input 
            label="Campaign Code"
            value={data.code || 'CAM-011'}
            onChange={(e) => onUpdate({ ...data, code: e.target.value })}
            error={errors.code}
          />
          <span className="text-xs text-[#64748B]">Auto-generated — you can edit this</span>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-[#0F172A]">Campaign Name *</span>
            <span className="text-xs text-[#64748B]">{data.name?.length || 0}/100</span>
          </div>
          <input
            className={`flex w-full rounded-md border p-3 text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white ${
              errors.name ? 'border-red-500' : 'border-[#E2E8F0]'
            }`}
            value={data.name || ''}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                onUpdate({ ...data, name: e.target.value })
              }
            }}
            placeholder="e.g., Summer VIP Sale"
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
        </div>
        
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-[#0F172A]">Description</label>
            <span className="text-xs text-[#64748B]">{data.description?.length || 0}/500</span>
          </div>
          <textarea
            className="flex w-full rounded-md border border-[#E2E8F0] p-3 text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 min-h-[80px] resize-y bg-white"
            placeholder="What is the goal of this campaign?"
            value={data.description || ''}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                onUpdate({ ...data, description: e.target.value })
              }
            }}
            rows={3}
          />
        </div>

        <div className="pt-4 border-t border-[#E2E8F0]">
          <label className="text-sm font-medium text-[#0F172A] block mb-3">Campaign Type *</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onUpdate({ ...data, campaignType: 'DM Delivery' })}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
                data.campaignType === 'DM Delivery' ? 'border-[#0891B2] bg-[#0891B2]/5' : 'border-[#E2E8F0] hover:border-[#0891B2]/40'
              }`}
            >
              <Megaphone className={`w-8 h-8 mb-2 ${data.campaignType === 'DM Delivery' ? 'text-[#0891B2]' : 'text-[#94A3B8]'}`} />
              <span className={`font-semibold ${data.campaignType === 'DM Delivery' ? 'text-[#0891B2]' : 'text-[#64748B]'}`}>DM Delivery</span>
            </button>
            <button
              onClick={() => onUpdate({ ...data, campaignType: 'Loyalty Action' })}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${
                data.campaignType === 'Loyalty Action' ? 'border-[#7C3AED] bg-[#7C3AED]/5' : 'border-[#E2E8F0] hover:border-[#7C3AED]/40'
              }`}
            >
              <Star className={`w-8 h-8 mb-2 ${data.campaignType === 'Loyalty Action' ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`} />
              <span className={`font-semibold ${data.campaignType === 'Loyalty Action' ? 'text-[#7C3AED]' : 'text-[#64748B]'}`}>Loyalty Action</span>
            </button>
          </div>
          <p className="text-sm text-[#64748B] mt-4 text-center">
            {data.campaignType === 'DM Delivery' 
              ? "Deliver banners, push notifications, and recommendations to targeted members"
              : "Award points, upgrade tiers, or assign rewards to targeted members"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
