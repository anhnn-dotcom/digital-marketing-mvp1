import React, { useState, useEffect } from 'react';
import Drawer from '../ui/Drawer';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';

export default function SourceDrawerForm({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'CRM',
    connectionUrl: '',
    syncFrequency: 'Daily',
    autoSync: true
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'CRM',
        connectionUrl: initialData.connectionUrl || '',
        syncFrequency: initialData.syncFrequency || 'Daily',
        autoSync: initialData.status !== 'Disconnected'
      });
    } else if (isOpen) {
      setFormData({
        name: '',
        type: 'CRM',
        connectionUrl: '',
        syncFrequency: 'Daily',
        autoSync: true
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      status: formData.autoSync ? 'Connected' : 'Disconnected',
      recordCount: initialData?.recordCount || 0,
      fieldsCount: initialData?.fieldsCount || 10,
      lastSync: initialData?.lastSync || 'Never'
    });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Data Source" : "Add Data Source"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="p-6 flex flex-col h-full space-y-6">
        <Input 
          label="Source Name" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Production PostgreSQL"
          required
        />
        
        <Select 
          label="Source Type"
          value={formData.type}
          onChange={e => setFormData({...formData, type: e.target.value})}
          options={['CRM', 'Transactions', 'Loyalty', 'App Events', 'Custom', 'Manual Upload']}
          required
        />

        {formData.type !== 'Manual Upload' && (
          <Input 
            label="Connection URL / API Endpoint" 
            value={formData.connectionUrl}
            onChange={e => setFormData({...formData, connectionUrl: e.target.value})}
            placeholder="postgres://user:pass@host:5432/db"
          />
        )}

        {formData.type !== 'Manual Upload' ? (
          <Select 
            label="Sync Frequency"
            value={formData.syncFrequency}
            onChange={e => setFormData({...formData, syncFrequency: e.target.value})}
            options={['Real-time', 'Hourly', 'every 6 hours', 'Daily', 'Weekly']}
          />
        ) : (
          <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
            <p className="text-sm text-gray-500 mb-2">Upload CSV or JSON file</p>
            <Button type="button" variant="secondary" size="sm">Select File</Button>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
          <div>
            <h4 className="font-medium text-gray-900 text-sm">Enable Auto-sync</h4>
            <p className="text-xs text-gray-500 mt-0.5">Pause to temporarily stop ingestion</p>
          </div>
          <Toggle 
            checked={formData.autoSync} 
            onChange={(checked) => setFormData({...formData, autoSync: checked})} 
          />
        </div>

        <div className="mt-auto pt-6 flex gap-3">
          <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" className="flex-1">
            {initialData ? 'Save Changes' : 'Connect Source'}
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
