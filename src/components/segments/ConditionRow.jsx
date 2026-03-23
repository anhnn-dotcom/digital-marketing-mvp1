import { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import Select from '../ui/Select';
import Input from '../ui/Input';

export default function ConditionRow({ dataset, condition, onUpdate, onRemove, fieldsSchema }) {
  const [tagInput, setTagInput] = useState('');
  
  // Field selected handling
  const fields = Object.keys(fieldsSchema || {});
  const currentFieldSchema = fieldsSchema?.[condition.field];

  // Helper for "In list" array management
  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      const currentTags = Array.isArray(condition.value) ? condition.value : [];
      if (!currentTags.includes(newTag)) {
        onUpdate({ ...condition, value: [...currentTags, newTag] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    onUpdate({ ...condition, value: condition.value.filter(t => t !== tagToRemove) });
  };

  const renderValueInput = () => {
    if (!currentFieldSchema || !condition.operator) return (
      <Input disabled placeholder="Select operator first" />
    );

    const { options } = currentFieldSchema;

    // BETWEEN UI (Two inputs)
    if (condition.operator === 'Between') {
       return (
         <div className="flex items-center gap-2 col-span-1 md:col-span-2">
           <Input 
             type="number"
             value={condition.value?.[0] || ''} 
             onChange={(e) => onUpdate({ ...condition, value: [e.target.value, condition.value?.[1] || ''] })} 
             placeholder="Min" 
           />
           <span className="text-sm font-medium text-[#64748B]">and</span>
           <Input 
             type="number"
             value={condition.value?.[1] || ''} 
             onChange={(e) => onUpdate({ ...condition, value: [condition.value?.[0] || '', e.target.value] })} 
             placeholder="Max" 
           />
         </div>
       );
    }

    // IN LIST UI (Tags or Multi-select)
    if (condition.operator === 'In list') {
      return (
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-wrap items-center gap-2 min-h-[40px] p-1.5 border border-[#E2E8F0] rounded-md focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 bg-white">
            {Array.isArray(condition.value) && condition.value.map(tag => (
               <span key={tag} className="flex items-center gap-1 bg-[#F1F5F9] text-[#0F172A] text-xs font-medium px-2 py-1 rounded">
                 {tag}
                 <button onClick={() => removeTag(tag)} className="text-[#94A3B8] hover:text-[#DC2626]"><X className="w-3 h-3" /></button>
               </span>
            ))}
            
            {options ? (
              <select 
                className="flex-1 bg-transparent text-sm focus:outline-none min-w-[100px] h-6"
                value=""
                onChange={(e) => {
                   if (e.target.value) {
                     const val = e.target.value;
                     const currentTags = Array.isArray(condition.value) ? condition.value : [];
                     if (!currentTags.includes(val)) onUpdate({ ...condition, value: [...currentTags, val] });
                   }
                }}
              >
                <option value="" disabled>Add item...</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input 
                type="text"
                placeholder="Type & press Enter"
                className="flex-1 bg-transparent text-sm focus:outline-none min-w-[120px]"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
              />
            )}
          </div>
        </div>
      );
    }

    if (condition.operator === 'In last X days' || condition.operator === 'Equal' && currentFieldSchema.type === 'number') {
      return (
        <div className="relative">
          <Input 
             type="number" 
             value={condition.value || ''} 
             onChange={(e) => onUpdate({ ...condition, value: e.target.value })} 
             placeholder={condition.operator === 'In last X days' ? 'X days' : 'Value'} 
             className="pr-12"
          />
          {condition.operator === 'In last X days' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-sm text-[#64748B]">
              days
            </div>
          )}
        </div>
      );
    }

    // STANDARD DROPDOWN / TEXT
    if (options && condition.operator !== 'In list') {
       return (
         <Select 
           options={['Select value...', ...options]} 
           value={condition.value || ''}
           onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
         />
       );
    }

    return (
       <Input 
         value={condition.value || ''}
         onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
         placeholder="Value" 
       />
    );
  };

  const isExpandedValue = condition.operator === 'Between' || condition.operator === 'In list';

  return (
    <div className="flex flex-col sm:flex-row items-start gap-3 fade-in group w-full relative">
      <div className={`grid grid-cols-1 ${isExpandedValue ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-3 w-full pr-8 sm:pr-0`}>
        <Select 
          value={condition.field}
          onChange={(e) => onUpdate({ ...condition, field: e.target.value, operator: '', value: '' })}
          options={['Select field...', ...fields]} 
        />
        
        <Select 
          value={condition.operator}
          onChange={(e) => onUpdate({ ...condition, operator: e.target.value, value: condition.operator === 'In list' && e.target.value !== 'In list' ? '' : e.target.value === 'In list' ? [] : '' })}
          options={['Select operator...', ...(currentFieldSchema?.operators || [])]} 
          disabled={!condition.field}
        />
        
        {renderValueInput()}
      </div>
      
      <button 
        onClick={onRemove}
        className="absolute top-2 right-0 sm:relative sm:top-auto sm:mt-2 text-[#94A3B8] hover:text-[#DC2626] transition-colors sm:opacity-0 sm:group-hover:opacity-100 p-1"
        aria-label="Remove condition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
