import PageHeader from '../components/layout/PageHeader';
import CampaignWizard from '../components/campaigns/CampaignWizard';

export default function CreateCampaignPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col pb-24 fade-in">
      <PageHeader 
        title="Create Campaign" 
        breadcrumbs={['Campaigns', 'Create New']}
      />
      <div className="flex-1 min-h-0">
        <CampaignWizard />
      </div>
    </div>
  );
}
