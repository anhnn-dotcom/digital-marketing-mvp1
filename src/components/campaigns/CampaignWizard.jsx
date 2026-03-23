import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ChevronRight, ChevronLeft, Save, Plus } from 'lucide-react';
import { toast } from 'sonner';

import Stepper from '../ui/Stepper';
import Button from '../ui/Button';

import BasicInfoStep from './steps/BasicInfoStep';
import TargetDataStep from './steps/TargetDataStep';
import ScheduleStep from './steps/ScheduleStep';
import DeliveryStep from './steps/DeliveryStep';

const STEPS = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'target', label: 'Target & Data' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'delivery', label: 'Delivery Config' },
];

export default function CampaignWizard() {
  const { id } = useParams();
  const { campaigns } = useAppContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    code: 'CAM-011',
    name: '',
    description: '',
    campaignType: 'DM Delivery',
    segment: '',
    dataOrder: 'Oldest first',
    limitType: 'all',
    limitValue: '',
    type: 'one-time',
    repeat: 'Day',
    repeatInterval: '1',
    repeatDays: [1,3,5],
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    runTimes: [],
    useLocalTime: false,
    channels: [],
    loyaltyAction: 'Award Points'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const camp = campaigns.find(c => c.id === id);
      if (camp) {
        setData(prev => ({
          ...prev,
          code: camp.id || 'CAM-011',
          name: camp.name || '',
          campaignType: camp.type || 'DM Delivery',
          segment: camp.segmentId || camp.targetDetails?.segmentId || '',
          dataOrder: camp.targetDetails?.order || 'Oldest first',
          limitType: camp.targetDetails?.limit === 'All matching members' || camp.targetDetails?.limit === 'All matching' ? 'all' : 'fixed',
          limitValue: '',
          type: camp.scheduleDetails?.multipleTimes === 'OFF' && !camp.scheduleDetails?.repeat ? 'one-time' : 'recurring',
          repeat: camp.scheduleDetails?.repeat ? camp.scheduleDetails.repeat.split(' ')[1] === 'day' ? 'Day' : camp.scheduleDetails.repeat.split(' ')[1] === 'days' ? 'Day' : 'Week' : 'Day',
          repeatInterval: camp.scheduleDetails?.repeat ? camp.scheduleDetails.repeat.split(' ')[2] === 'days' ? camp.scheduleDetails.repeat.split(' ')[1] : '1' : '1',
          date: camp.scheduleDetails?.start ? new Date(camp.scheduleDetails.start).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          time: camp.scheduleDetails?.time || '09:00',
          runTimes: camp.scheduleDetails?.runsAt || [],
          channels: camp.delivery || [],
          loyaltyAction: camp.actionDetails?.action || 'Award Points'
        }));
      }
    }
  }, [id, campaigns]);

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!data.name.trim()) newErrors.name = 'Campaign name is required';
      if (!data.code.trim()) newErrors.code = 'Campaign code is required';
    }
    if (currentStep === 1) {
      if (!data.segment) newErrors.segment = 'Please select a target audience segment';
    }
    if (currentStep === 3) {
      if (data.campaignType === 'DM Delivery' && data.channels.length === 0) {
        newErrors.channels = 'Select at least one delivery channel';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        toast.success(`Campaign "${data.name}" launched successfully!`);
        navigate('/campaigns');
      }
    }
  };

  const handlePrev = () => {
    setErrors({});
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    toast(`Draft "${data.name || 'Untitled'}" saved.`);
    navigate('/campaigns');
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col h-full min-h-[600px] fade-in">
      <div className="p-8 border-b border-[#E2E8F0] flex-shrink-0">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {currentStep === 0 && <BasicInfoStep data={data} onUpdate={setData} errors={errors} />}
        {currentStep === 1 && <TargetDataStep data={data} onUpdate={setData} errors={errors} />}
        {currentStep === 2 && <ScheduleStep data={data} onUpdate={setData} errors={errors} />}
        {currentStep === 3 && <DeliveryStep data={data} onUpdate={setData} errors={errors} />}
      </div>

      <div className="p-6 border-t border-[#E2E8F0] flex-shrink-0 flex items-center justify-between bg-[#F8FAFC] rounded-b-xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={handleSaveDraft}>Save as Draft</Button>
          {currentStep > 0 && (
            <Button variant="secondary" onClick={handlePrev}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-[#64748B]" onClick={() => navigate('/campaigns')}>Cancel</Button>
          <Button onClick={handleNext}>
            {currentStep === STEPS.length - 1 ? (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Launch Campaign
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
