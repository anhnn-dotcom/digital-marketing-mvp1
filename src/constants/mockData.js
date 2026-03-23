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
