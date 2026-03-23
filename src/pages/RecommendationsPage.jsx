import { useState } from 'react';
import { Plus, GripVertical, TrendingUp, TrendingDown, Clock, Search } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import RuleTable from '../components/recommendations/RuleTable';
import RuleDrawerForm from '../components/recommendations/RuleDrawerForm';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { RECOMMENDATION_RULES } from '../constants/mockData';

export default function RecommendationsPage() {
  const [rules, setRules] = useState(RECOMMENDATION_RULES.sort((a,b) => a.priority - b.priority));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState(null);

  const handleOpenCreate = () => {
    setEditingRule(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (rule) => {
    setEditingRule(rule);
    setIsDrawerOpen(true);
  };

  const handleSaveRule = (data) => {
    if (editingRule) {
      setRules(rules.map(r => r.id === editingRule.id ? { ...r, ...data } : r).sort((a,b) => a.priority - b.priority));
      toast.success('Rule updated successfully.');
    } else {
      setRules([...rules, { ...data, id: 'rr_new_' + Date.now(), priority: rules.length + 1, shown: 0, ctr: '—' }].sort((a,b) => a.priority - b.priority));
      toast.success('New recommendation rule created.');
    }
    setIsDrawerOpen(false);
  };

  const handleToggle = (id, active) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: active ? 'Active' : 'Inactive' } : r));
    toast(active ? 'Rule activated.' : 'Rule deactivated.');
  };

  const confirmDelete = (rule) => {
    setRuleToDelete(rule);
    setDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (ruleToDelete) {
      const newRules = rules.filter(r => r.id !== ruleToDelete.id);
      // Re-assign priorities
      const reordered = newRules.map((r, index) => ({ ...r, priority: index + 1 }));
      setRules(reordered);
      toast.success('Rule deleted.');
      setRuleToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const handleReorder = (dragIndex, hoverIndex) => {
    const newRules = [...rules];
    const dragItem = newRules[dragIndex];
    newRules.splice(dragIndex, 1);
    newRules.splice(hoverIndex, 0, dragItem);
    
    // update priorities
    const reordered = newRules.map((r, index) => ({ ...r, priority: index + 1 }));
    setRules(reordered);
    toast.success('Priority order saved');
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto h-full flex flex-col fade-in pb-24 space-y-8">
      <PageHeader title="Product Recommendation" />

      {/* SECTION 1: Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#64748B]">Total Shown</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">284,521</div>
          <div className="flex items-center text-sm font-medium text-[#10B981]">
            <TrendingUp className="w-4 h-4 mr-1" />
            8% vs last wk
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#64748B]">Click Rate</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Plus className="w-4 h-4" /> {/* Or CursorClick if available */}
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">12.4%</div>
          <div className="flex items-center text-sm font-medium text-[#10B981]">
            <TrendingUp className="w-4 h-4 mr-1" />
            1.2% vs last wk
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#64748B]">Conversion</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">3.2%</div>
          <div className="flex items-center text-sm font-medium text-[#10B981]">
            <TrendingUp className="w-4 h-4 mr-1" />
            0.4% vs last wk
          </div>
        </div>
      </div>

      {/* SECTION 2: Rules Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden flex-1">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Recommendation Rules</h2>
            <p className="text-sm text-[#64748B] mt-1">Configure what products to show and when, based on priority ranking.</p>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Rule
          </Button>
        </div>
        
        <RuleTable 
          rules={rules} 
          onEdit={handleOpenEdit} 
          onDelete={confirmDelete} 
          onToggle={handleToggle}
          onReorder={handleReorder}
        />
      </div>

      <RuleDrawerForm 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        initialData={editingRule} 
        onSave={handleSaveRule} 
        maxPriority={rules.length + 1}
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Rule"
        actionLabel="Delete"
        isDestructive={true}
        onAction={executeDelete}
      >
        Are you sure you want to delete the rule <strong>{ruleToDelete?.name}</strong>? 
        It will be removed permanently. Other rules will shift up in priority.
      </Modal>
    </div>
  );
}
