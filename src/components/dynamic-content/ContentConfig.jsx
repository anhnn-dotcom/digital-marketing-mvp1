import { useState } from 'react';
import { Image as ImageIcon, Trash2, Plus, UploadCloud } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';
import { SEGMENTS } from '../../constants/mockData';

const SERVICES = ['scanQRCode', 'registerMerchant', 'promptPayOut', 'promptPayOutKeyIn', 'transferToBank', 'transferToOtherWallet', 'bookkeeping', 'notifications', 'point', 'createRequest', 'otherService'];
const BILLERS = ['MEA (Electricity)', 'PEA (Electricity)', 'AIS (Mobile)', 'TRUE (Mobile)', 'DTAC (Mobile)', 'Bangkok Water', 'TOT (Internet)'];

export default function ContentConfig({ content, onUpdate }) {
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdate('imageUrl', url);
    }
  };

  const addVariation = () => {
    if (content.variations.length >= 5) return;
    onUpdate('variations', [
      ...content.variations,
      { id: Date.now(), segment: '', imageUrl: '', actionEnabled: false, actionType: 'Direct to Service Screen', actionValue: 'scanQRCode' }
    ]);
  };

  const removeVariation = (id) => {
    onUpdate('variations', content.variations.filter(v => v.id !== id));
  };

  const updateVariation = (id, field, value) => {
    onUpdate('variations', content.variations.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const ratios = content.type === 'Banner' 
    ? ['16:9', '4:1', '3:1'] 
    : ['1:1', '3:4', '9:16'];

  return (
    <div className="space-y-8 w-full">
      {/* SECTION 1: Basic */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">Basic Information</h3>
        
        <Input 
          label="Internal Name*"
          value={content.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          placeholder="e.g. Gold Member Win-Back"
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-[#0F172A]">Content Type*</label>
          <div className="flex bg-[#F1F5F9] p-1 rounded-lg w-fit">
            <button 
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${content.type === 'Banner' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              onClick={() => {
                onUpdate('type', 'Banner');
                onUpdate('ratio', '16:9');
              }}
            >
              Banner
            </button>
            <button 
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${content.type === 'Popup' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              onClick={() => {
                onUpdate('type', 'Popup');
                onUpdate('ratio', '1:1');
              }}
            >
              Popup
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-[#0F172A]">Is campaign based</label>
            <p className="text-xs text-[#64748B]">Toggle off for default/always-on content</p>
          </div>
          <Toggle checked={content.isCampaignBased} onChange={(v) => onUpdate('isCampaignBased', v)} />
        </div>

        <div className="flex flex-col gap-1.5 w-full border-t border-[#E2E8F0] pt-4 mt-2">
          <label className="text-sm font-medium text-[#0F172A]">Language</label>
          <div className="flex border-b border-[#E2E8F0] gap-4">
            {['English', 'Thai'].map(lang => (
              <button
                key={lang}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  content.language === lang 
                    ? 'border-[#2563EB] text-[#2563EB]' 
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                }`}
                onClick={() => onUpdate('language', lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <Select 
          label="Category"
          options={['Promotional', 'Informational', 'Loyalty', 'Transactional']}
          value={content.category}
          onChange={(e) => onUpdate('category', e.target.value)}
        />
      </section>

      {/* SECTION 2: Content */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">Visual Asset</h3>
        
        <div className="w-full h-[200px] border-2 border-dashed border-[#CBD5E1] rounded-xl flex flex-col items-center justify-center bg-[#F8FAFC] hover:bg-blue-50 transition-colors relative cursor-pointer overflow-hidden group">
          {content.imageUrl ? (
            <div className="w-full h-full p-4 flex flex-col items-center justify-center relative">
               <img src={content.imageUrl} alt="Preview" className="h-full object-contain mb-2 max-h-[120px]" />
               <div className="flex items-center gap-4 text-sm mt-auto w-full justify-center bg-white/90 py-2 rounded-lg shadow-sm border border-gray-100">
                 <span className="text-gray-600 truncate max-w-[150px]">uploaded_image.png</span>
                 <span className="text-gray-400">1.2 MB</span>
                 <div className="flex gap-2 ml-4">
                   <button className="text-blue-600 font-medium hover:underline">Replace</button>
                   <button className="text-red-500 font-medium hover:underline" onClick={(e) => { e.stopPropagation(); onUpdate('imageUrl', ''); }}>Remove</button>
                 </div>
               </div>
            </div>
          ) : (
            <>
              <UploadCloud className="w-10 h-10 text-[#94A3B8] mb-3 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-medium text-[#0F172A]">Drop image here or Browse</span>
              <span className="text-xs text-[#64748B] mt-1">Accepted: JPG, PNG, WebP · Max 2MB</span>
            </>
          )}
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <label className="text-sm text-[#475569] font-medium">Image Ratio Selector</label>
          <div className="flex gap-2">
            {ratios.map(ratio => (
              <button
                key={ratio}
                onClick={() => onUpdate('ratio', ratio)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  content.ratio === ratio 
                    ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                    : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Action Config */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">Action Config</h3>
        <p className="text-sm text-[#475569] font-medium -mt-2">What happens when user taps?</p>
        
        <div className="space-y-4 pt-2">
          {/* Radio 1 */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" name="actionType" checked={content.actionType === 'Direct to Service Screen'} onChange={() => onUpdate('actionType', 'Direct to Service Screen')} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB] group-hover:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <div className="flex-1 space-y-3 pt-0.5">
              <span className={`text-sm font-medium ${content.actionType === 'Direct to Service Screen' ? 'text-[#0F172A]' : 'text-[#475569]'}`}>Direct to Service Screen</span>
              {content.actionType === 'Direct to Service Screen' && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                  <Select 
                    options={SERVICES}
                    value={content.actionValue}
                    onChange={(e) => onUpdate('actionValue', e.target.value)}
                  />
                </div>
              )}
            </div>
          </label>

          {/* Radio 2 */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" name="actionType" checked={content.actionType === 'Direct to URL'} onChange={() => onUpdate('actionType', 'Direct to URL')} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB] group-hover:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <div className="flex-1 space-y-3 pt-0.5">
              <span className={`text-sm font-medium ${content.actionType === 'Direct to URL' ? 'text-[#0F172A]' : 'text-[#475569]'}`}>Direct to URL</span>
              {content.actionType === 'Direct to URL' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  <Input 
                    value={content.actionValue}
                    onChange={(e) => onUpdate('actionValue', e.target.value)}
                    placeholder="https://..."
                  />
                  <div className="flex items-center gap-4 pt-1">
                    <span className="text-xs font-medium text-[#64748B]">Open in:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="openInBrowser" defaultChecked className="text-[#2563EB]" />
                      <span className="text-sm text-[#475569]">In-app browser</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="openInBrowser" className="text-[#2563EB]" />
                      <span className="text-sm text-[#475569]">External browser</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </label>

          {/* Radio 3 */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="radio" className="peer sr-only" name="actionType" checked={content.actionType === 'Biller Payment'} onChange={() => onUpdate('actionType', 'Biller Payment')} />
              <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB] group-hover:border-[#2563EB]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <div className="flex-1 space-y-3 pt-0.5">
              <span className={`text-sm font-medium ${content.actionType === 'Biller Payment' ? 'text-[#0F172A]' : 'text-[#475569]'}`}>Biller Payment</span>
              {content.actionType === 'Biller Payment' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <Select 
                    options={BILLERS}
                    value={content.actionValue}
                    onChange={(e) => onUpdate('actionValue', e.target.value)}
                  />
                  {content.actionValue && (
                    <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] flex items-center gap-2 mt-2">
                      <span className="text-xs text-[#64748B] font-medium">Biller ID:</span>
                      <span className="text-xs text-[#0F172A] font-mono bg-white px-2 py-1 border border-[#E2E8F0] rounded">652669d3caed690e94e8a648</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </label>
        </div>
      </section>

      {/* SECTION 4: Segment Variations */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
          Segment Variations
          <span className="text-xs font-normal text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">{content.variations.length} of 5 used</span>
        </h3>
        <p className="text-sm text-[#475569] font-medium -mt-2">Show different content to different segments</p>

        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between pointer-events-none opacity-80">
           <div className="flex items-center gap-3">
             <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center border border-gray-300">
               {content.imageUrl ? <img src={content.imageUrl} className="w-full h-full object-cover rounded" alt="default" /> : <ImageIcon className="w-4 h-4 text-gray-400" />}
             </div>
             <div>
               <p className="text-sm font-medium text-[#0F172A]">Default Content</p>
               <p className="text-xs text-[#64748B]">All Users</p>
             </div>
           </div>
           <span className="text-xs text-[#64748B]">{content.actionType}</span>
        </div>

        {content.variations.map((v) => (
          <div key={v.id} className="p-5 border-2 border-dashed border-[#E2E8F0] rounded-xl space-y-4 relative bg-gray-50/50 hover:border-blue-200 transition-colors">
            <button 
              onClick={() => removeVariation(v.id)}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="pr-8">
              <Select 
                label="When member is in:"
                options={SEGMENTS.map(s => s.name)}
                value={v.segment}
                onChange={(e) => updateVariation(v.id, 'segment', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0F172A]">Show different image:</label>
              <div className="w-full h-[120px] border-2 border-dashed border-[#CBD5E1] rounded-xl flex flex-col items-center justify-center bg-white hover:bg-blue-50 transition-colors relative cursor-pointer group">
                {v.imageUrl ? (
                   <img src={v.imageUrl} alt="Variation Preview" className="h-full object-contain p-2" />
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-[#94A3B8] mb-2 group-hover:text-blue-500 transition-colors" />
                    <span className="text-xs font-medium text-[#64748B]">Browse image</span>
                  </>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) updateVariation(v.id, 'imageUrl', URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4 mt-2">
              <label className="text-sm font-medium text-[#0F172A]">Different action?</label>
              <Toggle checked={v.actionEnabled} onChange={(val) => updateVariation(v.id, 'actionEnabled', val)} />
            </div>

            {v.actionEnabled && (
              <div className="pt-2 animate-in fade-in slide-in-from-top-1">
                <Select 
                  options={['Direct to Service Screen', 'Direct to URL', 'Biller Payment']}
                  value={v.actionType}
                  onChange={(e) => updateVariation(v.id, 'actionType', e.target.value)}
                />
              </div>
            )}
          </div>
        ))}

        {content.variations.length < 5 && (
          <Button variant="secondary" onClick={addVariation} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" />
            Add variation
          </Button>
        )}
      </section>

    </div>
  );
}
