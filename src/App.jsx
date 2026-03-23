import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import { Toaster } from 'sonner';

import { AppProvider } from './context/AppContext';

import SegmentListPage from './pages/SegmentListPage';
import CreateSegmentPage from './pages/CreateSegmentPage';
import CampaignListPage from './pages/CampaignListPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import CampaignDashboardPage from './pages/CampaignDashboardPage';
import DynamicContentPage from './pages/DynamicContentPage';
import PushNotificationPage from './pages/PushNotificationPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ReportsPage from './pages/ReportsPage';
import OverviewDashboardPage from './pages/OverviewDashboardPage';
import DataPipelinePage from './pages/DataPipelinePage';

function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen bg-[#F8FAFC]">
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto min-w-0 bg-[#F8FAFC]">
          <div className="h-full">
            <Routes>
              <Route path="/" element={<OverviewDashboardPage />} />
              <Route path="/segments" element={<SegmentListPage />} />
              <Route path="/segments/create" element={<CreateSegmentPage />} />
              <Route path="/segments/edit/:id" element={<CreateSegmentPage />} />
              <Route path="/campaigns" element={<CampaignListPage />} />
              <Route path="/campaigns/create" element={<CreateCampaignPage />} />
              <Route path="/campaigns/edit/:id" element={<CreateCampaignPage />} />
              <Route path="/campaigns/:id" element={<CampaignDashboardPage />} />
              <Route path="/dynamic-content" element={<DynamicContentPage />} />
              <Route path="/push-notifications" element={<PushNotificationPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/data-pipeline" element={<DataPipelinePage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </div>
        </main>
        <Toaster position="top-right" />
      </div>
    </AppProvider>
  );
}

export default App;
