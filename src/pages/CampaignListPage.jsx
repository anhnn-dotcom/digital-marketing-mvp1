import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import CampaignStatsBar from '../components/campaigns/CampaignStatsBar';
import CampaignTable from '../components/campaigns/CampaignTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import { CAMPAIGNS } from '../constants/mockData';

export default function CampaignListPage() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [activeFilter, setActiveFilter] = useState(null);

  // Modals state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [runModalOpen, setRunModalOpen] = useState(false);
  const [stopModalOpen, setStopModalOpen] = useState(false);
  
  const [activeCampaign, setActiveCampaign] = useState(null);

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(c => {
    if (!activeFilter) return true;
    if (activeFilter === 'Active') return c.status === 'Active' || c.status === 'Running';
    return c.status === activeFilter;
  });

  // Actions
  const handleCreate = () => navigate('/campaigns/create');
  const handleManage = (id) => navigate(`/campaigns/${id}`);
  
  const handleEdit = (campaign) => {
    toast(`Edit campaign: ${campaign.name}`);
    navigate(`/campaigns/edit/${campaign.id}`);
  };

  const openDeleteConfirm = (campaign) => {
    setActiveCampaign(campaign);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (activeCampaign) {
      setCampaigns(campaigns.filter(c => c.id !== activeCampaign.id));
      toast.success(`Campaign "${activeCampaign.name}" deleted.`);
      setDeleteModalOpen(false);
      setActiveCampaign(null);
    }
  };

  const openRunConfirm = (campaign) => {
    setActiveCampaign(campaign);
    setRunModalOpen(true);
  };

  const handleRunNow = () => {
    if (activeCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === activeCampaign.id ? { ...c, status: 'Running', nextRun: null, lastRun: 'Just now' } : c
      ));
      toast.success(`Campaign "${activeCampaign.name}" has started running.`);
      setRunModalOpen(false);
      setActiveCampaign(null);
    }
  };

  const openStopConfirm = (campaign) => {
    setActiveCampaign(campaign);
    setStopModalOpen(true);
  };

  const handleStop = () => {
    if (activeCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === activeCampaign.id ? { ...c, status: 'Active' } : c
      ));
      toast.success(`Campaign "${activeCampaign.name}" stopped.`);
      setStopModalOpen(false);
      setActiveCampaign(null);
    }
  };

  const handleDuplicate = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: `cmp_${Date.now()}`,
      name: `Copy of ${campaign.name}`,
      status: 'Inactive',
      processed: 0,
      lastRun: 'Never',
      nextRun: null
    };
    setCampaigns([newCampaign, ...campaigns]);
    toast.success(`Campaign duplicated successfully.`);
  };

  const handleToggleStatus = (campaign) => {
    const newStatus = campaign.status === 'Inactive' ? 'Active' : 'Inactive';
    setCampaigns(campaigns.map(c => 
      c.id === campaign.id ? { ...c, status: newStatus } : c
    ));
    toast.success(`Campaign ${newStatus.toLowerCase()}.`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col h-full fade-in pb-24">
      <PageHeader 
        title="Campaigns" 
        action={
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        }
      />
      
      <CampaignStatsBar 
        campaigns={campaigns} 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />

      {campaigns.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-[#E2E8F0]">
          <EmptyState 
            title="No campaigns yet"
            description="Create your first campaign to start engaging with your segmented audiences."
            actionLabel="Create Campaign"
            onAction={handleCreate}
          />
        </div>
      ) : (
        <CampaignTable 
          campaigns={filteredCampaigns} 
          onManage={handleManage}
          onEdit={handleEdit}
          onDelete={openDeleteConfirm}
          onRunNow={openRunConfirm}
          onStop={openStopConfirm}
          onDuplicate={handleDuplicate}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Campaign"
        actionLabel="Delete"
        isDestructive={true}
        onAction={handleDelete}
      >
        Are you sure you want to delete <strong>{activeCampaign?.name}</strong>? This cannot be undone.
      </Modal>

      <Modal
        isOpen={runModalOpen}
        onClose={() => setRunModalOpen(false)}
        title="Run Campaign"
        actionLabel="Run Now"
        onAction={handleRunNow}
      >
        Run campaign now for <strong>{new Intl.NumberFormat('en-US').format(activeCampaign?.totalMembers || 0)}</strong> members?
      </Modal>

      <Modal
        isOpen={stopModalOpen}
        onClose={() => setStopModalOpen(false)}
        title="Stop Campaign"
        actionLabel="Stop"
        isDestructive={true}
        onAction={handleStop}
      >
        Stop campaign? Current batch will finish but no new batches will start.
      </Modal>
    </div>
  );
}
