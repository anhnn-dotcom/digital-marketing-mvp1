import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home,
  Users, 
  Megaphone, 
  LayoutTemplate, 
  Bell, 
  Sparkles, 
  BarChart3,
  Settings,
  Database
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Sidebar() {
  const { segments, campaigns, contents, rules } = useAppContext();
  const location = useLocation();

  const NAV_ITEMS = [
    { path: '/', label: 'Overview', icon: Home, exact: true },
    { path: '/segments', label: 'Segments', icon: Users, badge: segments.length },
    { path: '/campaigns', label: 'Campaigns', icon: Megaphone, badge: campaigns.filter(c => c.status === 'Running' || c.status === 'Active').length, badgeColor: 'bg-green-100 text-green-700' },
    { path: '/dynamic-content', label: 'Dynamic Content', icon: LayoutTemplate, badge: contents.length },
    { path: '/push-notifications', label: 'Push Notification', icon: Bell, badge: 1, badgeColor: 'bg-red-100 text-red-700' }, // Mocking 1 pending
    { path: '/recommendations', label: 'Recommendations', icon: Sparkles },
    { path: '/data-pipeline', label: 'Data Pipeline', icon: Database },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <div className="w-[240px] h-full bg-white border-r border-[#E2E8F0] flex flex-col flex-shrink-0 z-50">
      <div className="h-16 flex items-center px-6 border-b border-[#E2E8F0]">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2563EB] rounded flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-[#0F172A] text-lg tracking-tight">DM Portal</span>
        </NavLink>
      </div>

      <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          // Check if link is active (including nested routes)
          const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={() =>
                `flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-[#DBEAFE] text-[#1D4ED8] font-medium border-l-4 border-[#1D4ED8] -ml-1 pl-4'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] ml-0 border-l-4 border-transparent pl-3'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge !== 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor ? item.badgeColor : 'bg-[#E2E8F0] text-[#475569]'}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E2E8F0]">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}
