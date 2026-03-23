import { Link } from 'react-router-dom';
import { Megaphone, Calendar, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { useState, useEffect } from 'react';
import { getGreeting } from '../lib/edgeConfig';

export default function OverviewDashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    async function loadGreeting() {
      const data = await getGreeting();
      if (data) setGreeting(data);
    }
    loadGreeting();
  }, []);

  return (
    <div className="p-8 max-w-[1200px] mx-auto h-full flex flex-col fade-in space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader title={greeting || "Welcome, Marketing Team"} />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Edge Config Connected
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          
          {/* Active Campaigns Card */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 relative">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-600" /> Active Campaigns
            </h3>
            <div className="space-y-5">
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-[#0F172A]">Gold Member Win-Back — March</span>
                  <Badge variant="blue">Running</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar progress={45} className="flex-1" />
                  <span className="text-xs text-[#64748B] w-12 text-right">45%</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-[#0F172A]">Birthday Reward — Auto</span>
                  <Badge variant="green">Active</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar progress={100} className="flex-1" />
                  <span className="text-xs text-[#64748B] w-12 text-right">100%</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-[#0F172A]">Tier Upgrade Nudge</span>
                  <Badge variant="green">Active</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar progress={22} className="flex-1" />
                  <span className="text-xs text-[#64748B] w-12 text-right">22%</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-[#0F172A]">Dormant Reactivation — Q1</span>
                  <Badge variant="green">Active</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar progress={33} className="flex-1" />
                  <span className="text-xs text-[#64748B] w-12 text-right">33%</span>
                </div>
              </div>

            </div>
            <Link to="/campaigns" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-6">
              View all campaigns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Upcoming Schedules */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" /> Upcoming Schedules
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-xs font-bold text-gray-400 bg-gray-100 rounded p-1.5 w-14 text-center">09:00</div>
                <div>
                  <div className="text-sm font-medium text-[#0F172A] flex gap-2">VIP Churn Prevention</div>
                  <div className="text-xs text-[#64748B] mt-0.5">Mar 24 · 234 members</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-xs font-bold text-gray-400 bg-gray-100 rounded p-1.5 w-14 text-center">09:00</div>
                <div>
                  <div className="text-sm font-medium text-[#0F172A] flex gap-2">Birthday Reward</div>
                  <div className="text-xs text-[#64748B] mt-0.5">Mar 24 · 418 members</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-xs font-bold text-gray-400 bg-gray-100 rounded p-1.5 w-14 text-center">10:00</div>
                <div>
                  <div className="text-sm font-medium text-[#0F172A] flex gap-2">Tier Upgrade Nudge</div>
                  <div className="text-xs text-[#64748B] mt-0.5">Mar 24 · 892 members</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-xs font-bold text-gray-400 bg-gray-100 rounded p-1.5 w-14 text-center">09:00</div>
                <div>
                  <div className="text-sm font-medium text-[#0F172A] flex gap-2">Never Redeemed Education</div>
                  <div className="text-xs text-[#64748B] mt-0.5">Mar 25 · 5,621 members</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-xs font-bold text-gray-400 bg-gray-100 rounded p-1.5 w-14 text-center">09:00</div>
                <div>
                  <div className="text-sm font-medium text-[#0F172A] flex gap-2">Gold Win-Back</div>
                  <div className="text-xs text-[#64748B] mt-0.5">Mar 25 · 2,988 pending</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* Performance Snapshot */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 bg-gradient-to-br from-white to-slate-50">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" /> Performance Snapshot (Last 7d)
            </h3>
            
            <div className="grid grid-cols-2 gap-4 gap-y-6">
              <div>
                <div className="text-sm font-medium text-[#64748B] mb-1">Impressions</div>
                <div className="text-3xl font-bold text-[#0F172A] flex items-center gap-2">
                  68,420 <span className="text-sm font-medium text-green-600 flex items-center bg-green-100 rounded px-1.5 py-0.5"><TrendingUp className="w-3 h-3 mr-1"/> 12%</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-[#64748B] mb-1">Clicks</div>
                <div className="text-3xl font-bold text-[#0F172A] flex items-center gap-2">
                  8,213 <span className="text-sm font-medium text-green-600 flex items-center bg-green-100 rounded px-1.5 py-0.5"><TrendingUp className="w-3 h-3 mr-1"/> 8%</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-[#64748B] mb-1">Conversions</div>
                <div className="text-3xl font-bold text-[#0F172A] flex items-center gap-2">
                  2,104 <span className="text-sm font-medium text-green-600 flex items-center bg-green-100 rounded px-1.5 py-0.5"><TrendingUp className="w-3 h-3 mr-1"/> 22%</span>
                </div>
              </div>
            </div>

            <Link to="/reports" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-8">
              View full report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Segment Health */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Segment Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-2 border-red-500 pl-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">Unverified KYC</div>
                    <div className="text-xs text-[#64748B] mt-0.5">Not synced in 14 days</div>
                  </div>
                </div>
                <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100">Sync Now</button>
              </div>

              <div className="flex items-center justify-between border-l-2 border-orange-400 pl-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">Never Redeemed</div>
                    <div className="text-xs text-[#64748B] mt-0.5">Auto-sync disabled</div>
                  </div>
                </div>
                <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100">Enable</button>
              </div>

              <div className="flex items-center justify-between border-l-2 border-green-500 pl-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">Gold At Risk</div>
                    <div className="text-xs text-[#64748B] mt-0.5">Synced 2h ago, healthy</div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/segments" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-6">
              View all segments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
