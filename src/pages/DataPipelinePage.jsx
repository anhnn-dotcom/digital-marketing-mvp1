import React, { useState } from 'react';
import { Database, Filter, Plus, Activity, Layers, ActivitySquare, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAppContext } from '../context/AppContext';

import SourceCard from '../components/pipeline/SourceCard';
import JobTable from '../components/pipeline/JobTable';
import ActivityLog from '../components/pipeline/ActivityLog';
import SourceDrawerForm from '../components/pipeline/SourceDrawerForm';
import JobDrawerForm from '../components/pipeline/JobDrawerForm';

export default function DataPipelinePage() {
  const { 
    dataSources, updateSource, addSource, deleteSource,
    enrichmentJobs, updateJob, addJob, deleteJob,
    pipelineLog, setPipelineLog, addLogEntry 
  } = useAppContext();

  // Drawers state
  const [sourceDrawerOpen, setSourceDrawerOpen] = useState(false);
  const [jobDrawerOpen, setJobDrawerOpen] = useState(false);
  
  // Editing state
  const [editingSource, setEditingSource] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  // Stats calculation
  const totalSources = dataSources?.length || 0;
  const totalIngested = dataSources?.reduce((acc, src) => acc + (src.recordCount || 0), 0) || 0;
  
  const completedJobs = enrichmentJobs?.filter(j => j.status === 'Completed') || [];
  const avgEnrichment = completedJobs.length > 0 
    ? completedJobs.reduce((acc, j) => acc + parseFloat(j.enrichmentRate), 0) / completedJobs.length
    : 0;

  const failedJobsCount = enrichmentJobs?.filter(j => j.status === 'Failed').length || 0;

  // Formatting large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return num;
  };

  // --- Handlers for Sources ---
  const handleOpenSourceForm = (source = null) => {
    setEditingSource(source);
    setSourceDrawerOpen(true);
  };

  const handleSaveSource = (data) => {
    if (editingSource) {
      updateSource(editingSource.id, data);
      toast.success('Source updated successfully.');
      addLogEntry({
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'info',
        source: data.name,
        message: 'Source configuration updated'
      });
    } else {
      const newSource = { ...data, id: `ds_${Date.now()}` };
      addSource(newSource);
      toast.success('Source connected successfully.');
      addLogEntry({
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'success',
        source: data.name,
        message: 'New source connected successfully'
      });
    }
    setSourceDrawerOpen(false);
  };

  const handleDisconnectSource = (source) => {
    if (source.status === 'Disconnected') {
      deleteSource(source.id);
      toast.success('Source removed.');
    } else {
      updateSource(source.id, { status: 'Disconnected' });
      toast.success('Source disconnected.');
      addLogEntry({
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'warning',
        source: source.name,
        message: 'Source disconnected manually'
      });
    }
  };

  const handleSyncSource = (source) => {
    toast(`Syncing ${source.name}...`);
    setTimeout(() => {
      updateSource(source.id, { lastSync: 'Just now', status: 'Connected' });
      toast.success(`${source.name} sync complete.`);
      addLogEntry({
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'sync',
        source: source.name,
        message: 'Manual sync completed',
        details: `Ingested latest records without errors.`
      });
    }, 2000);
  };

  // --- Handlers for Jobs ---
  const handleOpenJobForm = (job = null) => {
    setEditingJob(job);
    setJobDrawerOpen(true);
  };

  const handleSaveJob = (data) => {
    if (editingJob) {
      updateJob(editingJob.id, data);
      toast.success('Job updated successfully.');
    } else {
      const newJob = { ...data, id: `job_${Date.now()}` };
      addJob(newJob);
      toast.success('Enrichment job scheduling created.');
      addLogEntry({
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'info',
        source: data.name,
        message: 'New enrichment job defined'
      });
    }
    setJobDrawerOpen(false);
  };

  const handleDeleteJob = (job) => {
    deleteJob(job.id);
    toast.success('Job deleted.');
  };

  const handleTogglePauseJob = (job) => {
    const newStatus = job.status === 'Paused' ? 'Scheduled' : 'Paused';
    updateJob(job.id, { status: newStatus });
    toast.success(`Job ${newStatus.toLowerCase()}.`);
  };

  const handleRunJob = (job) => {
    if (job.status === 'Running') return;
    updateJob(job.id, { status: 'Running' });
    toast(`Running job: ${job.name}`);
    addLogEntry({
      id: `log_${Date.now()}_start`,
      timestamp: new Date().toISOString(),
      type: 'info',
      source: job.name,
      message: 'Job started manually'
    });

    setTimeout(() => {
      updateJob(job.id, { status: 'Completed', lastRun: 'Just now' });
      toast.success(`Job completed: ${job.name}`);
      addLogEntry({
        id: `log_${Date.now()}_end`,
        timestamp: new Date().toISOString(),
        type: 'job',
        source: job.name,
        message: 'Job completed successfully',
        details: `Processed records with output to ${job.outputDataset}.`
      });
    }, 3000);
  };

  const handleClearLogs = () => {
    setPipelineLog([]);
    toast.success('Activity log cleared.');
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-full fade-in pb-24 space-y-8">
      <PageHeader 
        title="Data Enrichment Pipeline" 
        action={
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => handleOpenSourceForm()}>
              <Database className="w-4 h-4 mr-2" />
              Add Data Source
            </Button>
            <Button onClick={() => handleOpenJobForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Create Job
            </Button>
          </div>
        }
      />

      {/* SECTION 1: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#64748B]">Connected Sources</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">{totalSources}</div>
          <div className="flex items-center text-sm font-medium text-[#64748B]">
            All syncing as expected
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#64748B]">Records Ingested</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">{formatNumber(totalIngested)}</div>
          <div className="flex items-center text-sm font-medium text-[#10B981]">
            <Activity className="w-4 h-4 mr-1" />
            +8% vs last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#64748B]">Enrichment Rate</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <ActivitySquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">{avgEnrichment.toFixed(1)}%</div>
          <div className="flex items-center text-sm font-medium text-[#10B981]">
            <Activity className="w-4 h-4 mr-1" />
            +2.1% vs last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#64748B]">Failed Jobs (7d)</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight relative">
            {failedJobsCount}
            {failedJobsCount > 0 && <span className="absolute top-1 -right-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>}
          </div>
          <div className="flex items-center text-sm font-medium text-[#10B981]">
            <Activity className="w-4 h-4 mr-1" />
            -1 vs last week
          </div>
        </div>
      </div>

      {/* SECTION 2: Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* Left Column - Enrichment Jobs */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">Enrichment Jobs</h2>
              <p className="text-sm text-[#64748B] mt-1">Scheduled tasks to clean, merge, and score incoming data.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Filter className="w-4 h-4 mr-2"/> Filter
              </Button>
            </div>
          </div>
          <JobTable 
            jobs={enrichmentJobs || []} 
            dataSources={dataSources || []}
            onRun={handleRunJob}
            onTogglePause={handleTogglePauseJob}
            onEdit={handleOpenJobForm}
            onDelete={handleDeleteJob}
          />
        </div>

        {/* Right Column - Data Sources Grid */}
        <div className="xl:col-span-1 border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl p-6 shadow-sm overflow-y-auto max-h-[700px] custom-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#0F172A]">Data Sources</h2>
            <Badge variant="blue">{totalSources} Linked</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {(dataSources || []).map(source => (
              <SourceCard 
                key={source.id} 
                source={source} 
                onSync={handleSyncSource}
                onDisconnect={handleDisconnectSource}
              />
            ))}
            {totalSources === 0 && (
              <div className="text-center py-10 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                No data sources connected yet.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* SECTION 3: Activity Log */}
      <div className="mt-4">
        <ActivityLog logs={pipelineLog || []} onClear={handleClearLogs} />
      </div>

      {/* Drawers */}
      <SourceDrawerForm 
        isOpen={sourceDrawerOpen} 
        onClose={() => setSourceDrawerOpen(false)}
        initialData={editingSource}
        onSave={handleSaveSource}
      />

      <JobDrawerForm
        isOpen={jobDrawerOpen}
        onClose={() => setJobDrawerOpen(false)}
        initialData={editingJob}
        onSave={handleSaveJob}
        dataSources={dataSources || []}
      />
    </div>
  );
}
