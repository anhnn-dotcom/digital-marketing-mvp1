import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Users, Database } from 'lucide-react';
import { SEGMENTS } from '../../../constants/mockData';
import Select from '../../ui/Select';
import Input from '../../ui/Input';

export default function TargetDataStep({ data, onUpdate, errors }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedSegment = SEGMENTS.find(s => s.id === data.segment);

  return (
    <div className="space-y-6 fade-in max-w-2xl text-left">
      <div>
        <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Targeting & Data</h3>
        <p className="text-sm text-[#64748B] mb-6">Select the audience segment and processing order.</p>
      </div>

      <div className="space-y-6">
        <div className="relative" ref={dropdownRef}>
          <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Segment *</label>
          <div 
            className={`border rounded-lg p-3 cursor-pointer bg-white flex justify-between items-center ${
              errors.segment ? 'border-red-500' : 'border-[#E2E8F0]'
            }`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedSegment ? (
              <span className="text-sm font-medium text-[#0F172A]">{selectedSegment.name}</span>
            ) : (
              <span className="text-sm text-[#94A3B8]">Select a segment...</span>
            )}
            <ChevronDown className="w-4 h-4 text-[#64748B]" />
          </div>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] shadow-lg rounded-lg z-10 max-h-64 overflow-y-auto">
              <div className="p-2 sticky top-0 bg-white border-b border-[#E2E8F0]">
                <input type="text" placeholder="Search segments..." className="w-full text-sm border-none bg-[#F8FAFC] p-2 rounded-md outline-none" />
              </div>
              {SEGMENTS.map(seg => (
                <div 
                  key={seg.id}
                  className="p-3 hover:bg-[#F8FAFC] cursor-pointer border-b border-[#F1F5F9] transition-colors"
                  onClick={() => {
                    onUpdate({ ...data, segment: seg.id });
                    setDropdownOpen(false);
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-[#0F172A]">{seg.name}</span>
                    <span className="text-xs text-[#64748B] flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {new Intl.NumberFormat('en-US').format(seg.memberCount)}
                    </span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {seg.datasets.map(ds => (
                      <span key={ds} className="text-[10px] bg-[#E2E8F0] text-[#475569] px-1.5 py-0.5 rounded flex items-center">
                        <Database className="w-2.5 h-2.5 mr-1" />
                        {ds}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {errors.segment && <span className="text-xs text-red-500 mt-1 block">{errors.segment}</span>}
        </div>

        {selectedSegment && (
          <div className="border border-[#E2E8F0] rounded-xl p-4 bg-white relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]" />
            <h4 className="text-sm font-bold text-[#0F172A] mb-1">{selectedSegment.name}</h4>
            <div className="text-xs text-[#64748B] mb-2">
              {new Intl.NumberFormat('en-US').format(selectedSegment.memberCount)} members · Last sync {selectedSegment.lastSync}
            </div>
            <div className="text-xs text-[#64748B] mb-2">{selectedSegment.datasets.join(' + ')}</div>
            <div className="text-xs font-medium text-[#0F172A] p-2 bg-[#F8FAFC] rounded border border-[#E2E8F0] w-fit">
              Auto-sync: {selectedSegment.autoSync ? `ON · ${selectedSegment.syncFrequency}` : 'OFF'}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E2E8F0]">
          <Select 
            label="Data Order *"
            options={['Oldest first', 'Newest first', 'Highest points first', 'Random']}
            value={data.dataOrder || 'Oldest first'}
            onChange={(e) => onUpdate({ ...data, dataOrder: e.target.value })}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0F172A]">Limit *</label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#0F172A]">
              <input 
                type="radio" 
                name="limit" 
                checked={data.limitType !== 'limited'}
                onChange={() => onUpdate({ ...data, limitType: 'all', limitValue: '' })}
                className="w-4 h-4 text-[#2563EB]"
              />
              All matching members ({selectedSegment ? new Intl.NumberFormat('en-US').format(selectedSegment.memberCount) : '—'})
            </label>
            <div className="flex items-start gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#0F172A] mt-2">
                <input 
                  type="radio" 
                  name="limit" 
                  checked={data.limitType === 'limited'}
                  onChange={() => onUpdate({ ...data, limitType: 'limited', limitValue: '500' })}
                  className="w-4 h-4 text-[#2563EB]"
                />
                Limited entries
              </label>
              {data.limitType === 'limited' && (
                <div className="flex-1 max-w-[120px]">
                  <Input 
                    type="number" 
                    value={data.limitValue} 
                    onChange={(e) => onUpdate({ ...data, limitValue: e.target.value })} 
                  />
                  <span className="text-xs text-[#64748B] block mt-1 whitespace-nowrap">Process first {data.limitValue || 0} members</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
