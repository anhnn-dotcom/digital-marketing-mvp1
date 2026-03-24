## AGENT QUICK REF
MOD: Analytics — KPI tracking, funnel, attribution, revenue, targets, suggested actions
ENT: KPI, Funnel, Attribution, CampaignRevenue, CampaignTargets, SuggestedAction
RULE: Read-only module (no CRUD); data fetched from Supabase tables or mocked; SuggestedActions link to /optimize
DEPS: ← AppContext (analyticsKpi, analyticsFunnel, analyticsAttribution, analyticsCampaignRevenue, analyticsCampaignTargets, analyticsSuggestedActions)

## DATA FLOW
```mermaid
flowchart LR
    SB[(Supabase)] -->|fetch on mount| AC[AppContext]
    AC --> ANL[AnalyticsDashboardPage]
    AC --> RPT[ReportsPage]
    AC --> OVR[OverviewDashboardPage]
    SA[SuggestedActions] -->|navigateTo| OPT[/optimize]
```

## ENTITY: KPI
| Field | Type | Meaning |
|---|---|---|
| id | string | `kpi_N` |
| group | string | `Engagement\|Conversion & Revenue\|Unit Economics` |
| title | string | Metric name |
| value | string | Formatted display value |
| change | string | e.g. `↑ 12.4%` or `↓ 8.2%` |
| color | `green\|null` | Green = on target |
| target | string\|undefined | Target threshold label |
| progress | `{current, target}\|undefined` | Progress bar data |
| tooltip | string | Metric definition |

## KPI GROUPS & METRICS
| Group | Metrics |
|---|---|
| Engagement | Impressions, Clicks, CTR, Unique Members Reached |
| Conversion & Revenue | Conversions, CVR, Revenue Attributed, ROAS |
| Unit Economics | CAC, Avg Member LTV, LTV:CAC Ratio, Avg Transactions/User/Week |

## KEY FORMULAS
| Metric | Formula |
|---|---|
| CTR | Clicks ÷ Impressions |
| CVR | Conversions ÷ Clicks |
| ROAS | Revenue Attributed ÷ Campaign Spend |
| LTV:CAC | Avg Member LTV ÷ CAC |
| CAC | Total spend ÷ new active transactors |

## ENTITY: Funnel Step
| Field | Type | Meaning |
|---|---|---|
| id | string | `funnel_N` |
| label | string | Stage name |
| value | string | Count (formatted) |
| percent | string | Drop-off % or rate |
| fraction | string | Visual bar width hint |

## FUNNEL STAGES (in order)
`Reached → Impressions → Clicks → Conversions → Repeat Conversions`

## ENTITY: Attribution
| Field | Type | Meaning |
|---|---|---|
| channel | string | `Push Notification\|Popup\|Banner\|Recommendation` |
| touches | string | Total touchpoints |
| ast / dir | string | Assisted / Direct conversions |
| revAst / revDir | string | Attributed revenue (฿) |
| attr | string | Channel contribution % |
| navigateTo | string\|null | Deep-link to module |

## ENTITY: CampaignRevenue
| Field | Meaning |
|---|---|
| label | Campaign short name |
| value | Revenue string (฿) |
| widthPct | Bar chart relative width (0–100) |
| campaignId | FK → Campaign |

## ENTITY: CampaignTarget
| Field | Meaning |
|---|---|
| label | Target name |
| current | Current achieved value |
| target | Goal threshold |
| percent | Progress (0–100) |
| check | if true → target met |

## ENTITY: SuggestedAction
| Field | Meaning |
|---|---|
| id | `sa_N` |
| impact | `high\|medium\|low` |
| title | Short action label |
| desc | Issue description |
| navigateTo | Route to relevant module |

## BUSINESS RULES
- All analytics data is **read-only** — no mutations from Analytics pages
- Revenue attribution window = 7 days post-conversion
- CTR color=green when above platform avg (12.4%)
- ROAS target = 3.2×; CAC target = ≤฿85
- SuggestedActions navigate to `/optimize` (CampaignOptimizationPage)

## DEV TASK MAP
| Task | Files (in order) |
|---|---|
| Add new KPI | `mockData.js` (ANALYTICS_KPI) → `AnalyticsDashboardPage.jsx` |
| Add new chart | `AnalyticsDashboardPage.jsx` (add Recharts component) |
| Add funnel stage | `mockData.js` (ANALYTICS_FUNNEL) → `AnalyticsDashboardPage.jsx` |
| Seed Supabase analytics | `analytics_kpi`, `analytics_funnel`, `analytics_attribution` tables |

## FILES
| File | Role |
|---|---|
| `pages/AnalyticsDashboardPage.jsx` | Full KPI + funnel + attribution + revenue |
| `pages/ReportsPage.jsx` | Campaign performance table + charts |
| `pages/OverviewDashboardPage.jsx` | High-level summary dashboard |
| `context/AppContext.jsx` | All analytics state (6 slices) |
| `constants/mockData.js` | ANALYTICS_KPI[], ANALYTICS_FUNNEL[], ANALYTICS_ATTRIBUTION[], ANALYTICS_CAMPAIGN_REVENUE[], ANALYTICS_CAMPAIGN_TARGETS[], ANALYTICS_SUGGESTED_ACTIONS[] |
