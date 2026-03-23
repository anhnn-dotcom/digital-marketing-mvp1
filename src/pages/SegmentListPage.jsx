import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, LayoutList, RefreshCw, CheckCircle2, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../components/layout/PageHeader';
import SegmentTable from '../components/segments/SegmentTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Drawer from '../components/ui/Drawer';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { useAppContext } from '../context/AppContext';

export default function SegmentListPage() {
  const navigate = useNavigate();
  const { segments, updateSegment, deleteSegment, addSegment, campaigns } = useAppContext();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [segmentToDelete, setSegmentToDelete] = useState(null);
  
  const [campaignsDrawerOpen, setCampaignsDrawerOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Derived state for summary bar
  const totalSegments = segments.length;
  const activeSegments = segments.filter(s => s.status === 'active').length;
  const syncingSegments = segments.filter(s => s.status === 'syncing').length;
  const totalMembers = segments.reduce((acc, curr) => acc + curr.memberCount, 0);

  const handleDelete = () => {
    if (segmentToDelete) {
      deleteSegment(segmentToDelete.id);
      toast.success(`Segment "${segmentToDelete.name}" deleted successfully.`);
      setSegmentToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const openDeleteConfirm = (segment) => {
    setSegmentToDelete(segment);
    setDeleteModalOpen(true);
  };

  const handleCreate = () => navigate('/segments/create');

  const handleDuplicate = (segment) => {
    const copy = { ...segment, id: `seg_${Date.now()}`, name: `Copy of ${segment.name}`, status: 'inactive' };
    addSegment(copy);
    toast.success(`Segment duplicated as "${copy.name}".`);
  };

  const handleSync = (segment) => {
    toast(`Syncing ${segment.name}...`);
    updateSegment(segment.id, { status: 'syncing' });
    setTimeout(() => {
      updateSegment(segment.id, { status: 'active', lastSync: 'Just now' });
      toast.success(`${segment.name} sync complete.`);
    }, 2000);
  };

  const handleToggleStatus = (segment) => {
    const newStatus = segment.status === 'active' ? 'inactive' : 'active';
    updateSegment(segment.id, { status: newStatus });
    toast.success(`${segment.name} is now ${newStatus}.`);
  };

  const openCampaignsView = (segment) => {
    setSelectedSegment(segment);
    setCampaignsDrawerOpen(true);
  };
  
  const relatedCampaigns = selectedSegment ? campaigns.filter(c => c.segment?.includes(selectedSegment.name) || selectedSegment.name?.includes(c.segment)) : [];

  return (
    <div className="p-8 max-w-[1400px] mx-auto flex flex-col h-full fade-in pb-24">
      <PageHeader 
        title="Segments" 
        action={
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Create Segment
          </Button>
        }
      />
      
      {/* Summary Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-sm hide-scrollbar overflow-x-auto">
        <div className="flex items-center gap-3 pr-6 border-r border-[#E2E8F0] min-w-max">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <LayoutList className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Segments</p>
            <p className="text-xl font-bold text-slate-900 leading-none mt-1">{totalSegments}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 pr-6 border-r border-[#E2E8F0] min-w-max">
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active Models</p>
            <p className="text-xl font-bold text-slate-900 leading-none mt-1">{activeSegments}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 pr-6 border-r border-[#E2E8F0] min-w-max">
          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Members Covered</p>
            <p className="text-xl font-bold text-slate-900 leading-none mt-1">{new Intl.NumberFormat('en-US').format(totalMembers)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 min-w-max">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <RefreshCw className={`w-5 h-5 text-blue-600 ${syncingSegments > 0 ? 'animate-spin spin-slow' : ''}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Syncing Now</p>
            <p className="text-xl font-bold text-slate-900 leading-none mt-1">{syncingSegments}</p>
          </div>
        </div>
      </div>

      {segments.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-[#E2E8F0]">
          <EmptyState 
            title="No segments found"
            description="Create your first audience segment to start targeting users in campaigns."
            actionLabel="Create Segment"
            onAction={handleCreate}
          />
        </div>
      ) : (
        <SegmentTable 
          segments={segments} 
          onView={(segment) => navigate(`/segments/edit/${segment.id}`)}
          onEdit={(segment) => navigate(`/segments/edit/${segment.id}`)}
          onDuplicate={handleDuplicate}
          onSync={handleSync}
          onToggleStatus={handleToggleStatus}
          onDelete={openDeleteConfirm}
          onViewCampaigns={openCampaignsView}
        />
      )}

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Segment"
        actionLabel="Delete"
        isDestructive={true}
        onAction={handleDelete}
      >
        <p className="text-sm text-[#0F172A] font-medium mb-2">
          This segment has <span className="text-[#DC2626]">{segmentToDelete ? new Intl.NumberFormat('en-US').format(segmentToDelete.memberCount) : 0} members</span> and might be used in active campaigns.
        </p>
        <p className="text-sm text-[#64748B]">
          Deleting it will stop targeting logic for those campaigns. This cannot be undone.
        </p>
      </Modal>

      <Drawer
        isOpen={campaignsDrawerOpen}
        onClose={() => setCampaignsDrawerOpen(false)}
        title="Campaigns using this segment"
      >
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{selectedSegment?.name}</h3>
          
          {relatedCampaigns.length > 0 ? (
            <div className="space-y-4">
              {relatedCampaigns.map(camp => (
                <div key={camp.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="font-semibold text-gray-900 mb-1">{camp.name}</div>
                  <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                    {camp.type} <span className="text-gray-300">•</span>
                    <Badge variant={camp.status === 'Running' || camp.status === 'Active' ? 'green' : 'gray'} className="px-1.5 py-0">
                      {camp.status}
                    </Badge>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => navigate(`/campaigns/${camp.id}`)}>
                    View Campaign
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Megaphone className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900">No campaigns using this segment yet</p>
              <p className="text-xs text-gray-500 mb-4 mt-1">This segment is ready to be used.</p>
              <Button size="sm" onClick={() => navigate('/campaigns/create')}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Create Campaign
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
