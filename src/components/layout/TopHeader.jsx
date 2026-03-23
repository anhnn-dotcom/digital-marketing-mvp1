import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, AlertTriangle, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [filter, setFilter] = useState('All');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, type: 'Alert', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', title: 'Content Fatigue Warning', desc: 'Gold Win-Back banner CTR dropped by 53%', time: '2h ago', link: '/optimize' },
    { id: 2, type: 'Test', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50', title: 'A/B Test Concluded', desc: 'Variant B won for Loan Retargeting', time: '5h ago', link: '/optimize' },
    { id: 3, type: 'Campaign', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Campaign Activated', desc: 'Points Expiry campaign started sending', time: '1d ago', link: '/campaigns' },
  ];

  const filteredNotifs = filter === 'All' ? notifications : notifications.filter(n => n.type === filter);

  const unreadCount = 2; // Fixed mock count

  return (
    <div className="h-14 bg-white border-b border-[#E2E8F0] shadow-sm flex items-center justify-between px-6 flex-shrink-0 relative z-40">
      <div className="flex items-center w-96 relative">
        <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Global search (Cmd+K)" 
          className="w-full pl-9 pr-4 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E2E8F0] overflow-hidden">
              <div className="p-4 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#0F172A]">Notifications</h3>
                  <button className="text-xs text-[#2563EB] font-medium hover:underline">Mark all read</button>
                </div>
                <div className="flex gap-2">
                  {['All', 'Alert', 'Test', 'Campaign'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${filter === f ? 'bg-[#0F172A] text-white' : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto">
                {filteredNotifs.length > 0 ? (
                  <div className="divide-y divide-[#E2E8F0]">
                    {filteredNotifs.map(n => {
                      const Icon = n.icon;
                      return (
                        <div 
                          key={n.id} 
                          className="p-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors group flex items-start gap-4"
                          onClick={() => {
                            setShowNotifications(false);
                            navigate(n.link);
                          }}
                        >
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${n.bg}`}>
                             <Icon className={`w-5 h-5 ${n.color}`} />
                           </div>
                           <div className="flex-1 min-w-0">
                             <div className="text-sm font-medium text-[#0F172A] pr-4 relative">
                               {n.title}
                               <ChevronRight className="w-4 h-4 text-[#CBD5E1] absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="text-sm text-[#64748B] mt-0.5 truncate">{n.desc}</div>
                             <div className="text-xs text-[#94A3B8] mt-1">{n.time}</div>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-[#64748B] text-sm">
                    No notifications in this category.
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-[#E2E8F0] text-center bg-[#F8FAFC]">
                <button 
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/notifications');
                  }}
                  className="text-sm font-medium text-[#2563EB] hover:underline"
                >
                  View all
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
          NK
        </div>
      </div>
    </div>
  );
}
