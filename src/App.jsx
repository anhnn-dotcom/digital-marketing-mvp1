import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import { Toaster } from 'sonner';

import { AppProvider } from './context/AppContext';

import SegmentListPage from './pages/SegmentListPage';
import CreateSegmentPage from './pages/CreateSegmentPage';
import CampaignListPage from './pages/CampaignListPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import CampaignDashboardPage from './pages/CampaignDashboardPage';
import DynamicContentPage from './pages/DynamicContentPage';
import PushNotificationPage from './pages/PushNotificationPage';
import PushNotificationListPage from './pages/PushNotificationListPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ReportsPage from './pages/ReportsPage';
import OverviewDashboardPage from './pages/OverviewDashboardPage';
import DataPipelinePage from './pages/DataPipelinePage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import AudienceInsightsPage from './pages/AudienceInsightsPage';
import CampaignOptimizationPage from './pages/CampaignOptimizationPage';
import NotificationsPage from './pages/NotificationsPage';
import ActivityLogPage from './pages/ActivityLogPage';
import CampaignCalendarPage from './pages/CampaignCalendarPage';

function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen bg-[#F8FAFC]">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-[#F8FAFC]">
          <TopHeader />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<OverviewDashboardPage />} />
              <Route path="/segments" element={<SegmentListPage />} />
              <Route path="/segments/create" element={<CreateSegmentPage />} />
              <Route path="/segments/edit/:id" element={<CreateSegmentPage />} />
              <Route path="/campaigns" element={<CampaignListPage />} />
              <Route path="/campaigns/calendar" element={<CampaignCalendarPage />} />
              <Route path="/campaigns/create" element={<CreateCampaignPage />} />
              <Route path="/campaigns/edit/:id" element={<CreateCampaignPage />} />
              <Route path="/campaigns/:id" element={<CampaignDashboardPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/activity-log" element={<ActivityLogPage />} />
              <Route path="/dynamic-content" element={<DynamicContentPage />} />
              <Route path="/push-notifications" element={<PushNotificationListPage />} />
              <Route path="/push-notifications/create" element={<PushNotificationPage />} />
              <Route path="/push-notifications/:id" element={<PushNotificationPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/data-pipeline" element={<DataPipelinePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/analytics" element={<AnalyticsDashboardPage />} />
              <Route path="/insights" element={<AudienceInsightsPage />} />
              <Route path="/optimize" element={<CampaignOptimizationPage />} />
            </Routes>
          </div>
        </main>
        <Toaster position="top-right" />
      </div>
    </AppProvider>
  );
}

export default App;
