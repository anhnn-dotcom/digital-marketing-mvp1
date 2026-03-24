import { useState } from 'react';
import { Megaphone, Star, X } from 'lucide-react';
import Input from '../../ui/Input';

const CATEGORIES = ['Promotional', 'Retention', 'Reactivation', 'Loyalty', 'Transactional'];

export default function BasicInfoStep({ data, onUpdate, errors }) {
  const [tagInput, setTagInput] = useState('');

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, '');
      if (!data.tags?.includes(newTag)) {
        onUpdate({ ...data, tags: [...(data.tags || []), newTag] });
      }
      setTagInput('');
    }
  };
  const removeTag = (tag) => onUpdate({ ...data, tags: (data.tags || []).filter(t => t !== tag) });

  return (
    <div className="space-y-6 fade-in max-w-2xl text-left">
      <div>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Basic Information</h3>
        <p className="text-sm text-[#64748B] mb-6">Define the core details and type of this campaign.</p>
      </div>

      {/* Code + Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Input
            label="Campaign Code"
            value={data.code || ''}
            onChange={(e) => onUpdate({ ...data, code: e.target.value })}
            error={errors.code}
          />
          <span className="text-xs text-[#64748B]">Auto-generated — you can edit</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-[#0F172A]">Campaign Name *</span>
            <span className="text-xs text-[#64748B]">{data.name?.length || 0}/100</span>
          </div>
          <input
            className={`flex w-full rounded-md border p-3 text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'}`}
            value={data.name || ''}
            onChange={(e) => e.target.value.length <= 100 && onUpdate({ ...data, name: e.target.value })}
            placeholder="e.g., Gold Member Win-Back — Q2"
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-[#0F172A]">Description</label>
          <span className="text-xs text-[#64748B]">{data.description?.length || 0}/500</span>
        </div>
        <textarea
          className="flex w-full rounded-md border border-[#E2E8F0] p-3 text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 min-h-[72px] resize-y bg-white"
          placeholder="What is the goal of this campaign?"
          value={data.description || ''}
          onChange={(e) => e.target.value.length <= 500 && onUpdate({ ...data, description: e.target.value })}
          rows={2}
        />
      </div>

      {/* Category + Tags */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0F172A]">Category *</label>
          <select
            className="flex w-full rounded-md border border-[#E2E8F0] p-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            value={data.category || ''}
            onChange={(e) => onUpdate({ ...data, category: e.target.value })}
          >
            <option value="">Select category...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0F172A]">Tags</label>
          <div className="flex flex-wrap gap-1.5 min-h-[46px] items-center border border-[#E2E8F0] rounded-md p-2 bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
            {(data.tags || []).map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
              </span>
            ))}
            <input
              type="text"
              className="flex-1 min-w-[80px] text-sm bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#94A3B8]"
              placeholder="Add tag, Enter to confirm"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
            />
          </div>
        </div>
      </div>

      {/* Campaign Type */}
      <div className="pt-4 border-t border-[#E2E8F0]">
        <label className="text-sm font-medium text-[#0F172A] block mb-3">Campaign Type *</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'DM Delivery', icon: Megaphone, color: '#0891B2', desc: 'Push, banners, recommendations' },
            { key: 'Loyalty Action', icon: Star, color: '#7C3AED', desc: 'Award points, upgrade tiers, assign vouchers' },
          ].map(({ key, icon: Icon, color, desc }) => (
            <button
              key={key}
              onClick={() => onUpdate({ ...data, campaignType: key })}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all text-left ${data.campaignType === key ? `ring-2` : 'border-[#E2E8F0] hover:border-slate-300'}`}
              style={data.campaignType === key ? { borderColor: color, backgroundColor: `${color}08` } : {}}
            >
              <Icon className="w-7 h-7 mb-2" style={{ color: data.campaignType === key ? color : '#94A3B8' }} />
              <span className="font-semibold text-sm" style={{ color: data.campaignType === key ? color : '#64748B' }}>{key}</span>
              <span className="text-xs text-[#94A3B8] mt-1 text-center">{desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
