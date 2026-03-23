import { Check } from 'lucide-react';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step.id} className={`flex items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}>
            <div className={`relative flex flex-col items-center group`}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-colors
                ${isActive ? 'border-[#2563EB] bg-[#2563EB] text-white' : 
                  isCompleted ? 'border-[#2563EB] bg-[#2563EB] text-white' : 
                  'border-[#E2E8F0] bg-white text-[#64748B]'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <div className={`absolute top-10 whitespace-nowrap text-xs font-medium 
                ${isActive || isCompleted ? 'text-[#0F172A]' : 'text-[#64748B]'}`}
              >
                {step.label}
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div className={`flex-1 h-[2px] mx-4 transition-colors
                ${isCompleted ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
