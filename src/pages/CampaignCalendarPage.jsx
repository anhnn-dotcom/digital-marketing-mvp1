import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Megaphone, 
  Clock, 
  Users, 
  Repeat, 
  LayoutGrid, 
  List, 
  Settings,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { CAMPAIGNS } from '../constants/mockData';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CURRENT_WEEK = 'Mar 23 - Mar 29, 2026';

export default function CampaignCalendarPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('Week');
  
  // Mapping campaigns to specific days for visualization
  // In a real app this would use campaign.schedule to compute these
  const calendarData = useMemo(() => {
    const data = {
      Monday: [
        { id: 'cmp_1', name: 'Gold Win-Back', time: '09:00', status: 'Running', type: 'DM', members: '3,847' },
        { id: 'cmp_3', name: 'Birthday Reward', time: '00:01', status: 'Active', type: 'Loyalty', members: '418' },
        { id: 'cmp_5', name: 'Tier Upgrade', time: '08:00', status: 'Active', type: 'Loyalty', members: '892' },
      ],
      Tuesday: [
        { id: 'cmp_1', name: 'Gold Win-Back', time: '09:00', status: 'Running', type: 'DM', members: '3,847' },
        { id: 'cmp_2', name: 'Points Expiry', time: '10:00', status: 'Completed', type: 'DM', members: '1,203' },
        { id: 'cmp_3', name: 'Birthday Reward', time: '00:01', status: 'Active', type: 'Loyalty', members: '418' },
      ],
      Wednesday: [
        { id: 'cmp_1', name: 'Gold Win-Back', time: '09:00', status: 'Running', type: 'DM', members: '3,847' },
        { id: 'cmp_3', name: 'Birthday Reward', time: '00:01', status: 'Active', type: 'Loyalty', members: '418' },
        { id: 'cmp_6', name: 'Never Redeemed', time: '09:00', status: 'Scheduled', type: 'DM', members: '5,621', conflict: true },
      ],
      Thursday: [
        { id: 'cmp_1', name: 'Gold Win-Back', time: '09:00', status: 'Running', type: 'DM', members: '3,847' },
        { id: 'cmp_3', name: 'Birthday Reward', time: '00:01', status: 'Active', type: 'Loyalty', members: '418' },
        { id: 'cmp_2', name: 'Points Expiry', time: '10:00', status: 'Scheduled', type: 'DM', members: '1,203' },
      ],
      Friday: [
        { id: 'cmp_1', name: 'Gold Win-Back', time: '09:00', status: 'Running', type: 'DM', members: '3,847' },
        { id: 'cmp_3', name: 'Birthday Reward', time: '00:01', status: 'Active', type: 'Loyalty', members: '418' },
        { id: 'CAM-TH-004', name: 'Flash Deal Friday', time: '09:00', status: 'Scheduled', type: 'DM', members: '15,420', conflict: true },
      ],
      Saturday: [
        { id: 'cmp_3', name: 'Birthday Reward', time: '00:01', status: 'Active', type: 'Loyalty', members: '418' },
      ],
      Sunday: [
        { id: 'cmp_3', name: 'Birthday Reward', time: '00:01', status: 'Active', type: 'Loyalty', members: '418' },
        { id: 'cmp_9', name: 'Dormant React.', time: '08:00', status: 'Active', type: 'DM', members: '12,445' },
      ],
    };
    return data;
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Running': return 'bg-blue-100 border-blue-200 text-blue-700';
      case 'Active': return 'bg-green-100 border-green-200 text-green-700';
      case 'Scheduled': return 'bg-indigo-100 border-indigo-200 text-indigo-700';
      case 'Completed': return 'bg-slate-100 border-slate-200 text-slate-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-500';
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto fade-in h-screen flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#2563EB]" />
            Campaign Calendar
          </h1>
          <p className="text-[#64748B] mt-1 italic flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            2 scheduling conflicts detected this week (Wed, Fri)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-[#E2E8F0] p-1 rounded-lg">
            <button 
              onClick={() => setView('Month')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === 'Month' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              Month
            </button>
            <button 
              onClick={() => setView('Week')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === 'Week' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setView('Day')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === 'Day' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
            >
              Day
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] p-1 rounded-lg">
             <button className="p-1.5 hover:bg-[#F8FAFC] rounded-md transition-colors"><ChevronLeft className="w-4 h-4 text-[#64748B]" /></button>
             <span className="text-sm font-bold text-[#0F172A] px-2">{CURRENT_WEEK}</span>
             <button className="p-1.5 hover:bg-[#F8FAFC] rounded-md transition-colors"><ChevronRight className="w-4 h-4 text-[#64748B]" /></button>
          </div>
          <Button onClick={() => navigate('/campaigns/create')}>New Campaign</Button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-[#E2E8F0]">
          {DAYS_OF_WEEK.map((day, idx) => (
            <div key={day} className={`px-4 py-4 text-center border-r border-[#E2E8F0] last:border-r-0 ${idx % 7 === 0 ? 'bg-[#F1F5F9]' : ''}`}>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{day}</span>
              <div className={`mt-1 text-lg font-black ${idx === 0 ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                {23 + idx}
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-7 divide-x divide-[#E2E8F0]">
          {DAYS_OF_WEEK.map((day, idx) => (
            <div key={day} className={`p-2 space-y-2 min-h-0 bg-opacity-30 ${idx === 0 ? 'bg-blue-50' : 'bg-transparent'}`}>
              {calendarData[day].map((cmp, cIdx) => (
                <div 
                  key={cIdx} 
                  onClick={() => navigate(`/campaigns/${cmp.id}`)}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer group hover:shadow-lg hover:-translate-y-0.5 relative ${getStatusColor(cmp.status)} ${cmp.conflict ? 'border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : ''}`}
                >
                  {cmp.conflict && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white border-2 border-white" title="Scheduling Conflict">
                      <AlertCircle className="w-2.5 h-2.5" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase opacity-70 tracking-tighter flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {cmp.time}
                    </span>
                    <span className={`text-[9px] font-black px-1 rounded ${cmp.type === 'DM' ? 'bg-indigo-200 text-indigo-700' : 'bg-green-200 text-green-700'}`}>
                      {cmp.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A] leading-tight group-hover:text-blue-700 line-clamp-2 mb-2">{cmp.name}</h4>
                  <div className="flex items-center gap-3 text-[10px] opacity-80 mt-auto">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {cmp.members}
                    </div>
                    {cmp.status === 'Active' && (
                      <div className="flex items-center gap-1">
                        <Repeat className="w-3 h-3" />
                        Daily
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Draft area */}
              <div className="h-20 border-2 border-dashed border-[#E2E8F0] rounded-xl flex items-center justify-center text-[#94A3B8] hover:border-[#2563EB] hover:text-[#2563EB] cursor-pointer transition-all hover:bg-blue-50 group mt-4">
                 <span className="text-xs font-medium">+ Schedule</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-8 text-xs text-[#64748B]">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /> Running</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /> Active (Recurring)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500" /> Scheduled (One-time)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-400" /> Completed</div>
        <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 font-bold">
          <AlertCircle className="w-3 h-3" /> High Volume Conflict
        </div>
      </div>
    </div>
  );
}
