import React, { useState, useEffect } from 'react';
import Drawer from '../ui/Drawer';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

export default function JobDrawerForm({ isOpen, onClose, initialData, onSave, dataSources }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Score',
    sourceIds: [],
    outputDataset: 'Customer Profile',
    schedule: 'Daily at 00:00',
    status: 'Scheduled'
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'Score',
        sourceIds: initialData.sourceIds || [],
        outputDataset: initialData.outputDataset || 'Customer Profile',
        schedule: initialData.schedule || 'Daily at 00:00',
        status: initialData.status || 'Scheduled'
      });
    } else if (isOpen) {
      setFormData({
        name: '',
        type: 'Score',
        sourceIds: [],
        outputDataset: 'Customer Profile',
        schedule: 'Daily at 00:00',
        status: 'Scheduled'
      });
    }
  }, [initialData, isOpen]);

  const toggleSource = (id) => {
    setFormData(prev => ({
      ...prev,
      sourceIds: prev.sourceIds.includes(id) 
        ? prev.sourceIds.filter(sId => sId !== id)
        : [...prev.sourceIds, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      recordsProcessed: initialData?.recordsProcessed || 0,
      recordsEnriched: initialData?.recordsEnriched || 0,
      enrichmentRate: initialData?.enrichmentRate || '0%',
      lastRun: initialData?.lastRun || 'Never',
      nextRun: initialData?.nextRun || 'Pending'
    });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Enrichment Job" : "Create Enrichment Job"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="p-6 flex flex-col h-full space-y-5">
        <Input 
          label="Job Name" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Daily LTV Calculation"
          required
        />
        
        <Select 
          label="Job Type"
          value={formData.type}
          onChange={e => setFormData({...formData, type: e.target.value})}
          options={['Score', 'Merge', 'Deduplicate', 'Transform', 'Augment']}
          required
        />

        <Select 
          label="Output Dataset"
          value={formData.outputDataset}
          onChange={e => setFormData({...formData, outputDataset: e.target.value})}
          options={['Customer Profile', 'Transaction Behavior', 'Loyalty Status', 'App Engagement']}
          required
        />

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Input Sources <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-200 rounded-lg p-2 max-h-48 overflow-y-auto space-y-1">
            {dataSources.length === 0 ? (
              <p className="text-sm text-gray-500 p-2 text-center">No sources available</p>
            ) : (
              dataSources.map(source => (
                <label key={source.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.sourceIds.includes(source.id)} 
                    onChange={() => toggleSource(source.id)} 
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">{source.name}</span>
                    <span className="text-xs text-gray-500 block">{source.type}</span>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>

        <Input 
          label="CRON Schedule or Frequency" 
          value={formData.schedule}
          onChange={e => setFormData({...formData, schedule: e.target.value})}
          placeholder="e.g. Daily at 02:00"
        />

        <div className="mt-auto pt-6 flex gap-3">
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={formData.sourceIds.length === 0 || !formData.name}>
            {initialData ? 'Save Changes' : 'Create Job'}
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
