import { useState } from 'react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Toggle from '../../ui/Toggle';
import { X } from 'lucide-react';

export default function ScheduleStep({ data, onUpdate }) {
  const [newRunTime, setNewRunTime] = useState('');

  const toggleDay = (day) => {
    const days = data.repeatDays || [];
    onUpdate({ ...data, repeatDays: days.includes(day) ? days.filter(d => d !== day) : [...days, day] });
  };

  const addTime = () => {
    if (newRunTime && !(data.runTimes || []).includes(newRunTime)) {
      onUpdate({ ...data, runTimes: [...(data.runTimes || []), newRunTime].sort() });
    }
    setNewRunTime('');
  };

  const removeTime = (time) => {
    onUpdate({ ...data, runTimes: (data.runTimes || []).filter(t => t !== time) });
  };

  const runTimes = data.runTimes?.length > 0 ? data.runTimes : [data.time || '09:00'];
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex gap-8 fade-in text-left">
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Schedule & Retries</h3>
          <p className="text-sm text-[#64748B] mb-6">When should this campaign be sent? You can send immediately or schedule for later.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input 
            type="date" 
            label="Start Date *"
            min={new Date().toISOString().split('T')[0]}
            value={data.date || ''}
            onChange={(e) => onUpdate({ ...data, date: e.target.value })}
          />
          <Input 
            type="time" 
            label="Default Start Time *"
            value={data.time || ''}
            onChange={(e) => onUpdate({ ...data, time: e.target.value })}
          />
        </div>

        <div className="space-y-4 pt-6 mt-6 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#0F172A]">Repeat Campaign</span>
            <Toggle checked={data.type === 'recurring'} onChange={(v) => onUpdate({ ...data, type: v ? 'recurring' : 'one-time' })} />
          </div>

          {data.type === 'recurring' && (
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-4 fade-in">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Select 
                    label="Frequency"
                    options={['Minute', 'Hour', 'Day', 'Week', 'Month', 'Year']}
                    value={data.repeat || 'Day'}
                    onChange={(e) => onUpdate({ ...data, repeat: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <Input 
                    type="number" 
                    label="Every"
                    value={data.repeatInterval || '1'}
                    onChange={(e) => onUpdate({ ...data, repeatInterval: e.target.value })}
                    min="1"
                  />
                </div>
              </div>

              {data.repeat === 'Week' && (
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-2">On days</label>
                  <div className="flex gap-2">
                    {DAYS.map((d, i) => {
                      const selected = (data.repeatDays || []).includes(i);
                      return (
                        <button
                          key={i}
                          onClick={() => toggleDay(i)}
                          className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                            selected ? 'bg-[#2563EB] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB]'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {data.repeat === 'Month' && (
                <div className="w-1/2">
                  <Input 
                    type="number" 
                    label="On day of each month"
                    value={data.repeatMonthDay || '1'}
                    onChange={(e) => onUpdate({ ...data, repeatMonthDay: e.target.value })}
                    min="1" max="31"
                  />
                </div>
              )}

              <div className="w-1/2">
                <Input 
                  type="date" 
                  label="End Date (Optional)"
                  min={data.date || new Date().toISOString().split('T')[0]}
                  value={data.endDate || ''}
                  onChange={(e) => onUpdate({ ...data, endDate: e.target.value })}
                />
                <span className="text-xs text-[#64748B] block mt-1">Leave empty to run indefinitely</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 mt-6 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-[#0F172A] block">Multiple run times per day</span>
              <span className="text-xs text-[#64748B]">Send multiple times on scheduled days</span>
            </div>
            <Toggle checked={data.useLocalTime} onChange={(v) => onUpdate({ ...data, useLocalTime: v })} />
          </div>

          {data.useLocalTime && (
            <div className="flex flex-wrap gap-2 items-center min-h-[42px] p-2 border border-[#E2E8F0] rounded-lg bg-white fade-in">
              {runTimes.map(t => (
                <div key={t} className="flex items-center bg-[#F1F5F9] text-[#0F172A] text-sm font-medium px-2 py-1 rounded">
                  {t}
                  <button onClick={() => removeTime(t)} className="ml-1.5 text-[#94A3B8] hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex items-center ml-2">
                <input 
                  type="time" 
                  value={newRunTime}
                  onChange={(e) => setNewRunTime(e.target.value)}
                  className="text-sm bg-transparent border-none outline-none focus:ring-0 w-[100px] text-[#0F172A]"
                />
                <button onClick={addTime} disabled={!newRunTime} className="text-sm font-medium text-[#2563EB] disabled:text-[#94A3B8] ml-2">
                  + Add time
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-[320px] shrink-0">
        <div className="border border-[#E2E8F0] rounded-xl p-5 bg-[#F8FAFC] sticky top-0">
          <h4 className="text-sm font-bold text-[#0F172A] mb-3 border-b border-[#E2E8F0] pb-2">Schedule Preview</h4>
          <span className="text-xs font-semibold text-[#64748B] block mb-2 uppercase tracking-wider">Next 5 runs:</span>
          <ul className="space-y-2 mb-4">
            {/* Mocking the preview based on date and time selected */}
            {[0, 1, 2, 3, 4].map(i => {
              const d = new Date(data.date || new Date());
              if (data.type === 'recurring' && data.repeat === 'Day') d.setDate(d.getDate() + (i * parseInt(data.repeatInterval || '1')));
              const time = runTimes[i % runTimes.length];
              return (
                <li key={i} className="text-sm flex items-center text-[#0F172A]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2" />
                  {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}<span className="mx-1 text-[#94A3B8]">·</span>{time}
                </li>
              );
            })}
          </ul>
          <div className="pt-3 border-t border-[#E2E8F0] text-sm text-[#0F172A] space-y-1">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Estimated total:</span>
              <span className="font-medium">{data.endDate ? '~15 runs' : 'Indefinite'}</span>
            </div>
            {data.endDate && (
              <div className="flex justify-between">
                <span className="text-[#64748B]">End date:</span>
                <span className="font-medium">{new Date(data.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
