import { useState } from 'react';
import { Save, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import ContentList from '../components/dynamic-content/ContentList';
import ContentConfig from '../components/dynamic-content/ContentConfig';
import PhoneMockup from '../components/dynamic-content/PhoneMockup';
import Button from '../components/ui/Button';

export default function DynamicContentPage() {
  const [view, setView] = useState('list'); // 'list' | 'edit'

  const [activeTab, setActiveTab] = useState('Popup Preview'); // 'Popup Preview' | 'Banner Preview'
  const [content, setContent] = useState({
    name: 'New Dynamic Content',
    type: 'Banner',
    isCampaignBased: true,
    language: 'English',
    category: 'Promotional',
    imageUrl: '',
    ratio: '16:9',
    headlineText: '',
    bodyCopy: '',
    ctaText: 'Claim Now',
    actionType: 'Direct to Service Screen',
    actionValue: 'scanQRCode',
    variations: []
  });

  const handleEditContent = (existingContent) => {
    setContent({
      ...existingContent,
      imageUrl: existingContent.imageUrl || existingContent.payload?.visualUrl || '',
      headlineText: existingContent.headlineText || existingContent.payload?.headlineText || '',
      bodyCopy: existingContent.bodyCopy || existingContent.payload?.bodyCopy || '',
      ctaText: existingContent.ctaText || existingContent.payload?.ctaText || 'Claim Now',
      actionType: 'Direct to Service Screen',
      actionValue: 'scanQRCode',
      variations: existingContent.variations || []
    });
    setView('edit');
  };

  const handleUpdate = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    toast.success('Dynamic block saved and published!');
    setView('list');
  };

  if (view === 'list') {
    return (
      <div className="p-8 max-w-[1400px] mx-auto h-full flex flex-col pb-24 fade-in">
        <PageHeader 
          title="Dynamic Content" 
          action={
            <Button onClick={() => setView('edit')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          }
        />
        <ContentList onCreateContent={() => setView('edit')} onEditContent={handleEditContent} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto h-full flex flex-col pb-24 fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('list')}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Edit: {content.name}</h1>
            <p className="text-[#64748B] text-sm mt-1">Configure your dynamic content block</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => toast('Saved to Drafts')}>Save as Draft</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Publish Content
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-[600px] overflow-hidden">
        {/* Left Config Panel (45%) */}
        <div className="lg:w-[45%] overflow-y-auto pr-4 custom-scrollbar lg:border-r border-[#E2E8F0] pb-8">
          <ContentConfig 
            content={content} 
            onUpdate={handleUpdate} 
          />
        </div>

        {/* Right Preview Panel (55%) */}
        <div className="lg:w-[55%] flex flex-col">
          {/* Tab bar */}
          <div className="flex border-b border-[#E2E8F0] mb-8 gap-6">
            {['Popup Preview', 'Banner Preview'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-[#2563EB] text-[#2563EB]' 
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex-1 bg-[#F8FAFC] rounded-2xl flex items-center justify-center p-8 overflow-y-auto border border-[#E2E8F0]">
            <PhoneMockup content={content} previewMode={activeTab.split(' ')[0].toLowerCase()} />
          </div>
        </div>
      </div>
    </div>
  );
}
