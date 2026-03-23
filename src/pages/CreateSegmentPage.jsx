import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, AlertCircle, Wand2, History, Clock } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import ConditionBuilder from '../components/segments/ConditionBuilder';
import SegmentPreviewCard from '../components/segments/SegmentPreviewCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Modal from '../components/ui/Modal';
import { useAppContext } from '../context/AppContext';

export default function CreateSegmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { segments, updateSegment, addSegment } = useAppContext();
  const [name, setName] = useState('');
  const [autoSync, setAutoSync] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [syncTime, setSyncTime] = useState('Mar 23, 2026 14:30');
  const [nameError, setNameError] = useState('');
  
  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  // Lifter state for the builder to enable templates
  const [groups, setGroups] = useState([
    {
      id: 'group_1',
      dataset: 'Customer Profile',
      conditions: [{ id: 'cond_1', field: '', operator: '', value: '' }]
    }
  ]);
  const [globalLogic, setGlobalLogic] = useState('AND');

  useEffect(() => {
    if (id) {
      const existing = segments.find(s => s.id === id);
      if (existing) {
        setName(existing.name || '');
        setAutoSync(existing.autoSync || false);
        setGroups(existing.groups || [
          { id: 'group_1', dataset: 'Customer Profile', conditions: [{ id: 'cond_1', field: '', operator: '', value: '' }] }
        ]);
        setGlobalLogic(existing.globalLogic || 'AND');
        setMemberCount(existing.memberCount || 0);
        setSyncTime(existing.lastSync || 'Mar 23, 2026 14:30');
      }
    }
  }, [id, segments]);

  const handleRunPreview = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setMemberCount(Math.floor(Math.random() * 80000) + 2000);
      setSyncTime(new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
      setIsCalculating(false);
    }, 1500);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setNameError('Segment name is required');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload = {
      name,
      autoSync,
      globalLogic,
      groups,
      memberCount: isCalculating ? 0 : memberCount, 
      lastSync: isCalculating ? 'Just now' : syncTime,
      datasets: [...new Set(groups.map(g => g.dataset))],
      conditions: groups.reduce((acc, g) => acc + g.conditions.length, 0),
      status: 'active',
      updated: 'Just now'
    };

    if (id) {
      updateSegment(id, payload);
      toast.success('Segment updated successfully!');
    } else {
      payload.id = `seg_${Date.now()}`;
      addSegment(payload);
      toast.success('Segment created successfully!');
    }
    
    navigate('/segments');
  };

  const applyTemplate = (templateName) => {
    switch (templateName) {
      case 'High Value At Risk':
        setName('High Value At Risk');
        setGroups([
           {
             id: 'grp_tpl_1',
             dataset: 'Loyalty Status',
             conditions: [{ id: 'cond_tpl_1', field: 'Tier', operator: 'In list', value: ['Gold', 'Platinum'] }]
           },
           {
             id: 'grp_tpl_2',
             dataset: 'Transaction Behavior',
             conditions: [{ id: 'cond_tpl_2', field: 'No Transaction in X days', operator: 'Equal', value: '60' }]
           }
        ]);
        break;
      case 'Points Expiry Alert':
        setName('Points Expiry Alert');
        setGroups([
           {
             id: 'grp_tpl_1',
             dataset: 'Loyalty Status',
             conditions: [
               { id: 'cond_tpl_1', field: 'Points Expiring in X days', operator: 'Equal', value: '30' },
               { id: 'cond_tpl_2', field: 'Never Redeemed', operator: 'Equal', value: 'False' }
             ]
           }
        ]);
        break;
      case 'Churning Users':
        setName('Churning Users Risk');
        setGroups([
           {
             id: 'grp_tpl_1',
             dataset: 'App Engagement',
             conditions: [{ id: 'cond_tpl_1', field: 'No Login in X days', operator: 'Equal', value: '30' }]
           },
           {
             id: 'grp_tpl_2',
             dataset: 'Transaction Behavior',
             conditions: [{ id: 'cond_tpl_2', field: 'Last Transaction', operator: 'More than X days ago', value: '45' }]
           }
        ]);
        break;
      case 'New Verified Users':
        setName('New Verified Users');
        setGroups([
          {
            id: 'grp_tpl_1',
            dataset: 'Customer Profile',
            conditions: [
              { id: 'cond_tpl_1', field: 'Registration Date', operator: 'In last X days', value: '30' },
              { id: 'cond_tpl_2', field: 'KYC Status', operator: 'Equal', value: 'Verified' }
            ]
          }
        ]);
        break;
    }
    setTemplateModalOpen(false);
    toast.success(`${templateName} template applied.`);
    handleRunPreview();
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto h-full fade-in pb-32">
      <PageHeader 
        title={id ? 'Edit Segment' : 'Create Segment'}
        breadcrumbs={['Segments', id ? 'Edit' : 'Create New']}
        action={
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => setTemplateModalOpen(true)}>
              <Wand2 className="w-4 h-4 mr-2" />
              Use Template
            </Button>
            <Button variant="ghost" onClick={() => navigate('/segments')}>Cancel</Button>
            <Button onClick={handleSave} className="bg-[#1D4ED8] hover:bg-[#1E3A8A]">
              <Save className="w-4 h-4 mr-2" />
              Save Segment
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Left Column - Builder */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-sm">1</span>
              Basic Information
            </h3>
            <div className="space-y-8">
              <Input 
                label="Segment Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if(e.target.value) setNameError('');
                }}
                error={nameError}
                placeholder="e.g. High Value Customers (> $500)"
                className="text-lg py-6"
              />
              
              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                <div className="max-w-md">
                  <h4 className="text-base font-semibold text-[#0F172A] flex items-center gap-2">
                    Auto-sync Configuration
                    {autoSync && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
                  </h4>
                  <p className="text-sm text-[#64748B] mt-1 mb-3">Sync this audience dynamically every day.</p>
                  
                  {autoSync && (
                    <div className="flex items-center gap-4 text-[13px] font-medium text-[#1D4ED8] bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 w-fit">
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Next sync: 5h 23m</div>
                      <span className="w-px h-4 bg-blue-200"></span>
                      <button className="flex items-center gap-1 hover:underline"><History className="w-4 h-4" /> Sync history</button>
                    </div>
                  )}
                </div>
                <Toggle checked={autoSync} onChange={setAutoSync} className="scale-125 origin-right" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E2E8F0] justify-between">
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-sm">2</span>
                Audience Rules
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <AlertCircle className="w-4 h-4" /> Cross-dataset computation enabled
              </div>
            </div>
            
            <ConditionBuilder 
              groups={groups} 
              setGroups={setGroups} 
              globalLogic={globalLogic} 
              setGlobalLogic={setGlobalLogic} 
            />
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="xl:col-span-1">
          <SegmentPreviewCard 
            isCalculating={isCalculating}
            memberCount={memberCount}
            syncTime={syncTime}
            onRunPreview={handleRunPreview}
            groups={groups}
          />
        </div>
      </div>

      <Modal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        title="Use a preset template"
        actionLabel="Cancel"
        onAction={() => setTemplateModalOpen(false)}
      >
        <div className="grid gap-3 mt-4 mb-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {[
            { name: 'High Value At Risk', desc: 'Tier Gold/Platinum + No Transaction > 60d' },
            { name: 'Points Expiry Alert', desc: 'Points Expiring < 30d + Never Redeemed' },
            { name: 'Churning Users', desc: 'No Login 30d + Last Transaction > 45d' },
            { name: 'New Verified Users', desc: 'Reg. Date < 30d + Verified KYC' }
          ].map(tpl => (
            <button
              key={tpl.name}
              onClick={() => applyTemplate(tpl.name)}
              className="group flex flex-col p-4 border border-[#E2E8F0] rounded-lg bg-white hover:bg-blue-50 hover:border-[#2563EB] transition-all text-left w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <div className="font-bold text-[#0F172A] group-hover:text-[#1D4ED8] mb-1">{tpl.name}</div>
              <div className="text-xs text-[#64748B] font-medium uppercase tracking-wide">{tpl.desc}</div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
