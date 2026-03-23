import { forwardRef, useImperativeHandle } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ConditionRow from './ConditionRow';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import { DATASETS } from '../../constants/mockData';

// Dictionary orchestrating Field > Operators > Valid Values per Dataset
const SCHEMA = {
  'Customer Profile': {
    'Age': { type: 'number', operators: ['Between', 'Greater than', 'Less than', 'Equal'] },
    'Gender': { type: 'select', operators: ['Equal', 'Not equal'], options: ['Male', 'Female', 'Other'] },
    'City': { type: 'select', operators: ['Equal', 'In list'], options: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai'] },
    'Province': { type: 'text', operators: ['Equal', 'In list'] },
    'Registration Date': { type: 'date', operators: ['In last X days', 'Between', 'Greater than'] },
    'KYC Status': { type: 'select', operators: ['Equal'], options: ['Verified', 'Pending', 'Failed'] },
    'Birthday in X days': { type: 'number', operators: ['Equal'] },
    'Customer Type': { type: 'select', operators: ['Equal'], options: ['Individual', 'Corporate'] }
  },
  'Loyalty Status': {
    'Current Points': { type: 'number', operators: ['Greater than', 'Less than', 'Between', 'Equal'] },
    'Tier': { type: 'select', operators: ['Equal', 'Not equal', 'In list'], options: ['Bronze', 'Silver', 'Gold', 'Platinum'] },
    'Points Expiring in X days': { type: 'number', operators: ['Equal'] },
    'Lifetime Points': { type: 'number', operators: ['Greater than', 'Less than'] },
    'Last Redemption Date': { type: 'date', operators: ['In last X days', 'Greater than X days ago'] },
    'Never Redeemed': { type: 'boolean', operators: ['Equal'], options: ['True', 'False'] },
    'Achievement Completed': { type: 'text', operators: ['Equal'], options: ['First Transfer', 'Profile Complete', 'Bill Master'] }
  },
  'Transaction Behavior': {
    'Total Amount (30d)': { type: 'number', operators: ['Greater than', 'Less than', 'Between'] },
    'Transaction Count (30d)': { type: 'number', operators: ['Greater than', 'Less than', 'Equal'] },
    'Last Transaction': { type: 'date', operators: ['In last X days', 'More than X days ago'] },
    'Transaction Type': { type: 'select', operators: ['Equal', 'In list'], options: ['Transfer', 'QR Payment', 'Bill Payment', 'Top Up'] },
    'Average Transaction': { type: 'number', operators: ['Greater than', 'Less than', 'Between'] },
    'No Transaction in X days': { type: 'number', operators: ['Equal'] }
  },
  'App Engagement': {
    'Last Login': { type: 'date', operators: ['In last X days', 'More than X days ago'] },
    'Login Count (30d)': { type: 'number', operators: ['Greater than', 'Less than'] },
    'Feature Used': { type: 'select', operators: ['Equal', 'In list'], options: ['Points Redemption', 'QR Scan', 'Transfer', 'Bill Pay', 'Savings'] },
    'Product Viewed': { type: 'select', operators: ['Equal', 'In list'], options: ['Personal Loan', 'Savings Account', 'Investment', 'Insurance'] },
    'No Login in X days': { type: 'number', operators: ['Equal'] }
  }
};

const ConditionBuilder = forwardRef(({ groups, setGroups, globalLogic, setGlobalLogic }, ref) => {
  
  const addGroup = () => {
    setGroups([
      ...groups,
      {
        id: `group_${Date.now()}`,
        dataset: 'Customer Profile',
        conditions: [{ id: `cond_${Date.now()}`, field: '', operator: '', value: '' }]
      }
    ]);
  };

  const removeGroup = (groupId) => {
    if (groups.length === 1) return;
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const addCondition = (groupId) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          conditions: [...g.conditions, { id: `cond_${Date.now()}`, field: '', operator: '', value: '' }]
        };
      }
      return g;
    }));
  };

  const updateCondition = (groupId, conditionId, newValue) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          conditions: g.conditions.map(c => c.id === conditionId ? { ...c, ...newValue } : c)
        };
      }
      return g;
    }));
  };

  const removeCondition = (groupId, conditionId) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          conditions: g.conditions.filter(c => c.id !== conditionId)
        };
      }
      return g;
    }).filter(g => g.conditions.length > 0)); // also removes group if empty
  };

  return (
    <div className="space-y-6 fade-in">
      {groups.length > 1 && (
        <div className="flex items-center gap-3 bg-[#F8FAFC] p-3 rounded-md border border-[#E2E8F0]">
          <span className="text-sm font-medium text-[#0F172A]">Segments matching</span>
          <div className="flex items-center bg-white border border-[#E2E8F0] rounded-md overflow-hidden shadow-sm">
            <button
              onClick={() => setGlobalLogic('AND')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${globalLogic === 'AND' ? 'bg-[#1D4ED8] text-white' : 'text-[#64748B] hover:bg-[#F1F5F9]'}`}
            >
              All
            </button>
            <button
              onClick={() => setGlobalLogic('OR')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${globalLogic === 'OR' ? 'bg-[#1D4ED8] text-white' : 'text-[#64748B] hover:bg-[#F1F5F9]'}`}
            >
              Any
            </button>
          </div>
          <span className="text-sm font-medium text-[#0F172A]">of the following criteria</span>
        </div>
      )}

      {groups.map((group, groupIndex) => (
        <div key={group.id} className="relative mt-8 first:mt-0">
          {groupIndex > 0 && (
            <div className="absolute -top-7 left-6 py-1 px-3 bg-[#F8FAFC] font-bold text-[#1D4ED8] text-sm border-2 border-[#DBEAFE] rounded shadow-sm z-10 flex items-center justify-center">
              {globalLogic}
            </div>
          )}
          
          <div className="bg-white border-2 border-[#E2E8F0] rounded-xl p-6 shadow-sm relative transition-all hover:border-[#CBD5E1]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">Data Source:</span>
                <Select 
                  value={group.dataset}
                  onChange={(e) => setGroups(groups.map(g => g.id === group.id ? { 
                     ...g, 
                     dataset: e.target.value, 
                     conditions: [{ id: `cond_${Date.now()}`, field: '', operator: '', value: '' }] 
                  } : g))}
                  options={Object.keys(SCHEMA)}
                  className="w-56 font-medium shadow-sm"
                />
              </div>
              {groups.length > 1 && (
                <button onClick={() => removeGroup(group.id)} className="text-[#94A3B8] hover:text-[#DC2626] p-1.5 rounded-md hover:bg-[#FEF2F2] transition-colors border border-transparent hover:border-red-100 flex items-center gap-2 text-xs font-medium">
                  <Trash2 className="w-4 h-4" /> Remove block
                </button>
              )}
            </div>

            <div className="space-y-4">
              {group.conditions.map((condition, index) => (
                <div key={condition.id} className="relative">
                  {index > 0 && (
                    <div className="absolute -top-3 left-4 py-[1px] px-1.5 bg-[#F8FAFC] text-[10px] font-bold text-[#64748B] rounded border border-[#E2E8F0] z-10">
                      AND
                    </div>
                  )}
                  <ConditionRow 
                    dataset={group.dataset}
                    condition={condition}
                    fieldsSchema={SCHEMA[group.dataset]}
                    onUpdate={(val) => updateCondition(group.id, condition.id, val)}
                    onRemove={() => removeCondition(group.id, condition.id)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F1F5F9]">
              <Button variant="ghost" size="sm" onClick={() => addCondition(group.id)} className="text-[#2563EB] font-medium hover:bg-blue-50 hover:text-[#1D4ED8]">
                <Plus className="w-4 h-4 mr-2" /> Add condition row
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex py-4">
        <Button variant="secondary" onClick={addGroup} className="w-full border-dashed border-2 py-6 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors gap-2 text-base font-medium">
          <Plus className="w-5 h-5 text-[#2563EB]" /> Add Segment Block
        </Button>
      </div>
    </div>
  );
});

ConditionBuilder.displayName = 'ConditionBuilder';

export default ConditionBuilder;
