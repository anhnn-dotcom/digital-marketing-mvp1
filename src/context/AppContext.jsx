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
  PIPELINE_ACTIVITY_LOG as MOCK_PIPELINE_LOG
} from '../constants/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
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
  
  const [loading, setLoading] = useState(true);

  // Helper to transform snake_case to camelCase
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

  // Helper to transform camelCase to snake_case for saving
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
        const [
          { data: segmentsData },
          { data: campaignsData },
          { data: contentsData },
          { data: rulesData },
          { data: historyData },
          { data: templatesData }
        ] = await Promise.all([
          supabase.from('segments').select('*'),
          supabase.from('campaigns').select('*'),
          supabase.from('dynamic_contents').select('*'),
          supabase.from('recommendation_rules').select('*'),
          supabase.from('push_history').select('*'),
          supabase.from('push_templates').select('*')
        ]);

        if (segmentsData?.length > 0) setSegments(transformFromSupabase(segmentsData));
        else setSegments(MOCK_SEGMENTS);

        if (campaignsData?.length > 0) setCampaigns(transformFromSupabase(campaignsData));
        else setCampaigns(MOCK_CAMPAIGNS);

        if (contentsData?.length > 0) setContents(transformFromSupabase(contentsData));
        else setContents(MOCK_CONTENTS);

        if (rulesData?.length > 0) setRules(transformFromSupabase(rulesData));
        else setRules(MOCK_RULES);

        if (historyData?.length > 0) setPushHistory(transformFromSupabase(historyData));
        else setPushHistory(MOCK_HISTORY);

        if (templatesData?.length > 0) setPushTemplates(transformFromSupabase(templatesData));
        else setPushTemplates(MOCK_TEMPLATES);

        // Fallback to MOCK data instead of querying non-existent Supabase tables
        setDataSources(MOCK_DATA_SOURCES);
        setEnrichmentJobs(MOCK_ENRICHMENT_JOBS);
        setPipelineLog(MOCK_PIPELINE_LOG);
        
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        setSegments(MOCK_SEGMENTS);
        setCampaigns(MOCK_CAMPAIGNS);
        setContents(MOCK_CONTENTS);
        setRules(MOCK_RULES);
        setPushHistory(MOCK_HISTORY);
        setPushTemplates(MOCK_TEMPLATES);
        setDataSources(MOCK_DATA_SOURCES);
        setEnrichmentJobs(MOCK_ENRICHMENT_JOBS);
        setPipelineLog(MOCK_PIPELINE_LOG);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync operations with Supabase
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


  const value = {
    segments, addSegment, updateSegment, deleteSegment,
    campaigns, addCampaign, updateCampaign, deleteCampaign,
    contents, addContent, updateContent, deleteContent,
    rules, addRule, updateRule, deleteRule,
    pushHistory, addPushHistory,
    pushTemplates, setPushTemplates,
    dataSources, addSource, updateSource, deleteSource,
    enrichmentJobs, addJob, updateJob, deleteJob,
    pipelineLog, addLogEntry, setPipelineLog, // exposing setPipelineLog to easily "clear logs" entirely in local UI
    loading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

