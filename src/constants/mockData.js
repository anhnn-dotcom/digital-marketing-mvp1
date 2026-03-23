export const SEGMENTS = [
  {
    id: 'seg_1', name: 'Gold & Platinum — At Risk', datasets: ['Loyalty Status', 'Transaction Behavior'],
    conditions: 2, memberCount: 3847, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: '2 hours ago', lastSync: '2h ago'
  },
  {
    id: 'seg_2', name: 'Points Expiry Alert — 30 Days', datasets: ['Loyalty Status'],
    conditions: 2, memberCount: 1203, autoSync: true, syncFrequency: 'every 6 hours', status: 'active', updated: '6 hours ago', lastSync: '1h ago'
  },
  {
    id: 'seg_3', name: 'Tier Upgrade Candidates', datasets: ['Loyalty Status', 'Transaction Behavior'],
    conditions: 3, memberCount: 892, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: '1 day ago', lastSync: '12h ago'
  },
  {
    id: 'seg_4', name: 'VIP Churning — Priority', datasets: ['Loyalty Status', 'Transaction Behavior', 'App Engagement'],
    conditions: 4, memberCount: 234, autoSync: true, syncFrequency: 'every 12 hours', status: 'syncing', updated: '12 hours ago', lastSync: 'Just now'
  },
  {
    id: 'seg_5', name: 'Never Redeemed — High Points', datasets: ['Loyalty Status'],
    conditions: 2, memberCount: 5621, autoSync: false, syncFrequency: '', status: 'active', updated: '3 days ago', lastSync: '3d ago'
  },
  {
    id: 'seg_6', name: 'Birthday Next 14 Days', datasets: ['Customer Profile'],
    conditions: 1, memberCount: 418, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: '1 hour ago', lastSync: '1h ago'
  },
  {
    id: 'seg_7', name: 'Browse No Transact — Loan', datasets: ['App Engagement', 'Transaction Behavior'],
    conditions: 2, memberCount: 2156, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: '5 hours ago', lastSync: '5h ago'
  },
  {
    id: 'seg_8', name: 'Young Urban — Bangkok', datasets: ['Customer Profile'],
    conditions: 3, memberCount: 8934, autoSync: false, syncFrequency: '', status: 'active', updated: '7 days ago', lastSync: '7d ago'
  },
  {
    id: 'seg_9', name: 'Dormant — 90 Days', datasets: ['Transaction Behavior', 'App Engagement'],
    conditions: 2, memberCount: 12445, autoSync: true, syncFrequency: 'every 1 week', status: 'active', updated: '2 days ago', lastSync: '2d ago'
  },
  {
    id: 'seg_10', name: 'Unverified KYC — Returning', datasets: ['Customer Profile', 'App Engagement'],
    conditions: 2, memberCount: 673, autoSync: false, syncFrequency: '', status: 'inactive', updated: '14 days ago', lastSync: '14d ago'
  },
  {
    id: 'seg_11', name: 'Core Target — Urban Transactors', datasets: ['Customer Profile', 'Transaction Behavior'],
    conditions: 4, memberCount: 15420, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: 'Just now', lastSync: '1h ago',
    globalLogic: 'AND',
    groups: [
      { id: 'g11_1', dataset: 'Customer Profile', conditions: [{ id: 'c11_1', field: 'City', operator: 'In list', value: ['Bangkok', 'Chiang Mai', 'Phuket'] }, { id: 'c11_2', field: 'Age', operator: 'Between', value: '25-40' }] },
      { id: 'g11_2', dataset: 'Transaction Behavior', conditions: [{ id: 'c11_3', field: 'Transaction Count (30d)', operator: 'Greater than', value: '1' }, { id: 'c11_4', field: 'Transaction Type', operator: 'In list', value: ['QR Payment', 'Transfer'] }] }
    ]
  },
  {
    id: 'seg_12', name: 'Light Users — Activation Target', datasets: ['Customer Profile', 'Transaction Behavior'],
    conditions: 4, memberCount: 8430, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: 'Just now', lastSync: '1h ago',
    globalLogic: 'AND',
    groups: [
      { id: 'g12_1', dataset: 'Customer Profile', conditions: [{ id: 'c12_1', field: 'City', operator: 'In list', value: ['Bangkok', 'Chiang Mai', 'Phuket'] }, { id: 'c12_2', field: 'Age', operator: 'Between', value: '25-40' }] },
      { id: 'g12_2', dataset: 'Transaction Behavior', conditions: [{ id: 'c12_3', field: 'Transaction Count (30d)', operator: 'Less than', value: '5' }, { id: 'c12_4', field: 'Last Transaction', operator: 'In last X days', value: '30' }] }
    ]
  },
  {
    id: 'seg_13', name: 'Lapsed Users — Retargeting', datasets: ['Transaction Behavior', 'App Engagement'],
    conditions: 2, memberCount: 5210, autoSync: true, syncFrequency: 'every 12 hours', status: 'active', updated: 'Just now', lastSync: '2h ago',
    globalLogic: 'AND',
    groups: [
      { id: 'g13_1', dataset: 'Transaction Behavior', conditions: [{ id: 'c13_1', field: 'No Transaction in X days', operator: 'Equal', value: '14' }] },
      { id: 'g13_2', dataset: 'App Engagement', conditions: [{ id: 'c13_2', field: 'Last Login', operator: 'In last X days', value: '30' }] }
    ]
  },
  {
    id: 'seg_14', name: 'Streak Eligible — Phase 2', datasets: ['Transaction Behavior', 'Loyalty Status'],
    conditions: 3, memberCount: 3150, autoSync: true, syncFrequency: 'every 6 hours', status: 'active', updated: 'Just now', lastSync: '2h ago',
    globalLogic: 'AND',
    groups: [
      { id: 'g14_1', dataset: 'Transaction Behavior', conditions: [{ id: 'c14_1', field: 'Transaction Count (30d)', operator: 'Greater than', value: '3' }, { id: 'c14_2', field: 'Last Transaction', operator: 'In last X days', value: '2' }] },
      { id: 'g14_2', dataset: 'Loyalty Status', conditions: [{ id: 'c14_3', field: 'Tier', operator: 'Equal', value: 'Bronze' }] }
    ]
  },
  {
    id: 'seg_15', name: 'High LTV — Tier Upgrade Candidate', datasets: ['Transaction Behavior', 'Loyalty Status'],
    conditions: 3, memberCount: 1240, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: 'Just now', lastSync: '1h ago',
    globalLogic: 'AND',
    groups: [
      { id: 'g15_1', dataset: 'Transaction Behavior', conditions: [{ id: 'c15_1', field: 'Transaction Count (30d)', operator: 'Greater than', value: '15' }, { id: 'c15_2', field: 'Total Amount (30d)', operator: 'Greater than', value: '3000' }] },
      { id: 'g15_2', dataset: 'Loyalty Status', conditions: [{ id: 'c15_3', field: 'Tier', operator: 'In list', value: ['Silver', 'Gold'] }] }
    ]
  },
  {
    id: 'seg_16', name: 'Referral Eligible — Phase 3', datasets: ['Loyalty Status', 'Transaction Behavior'],
    conditions: 2, memberCount: 4500, autoSync: true, syncFrequency: 'every 1 day', status: 'active', updated: 'Just now', lastSync: '1h ago',
    globalLogic: 'AND',
    groups: [
      { id: 'g16_1', dataset: 'Loyalty Status', conditions: [{ id: 'c16_1', field: 'Tier', operator: 'In list', value: ['Gold', 'Platinum'] }] },
      { id: 'g16_2', dataset: 'Transaction Behavior', conditions: [{ id: 'c16_2', field: 'Transaction Count (30d)', operator: 'Greater than', value: '10' }] }
    ]
  }
];

export const CAMPAIGNS = [
  { id: 'cmp_1', name: 'Gold Member Win-Back — March', type: 'DM Delivery', segment: 'Gold & Platinum — At Risk', schedule: 'Daily at 09:00', totalMembers: 3847, processed: 847, status: 'Running', lastRun: '35 minutes ago', nextRun: null },
  { id: 'cmp_2', name: 'Points Expiry Push — Week 12', type: 'DM Delivery', segment: 'Points Expiry Alert — 30 Days', schedule: 'Every 2 days at 10:00', totalMembers: 1203, processed: 1203, status: 'Completed', lastRun: '1 day ago', nextRun: null },
  { id: 'cmp_3', name: 'Birthday Reward — Auto', type: 'Loyalty Action', segment: 'Birthday Next 14 Days', schedule: 'Daily at 00:01', totalMembers: 418, processed: 418, status: 'Active', lastRun: '2 hours ago', nextRun: 'in 11h 59m' },
  { id: 'cmp_4', name: 'VIP Churn Prevention', type: 'DM Delivery', segment: 'VIP Churning — Priority', schedule: 'Every 12 hours', totalMembers: 234, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'Mar 24, 2026 09:00' },
  { id: 'cmp_5', name: 'Tier Upgrade Nudge', type: 'Loyalty Action', segment: 'Tier Upgrade Candidates', schedule: 'Weekly on Monday 08:00', totalMembers: 892, processed: 201, status: 'Active', lastRun: '6 days ago', nextRun: 'Tomorrow 08:00' },
  { id: 'cmp_6', name: 'Never Redeemed — Education', type: 'DM Delivery', segment: 'Never Redeemed — High Points', schedule: 'One-time: Mar 25, 2026', totalMembers: 5621, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'Mar 25, 2026 09:00' },
  { id: 'cmp_7', name: 'Loan Product Retargeting', type: 'DM Delivery', segment: 'Browse No Transact — Loan', schedule: 'Daily at 11:00 & 18:00', totalMembers: 2156, processed: 2156, status: 'Completed', lastRun: '3 days ago', nextRun: null },
  { id: 'cmp_8', name: 'Bangkok Young Urban — Promo', type: 'DM Delivery', segment: 'Young Urban — Bangkok', schedule: 'One-time: Mar 20, 2026', totalMembers: 8934, processed: 8934, status: 'Completed', lastRun: '3 days ago', nextRun: null },
  { id: 'cmp_9', name: 'Dormant Reactivation — Q1', type: 'DM Delivery', segment: 'Dormant — 90 Days', schedule: 'Weekly on Sunday 08:00', totalMembers: 12445, processed: 4210, status: 'Active', lastRun: '2 days ago', nextRun: 'in 4 days' },
  { id: 'cmp_10', name: 'KYC Completion Push', type: 'DM Delivery', segment: 'Unverified KYC — Returning', schedule: 'Daily at 14:00', totalMembers: 673, processed: 0, status: 'Inactive', lastRun: '14 days ago', nextRun: null },
  { id: 'CAM-TH-001', name: 'MicroPay Pay & Earn — Phase 1 Launch', type: 'DM Delivery', segmentId: 'seg_12', segment: 'Light Users — Activation Target', targetDetails: { segmentId: 'seg_12', limit: 'All matching members', order: 'Oldest first' }, scheduleDetails: { start: 'Apr 1, 2026', time: '10:00', repeat: 'every 1 day', end: 'Apr 28, 2026', multipleTimes: 'OFF' }, schedule: 'Daily at 10:00', totalMembers: 8430, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'Apr 1, 2026 10:00', delivery: ['pt_1', 'dc_9'] },
  { id: 'CAM-TH-002', name: 'MicroPay — Lapsed User Win-back', type: 'DM Delivery', segmentId: 'seg_13', segment: 'Lapsed Users — Retargeting', targetDetails: { segmentId: 'seg_13', limit: 'All matching', order: 'Newest first' }, scheduleDetails: { start: 'Apr 1, 2026', time: '11:00', repeat: 'every 1 day', end: 'Jun 29, 2026', multipleTimes: 'OFF' }, schedule: 'Daily at 11:00', totalMembers: 5210, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'Apr 1, 2026 11:00', delivery: ['pt_3', 'rr_7'] },
  { id: 'CAM-TH-003', name: 'MicroPay — 7-Day Streak Bonus', type: 'DM Delivery', segmentId: 'seg_14', segment: 'Streak Eligible — Phase 2', targetDetails: { segmentId: 'seg_14', limit: 'All matching', order: 'Oldest first' }, scheduleDetails: { start: 'Apr 29, 2026', repeat: 'every 1 day', end: 'May 26, 2026', multipleTimes: 'ON', runsAt: ['08:00', '20:00'] }, schedule: 'Daily at 08:00 & 20:00', totalMembers: 3150, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'Apr 29, 2026 08:00', delivery: ['pt_2', 'dc_10'] },
  { id: 'CAM-TH-004', name: 'MicroPay — Flash Deal Friday', type: 'DM Delivery', segmentId: 'seg_11', segment: 'Core Target — Urban Transactors', targetDetails: { segmentId: 'seg_11', limit: 'All matching' }, scheduleDetails: { start: 'May 3, 2026', time: '09:00', repeat: 'every 1 week', repeatOn: 'Friday', end: 'May 24, 2026', multipleTimes: 'OFF' }, schedule: 'Weekly on Friday 09:00', totalMembers: 15420, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'May 3, 2026 09:00', delivery: ['pt_4', 'dc_11'] },
  { id: 'CAM-TH-005', name: 'MicroPay — Streak Completion Award', type: 'Loyalty Action', segmentId: 'seg_14', segment: 'Streak Eligible — Phase 2', targetDetails: { segmentId: 'seg_14', limit: 'All matching' }, scheduleDetails: { start: 'Apr 29, 2026', time: '23:00', repeat: 'every 1 day', end: 'May 26, 2026', multipleTimes: 'OFF' }, actionDetails: { action: 'Award Points', points: 500, reason: '7-day streak bonus', expiry: '30 days' }, schedule: 'Daily at 23:00', totalMembers: 3150, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'Apr 29, 2026 23:00' },
  { id: 'CAM-TH-006', name: 'MicroPay — Platinum Tier Upgrade', type: 'Loyalty Action', segmentId: 'seg_15', segment: 'High LTV — Tier Upgrade Candidate', targetDetails: { segmentId: 'seg_15', limit: 'All matching', order: 'Highest points first' }, scheduleDetails: { start: 'May 27, 2026', time: '09:00', repeat: 'every 1 week', repeatOn: 'Monday', end: 'Jun 29, 2026', multipleTimes: 'OFF' }, actionDetails: { action: 'Upgrade Tier', upgradeTo: 'Gold → Platinum', duration: 'Until Jul 31, 2026' }, schedule: 'Weekly on Monday 09:00', totalMembers: 1240, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'May 27, 2026 09:00' },
  { id: 'CAM-TH-007', name: 'MicroPay — Refer a Friend Phase 3', type: 'DM Delivery', segmentId: 'seg_16', segment: 'Referral Eligible — Phase 3', targetDetails: { segmentId: 'seg_16', limit: 'All matching' }, scheduleDetails: { start: 'May 27, 2026', time: '10:00', repeat: 'every 3 days', end: 'Jun 29, 2026', multipleTimes: 'OFF' }, schedule: 'Every 3 Days at 10:00', totalMembers: 4500, processed: 0, status: 'Scheduled', lastRun: 'Never', nextRun: 'May 27, 2026 10:00', delivery: ['pt_5', 'dc_12', 'rr_8'] }
];

export const REPORT_METRICS = [
  { label: 'Total Messages Sent', value: '1.2M', trend: '+12%', trendUp: true },
  { label: 'Avg Open Rate', value: '24.5%', trend: '+2.1%', trendUp: true },
  { label: 'Avg Click Rate', value: '4.2%', trend: '-0.5%', trendUp: false },
  { label: 'Conversion Rate', value: '1.8%', trend: '+0.3%', trendUp: true },
];

export const CHART_DATA = [
  { date: 'Mon', sent: 4000, opened: 2400, clicked: 400 },
  { date: 'Tue', sent: 3000, opened: 1398, clicked: 210 },
  { date: 'Wed', sent: 2000, opened: 9800, clicked: 2290 },
  { date: 'Thu', sent: 2780, opened: 3908, clicked: 2000 },
  { date: 'Fri', sent: 1890, opened: 4800, clicked: 2181 },
  { date: 'Sat', sent: 2390, opened: 3800, clicked: 2500 },
  { date: 'Sun', sent: 3490, opened: 4300, clicked: 2100 }
];

export const DATASETS = ['Customer Profile', 'Loyalty Status', 'Transaction Behavior', 'App Engagement', 'Custom List'];
export const OPERATORS = ['Equals', 'Not Equals', 'Contains', 'Greater Than', 'Less Than', 'In Last X Days'];

export const DYNAMIC_CONTENTS = [
  { id: 'dc_1', name: 'Gold Member Win-Back Banner', type: 'Banner', campaign: 'Gold Member Win-Back — March', segment: 'Gold & Platinum — At Risk', status: 'Active', updated: '2 hours ago' },
  { id: 'dc_2', name: 'Points Expiry Popup', type: 'Popup', campaign: 'Points Expiry Push — Week 12', segment: 'Points Expiry Alert — 30 Days', status: 'Active', updated: '1 day ago' },
  { id: 'dc_3', name: 'Birthday Surprise Popup', type: 'Popup', campaign: 'Birthday Reward — Auto', segment: 'Birthday Next 14 Days', status: 'Active', updated: '3 days ago' },
  { id: 'dc_4', name: 'Loan Product Banner', type: 'Banner', campaign: 'Loan Product Retargeting', segment: 'Browse No Transact — Loan', status: 'Active', updated: '5 hours ago' },
  { id: 'dc_5', name: 'Dormant Reactivation Banner', type: 'Banner', campaign: 'Dormant Reactivation — Q1', segment: 'Dormant — 90 Days', status: 'Active', updated: '2 days ago' },
  { id: 'dc_6', name: 'KYC Completion Popup', type: 'Popup', campaign: 'KYC Completion Push', segment: 'Unverified KYC — Returning', status: 'Inactive', updated: '14 days ago' },
  { id: 'dc_7', name: 'Default Home Banner', type: 'Banner', campaign: '—', segment: 'All Users (default)', status: 'Active', updated: '7 days ago' },
  { id: 'dc_8', name: 'VIP Churn Prevention Popup', type: 'Popup', campaign: 'VIP Churn Prevention', segment: 'VIP Churning — Priority', status: 'Draft', updated: '30 minutes ago' },
  { id: 'dc_9', name: '"Pay & Earn" Hero Banner', type: 'Banner', campaignId: 'CAM-TH-001', campaign: 'MicroPay Pay & Earn — Phase 1 Launch', segmentId: 'seg_12', segment: 'Light Users — Activation Target', status: 'Active', updated: 'Just now', payload: { visualUrl: '/cashback_hero_16x9.png', ctaAction: 'Direct to Service Screen → scanQRCode', segmentVariation: { default: '5% cashback capped ฿150/week', 'seg_15': '5% cashback capped ฿300/week' } } },
  { id: 'dc_10', name: 'Streak Bonus Popup', type: 'Popup', campaignId: 'CAM-TH-003', campaign: 'MicroPay — 7-Day Streak Bonus', segmentId: 'seg_14', segment: 'Streak Eligible — Phase 2', status: 'Active', updated: 'Just now', payload: { visualUrl: '/streak_counter_3x4.png', ctaAction: 'Direct to Service Screen → scanQRCode' } },
  { id: 'dc_11', name: 'Flash Deal Friday Banner', type: 'Banner', campaignId: 'CAM-TH-004', campaign: 'MicroPay — Flash Deal Friday', segmentId: 'seg_11', segment: 'Core Target — Urban Transactors', status: 'Active', updated: 'Just now', payload: { visualUrl: '/merchant_grid_16x9.png', ctaAction: 'Direct to URL → merchant discovery page' } },
  { id: 'dc_12', name: 'Referral Reward Popup', type: 'Popup', campaignId: 'CAM-TH-007', campaign: 'MicroPay — Refer a Friend Phase 3', segmentId: 'seg_16', segment: 'Referral Eligible — Phase 3', status: 'Active', updated: 'Just now', payload: { visualUrl: '/referral_30thb_1x1.png', ctaAction: 'Direct to Service Screen → createRequest' } }
];

export const PUSH_HISTORY = [
  { id: 'ph_1', campaign: 'Points Expiry Push', sent: 1203, delivered: 1187, failed: 16, openRate: '34.2%', sentAt: 'Mar 22 10:01' },
  { id: 'ph_2', campaign: 'Birthday Reward', sent: 418, delivered: 411, failed: 7, openRate: '61.8%', sentAt: 'Mar 23 00:01' },
  { id: 'ph_3', campaign: 'Loan Retargeting', sent: 2156, delivered: 2089, failed: 67, openRate: '22.4%', sentAt: 'Mar 20 11:00' },
  { id: 'ph_4', campaign: 'Bangkok Promo', sent: 8934, delivered: 8712, failed: 222, openRate: '18.7%', sentAt: 'Mar 20 09:00' },
  { id: 'ph_5', campaign: 'Dormant Reactivation', sent: 4210, delivered: 4087, failed: 123, openRate: '28.9%', sentAt: 'Mar 21 08:00' },
  { id: 'ph_6', campaign: 'KYC Completion', sent: 673, delivered: 651, failed: 22, openRate: '41.3%', sentAt: 'Mar 09 14:00' }
];

export const RECOMMENDATION_RULES = [
  { id: 'rr_1', name: 'VIP Upsell — Investment', trigger: 'Gold & Platinum — At Risk', products: ['Investment Account', 'Premium Savings'], placements: ['Home Screen'], priority: 1, status: 'Active', shown: 12450, ctr: '18.3%' },
  { id: 'rr_2', name: 'Loan Retargeting', trigger: 'Browse No Transact — Loan', products: ['Personal Loan', 'Home Loan'], placements: ['Home Screen', 'After Login'], priority: 2, status: 'Active', shown: 45210, ctr: '24.7%' },
  { id: 'rr_3', name: 'New User Onboarding', trigger: 'Birthday Next 14 Days', products: ['Savings Account', 'Points Redemption Guide'], placements: ['After Login'], priority: 3, status: 'Active', shown: 8920, ctr: '31.2%' },
  { id: 'rr_4', name: 'Dormant Reactivation', trigger: 'Dormant — 90 Days', products: ['Cashback Offer', 'QR Payment Guide'], placements: ['Home Screen'], priority: 4, status: 'Active', shown: 34100, ctr: '9.8%' },
  { id: 'rr_5', name: 'Cross-sell Insurance', trigger: 'High Spender (Transaction)', products: ['Life Insurance', 'Travel Insurance'], placements: ['After Transaction'], priority: 5, status: 'Inactive', shown: 0, ctr: '—' },
  { id: 'rr_6', name: 'Birthday Special Offer', trigger: 'Birthday Next 14 Days', products: ['Birthday Cashback Voucher'], placements: ['Home Screen', 'Notification'], priority: 6, status: 'Active', shown: 3210, ctr: '42.1%' },
  { id: 'rr_7', name: 'Merchant Discovery', campaignId: 'CAM-TH-002', triggerId: 'seg_13', trigger: 'Lapsed Users — Retargeting', products: ['QR Payment Setup', 'Partner Merchants'], placements: ['After Login'], priority: 7, status: 'Active', shown: 0, ctr: '—', layout: { maxItems: 3, type: 'carousel' } },
  { id: 'rr_8', name: 'Referral Feature Highlight', campaignId: 'CAM-TH-007', triggerId: 'seg_16', trigger: 'Referral Eligible — Phase 3', products: ['Referral Bonus'], placements: ['Home Screen'], priority: 8, status: 'Active', shown: 0, ctr: '—', layout: { maxItems: 1, type: 'banner' } }
];

export const PRODUCT_CATALOG = [
  { id: 'p_1', name: 'Personal Loan', category: 'Financial' },
  { id: 'p_2', name: 'Home Loan', category: 'Financial' },
  { id: 'p_3', name: 'Investment Account', category: 'Investment' },
  { id: 'p_4', name: 'Premium Savings', category: 'Savings' },
  { id: 'p_5', name: 'Life Insurance', category: 'Insurance' },
  { id: 'p_6', name: 'Travel Insurance', category: 'Insurance' },
  { id: 'p_7', name: 'Cashback Visa Card', category: 'Card' },
  { id: 'p_8', name: 'QR Payment Setup', category: 'Feature' },
  { id: 'p_9', name: 'Points Redemption Guide', category: 'Loyalty' },
  { id: 'p_10', name: 'Birthday Cashback Voucher', category: 'Promotion' },
  { id: 'p_11', name: 'Partner Merchants', category: 'Promotion' },
  { id: 'p_12', name: 'Referral Bonus', category: 'Promotion' }
];

export const CAMPAIGN_PERFORMANCE = [
  { id: 'cp_1', name: 'Gold Member Win-Back', type: 'DM', segment: 'Gold At Risk', impressions: 48200, clicks: 9640, ctr: '20.0%', conversions: 1928, convRate: '4.0%', status: 'Running' },
  { id: 'cp_2', name: 'Points Expiry Push', type: 'DM', segment: 'Expiry Alert', impressions: 12030, clicks: 4571, ctr: '38.0%', conversions: 1828, convRate: '15.2%', status: 'Completed' },
  { id: 'cp_3', name: 'Birthday Reward', type: 'Loyalty', segment: 'Birthday 14d', impressions: 4180, clicks: null, ctr: null, conversions: 418, convRate: '100%', status: 'Active' },
  { id: 'cp_4', name: 'Loan Retargeting', type: 'DM', segment: 'Browse No Tx', impressions: 21560, clicks: 5174, ctr: '24.0%', conversions: 863, convRate: '4.0%', status: 'Completed' },
  { id: 'cp_5', name: 'Bangkok Urban Promo', type: 'DM', segment: 'Young Urban', impressions: 89340, clicks: 8041, ctr: '9.0%', conversions: 1608, convRate: '1.8%', status: 'Completed' },
  { id: 'cp_6', name: 'Dormant Reactivation', type: 'DM', segment: 'Dormant 90d', impressions: 42100, clicks: 3789, ctr: '9.0%', conversions: 379, convRate: '0.9%', status: 'Active' },
  { id: 'cp_7', name: 'Tier Upgrade Nudge', type: 'Loyalty', segment: 'Tier Upgrade', impressions: 8920, clicks: null, ctr: null, conversions: 201, convRate: '22.5%', status: 'Active' },
  { id: 'cp_8', name: 'KYC Completion Push', type: 'DM', segment: 'Unverified', impressions: 6730, clicks: 2761, ctr: '41.0%', conversions: 276, convRate: '4.1%', status: 'Inactive' }
];

export const SEGMENT_PERFORMANCE = [
  { id: 'sp_1', name: 'Gold & Platinum At Risk', campaigns: 1, membersReached: 3210, avgCtr: '20.0%', topChannel: 'Push + Popup' },
  { id: 'sp_2', name: 'Expiry Alert', campaigns: 1, membersReached: 1187, avgCtr: '38.0%', topChannel: 'Push' },
  { id: 'sp_3', name: 'Browse No Transact', campaigns: 1, membersReached: 2089, avgCtr: '24.0%', topChannel: 'Push + Recommendation' },
  { id: 'sp_4', name: 'Young Urban Bangkok', campaigns: 1, membersReached: 8712, avgCtr: '9.0%', topChannel: 'Banner' },
  { id: 'sp_5', name: 'Dormant 90 Days', campaigns: 1, membersReached: 4087, avgCtr: '9.0%', topChannel: 'Push + Banner' }
];

export const PUSH_TEMPLATES = [
  { id: 'pt_1', campaignId: 'CAM-TH-001', campaign: 'MicroPay Pay & Earn — Phase 1 Launch', title: 'จ่ายด้วย MicroPay วันนี้ รับ 5% คืน! 💸', body: 'ทุกการจ่ายได้เงินคืนสูงสุด ฿150/สัปดาห์\nเริ่มได้เลยที่ร้านค้าใกล้บ้าน', trigger: 'scanQRCode', segmentId: 'seg_12', segment: 'Light Users — Activation Target' },
  { id: 'pt_2', campaignId: 'CAM-TH-003', campaign: 'MicroPay — 7-Day Streak Bonus', title: 'วันที่ [X] ของ streak คุณ! 🔥 อย่าหยุด', body: 'แค่จ่าย 1 ครั้งวันนี้ คุณจะได้รับโบนัส ฿50\nเมื่อครบ 7 วัน', trigger: 'scanQRCode', segmentId: 'seg_14', segment: 'Streak Eligible — Phase 2' },
  { id: 'pt_3', campaignId: 'CAM-TH-002', campaign: 'MicroPay — Lapsed User Win-back', title: 'คุณมีเงินคืนรอรับอยู่! 👋', body: 'กลับมาใช้ MicroPay วันนี้ รับ cashback ทันที\nร้านค้าพาร์ทเนอร์รอคุณอยู่', trigger: 'scanQRCode', segmentId: 'seg_13', segment: 'Lapsed Users — Retargeting' },
  { id: 'pt_4', campaignId: 'CAM-TH-004', campaign: 'MicroPay — Flash Deal Friday', title: 'Flash Deal วันนี้เท่านั้น! ⚡', body: 'ร้านพาร์ทเนอร์ให้ส่วนลดพิเศษวันนี้ จ่ายด้วย MicroPay', trigger: 'URL → merchant flash deal page', segmentId: 'seg_11', segment: 'Core Target — Urban Transactors' },
  { id: 'pt_5', campaignId: 'CAM-TH-007', campaign: 'MicroPay — Refer a Friend Phase 3', title: 'แนะนำเพื่อน รับ ฿30 ทั้งคู่! 🎁', body: 'เพื่อนคุณยังไม่ใช้ MicroPay? แชร์โค้ดได้เลย', trigger: 'createRequest', segmentId: 'seg_16', segment: 'Referral Eligible — Phase 3' }
];

export const DATA_SOURCES = [
  { id: 'ds_1', name: 'Salesforce CRM', type: 'CRM', status: 'Connected', recordCount: 845000, lastSync: '10 mins ago', syncFrequency: 'Real-time', fieldsCount: 45 },
  { id: 'ds_2', name: 'Core Banking Logs', type: 'Transactions', status: 'Connected', recordCount: 15420000, lastSync: '1 hour ago', syncFrequency: 'Hourly', fieldsCount: 18 },
  { id: 'ds_3', name: 'Loyalty Management System', type: 'Loyalty', status: 'Connected', recordCount: 1200000, lastSync: '2 hours ago', syncFrequency: 'every 6 hours', fieldsCount: 22 },
  { id: 'ds_4', name: 'Mobile App Events', type: 'App Events', status: 'Error', recordCount: 4500000, lastSync: '1 day ago', syncFrequency: 'Real-time', fieldsCount: 12 },
  { id: 'ds_5', name: 'Customer Support Tickets', type: 'Custom', status: 'Disconnected', recordCount: 89000, lastSync: '7 days ago', syncFrequency: 'Daily', fieldsCount: 8 },
  { id: 'ds_6', name: 'Offline Store Purchases', type: 'Manual Upload', status: 'Connected', recordCount: 34000, lastSync: '2 days ago', syncFrequency: 'Weekly', fieldsCount: 15 }
];

export const ENRICHMENT_JOBS = [
  { id: 'job_1', name: 'Daily Lifetime Value Scoring', sourceIds: ['ds_2', 'ds_3'], outputDataset: 'Customer Profile', schedule: 'Daily at 02:00', status: 'Completed', lastRun: '6 hours ago', nextRun: 'Tomorrow 02:00', recordsProcessed: 1200000, recordsEnriched: 1185000, enrichmentRate: '98.7%', type: 'Score' },
  { id: 'job_2', name: 'Real-time Churn Prediction', sourceIds: ['ds_4', 'ds_2'], outputDataset: 'Customer Profile', schedule: 'Every 5 mins', status: 'Running', lastRun: '3 mins ago', nextRun: 'in 2 mins', recordsProcessed: 45000, recordsEnriched: 45000, enrichmentRate: '100%', type: 'Score' },
  { id: 'job_3', name: 'Merge Offline Purchases', sourceIds: ['ds_6'], outputDataset: 'Transaction Behavior', schedule: 'Weekly on Sunday 00:00', status: 'Completed', lastRun: '2 days ago', nextRun: 'in 5 days', recordsProcessed: 34000, recordsEnriched: 32500, enrichmentRate: '95.5%', type: 'Merge' },
  { id: 'job_4', name: 'Cleanse Support Ticket Tags', sourceIds: ['ds_5'], outputDataset: 'Customer Profile', schedule: 'Daily at 03:00', status: 'Paused', lastRun: '1 week ago', nextRun: 'Paused', recordsProcessed: 89000, recordsEnriched: 89000, enrichmentRate: '100%', type: 'Transform' },
  { id: 'job_5', name: 'Deduplicate CRM Contacts', sourceIds: ['ds_1'], outputDataset: 'Customer Profile', schedule: 'Monthly on 1st', status: 'Scheduled', lastRun: 'Mar 1, 2026', nextRun: 'Apr 1, 2026', recordsProcessed: 845000, recordsEnriched: 842000, enrichmentRate: '99.6%', type: 'Deduplicate' },
  { id: 'job_6', name: 'Sync App Events to Engagement', sourceIds: ['ds_4'], outputDataset: 'App Engagement', schedule: 'Hourly', status: 'Failed', lastRun: '1 hour ago', nextRun: 'Pending Retry', recordsProcessed: 125000, recordsEnriched: 0, enrichmentRate: '0%', type: 'Merge' }
];

export const PIPELINE_ACTIVITY_LOG = [
  { id: 'log_1', timestamp: new Date(Date.now() - 10 * 60000).toISOString(), type: 'sync', source: 'Salesforce CRM', message: 'Sync completed successfully', details: 'Ingested 1,500 new records and updated 4,200 existing.' },
  { id: 'log_2', timestamp: new Date(Date.now() - 25 * 60000).toISOString(), type: 'job', source: 'Real-time Churn Prediction', message: 'Job completed', details: 'Scored 45,000 users. Found 234 high-risk users.' },
  { id: 'log_3', timestamp: new Date(Date.now() - 60 * 60000).toISOString(), type: 'error', source: 'Sync App Events to Engagement', message: 'Job failed due to connection error', details: 'Timeout after 30000ms connecting to App Events stream.' },
  { id: 'log_4', timestamp: new Date(Date.now() - 65 * 60000).toISOString(), type: 'sync', source: 'Core Banking Logs', message: 'Sync completed successfully', details: 'Ingested 45,000 transaction records.' },
  { id: 'log_5', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), type: 'job', source: 'Daily Lifetime Value Scoring', message: 'Job completed successfully', details: 'Updated LTV scores for 1,185,000 profiles.' },
  { id: 'log_6', timestamp: new Date(Date.now() - 180 * 60000).toISOString(), type: 'info', source: 'Customer Support Tickets', message: 'Source connection paused manually', details: 'User admin@micropay.com paused the connection.' }
];

// ═══════════════════════════════════════════════════════
// ANALYTICS DASHBOARD DATA
// ═══════════════════════════════════════════════════════

export const ANALYTICS_KPI = [
  // Engagement
  { id: 'kpi_1', group: 'Engagement', title: 'Impressions', value: '284,521', change: '↑ 12.4%', tooltip: 'Total times content was displayed to users', color: null },
  { id: 'kpi_2', group: 'Engagement', title: 'Clicks', value: '35,281', change: '↑ 8.7%', tooltip: 'Total taps on banners, popups, or push notifications', color: null },
  { id: 'kpi_3', group: 'Engagement', title: 'CTR', value: '12.4%', change: '↑ 0.8pp', tooltip: 'Clicks ÷ Impressions. Platform avg: 11.2%', color: 'green' },
  { id: 'kpi_4', group: 'Engagement', title: 'Unique Members Reached', value: '28,450', change: '↑ 5.3%', tooltip: 'Distinct members who saw at least 1 piece of content', color: null },
  // Conversion
  { id: 'kpi_5', group: 'Conversion & Revenue', title: 'Conversions', value: '9,123', change: '↑ 22.1%', tooltip: 'Members who completed target action after clicking', color: null },
  { id: 'kpi_6', group: 'Conversion & Revenue', title: 'CVR', value: '25.9%', change: '↑ 3.2pp', tooltip: 'Conversions ÷ Clicks', color: 'green' },
  { id: 'kpi_7', group: 'Conversion & Revenue', title: 'Revenue Attributed', value: '฿2,847,500', change: '↑ 18.3%', tooltip: 'Total transaction value from converted members within 7-day window', color: null },
  { id: 'kpi_8', group: 'Conversion & Revenue', title: 'ROAS', value: '3.8×', change: '↑ 0.6×', tooltip: 'Revenue Attributed ÷ Campaign Spend', color: 'green', target: 'Target: 3.2×' },
  // Unit Economics
  { id: 'kpi_9', group: 'Unit Economics', title: 'CAC', value: '฿68.40', change: '↓ 8.2%', tooltip: 'Total spend ÷ new active transactors acquired', color: 'green', target: 'Target: ≤ ฿85' },
  { id: 'kpi_10', group: 'Unit Economics', title: 'Avg Member LTV', value: '฿1,240', change: '↑ 4.1%', tooltip: 'Average transaction value per member over 90 days', color: null },
  { id: 'kpi_11', group: 'Unit Economics', title: 'LTV:CAC Ratio', value: '18.1×', change: '↑ 2.3×', tooltip: 'LTV ÷ CAC. Healthy ratio: > 3×', color: 'green' },
  { id: 'kpi_12', group: 'Unit Economics', title: 'Avg Transactions/User/Week', value: '4.3', change: '↑ 22.9%', tooltip: 'Target: 5.2 by end of campaign', color: null, progress: { current: 4.3, target: 5.2 } },
];

export const ANALYTICS_FUNNEL = [
  { id: 'funnel_1', label: 'Reached', value: '28,450', percent: '100%', fraction: '20/20' },
  { id: 'funnel_2', label: 'Impressions', value: '24,180', percent: '85%', fraction: '17/20' },
  { id: 'funnel_3', label: 'Clicks', value: '3,528', percent: '12.4% CTR', fraction: '12/20' },
  { id: 'funnel_4', label: 'Conversions', value: '914', percent: '25.9% CVR', fraction: '5/20' },
  { id: 'funnel_5', label: 'Repeat Conv', value: '412', percent: '45.1% ret', fraction: '4/20' },
];

export const ANALYTICS_ATTRIBUTION = [
  { id: 'attr_1', channel: 'Push Notification', touches: '48,210', ast: '3,842', dir: '2,814', revAst: '฿921,400', revDir: '฿674,200', attr: '38%', navigateTo: '/push' },
  { id: 'attr_2', channel: 'Popup', touches: '39,140', ast: '2,891', dir: '1,923', revAst: '฿693,800', revDir: '฿461,200', attr: '31%', navigateTo: '/content' },
  { id: 'attr_3', channel: 'Banner', touches: '28,420', ast: '1,842', dir: '891', revAst: '฿441,800', revDir: '฿213,800', attr: '22%', navigateTo: '/content' },
  { id: 'attr_4', channel: 'Recommendation', touches: '9,210', ast: '1,203', dir: '495', revAst: '฿288,700', revDir: '฿118,800', attr: '9%', navigateTo: null },
];

export const ANALYTICS_CAMPAIGN_REVENUE = [
  { id: 'rev_1', label: 'Gold Win-Back', value: '฿847,200', widthPct: 100, campaignId: 'cmp_1' },
  { id: 'rev_2', label: 'Points Expiry', value: '฿423,600', widthPct: 50, campaignId: 'cmp_2' },
  { id: 'rev_3', label: 'Loan Retargeting', value: '฿389,100', widthPct: 45, campaignId: 'cmp_3' },
  { id: 'rev_4', label: 'Bangkok Promo', value: '฿312,400', widthPct: 37, campaignId: 'cmp_4' },
  { id: 'rev_5', label: 'Streak Bonus', value: '฿287,500', widthPct: 33, campaignId: 'cmp_5' },
  { id: 'rev_6', label: 'Tier Upgrade', value: '฿201,300', widthPct: 24, campaignId: 'cmp_6' },
  { id: 'rev_7', label: 'Referral Program', value: '฿189,200', widthPct: 22, campaignId: 'cmp_7' },
  { id: 'rev_8', label: 'Dormant React.', value: '฿197,200', widthPct: 23, campaignId: 'cmp_8' },
];

export const ANALYTICS_CAMPAIGN_TARGETS = [
  { id: 'tgt_1', label: 'Weekly Active Transactors', current: '+24%', target: '+35%', percent: 69. },
  { id: 'tgt_2', label: 'Streak Completion Rate', current: '28%', target: '≥30%', percent: 93 },
  { id: 'tgt_3', label: 'Cashback Redemption', current: '71%', target: '≥65%', percent: 100, check: true },
  { id: 'tgt_4', label: 'Referral Conversion', current: '19%', target: '≥25%', percent: 76 },
];

export const ANALYTICS_SUGGESTED_ACTIONS = [
  { id: 'sa_1', impact: 'high', title: 'Gold Win-Back push copy', desc: 'CTR ↓ 8pp compared to last week', navigateTo: '/optimize' },
  { id: 'sa_2', impact: 'medium', title: 'Points Expiry send time', desc: 'Shift to 08:30 for +15% open rate', navigateTo: '/optimize' },
  { id: 'sa_3', impact: 'medium', title: 'Lapsed banner creative', desc: 'Replace image to combat ad fatigue', navigateTo: '/optimize' },
];

// ═══════════════════════════════════════════════════════
// AUDIENCE INSIGHTS DATA
// ═══════════════════════════════════════════════════════

export const AUDIENCE_SEGMENTS = [
  { id: 'gold-at-risk', name: 'Gold & Platinum — At Risk', count: '3,847', active: true, colors: ['bg-[#38BDF8]', 'bg-[#F472B6]', 'bg-[#A78BFA]'], campaignIds: ['cmp_1', 'cmp_2', 'cmp_3'] },
  { id: 'vip-churning', name: 'VIP Churning — Priority', count: '1,204', active: true, colors: ['bg-[#38BDF8]', 'bg-[#F472B6]'], campaignIds: ['cmp_4'] },
  { id: 'lapsed', name: 'Lapsed Users (90+ Days)', count: '18,421', active: true, colors: ['bg-[#38BDF8]'], campaignIds: ['cmp_9'] },
  { id: 'flash-deal', name: 'Flash Deal Engagers', count: '8,920', active: true, colors: ['bg-[#A78BFA]'], campaignIds: ['CAM-TH-004'] },
  { id: 'dormant', name: 'Dormant Base (12mo)', count: '42,190', active: false, colors: ['bg-[#94A3B8]'], campaignIds: [] },
];

export const AUDIENCE_STAT_CARDS = [
  { id: 'astat_1', segmentId: 'gold-at-risk', title: 'Avg Points Balance', value: '4,230 pts', trend: '↑ 12%' },
  { id: 'astat_2', segmentId: 'gold-at-risk', title: 'Avg Tier', value: 'Gold / Plat', sub: '72% / 28%' },
  { id: 'astat_3', segmentId: 'gold-at-risk', title: 'Avg Days Inactive', value: '74 days', trend: '↑ 4d', downIsBad: true },
  { id: 'astat_4', segmentId: 'gold-at-risk', title: 'Avg Transaction Value', value: '฿2,840/mo', trend: '↓ 14%', downIsBad: true },
];

export const AUDIENCE_MEMBERS = [
  { id: 'TH-001234', segmentId: 'gold-at-risk', name: 'Somchai P.', tier: 'Gold', pts: '5,420', last: 'Jan 12', days: '70d', push: true, status: 'At Risk' },
  { id: 'TH-001891', segmentId: 'gold-at-risk', name: 'Nattaporn K.', tier: 'Platinum', pts: '8,920', last: 'Jan 8', days: '74d', push: true, status: 'At Risk' },
  { id: 'TH-002341', segmentId: 'gold-at-risk', name: 'Wiroj S.', tier: 'Gold', pts: '3,210', last: 'Jan 15', days: '67d', push: false, status: 'At Risk' },
  { id: 'TH-003102', segmentId: 'gold-at-risk', name: 'Pranee L.', tier: 'Gold', pts: '6,780', last: 'Jan 3', days: '79d', push: true, status: 'At Risk' },
  { id: 'TH-004521', segmentId: 'gold-at-risk', name: 'Apinya T.', tier: 'Gold', pts: '4,120', last: 'Jan 20', days: '62d', push: true, status: 'At Risk' },
  { id: 'TH-005832', segmentId: 'gold-at-risk', name: 'Kamon W.', tier: 'Platinum', pts: '12,340', last: 'Dec 28', days: '85d', push: true, status: 'Critical' },
  { id: 'TH-006291', segmentId: 'gold-at-risk', name: 'Siriporn N.', tier: 'Gold', pts: '2,890', last: 'Jan 18', days: '64d', push: false, status: 'At Risk' },
  { id: 'TH-007445', segmentId: 'gold-at-risk', name: 'Thanakorn B.', tier: 'Gold', pts: '7,650', last: 'Jan 5', days: '77d', push: true, status: 'At Risk' },
  { id: 'TH-008123', segmentId: 'gold-at-risk', name: 'Ladda M.', tier: 'Platinum', pts: '9,210', last: 'Dec 31', days: '82d', push: true, status: 'Critical' },
  { id: 'TH-009341', segmentId: 'gold-at-risk', name: 'Prayut C.', tier: 'Gold', pts: '3,450', last: 'Jan 22', days: '60d', push: true, status: 'At Risk' },
  { id: 'TH-010124', segmentId: 'vip-churning', name: 'Wilasinee T.', tier: 'Platinum', pts: '15,200', last: 'Dec 15', days: '98d', push: true, status: 'Critical' },
  { id: 'TH-011234', segmentId: 'vip-churning', name: 'Chaiwat P.', tier: 'Platinum', pts: '11,800', last: 'Dec 20', days: '93d', push: false, status: 'Critical' },
  { id: 'TH-012345', segmentId: 'lapsed', name: 'Preecha L.', tier: 'Silver', pts: '1,200', last: 'Nov 10', days: '133d', push: true, status: 'Lapsed' },
  { id: 'TH-013456', segmentId: 'lapsed', name: 'Somsri K.', tier: 'Silver', pts: '890', last: 'Oct 28', days: '146d', push: false, status: 'Lapsed' },
];

export const AUDIENCE_CAMPAIGN_HISTORY = [
  { id: 'ach_1', segmentId: 'gold-at-risk', campaignId: 'cmp_1', campaign: 'Gold Win-Back', period: 'Mar 1–23', impressions: '48,200', ctr: '20.0%', ctrStatus: 'good', cvr: '24.1%', revenue: '฿847,200', roas: '4.1×', roasStatus: 'good' },
  { id: 'ach_2', segmentId: 'gold-at-risk', campaignId: 'cmp_2', campaign: 'Points Expiry', period: 'Feb 15–28', impressions: '38,100', ctr: '12.4%', ctrStatus: 'neutral', cvr: '18.9%', revenue: '฿423,600', roas: '2.8×', roasStatus: 'neutral' },
  { id: 'ach_3', segmentId: 'gold-at-risk', campaignId: 'cmp_3', campaign: 'Dormant Reactivation', period: 'Jan 10–31', impressions: '35,000', ctr: '6.2%', ctrStatus: 'bad', cvr: '15.1%', revenue: '฿197,200', roas: '1.2×', roasStatus: 'bad' },
  { id: 'ach_4', segmentId: 'vip-churning', campaignId: 'cmp_4', campaign: 'VIP Churn Prevention', period: 'Mar 10–23', impressions: '5,200', ctr: '31.4%', ctrStatus: 'good', cvr: '28.0%', revenue: '฿312,000', roas: '5.2×', roasStatus: 'good' },
  { id: 'ach_5', segmentId: 'lapsed', campaignId: 'cmp_9', campaign: 'Dormant Reactivation Q1', period: 'Jan 1–Mar 23', impressions: '42,100', ctr: '9.0%', ctrStatus: 'neutral', cvr: '9.0%', revenue: '฿189,200', roas: '1.8×', roasStatus: 'neutral' },
];

// ═══════════════════════════════════════════════════════
// CAMPAIGN OPTIMIZATION DATA
// ═══════════════════════════════════════════════════════

export const OPTIMIZATION_SUGGESTIONS = [
  {
    id: 'sug_1', impact: 'high', campaignId: 'cmp_1', campaign: 'Gold Win-Back',
    issue: 'Push CTR dropped from 28% → 19% over 7 days. Classic content fatigue pattern.',
    fix: 'Rotate push copy to Variation B: \'คุณมี {pts_balance} points ที่ยังไม่ได้ใช้ 🎁\'',
    lift: '+8–12% CTR', confidence: '87%', data: 'Based on 12 similar campaigns', actionKey: 'push_copy', status: 'pending'
  },
  {
    id: 'sug_2', impact: 'high', campaignId: 'cmp_2', campaign: 'Points Expiry Push',
    issue: 'Send time 10:00 suboptimal for this target segment.',
    fix: 'Shift to 08:30 (peak open time for segment).',
    lift: '+15% open rate', confidence: '91%', data: 'Segment opens push 3× more at 08:00–09:00', actionKey: 'send_time', status: 'pending'
  },
  {
    id: 'sug_3', impact: 'medium', campaignId: 'CAM-TH-004', campaign: 'Flash Deal Friday',
    issue: 'Segment overlap with Gold Win-Back. 234 members receiving both campaigns same day.',
    fix: 'Exclude \'Gold At Risk\' segment from Flash Deal or apply 4h gap between sends.',
    lift: 'Reduce unsubscribe risk', confidence: '95%', data: 'Prevent frequency cap violation', actionKey: 'exclude', status: 'pending'
  },
  {
    id: 'sug_4', impact: 'medium', campaignId: 'CAM-TH-002', campaign: 'Lapsed User Win-back',
    issue: 'Popup CTR 6.2% (below 11.2% platform avg).',
    fix: 'Replace current banner with urgency creative: \'ฟรี ฿30 cashback สำหรับการจ่ายครั้งแรก\'',
    lift: '+6–9% CTR', confidence: '74%', data: 'A/B tested winner in Q3', actionKey: 'replace_banner', status: 'pending'
  },
  {
    id: 'sug_5', impact: 'medium', campaignId: 'CAM-TH-003', campaign: 'Streak Bonus Campaign',
    issue: 'Streak completion 28% vs 30% target.',
    fix: 'Add SMS/LINE reminder at 21:00 for members who haven\'t transacted by evening.',
    lift: '+4–6pp compl. rate', confidence: '68%', data: 'Similar mechanic lifted completion by 15% last month', actionKey: 'add_reminder', status: 'pending'
  },
  {
    id: 'sug_6', impact: 'low', campaignId: 'cmp_8', campaign: 'Bangkok Urban Promo',
    issue: 'Recommendation CTR 9% on Home Screen.',
    fix: 'Move recommendation to \'After Login\' placement.',
    lift: '+3–5% CTR', confidence: '61%', data: 'Data confidence building', actionKey: 'move_placement', status: 'pending'
  },
];

export const AB_TESTS = [
  {
    id: 'abt_1', campaignId: 'cmp_1', campaign: 'Gold Member Win-Back', channel: 'Push Notification',
    status: 'Day 4 of 7', daysLeft: 3, significance: '94%', winner: 'Variant B', autoDeploy: true,
    variantA: { name: 'Generic cashback', ctr: '19.2%', cvr: '22.1%', widthPct: 60, isLeading: false },
    variantB: { name: 'Personalized (points)', ctr: '27.8%', cvr: '31.4%', widthPct: 85, isLeading: true },
    testStatus: 'running'
  },
  {
    id: 'abt_2', campaignId: 'cmp_7', campaign: 'Loan Retargeting', channel: 'Banner Image',
    status: 'Day 6 of 7', daysLeft: 1, significance: '81%', winner: 'Variant B', autoDeploy: true,
    variantA: { name: 'Product feature image', ctr: '11.4%', cvr: '12.0%', widthPct: 40, isLeading: false },
    variantB: { name: 'Lifestyle/emotional image', ctr: '14.2%', cvr: '15.1%', widthPct: 50, isLeading: true },
    warning: 'Low confidence, maybe extend',
    testStatus: 'running'
  },
  {
    id: 'abt_3', campaignId: 'CAM-TH-003', campaign: 'Streak Bonus', channel: 'Send Time',
    status: 'Day 2 of 7', daysLeft: 5, significance: '89%', winner: 'Variant A', autoDeploy: true,
    variantA: { name: '08:00 send', ctr: '31.2%', cvr: '42.0%', widthPct: 90, isLeading: true },
    variantB: { name: '12:00 send', ctr: '24.8%', cvr: '36.5%', widthPct: 75, isLeading: false },
    testStatus: 'running'
  },
];

export const FATIGUE_ALERTS = [
  { id: 'fat_1', name: 'Gold Win-Back Banner', campaignId: 'cmp_1', campaign: 'Gold Win-Back', daysLive: '22d', ctrWeek1: '24.1%', ctrNow: '11.2%', drop: '53%', status: 'bad' },
  { id: 'fat_2', name: 'Streak Popup', campaignId: 'CAM-TH-003', campaign: 'Streak Bonus', daysLive: '8d', ctrWeek1: '31.4%', ctrNow: '28.9%', drop: '8%', status: 'good' },
  { id: 'fat_3', name: 'Lapsed Banner', campaignId: 'CAM-TH-002', campaign: 'Win-back', daysLive: '22d', ctrWeek1: '8.1%', ctrNow: '6.2%', drop: '23%', status: 'warn' },
  { id: 'fat_4', name: 'Flash Deal Push', campaignId: 'CAM-TH-004', campaign: 'Flash Deal', daysLive: '4d', ctrWeek1: '18.4%', ctrNow: '16.1%', drop: '12%', status: 'good' },
  { id: 'fat_5', name: 'Default App Banner', campaignId: null, campaign: '—', daysLive: '31d', ctrWeek1: '12.4%', ctrNow: '4.1%', drop: '67%', status: 'bad' },
];

export const OPTIMIZATION_HISTORY = [
  { id: 'oh_1', time: 'Mar 23 14:30', desc: 'Replaced banner in Lapsed Win-back campaign', user: 'AI Auto-apply' },
  { id: 'oh_2', time: 'Mar 22 09:00', desc: 'A/B Test deployed: Variant B (Loan Banner) won (+2.8% CTR)', user: 'System' },
  { id: 'oh_3', time: 'Mar 21 16:45', desc: 'Frequency cap updated: Gold At Risk → 3/day', user: 'Nam A.' },
  { id: 'oh_4', time: 'Mar 20 10:00', desc: 'Flash Deal Friday segment narrowed (excluded VIP overlap)', user: 'AI Auto-apply' },
];

export const FREQUENCY_OVERRIDES = [
  { id: 'fo_1', segment: 'Gold At Risk', maxPerDay: 3, maxPerWeek: 7, cooldown: '24h', context: 'High-value, higher frequency OK' },
  { id: 'fo_2', segment: 'Lapsed Users', maxPerDay: 1, maxPerWeek: 3, cooldown: '72h', context: 'Sensitive — avoid push-away' },
  { id: 'fo_3', segment: 'Birthday Segment', maxPerDay: 5, maxPerWeek: 5, cooldown: '0h', context: 'Time-sensitive, burst OK on day' },
];
