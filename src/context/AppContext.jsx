import React, { createContext, useContext, useState } from 'react';
import { 
  SEGMENTS, 
  CAMPAIGNS, 
  DYNAMIC_CONTENTS, 
  RECOMMENDATION_RULES,
  PUSH_HISTORY
} from '../constants/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [segments, setSegments] = useState(SEGMENTS);
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [contents, setContents] = useState(DYNAMIC_CONTENTS);
  const [rules, setRules] = useState(RECOMMENDATION_RULES);
  const [pushHistory, setPushHistory] = useState(PUSH_HISTORY);

  // General add/update/delete functions
  const addSegment = (segment) => setSegments([...segments, segment]);
  const updateSegment = (id, data) => setSegments(segments.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteSegment = (id) => setSegments(segments.filter(s => s.id !== id));

  const addCampaign = (campaign) => setCampaigns([...campaigns, campaign]);
  const updateCampaign = (id, data) => setCampaigns(campaigns.map(c => c.id === id ? { ...c, ...data } : c));
  const deleteCampaign = (id) => setCampaigns(campaigns.filter(c => c.id !== id));

  const addContent = (content) => setContents([...contents, content]);
  const updateContent = (id, data) => setContents(contents.map(c => c.id === id ? { ...c, ...data } : c));
  const deleteContent = (id) => setContents(contents.filter(c => c.id !== id));

  const addRule = (rule) => setRules([...rules, rule]);
  const updateRule = (id, data) => setRules(rules.map(r => r.id === id ? { ...r, ...data } : r));
  const deleteRule = (id) => setRules(rules.filter(r => r.id !== id));

  const addPushHistory = (history) => setPushHistory([history, ...pushHistory]);

  const value = {
    segments, addSegment, updateSegment, deleteSegment,
    campaigns, addCampaign, updateCampaign, deleteCampaign,
    contents, addContent, updateContent, deleteContent,
    rules, addRule, updateRule, deleteRule,
    pushHistory, addPushHistory
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
