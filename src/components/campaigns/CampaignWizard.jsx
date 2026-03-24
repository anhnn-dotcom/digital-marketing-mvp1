import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

import Stepper from '../ui/Stepper';
import Button from '../ui/Button';

import BasicInfoStep     from './steps/BasicInfoStep';
import TargetScheduleStep from './steps/TargetDataStep';      // Step 2 = Target & Schedule
import ChannelsContentStep from './steps/DeliveryStep';       // Step 3 = Channels & Content
import ReviewLaunchStep  from './steps/ScheduleStep';         // Step 4 = Review & Launch

const STEPS = [
  { id: 'basic',    label: 'Basic Info'      },
  { id: 'target',   label: 'Target & Schedule' },
  { id: 'channels', label: 'Channels & Content' },
  { id: 'review',   label: 'Review & Launch' },
];

function buildCode(name) {
  if (!name) return '';
  const slug = name.toUpperCase().replace(/[^A-Z0-9]/g, '-').replace(/-+/g, '-').slice(0, 20).replace(/-$/, '');
  return `CAM-${slug}`;
}

const INITIAL_DATA = {
  code: 'CAM-',
  name: '',
  description: '',
  category: '',
  tags: [],
  campaignType: 'DM Delivery',
  // Step 2
  segmentIds: [],
  audienceLogic: 'Union',
  startDate: '',
  startTime: '09:00',
  endDate: '',
  scheduleType: 'One-time',
  repeatDays: [],
  repeatMonthDay: '1',
  multipleRunTimes: false,
  runTimes: [],
  freqCapOverride: false,
  freqCapMax: '3',
  // Step 3
  channels: {},
  loyaltyAction: 'Award Points',
  pointsAward: '',
  pointsExpiry: '90',
  pointsReason: '',
  upgradeTier: 'Gold',
  tierDuration: 'permanent',
  tierUntilDate: '',
  voucherType: '',
  voucherQty: '1',
  voucherExpiry: '30',
};

export default function CampaignWizard() {
  const { id } = useParams();
  const { campaigns } = useAppContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});

  // Populate from existing campaign when editing
  useEffect(() => {
    if (id) {
      const camp = campaigns.find(c => c.id === id);
      if (camp) {
        setData(prev => ({
          ...prev,
          code: camp.id || '',
          name: camp.name || '',
          campaignType: camp.type || 'DM Delivery',
          segmentIds: camp.segmentId ? [camp.segmentId] : (camp.segmentIds || []),
          startDate: camp.scheduleDetails?.start ? new Date(camp.scheduleDetails.start).toISOString().split('T')[0] : '',
          startTime: camp.scheduleDetails?.time || '09:00',
          endDate: camp.scheduleDetails?.end ? new Date(camp.scheduleDetails.end).toISOString().split('T')[0] : '',
          scheduleType: camp.scheduleDetails?.repeat ? 'Daily' : 'One-time',
          loyaltyAction: camp.actionDetails?.action || 'Award Points',
        }));
      }
    }
  }, [id, campaigns]);

  // Auto-generate code from name
  const handleUpdate = (newData) => {
    // If name changed and code is still auto-generated (starts with CAM-), update code
    if (newData.name !== data.name && (data.code === '' || data.code.startsWith('CAM-'))) {
      setData({ ...newData, code: buildCode(newData.name) });
    } else {
      setData(newData);
    }
  };

  const validateStep = () => {
    const errs = {};
    if (currentStep === 0) {
      if (!data.name?.trim()) errs.name = 'Campaign name is required';
      if (!data.code?.trim()) errs.code = 'Campaign code is required';
    }
    if (currentStep === 1) {
      if (!data.segmentIds?.length) errs.segmentIds = 'Select at least one target segment';
      if (!data.startDate) errs.startDate = 'Start date required';
      if (!data.endDate) errs.endDate = 'End date required';
    }
    if (currentStep === 2) {
      const ch = data.channels || {};
      const hasChannel = Object.values(ch).some(v => v?.enabled);
      const isLoyalty = data.campaignType === 'Loyalty Action';
      if (!hasChannel && !isLoyalty) errs.channels = 'Enable at least one channel';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setErrors({});
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSaveDraft = () => {
    toast(`Draft "${data.name || 'Untitled'}" saved.`);
    navigate('/campaigns');
  };

  const handleSchedule = () => {
    toast.success(`Campaign "${data.name}" scheduled successfully!`);
    navigate('/campaigns');
  };

  const handleLaunch = () => {
    toast.success(`Campaign "${data.name}" launched successfully!`);
    navigate('/campaigns');
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col h-full min-h-[600px] fade-in">
      {/* Stepper */}
      <div className="p-8 border-b border-[#E2E8F0] flex-shrink-0">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {currentStep === 0 && (
          <BasicInfoStep data={data} onUpdate={handleUpdate} errors={errors} />
        )}
        {currentStep === 1 && (
          <TargetScheduleStep data={data} onUpdate={setData} errors={errors} />
        )}
        {currentStep === 2 && (
          <ChannelsContentStep data={data} onUpdate={setData} errors={errors} />
        )}
        {currentStep === 3 && (
          <ReviewLaunchStep
            data={data}
            onSaveDraft={handleSaveDraft}
            onSchedule={handleSchedule}
            onLaunch={handleLaunch}
          />
        )}
      </div>

      {/* Footer navigation */}
      <div className="p-6 border-t border-[#E2E8F0] flex-shrink-0 flex items-center justify-between bg-[#F8FAFC] rounded-b-xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={handleSaveDraft}>Save as Draft</Button>
          {currentStep > 0 && (
            <Button variant="secondary" onClick={handlePrev}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-[#64748B]" onClick={() => navigate('/campaigns')}>
            Cancel
          </Button>
          {!isLastStep && (
            <Button onClick={handleNext}>
              Continue <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {/* On last step the action buttons are inside ReviewLaunchStep */}
        </div>
      </div>
    </div>
  );
}
