import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Clock } from 'lucide-react';
import { PUSH_TEMPLATES } from '../constants/mockData';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import ComposeForm from '../components/push-notification/ComposeForm';
import NotificationPreview from '../components/push-notification/NotificationPreview';

export default function PushNotificationPage() {
  const { id } = useParams();
  const [data, setData] = useState({
    campaign: '',
    title: '',
    body: '',
    imageUrl: '',
    showBadge: true,
    actionType: 'Open app home',
    actionValue: '',
    sendTo: 'pushEnabled',
    scheduleType: 'immediately',
    scheduleDate: ''
  });

  useEffect(() => {
    if (id) {
      const template = PUSH_TEMPLATES.find(t => t.id === id);
      if (template) {
        setData(prev => ({
          ...prev,
          title: template.title || '',
          body: template.body || '',
          campaign: template.campaign || '',
          actionValue: template.trigger || ''
        }));
      }
    }
  }, [id]);

  const [previewStyle, setPreviewStyle] = useState('iOS Lock Screen'); // iOS Lock Screen | Android | In-App

  return (
    <div className="p-8 max-w-[1400px] mx-auto h-full flex flex-col pb-24 fade-in">
      <PageHeader title={id ? "Edit Push Message" : "Push Message Builder"} />

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-[600px] mt-6">
        {/* Left Side: Compose + History (55%) */}
        <div className="lg:w-[55%] flex flex-col gap-8 pb-8">
          <ComposeForm data={data} onUpdate={setData} />
        </div>

        {/* Right Side: Live Preview (45%) */}
        <div className="lg:w-[45%] bg-[#F8FAFC] rounded-2xl flex flex-col items-center justify-start pt-12 p-8 border border-[#E2E8F0] sticky top-8 h-[calc(100vh-160px)]">
          <div className="flex bg-[#E2E8F0] p-1 rounded-xl w-fit mb-12">
            {['iOS Lock Screen', 'Android', 'In-App'].map(style => (
              <button
                key={style}
                onClick={() => setPreviewStyle(style)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                  ${previewStyle === style ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              >
                {style}
              </button>
            ))}
          </div>

          <NotificationPreview data={data} style={previewStyle} />
          
        </div>
      </div>
    </div>
  );
}
