import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  SEGMENTS as MOCK_SEGMENTS,
  CAMPAIGNS as MOCK_CAMPAIGNS,
  DYNAMIC_CONTENTS as MOCK_CONTENTS,
  RECOMMENDATION_RULES as MOCK_RULES,
  PUSH_HISTORY as MOCK_HISTORY,
  PUSH_TEMPLATES as MOCK_TEMPLATES,
  DATA_SOURCES as MOCK_DATA_SOURCES,
  ENRICHMENT_JOBS as MOCK_ENRICHMENT_JOBS,
  PIPELINE_ACTIVITY_LOG as MOCK_PIPELINE_LOG,
  // Analytics
  ANALYTICS_KPI as MOCK_ANALYTICS_KPI,
  ANALYTICS_FUNNEL as MOCK_ANALYTICS_FUNNEL,
  ANALYTICS_ATTRIBUTION as MOCK_ANALYTICS_ATTRIBUTION,
  ANALYTICS_CAMPAIGN_REVENUE as MOCK_ANALYTICS_CAMPAIGN_REVENUE,
  ANALYTICS_CAMPAIGN_TARGETS as MOCK_ANALYTICS_CAMPAIGN_TARGETS,
  ANALYTICS_SUGGESTED_ACTIONS as MOCK_ANALYTICS_SUGGESTED_ACTIONS,
  // Audience Insights
  AUDIENCE_SEGMENTS as MOCK_AUDIENCE_SEGMENTS,
  AUDIENCE_MEMBERS as MOCK_AUDIENCE_MEMBERS,
  AUDIENCE_CAMPAIGN_HISTORY as MOCK_AUDIENCE_CAMPAIGN_HISTORY,
  // Optimization
  OPTIMIZATION_SUGGESTIONS as MOCK_OPTIMIZATION_SUGGESTIONS,
  AB_TESTS as MOCK_AB_TESTS,
  FATIGUE_ALERTS as MOCK_FATIGUE_ALERTS,
  OPTIMIZATION_HISTORY as MOCK_OPTIMIZATION_HISTORY,
  FREQUENCY_OVERRIDES as MOCK_FREQUENCY_OVERRIDES,
} from '../constants/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Core entities
  const [segments, setSegments] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [contents, setContents] = useState([]);
  const [rules, setRules] = useState([]);
  const [pushHistory, setPushHistory] = useState([]);
  const [pushTemplates, setPushTemplates] = useState([]);

  // Pipeline state
  const [dataSources, setDataSources] = useState([]);
  const [enrichmentJobs, setEnrichmentJobs] = useState([]);
  const [pipelineLog, setPipelineLog] = useState([]);

  // Analytics
  const [analyticsKpi, setAnalyticsKpi] = useState([]);
  const [analyticsFunnel, setAnalyticsFunnel] = useState([]);
  const [analyticsAttribution, setAnalyticsAttribution] = useState([]);
  const [analyticsCampaignRevenue, setAnalyticsCampaignRevenue] = useState([]);
  const [analyticsCampaignTargets, setAnalyticsCampaignTargets] = useState([]);
  const [analyticsSuggestedActions, setAnalyticsSuggestedActions] = useState([]);

  // Audience Insights
  const [audienceSegments, setAudienceSegments] = useState([]);
  const [audienceMembers, setAudienceMembers] = useState([]);
  const [audienceCampaignHistory, setAudienceCampaignHistory] = useState([]);

  // Optimization
  const [optimizationSuggestions, setOptimizationSuggestions] = useState([]);
  const [abTests, setAbTests] = useState([]);
  const [fatigueAlerts, setFatigueAlerts] = useState([]);
  const [optimizationHistory, setOptimizationHistory] = useState([]);
  const [frequencyOverrides, setFrequencyOverrides] = useState([]);

  const [loading, setLoading] = useState(true);

  // Helper to transform snake_case keys to camelCase
  const transformFromSupabase = (obj) => {
    if (!obj) return obj;
    if (Array.isArray(obj)) return obj.map(transformFromSupabase);
    const newObj = {};
    for (const key in obj) {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      newObj[camelKey] = obj[key];
    }
    return newObj;
  };

  // Helper to transform camelCase keys to snake_case for saving
  const transformToSupabase = (obj) => {
    if (!obj) return obj;
    const newObj = {};
    for (const key in obj) {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      newObj[snakeKey] = obj[key];
    }
    return newObj;
  };

  // Fetch all data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await Promise.all([
          supabase.from('segments').select('*'),
          supabase.from('campaigns').select('*'),
          supabase.from('dynamic_contents').select('*'),
          supabase.from('recommendation_rules').select('*'),
          supabase.from('push_history').select('*'),
          supabase.from('push_templates').select('*'),
          // Analytics
          supabase.from('analytics_kpi').select('*'),
          supabase.from('analytics_funnel').select('*'),
          supabase.from('analytics_attribution').select('*'),
          supabase.from('analytics_campaign_revenue').select('*'),
          supabase.from('analytics_campaign_targets').select('*'),
          supabase.from('analytics_suggested_actions').select('*'),
          // Audience
          supabase.from('audience_segments').select('*'),
          supabase.from('audience_members').select('*'),
          supabase.from('audience_campaign_history').select('*'),
          // Optimization
          supabase.from('optimization_suggestions').select('*'),
          supabase.from('ab_tests').select('*'),
          supabase.from('fatigue_alerts').select('*'),
          supabase.from('optimization_history').select('*'),
          supabase.from('frequency_overrides').select('*'),
        ]);

        const [
          { data: segmentsData },
          { data: campaignsData },
          { data: contentsData },
          { data: rulesData },
          { data: historyData },
          { data: templatesData },
          { data: kpiData },
          { data: funnelData },
          { data: attributionData },
          { data: campaignRevenueData },
          { data: campaignTargetsData },
          { data: suggestedActionsData },
          { data: audienceSegmentsData },
          { data: audienceMembersData },
          { data: audienceCampaignHistoryData },
          { data: optimizationSuggestionsData },
          { data: abTestsData },
          { data: fatigueAlertsData },
          { data: optimizationHistoryData },
          { data: frequencyOverridesData },
        ] = results;

        // Core entities
        setSegments(segmentsData?.length > 0 ? transformFromSupabase(segmentsData) : MOCK_SEGMENTS);
        setCampaigns(campaignsData?.length > 0 ? transformFromSupabase(campaignsData) : MOCK_CAMPAIGNS);
        setContents(contentsData?.length > 0 ? transformFromSupabase(contentsData) : MOCK_CONTENTS);
        setRules(rulesData?.length > 0 ? transformFromSupabase(rulesData) : MOCK_RULES);
        setPushHistory(historyData?.length > 0 ? transformFromSupabase(historyData) : MOCK_HISTORY);
        setPushTemplates(templatesData?.length > 0 ? transformFromSupabase(templatesData) : MOCK_TEMPLATES);

        // Pipeline (no Supabase tables yet — use mock)
        setDataSources(MOCK_DATA_SOURCES);
        setEnrichmentJobs(MOCK_ENRICHMENT_JOBS);
        setPipelineLog(MOCK_PIPELINE_LOG);

        // Analytics
        setAnalyticsKpi(kpiData?.length > 0 ? transformFromSupabase(kpiData) : MOCK_ANALYTICS_KPI);
        setAnalyticsFunnel(funnelData?.length > 0 ? transformFromSupabase(funnelData) : MOCK_ANALYTICS_FUNNEL);
        setAnalyticsAttribution(attributionData?.length > 0 ? transformFromSupabase(attributionData) : MOCK_ANALYTICS_ATTRIBUTION);
        setAnalyticsCampaignRevenue(campaignRevenueData?.length > 0 ? transformFromSupabase(campaignRevenueData) : MOCK_ANALYTICS_CAMPAIGN_REVENUE);
        setAnalyticsCampaignTargets(campaignTargetsData?.length > 0 ? transformFromSupabase(campaignTargetsData) : MOCK_ANALYTICS_CAMPAIGN_TARGETS);
        setAnalyticsSuggestedActions(suggestedActionsData?.length > 0 ? transformFromSupabase(suggestedActionsData) : MOCK_ANALYTICS_SUGGESTED_ACTIONS);

        // Audience
        setAudienceSegments(audienceSegmentsData?.length > 0 ? transformFromSupabase(audienceSegmentsData) : MOCK_AUDIENCE_SEGMENTS);
        setAudienceMembers(audienceMembersData?.length > 0 ? transformFromSupabase(audienceMembersData) : MOCK_AUDIENCE_MEMBERS);
        setAudienceCampaignHistory(audienceCampaignHistoryData?.length > 0 ? transformFromSupabase(audienceCampaignHistoryData) : MOCK_AUDIENCE_CAMPAIGN_HISTORY);

        // Optimization
        setOptimizationSuggestions(optimizationSuggestionsData?.length > 0 ? transformFromSupabase(optimizationSuggestionsData) : MOCK_OPTIMIZATION_SUGGESTIONS);
        setAbTests(abTestsData?.length > 0 ? transformFromSupabase(abTestsData) : MOCK_AB_TESTS);
        setFatigueAlerts(fatigueAlertsData?.length > 0 ? transformFromSupabase(fatigueAlertsData) : MOCK_FATIGUE_ALERTS);
        setOptimizationHistory(optimizationHistoryData?.length > 0 ? transformFromSupabase(optimizationHistoryData) : MOCK_OPTIMIZATION_HISTORY);
        setFrequencyOverrides(frequencyOverridesData?.length > 0 ? transformFromSupabase(frequencyOverridesData) : MOCK_FREQUENCY_OVERRIDES);

      } catch (error) {
        console.error('Error fetching data from Supabase, falling back to mock data:', error);
        setSegments(MOCK_SEGMENTS);
        setCampaigns(MOCK_CAMPAIGNS);
        setContents(MOCK_CONTENTS);
        setRules(MOCK_RULES);
        setPushHistory(MOCK_HISTORY);
        setPushTemplates(MOCK_TEMPLATES);
        setDataSources(MOCK_DATA_SOURCES);
        setEnrichmentJobs(MOCK_ENRICHMENT_JOBS);
        setPipelineLog(MOCK_PIPELINE_LOG);
        setAnalyticsKpi(MOCK_ANALYTICS_KPI);
        setAnalyticsFunnel(MOCK_ANALYTICS_FUNNEL);
        setAnalyticsAttribution(MOCK_ANALYTICS_ATTRIBUTION);
        setAnalyticsCampaignRevenue(MOCK_ANALYTICS_CAMPAIGN_REVENUE);
        setAnalyticsCampaignTargets(MOCK_ANALYTICS_CAMPAIGN_TARGETS);
        setAnalyticsSuggestedActions(MOCK_ANALYTICS_SUGGESTED_ACTIONS);
        setAudienceSegments(MOCK_AUDIENCE_SEGMENTS);
        setAudienceMembers(MOCK_AUDIENCE_MEMBERS);
        setAudienceCampaignHistory(MOCK_AUDIENCE_CAMPAIGN_HISTORY);
        setOptimizationSuggestions(MOCK_OPTIMIZATION_SUGGESTIONS);
        setAbTests(MOCK_AB_TESTS);
        setFatigueAlerts(MOCK_FATIGUE_ALERTS);
        setOptimizationHistory(MOCK_OPTIMIZATION_HISTORY);
        setFrequencyOverrides(MOCK_FREQUENCY_OVERRIDES);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ─── Core CRUD (Supabase-synced) ─────────────────────────────
  const addSegment = async (segment) => {
    setSegments(prev => [...prev, segment]);
    const { error } = await supabase.from('segments').insert(transformToSupabase(segment));
    if (error) console.error('Supabase Error:', error);
  };
  const updateSegment = async (id, data) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    const { error } = await supabase.from('segments').update(transformToSupabase(data)).eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };
  const deleteSegment = async (id) => {
    setSegments(prev => prev.filter(s => s.id !== id));
    const { error } = await supabase.from('segments').delete().eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };

  const addCampaign = async (campaign) => {
    setCampaigns(prev => [...prev, campaign]);
    const { error } = await supabase.from('campaigns').insert(transformToSupabase(campaign));
    if (error) console.error('Supabase Error:', error);
  };
  const updateCampaign = async (id, data) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    const { error } = await supabase.from('campaigns').update(transformToSupabase(data)).eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };
  const deleteCampaign = async (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    const { error } = await supabase.from('campaigns').delete().eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };

  const addContent = async (content) => {
    setContents(prev => [...prev, content]);
    const { error } = await supabase.from('dynamic_contents').insert(transformToSupabase(content));
    if (error) console.error('Supabase Error:', error);
  };
  const updateContent = async (id, data) => {
    setContents(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    const { error } = await supabase.from('dynamic_contents').update(transformToSupabase(data)).eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };
  const deleteContent = async (id) => {
    setContents(prev => prev.filter(c => c.id !== id));
    const { error } = await supabase.from('dynamic_contents').delete().eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };

  const addRule = async (rule) => {
    setRules(prev => [...prev, rule]);
    const { error } = await supabase.from('recommendation_rules').insert(transformToSupabase(rule));
    if (error) console.error('Supabase Error:', error);
  };
  const updateRule = async (id, data) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
    const { error } = await supabase.from('recommendation_rules').update(transformToSupabase(data)).eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };
  const deleteRule = async (id) => {
    setRules(prev => prev.filter(r => r.id !== id));
    const { error } = await supabase.from('recommendation_rules').delete().eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };

  const addPushHistory = async (history) => {
    setPushHistory([history, ...pushHistory]);
    const { error } = await supabase.from('push_history').insert(transformToSupabase(history));
    if (error) console.error('Supabase Error:', error);
  };

  const addSource = async (source) => {
    setDataSources(prev => [...prev, source]);
    const { error } = await supabase.from('data_sources').insert(transformToSupabase(source));
    if (error) console.error('Supabase Error:', error);
  };
  const updateSource = async (id, data) => {
    setDataSources(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    const { error } = await supabase.from('data_sources').update(transformToSupabase(data)).eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };
  const deleteSource = async (id) => {
    setDataSources(prev => prev.filter(s => s.id !== id));
    const { error } = await supabase.from('data_sources').delete().eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };

  const addJob = async (job) => {
    setEnrichmentJobs(prev => [...prev, job]);
    const { error } = await supabase.from('enrichment_jobs').insert(transformToSupabase(job));
    if (error) console.error('Supabase Error:', error);
  };
  const updateJob = async (id, data) => {
    setEnrichmentJobs(prev => prev.map(j => j.id === id ? { ...j, ...data } : j));
    const { error } = await supabase.from('enrichment_jobs').update(transformToSupabase(data)).eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };
  const deleteJob = async (id) => {
    setEnrichmentJobs(prev => prev.filter(j => j.id !== id));
    const { error } = await supabase.from('enrichment_jobs').delete().eq('id', id);
    if (error) console.error('Supabase Error:', error);
  };

  const addLogEntry = async (log) => {
    setPipelineLog(prev => [log, ...prev]);
    const { error } = await supabase.from('pipeline_logs').insert(transformToSupabase(log));
    if (error) console.error('Supabase Error:', error);
  };

  // ─── Optimization actions (optimistic, then sync) ─────────────
  const dismissSuggestion = async (id) => {
    setOptimizationSuggestions(prev => prev.filter(s => s.id !== id));
    await supabase.from('optimization_suggestions').update({ status: 'dismissed' }).eq('id', id);
  };
  const applySuggestion = async (id) => {
    setOptimizationSuggestions(prev => prev.filter(s => s.id !== id));
    await supabase.from('optimization_suggestions').update({ status: 'applied' }).eq('id', id);
  };
  const deployAbTest = async (id) => {
    setAbTests(prev => prev.map(t => t.id === id ? { ...t, testStatus: 'deployed' } : t));
    await supabase.from('ab_tests').update({ test_status: 'deployed' }).eq('id', id);
  };

  const value = {
    // Core
    segments, addSegment, updateSegment, deleteSegment,
    campaigns, addCampaign, updateCampaign, deleteCampaign,
    contents, addContent, updateContent, deleteContent,
    rules, addRule, updateRule, deleteRule,
    pushHistory, addPushHistory,
    pushTemplates, setPushTemplates,
    // Pipeline
    dataSources, addSource, updateSource, deleteSource,
    enrichmentJobs, addJob, updateJob, deleteJob,
    pipelineLog, addLogEntry, setPipelineLog,
    // Analytics
    analyticsKpi, analyticsFunnel, analyticsAttribution,
    analyticsCampaignRevenue, analyticsCampaignTargets, analyticsSuggestedActions,
    // Audience Insights
    audienceSegments, audienceMembers, audienceCampaignHistory,
    // Optimization
    optimizationSuggestions, dismissSuggestion, applySuggestion,
    abTests, deployAbTest,
    fatigueAlerts,
    optimizationHistory,
    frequencyOverrides,
    // Loading
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
