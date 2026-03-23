import { createClient } from '@supabase/supabase-js';
import { 
  SEGMENTS, 
  CAMPAIGNS, 
  DYNAMIC_CONTENTS, 
  RECOMMENDATION_RULES,
  PUSH_HISTORY,
  PUSH_TEMPLATES 
} from '../src/constants/mockData.js';

const SUPABASE_URL = "https://oiozipobixueiojumbjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb3ppcG9iaXh1ZWlvanVtYmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDkxOTksImV4cCI6MjA4OTgyNTE5OX0.npcn-mWcUqvjK_8jJOqVTzNczCpalC5RYHshMFNWgKw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  console.log('🚀 Starting seed...');

  // 1. Segments
  console.log('Seeding segments...');
  const { error: sErr } = await supabase.from('segments').upsert(SEGMENTS.map(s => ({
    id: s.id,
    name: s.name,
    datasets: s.datasets,
    conditions: s.conditions,
    member_count: s.memberCount,
    auto_sync: s.autoSync,
    sync_frequency: s.syncFrequency,
    status: s.status,
    updated: s.updated,
    last_sync: s.lastSync,
    global_logic: s.globalLogic || null,
    groups: s.groups || null
  })));
  if (sErr) console.error('Error segments:', sErr);

  // 2. Campaigns
  console.log('Seeding campaigns...');
  const { error: cErr } = await supabase.from('campaigns').upsert(CAMPAIGNS.map(c => ({
    id: c.id,
    name: c.name,
    type: c.type,
    segment: c.segment,
    segment_id: c.segmentId || null,
    schedule: c.schedule,
    total_members: c.totalMembers,
    processed: c.processed,
    status: c.status,
    last_run: c.lastRun,
    next_run: c.nextRun,
    target_details: c.targetDetails || null,
    schedule_details: c.scheduleDetails || null,
    action_details: c.actionDetails || null,
    delivery: c.delivery || null
  })));
  if (cErr) console.error('Error campaigns:', cErr);

  // 3. Dynamic Contents
  console.log('Seeding dynamic contents...');
  const { error: dErr } = await supabase.from('dynamic_contents').upsert(DYNAMIC_CONTENTS.map(d => ({
    id: d.id,
    name: d.name,
    type: d.type,
    campaign: d.campaign,
    campaign_id: d.campaignId || null,
    segment: d.segment,
    segment_id: d.segmentId || null,
    status: d.status,
    updated: d.updated,
    payload: d.payload || null
  })));
  if (dErr) console.error('Error dynamic contents:', dErr);

  // 4. Recommendation Rules
  console.log('Seeding rules...');
  const { error: rErr } = await supabase.from('recommendation_rules').upsert(RECOMMENDATION_RULES.map(r => ({
    id: r.id,
    name: r.name,
    trigger: r.trigger,
    trigger_id: r.triggerId || null,
    products: r.products,
    placements: r.placements,
    priority: r.priority,
    status: r.status,
    shown: r.shown,
    ctr: r.ctr,
    layout: r.layout || null,
    campaign_id: r.campaignId || null
  })));
  if (rErr) console.error('Error rules:', rErr);

  // 5. Push History
  console.log('Seeding push history...');
  const { error: hErr } = await supabase.from('push_history').upsert(PUSH_HISTORY.map(h => ({
    campaign: h.campaign,
    sent: h.sent,
    delivered: h.delivered,
    failed: h.failed,
    open_rate: h.openRate,
    sent_at: h.sentAt
  })));
  if (hErr) console.error('Error history:', hErr);

  // 6. Push Templates
  console.log('Seeding push templates...');
  const { error: tErr } = await supabase.from('push_templates').upsert(PUSH_TEMPLATES.map(t => ({
    id: t.id,
    campaign_id: t.campaignId || null,
    campaign: t.campaign,
    title: t.title,
    body: t.body,
    trigger: t.trigger,
    segment_id: t.segmentId || null,
    segment: t.segment
  })));
  if (tErr) console.error('Error templates:', tErr);

  console.log('✅ Seeding completed!');
}

seed();
