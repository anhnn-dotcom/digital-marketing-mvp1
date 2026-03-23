import { useState } from 'react';
import { Save, Plus, ArrowLeft, ArrowUpRight, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import ContentList from '../components/dynamic-content/ContentList';
import ContentConfig from '../components/dynamic-content/ContentConfig';
import PhoneMockup from '../components/dynamic-content/PhoneMockup';
import Button from '../components/ui/Button';

export default function DynamicContentPage() {
  const navigate = useNavigate();
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
          <div className="flex border-b border-[#E2E8F0] mb-6 gap-6">
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
          
          <div className="bg-[#F8FAFC] rounded-2xl flex items-center justify-center p-8 overflow-y-auto border border-[#E2E8F0] mb-6 shadow-inner">
            <PhoneMockup content={content} previewMode={activeTab.split(' ')[0].toLowerCase()} />
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 mt-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <h3 className="text-md font-semibold text-[#0F172A] mb-4 border-b border-[#E2E8F0] pb-2">Performance Focus</h3>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[#64748B]">Impressions:</span>
              <span className="text-sm font-bold text-[#0F172A]">48,200</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[#64748B]">Clicks:</span>
              <span className="text-sm font-bold text-[#0F172A]">5,462</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-[#64748B]">CTR:</span>
              <span className="text-sm font-bold text-red-600 flex items-center">11.2% <TrendingDown className="w-3 h-3 mx-1" /> from 24.1%</span>
            </div>
            
            <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg border border-red-100 mb-4">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-red-700">🔴 Fatigue detected</div>
              CTR dropped 53% over 22 days
            </div>

            <div className="mb-5 text-sm">
              <span className="text-[#64748B] block mb-1">Campaigns using this content: 1</span>
              <span className="font-medium text-[#0F172A]">Gold Member Win-Back — March</span>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 justify-center w-full" onClick={() => navigate('/analytics')}>
                View in Analytics <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button variant="secondary" className="justify-center w-full text-[#0F172A]">
                Create Replacement Content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
