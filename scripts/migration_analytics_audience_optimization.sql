-- ============================================================
-- Migration: Analytics, Audience Insights, Optimization tables
-- Run this in your Supabase SQL editor
-- ============================================================

-- Analytics KPI
create table if not exists analytics_kpi (
  id text primary key,
  group_name text,
  title text,
  value text,
  change text,
  tooltip text,
  color text,
  target text,
  progress jsonb
);

-- Analytics Funnel
create table if not exists analytics_funnel (
  id text primary key,
  label text,
  value text,
  percent text,
  fraction text
);

-- Analytics Attribution
create table if not exists analytics_attribution (
  id text primary key,
  channel text,
  touches text,
  ast text,
  dir text,
  rev_ast text,
  rev_dir text,
  attr text,
  navigate_to text
);

-- Analytics Campaign Revenue
create table if not exists analytics_campaign_revenue (
  id text primary key,
  label text,
  value text,
  width_pct integer,
  campaign_id text
);

-- Analytics Campaign Targets
create table if not exists analytics_campaign_targets (
  id text primary key,
  label text,
  current text,
  target text,
  percent numeric,
  "check" boolean default false
);

-- Analytics Suggested Actions
create table if not exists analytics_suggested_actions (
  id text primary key,
  impact text,
  title text,
  desc text,
  navigate_to text
);

-- Audience Segments (insight view, separate from segments table)
create table if not exists audience_segments (
  id text primary key,
  name text,
  count text,
  active boolean,
  colors jsonb,
  campaign_ids jsonb
);

-- Audience Members
create table if not exists audience_members (
  id text primary key,
  segment_id text,
  name text,
  tier text,
  pts text,
  last_transaction text,
  days_inactive text,
  push_enabled boolean,
  status text
);

-- Audience Campaign History
create table if not exists audience_campaign_history (
  id text primary key,
  segment_id text,
  campaign_id text,
  campaign text,
  period text,
  impressions text,
  ctr text,
  ctr_status text,
  cvr text,
  revenue text,
  roas text,
  roas_status text
);

-- Optimization Suggestions
create table if not exists optimization_suggestions (
  id text primary key,
  impact text,
  campaign_id text,
  campaign text,
  issue text,
  fix text,
  lift text,
  confidence text,
  data text,
  action_key text,
  status text default 'pending'
);

-- A/B Tests
create table if not exists ab_tests (
  id text primary key,
  campaign_id text,
  campaign text,
  channel text,
  status text,
  days_left integer,
  significance text,
  winner text,
  auto_deploy boolean default true,
  warning text,
  variant_a jsonb,
  variant_b jsonb,
  test_status text default 'running'
);

-- Fatigue Alerts
create table if not exists fatigue_alerts (
  id text primary key,
  name text,
  campaign_id text,
  campaign text,
  days_live text,
  ctr_week1 text,
  ctr_now text,
  drop text,
  status text
);

-- Optimization History
create table if not exists optimization_history (
  id text primary key,
  time text,
  desc text,
  "user" text
);

-- Frequency Overrides
create table if not exists frequency_overrides (
  id text primary key,
  segment text,
  max_per_day integer,
  max_per_week integer,
  cooldown text,
  context text
);
