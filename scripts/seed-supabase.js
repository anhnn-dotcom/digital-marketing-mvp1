import { createClient } from '@supabase/supabase-js';
import {
  SEGMENTS,
  CAMPAIGNS,
  DYNAMIC_CONTENTS,
  RECOMMENDATION_RULES,
  PUSH_HISTORY,
  PUSH_TEMPLATES,
  ANALYTICS_KPI,
  ANALYTICS_FUNNEL,
  ANALYTICS_ATTRIBUTION,
  ANALYTICS_CAMPAIGN_REVENUE,
  ANALYTICS_CAMPAIGN_TARGETS,
  ANALYTICS_SUGGESTED_ACTIONS,
  AUDIENCE_SEGMENTS,
  AUDIENCE_MEMBERS,
  AUDIENCE_CAMPAIGN_HISTORY,
  OPTIMIZATION_SUGGESTIONS,
  AB_TESTS,
  FATIGUE_ALERTS,
  OPTIMIZATION_HISTORY,
  FREQUENCY_OVERRIDES,
} from '../src/constants/mockData.js';

const SUPABASE_URL = "https://oiozipobixueiojumbjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb3ppcG9iaXh1ZWlvanVtYmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDkxOTksImV4cCI6MjA4OTgyNTE5OX0.npcn-mWcUqvjK_8jJOqVTzNczCpalC5RYHshMFNWgKw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  console.log('🚀 Starting seed...');

  // 1. Segments
  console.log('Seeding segments...');
  const { error: sErr } = await supabase.from('segments').upsert(SEGMENTS.map(s => ({
    id: s.id, name: s.name, datasets: s.datasets, conditions: s.conditions,
    member_count: s.memberCount, auto_sync: s.autoSync, sync_frequency: s.syncFrequency,
    status: s.status, updated: s.updated, last_sync: s.lastSync,
    global_logic: s.globalLogic || null, groups: s.groups || null
  })));
  if (sErr) console.error('Error segments:', sErr.message);

  // 2. Campaigns
  console.log('Seeding campaigns...');
  const { error: cErr } = await supabase.from('campaigns').upsert(CAMPAIGNS.map(c => ({
    id: c.id, name: c.name, type: c.type, segment: c.segment,
    segment_id: c.segmentId || null, schedule: c.schedule,
    total_members: c.totalMembers, processed: c.processed, status: c.status,
    last_run: c.lastRun, next_run: c.nextRun,
    target_details: c.targetDetails || null, schedule_details: c.scheduleDetails || null,
    action_details: c.actionDetails || null, delivery: c.delivery || null
  })));
  if (cErr) console.error('Error campaigns:', cErr.message);

  // 3. Dynamic Contents
  console.log('Seeding dynamic contents...');
  const { error: dErr } = await supabase.from('dynamic_contents').upsert(DYNAMIC_CONTENTS.map(d => ({
    id: d.id, name: d.name, type: d.type, campaign: d.campaign,
    campaign_id: d.campaignId || null, segment: d.segment,
    segment_id: d.segmentId || null, status: d.status, updated: d.updated, payload: d.payload || null
  })));
  if (dErr) console.error('Error dynamic_contents:', dErr.message);

  // 4. Recommendation Rules
  console.log('Seeding recommendation rules...');
  const { error: rErr } = await supabase.from('recommendation_rules').upsert(RECOMMENDATION_RULES.map(r => ({
    id: r.id, name: r.name, trigger: r.trigger, trigger_id: r.triggerId || null,
    products: r.products, placements: r.placements, priority: r.priority,
    status: r.status, shown: r.shown, ctr: r.ctr, layout: r.layout || null, campaign_id: r.campaignId || null
  })));
  if (rErr) console.error('Error recommendation_rules:', rErr.message);

  // 5. Push History — use insert (no upsert) since id is a serial int
  console.log('Seeding push history...');
  // First truncate to avoid duplicates on re-run
  await supabase.from('push_history').delete().neq('id', 0);
  const { error: hErr } = await supabase.from('push_history').insert(PUSH_HISTORY.map(h => ({
    campaign: h.campaign, sent: h.sent, delivered: h.delivered,
    failed: h.failed, open_rate: h.openRate, sent_at: h.sentAt
  })));
  if (hErr) console.error('Error push_history:', hErr.message);

  // 6. Push Templates
  console.log('Seeding push templates...');
  const { error: tErr } = await supabase.from('push_templates').upsert(PUSH_TEMPLATES.map(t => ({
    id: t.id, campaign_id: t.campaignId || null, campaign: t.campaign,
    title: t.title, body: t.body, trigger: t.trigger,
    segment_id: t.segmentId || null, segment: t.segment
  })));
  if (tErr) console.error('Error push_templates:', tErr.message);

  // 7. Analytics KPI
  console.log('Seeding analytics_kpi...');
  const { error: akErr } = await supabase.from('analytics_kpi').upsert(ANALYTICS_KPI.map(k => ({
    id: k.id, group_name: k.group, title: k.title, value: k.value,
    change: k.change, tooltip: k.tooltip, color: k.color || null,
    target: k.target || null, progress: k.progress || null
  })));
  if (akErr) console.error('Error analytics_kpi:', akErr.message);

  // 8. Analytics Funnel
  console.log('Seeding analytics_funnel...');
  const { error: afErr } = await supabase.from('analytics_funnel').upsert(ANALYTICS_FUNNEL.map(f => ({
    id: f.id, label: f.label, value: f.value, percent: f.percent, fraction: f.fraction
  })));
  if (afErr) console.error('Error analytics_funnel:', afErr.message);

  // 9. Analytics Attribution
  console.log('Seeding analytics_attribution...');
  const { error: aaErr } = await supabase.from('analytics_attribution').upsert(ANALYTICS_ATTRIBUTION.map(a => ({
    id: a.id, channel: a.channel, touches: a.touches, ast: a.ast, dir: a.dir,
    rev_ast: a.revAst, rev_dir: a.revDir, attr: a.attr, navigate_to: a.navigateTo || null
  })));
  if (aaErr) console.error('Error analytics_attribution:', aaErr.message);

  // 10. Analytics Campaign Revenue
  console.log('Seeding analytics_campaign_revenue...');
  const { error: acrErr } = await supabase.from('analytics_campaign_revenue').upsert(ANALYTICS_CAMPAIGN_REVENUE.map(r => ({
    id: r.id, label: r.label, value: r.value, width_pct: r.widthPct, campaign_id: r.campaignId
  })));
  if (acrErr) console.error('Error analytics_campaign_revenue:', acrErr.message);

  // 11. Analytics Campaign Targets
  console.log('Seeding analytics_campaign_targets...');
  const { error: actErr } = await supabase.from('analytics_campaign_targets').upsert(ANALYTICS_CAMPAIGN_TARGETS.map(t => ({
    id: t.id, label: t.label, current: t.current, target: t.target,
    percent: t.percent, check: t.check || false
  })));
  if (actErr) console.error('Error analytics_campaign_targets:', actErr.message);

  // 12. Analytics Suggested Actions
  console.log('Seeding analytics_suggested_actions...');
  const { error: asaErr } = await supabase.from('analytics_suggested_actions').upsert(ANALYTICS_SUGGESTED_ACTIONS.map(a => ({
    id: a.id, impact: a.impact, title: a.title, desc: a.desc, navigate_to: a.navigateTo
  })));
  if (asaErr) console.error('Error analytics_suggested_actions:', asaErr.message);

  // 13. Audience Segments
  console.log('Seeding audience_segments...');
  const { error: ausErr } = await supabase.from('audience_segments').upsert(AUDIENCE_SEGMENTS.map(s => ({
    id: s.id, name: s.name, count: s.count, active: s.active,
    colors: s.colors, campaign_ids: s.campaignIds
  })));
  if (ausErr) console.error('Error audience_segments:', ausErr.message);

  // 14. Audience Members
  console.log('Seeding audience_members...');
  const { error: aumErr } = await supabase.from('audience_members').upsert(AUDIENCE_MEMBERS.map(m => ({
    id: m.id, segment_id: m.segmentId, name: m.name, tier: m.tier,
    pts: m.pts, last_transaction: m.last, days_inactive: m.days,
    push_enabled: m.push, status: m.status
  })));
  if (aumErr) console.error('Error audience_members:', aumErr.message);

  // 15. Audience Campaign History
  console.log('Seeding audience_campaign_history...');
  const { error: achErr } = await supabase.from('audience_campaign_history').upsert(AUDIENCE_CAMPAIGN_HISTORY.map(h => ({
    id: h.id, segment_id: h.segmentId, campaign_id: h.campaignId, campaign: h.campaign,
    period: h.period, impressions: h.impressions, ctr: h.ctr, ctr_status: h.ctrStatus,
    cvr: h.cvr, revenue: h.revenue, roas: h.roas, roas_status: h.roasStatus
  })));
  if (achErr) console.error('Error audience_campaign_history:', achErr.message);

  // 16. Optimization Suggestions
  console.log('Seeding optimization_suggestions...');
  const { error: osErr } = await supabase.from('optimization_suggestions').upsert(OPTIMIZATION_SUGGESTIONS.map(s => ({
    id: s.id, impact: s.impact, campaign_id: s.campaignId, campaign: s.campaign,
    issue: s.issue, fix: s.fix, lift: s.lift, confidence: s.confidence,
    data: s.data, action_key: s.actionKey, status: s.status
  })));
  if (osErr) console.error('Error optimization_suggestions:', osErr.message);

  // 17. A/B Tests
  console.log('Seeding ab_tests...');
  const { error: abtErr } = await supabase.from('ab_tests').upsert(AB_TESTS.map(t => ({
    id: t.id, campaign_id: t.campaignId, campaign: t.campaign, channel: t.channel,
    status: t.status, days_left: t.daysLeft, significance: t.significance,
    winner: t.winner, auto_deploy: t.autoDeploy, warning: t.warning || null,
    variant_a: t.variantA, variant_b: t.variantB, test_status: t.testStatus
  })));
  if (abtErr) console.error('Error ab_tests:', abtErr.message);

  // 18. Fatigue Alerts
  console.log('Seeding fatigue_alerts...');
  const { error: faErr } = await supabase.from('fatigue_alerts').upsert(FATIGUE_ALERTS.map(f => ({
    id: f.id, name: f.name, campaign_id: f.campaignId || null, campaign: f.campaign,
    days_live: f.daysLive, ctr_week1: f.ctrWeek1, ctr_now: f.ctrNow,
    drop: f.drop, status: f.status
  })));
  if (faErr) console.error('Error fatigue_alerts:', faErr.message);

  // 19. Optimization History
  console.log('Seeding optimization_history...');
  const { error: ohErr } = await supabase.from('optimization_history').upsert(OPTIMIZATION_HISTORY.map(h => ({
    id: h.id, time: h.time, desc: h.desc, user: h.user
  })));
  if (ohErr) console.error('Error optimization_history:', ohErr.message);

  // 20. Frequency Overrides
  console.log('Seeding frequency_overrides...');
  const { error: foErr } = await supabase.from('frequency_overrides').upsert(FREQUENCY_OVERRIDES.map(f => ({
    id: f.id, segment: f.segment, max_per_day: f.maxPerDay,
    max_per_week: f.maxPerWeek, cooldown: f.cooldown, context: f.context
  })));
  if (foErr) console.error('Error frequency_overrides:', foErr.message);

  console.log('✅ Seeding completed!');
}

seed();
