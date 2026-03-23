import React, { useState } from 'react';
import { AlertTriangle, Zap, CheckCircle2, Info, Bell, Trash2, CheckCheck, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ALL_NOTIFICATIONS = [
  { id: 1, type: 'Alert', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50 border-red-100', title: 'Content Fatigue Warning', desc: 'Gold Win-Back banner CTR dropped by 53% over 7 days. Creative rotation recommended immediately.', time: '2h ago', timestamp: '2026-03-23 18:20', link: '/optimize', read: false },
  { id: 2, type: 'Test', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', title: 'A/B Test Concluded', desc: 'Variant B won for Loan Retargeting banner — +2.8% CTR lift. Ready to deploy.', time: '5h ago', timestamp: '2026-03-23 15:20', link: '/optimize', read: false },
  { id: 3, type: 'Campaign', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100', title: 'Campaign Activated', desc: 'Points Expiry Push — Week 12 campaign has started sending to 1,203 members.', time: '1d ago', timestamp: '2026-03-22 10:00', link: '/campaigns', read: true },
  { id: 4, type: 'Alert', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50 border-orange-100', title: 'Segment Sync Delayed', desc: 'VIP Churning — Priority segment sync is running 4x slower than expected. Check pipeline.', time: '2d ago', timestamp: '2026-03-21 08:15', link: '/data-pipeline', read: true },
  { id: 5, type: 'Info', icon: Info, color: 'text-slate-500', bg: 'bg-slate-50 border-slate-100', title: 'New Data Source Connected', desc: 'Offline Store Purchases (34,000 records) successfully connected and synced.', time: '3d ago', timestamp: '2026-03-20 14:30', link: '/data-pipeline', read: true },
  { id: 6, type: 'Campaign', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100', title: 'Campaign Completed', desc: 'Loan Product Retargeting completed — 2,156 members reached, 24% CTR achieved.', time: '3d ago', timestamp: '2026-03-20 11:00', link: '/campaigns', read: true },
  { id: 7, type: 'Alert', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50 border-red-100', title: 'Enrichment Job Failed', desc: 'Sync App Events to Engagement failed with connection timeout. Requires manual retry.', time: '4d ago', timestamp: '2026-03-19 13:00', link: '/data-pipeline', read: true },
  { id: 8, type: 'Test', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', title: 'New A/B Test Started', desc: 'Streak Bonus send time test started: 08:00 vs 12:00 for 3,150 members.', time: '5d ago', timestamp: '2026-03-18 09:00', link: '/optimize', read: true },
  { id: 9, type: 'Info', icon: Info, color: 'text-slate-500', bg: 'bg-slate-50 border-slate-100', title: 'Weekly Performance Summary', desc: 'Week 12 ended with 284K impressions, 12.4% CTR, ฿2.8M attributed revenue. +18% vs last week.', time: '6d ago', timestamp: '2026-03-17 08:00', link: '/analytics', read: true },
  { id: 10, type: 'Campaign', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100', title: 'MicroPay Phase 1 Scheduled', desc: 'MicroPay Pay & Earn — Phase 1 Launch campaign scheduled for Apr 1, 2026 targeting 8,430 members.', time: '7d ago', timestamp: '2026-03-16 10:00', link: '/campaigns', read: true },
];

const TYPE_COLORS = {
  Alert: 'bg-red-100 text-red-700',
  Campaign: 'bg-blue-100 text-blue-700',
  Test: 'bg-purple-100 text-purple-700',
  Info: 'bg-slate-100 text-slate-700',
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);
  const [filter, setFilter] = useState('All');
  const [readFilter, setReadFilter] = useState('All');

  const filtered = notifications.filter(n => {
    const typeMatch = filter === 'All' || n.type === filter;
    const readMatch = readFilter === 'All' || (readFilter === 'Unread' ? !n.read : n.read);
    return typeMatch && readMatch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismiss = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification dismissed');
  };

  const handleClick = (n) => {
    markRead(n.id);
    navigate(n.link);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#2563EB]" />
            Notification Center
          </h1>
          <p className="text-[#64748B] mt-1">
            {unreadCount > 0 ? (
              <span><span className="font-semibold text-[#2563EB]">{unreadCount} unread</span> · {notifications.length} total</span>
            ) : (
              <span>All caught up · {notifications.length} total</span>
            )}
          </p>
        </div>
        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-md text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          Mark all read
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-6 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#64748B]" />
          <span className="text-sm text-[#64748B] font-medium">Type:</span>
          {['All', 'Alert', 'Campaign', 'Test', 'Info'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === f ? 'bg-[#0F172A] text-white' : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-[#E2E8F0]" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748B] font-medium">Show:</span>
          {['All', 'Unread', 'Read'].map(f => (
            <button
              key={f}
              onClick={() => setReadFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                readFilter === f ? 'bg-[#2563EB] text-white' : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Bell className="w-12 h-12 text-[#CBD5E1] mx-auto mb-4" />
            <p className="text-[#64748B] font-medium">No notifications in this category</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {filtered.map(n => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 p-5 cursor-pointer transition-colors group relative ${
                    !n.read ? 'bg-[#EFF6FF] hover:bg-[#DBEAFE]' : 'hover:bg-[#F8FAFC]'
                  }`}
                  onClick={() => handleClick(n)}
                >
                  {/* Unread dot */}
                  {!n.read && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}

                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 ${n.bg} ml-3`}>
                    <Icon className={`w-5 h-5 ${n.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#0F172A] text-sm">{n.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[n.type]}`}>
                          {n.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-[#94A3B8] whitespace-nowrap">{n.time}</span>
                        <button
                          onClick={(e) => dismiss(n.id, e)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-[#94A3B8] hover:text-red-500"
                          title="Dismiss"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[#64748B] mt-1 line-clamp-2">{n.desc}</p>
                    <p className="text-xs text-[#94A3B8] mt-1.5">{n.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="p-3 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center text-xs text-[#94A3B8]">
            Showing {filtered.length} of {notifications.length} notifications
          </div>
        )}
      </div>
    </div>
  );
}
