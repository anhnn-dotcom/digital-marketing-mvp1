# Kế hoạch Kiện toàn Dự án — Digital Marketing MVP

> Comprehensive review & enhancement plan covering **Flow**, **UI/UX**, and **Missing Features**

## Tổng quan Dự án Hiện tại

| Tiêu chí | Hiện trạng |
|---|---|
| **Tech Stack** | Vite + React 19 + TailwindCSS 4 + Supabase + Recharts + Sonner |
| **Số trang** | 14 page components, 11 sidebar routes |
| **Components** | 44 components across 9 directories |
| **State** | Centralized `AppContext.jsx` with CRUD synced to Supabase |
| **Data** | `mockData.js` (46KB) with fallback from Supabase |

---

## Hiện trạng từng Module (Screenshots)

````carousel
![Overview Dashboard — Hardcoded data, progress bars grey](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/overview_dashboard_1774270009709.png)
<!-- slide -->
![Segments — Full-featured list with health, CTR, auto-sync](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/segments_list_1774270022434.png)
<!-- slide -->
![Campaigns — Active/Scheduled/Completed stats, search, AI tips](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/campaigns_list_1774270043259.png)
<!-- slide -->
![Dynamic Content — List with thumbnails, types, linked campaigns](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/dynamic_content_list_1774270051598.png)
<!-- slide -->
![Push Notifications — Builder with iOS/Android/In-App preview](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/push_notifications_list_1774270060203.png)
<!-- slide -->
![Recommendations — KPI cards + rule table](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/recommendations_list_1774270068337.png)
<!-- slide -->
![Data Pipeline — Source stats, enrichment jobs table](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/data_pipeline_status_1774270108279.png)
<!-- slide -->
![Reports — KPI cards, timeline chart, CSV export](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/reports_list_1774270117368.png)
<!-- slide -->
![Analytics — Multi-filter dashboard + AI Suggested Actions](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/analytics_dashboard_1774270127272.png)
<!-- slide -->
![Audience Insights — Segment explorer with overlap detection](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/audience_insights_page_1774270140891.png)
<!-- slide -->
![Optimization — AI suggestions, A/B tests, fatigue alerts](/Users/nguyennamkhanh/.gemini/antigravity/brain/8a0f111a-27aa-4f67-9c08-89d0d3fa10a7/optimization_status_1774270151315.png)
````

---

## Vấn đề & Khoảng trống Phát hiện

### 🔴 Flow & Navigation Gaps

| # | Vấn đề | Chi tiết |
|---|---|---|
| 1 | **Settings button → no destination** | Sidebar "Settings" is a dead `<button>`, no linked page |
| 2 | **Global Search non-functional** | Input is decorative; no Cmd+K shortcut, no search results |
| 3 | **Missing breadcrumbs** | Only `CreateCampaignPage` has breadcrumbs; others lack navigation context |
| 4 | **Push Notification: no send history** | The page is compose-only; no way to view past sent messages |
| 5 | **Dynamic Content: no dedicated create page** | Content is created/edited via drawer only — inconsistent with Segments/Campaigns pattern |
| 6 | **No Segment Detail page** | Clicking segment name navigates nowhere — only edit route exists |
| 7 | **No 404 page** | Invalid routes show blank content area |
| 8 | **User avatar dropdown missing** | "NK" avatar in header has no click action (no profile, logout, theme) |

### 🟡 Missing Features

| # | Feature | Impact |
|---|---|---|
| 9 | **Campaign Calendar View** | Users can't visualize scheduling conflicts; everything is list-only |
| 10 | **Notification Center full page** | Only 3 hardcoded items in dropdown; no "View all" destination |
| 11 | **CSV/PDF Export** | Analytics has Export PDF/CSV buttons but they don't actually download anything |
| 12 | **Bulk actions on lists** | No multi-select, no bulk delete/activate/deactivate |
| 13 | **Campaign Duplicate** | Common flow missing — need to copy existing campaign as template |
| 14 | **Activity/Audit Log** | No visibility on who did what and when |
| 15 | **Sidebar collapsible** | On smaller screens, sidebar takes permanent 240px, no collapse |

### 🟢 UI/UX Issues

| # | Issue | Where |
|---|---|---|
| 16 | **Overview Dashboard is fully hardcoded** | Progress bars, campaign names, KPIs — none reads from context |
| 17 | **Progress bars all grey** | On Overview, the ProgressBar renders with no fill color contrast |
| 18 | **No loading skeletons** | Pages show blank then suddenly populate — jarring |
| 19 | **No empty states** | If Supabase returns 0 records, user sees blank table |
| 20 | **No confirm modals for destructive actions** | Delete segment/campaign happens on click without safety net |
| 21 | **No pagination** | 16 segments, 17 campaigns all load at once — won't scale |
| 22 | **Mobile responsive gaps** | Sidebar and tables don't adapt to mobile viewports |
| 23 | **No dark mode** | Only light theme; no user preference support |

### 🔵 Data & Architecture

| # | Issue | Impact |
|---|---|---|
| 24 | **No form validation** | Campaign/Segment/Content creation forms accept empty submissions |
| 25 | **No error boundaries** | JS errors crash the entire app |
| 26 | **Supabase failure = silent console.error** | No user-visible feedback when sync fails |
| 27 | **`App.css` is Vite boilerplate** | 185 lines of unused CSS from project scaffold |

---

## Proposed Changes — Priority Batches

### Batch A: Critical Flow Fixes (High Priority)

#### [NEW] [SettingsPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/SettingsPage.jsx)
- Stub page with sections: Account, Team, Integrations, Notification Preferences
- Each section has placeholder toggles/inputs to look real
- Add route `/settings` in `App.jsx`, link sidebar button

#### [NEW] [NotFoundPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/NotFoundPage.jsx)
- 404 illustration with "Go Home" button
- Add catch-all `<Route path="*">` in `App.jsx`

#### [MODIFY] [Sidebar.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/components/layout/Sidebar.jsx)
- Settings button → `NavLink` to `/settings`
- Add sidebar collapse/expand toggle (hamburger icon at top)
- Persist collapsed state in localStorage

#### [MODIFY] [TopHeader.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/components/layout/TopHeader.jsx)
- Implement Cmd+K global search modal (search segments, campaigns, content, rules by name)
- User avatar → dropdown menu (Profile, Dark mode toggle, Logout)
- "View all" in notifications → navigate to `/notifications`

#### [NEW] [NotificationCenterPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/NotificationCenterPage.jsx)
- Full page listing all notifications (not just 3)
- Mark as read/unread, filter by type, clear all
- Add route `/notifications`

---

### Batch B: Missing Features (High Priority)

#### [MODIFY] [PushNotificationPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/PushNotificationPage.jsx)
- Add tab navigation: "Compose" | "History"
- History tab shows sent push list from `pushHistory` context with status (Sent, Delivered, Failed)
- Clicking a history item shows details in a drawer

#### [MODIFY] [OverviewDashboardPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/OverviewDashboardPage.jsx)
- Replace ALL hardcoded values with data from `useAppContext()`
- Active campaigns → filter from `campaigns` state
- Performance → from `analyticsKpi`
- Segment health → from `segments` state (check lastSync, autoSync)
- Schedules → from upcoming `campaigns`

#### [NEW] [CampaignCalendarPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/CampaignCalendarPage.jsx)
- Monthly calendar grid showing campaign schedules
- Click on a day to see campaigns for that day
- Color-coded by status (Active=green, Scheduled=blue, Completed=grey)
- Add route `/campaigns/calendar`, add tab toggle on CampaignListPage

#### [NEW] [SegmentDetailPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/SegmentDetailPage.jsx)
- View-only segment detail (name, conditions, members count, linked campaigns)
- Action buttons: Edit, Delete, Sync Now
- Add route `/segments/:id`

---

### Batch C: UI/UX Polish (Medium Priority)

#### [NEW] [SkeletonLoader.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/components/ui/SkeletonLoader.jsx)
- Reusable skeleton components (SkeletonCard, SkeletonTable, SkeletonText)
- Pulsing animation matching app's design system

#### [NEW] [ErrorBoundary.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/components/ui/ErrorBoundary.jsx)
- Wrap main content area in error boundary
- Show friendly error message with "Reload" button

#### [NEW] [ConfirmDialog.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/components/ui/ConfirmDialog.jsx)
- Reusable confirmation modal for destructive actions
- "Are you sure you want to delete?" with cancel/confirm buttons

#### [MODIFY] All list pages (Segments, Campaigns, Dynamic Content)
- Add bulk select checkbox column
- Add bulk action bar (Delete selected, Activate, Deactivate)
- Add pagination (10 items per page, with page controls)
- Add empty state illustrations when no data

#### [MODIFY] [App.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/App.jsx)
- Wrap content with `ErrorBoundary`
- Add new routes: `/settings`, `/notifications`, `/campaigns/calendar`, `/segments/:id`
- Add catch-all 404 route
- Clean up `App.css` (remove Vite boilerplate)

#### [MODIFY] [AppContext.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/context/AppContext.jsx)
- Add toast notifications on Supabase sync failure (via sonner)
- Add form validation helper functions
- Add notifications state + actions (addNotification, markRead, clearAll)

---

### Batch D: Form Validation & Data Integrity (Medium Priority)

#### [MODIFY] [CreateSegmentPage.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/pages/CreateSegmentPage.jsx)
- Add field-level validation (name required, at least 1 condition)
- Show inline error messages
- Disable save button when invalid

#### [MODIFY] [CampaignWizard.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/components/campaigns/CampaignWizard.jsx)
- Validate each step before allowing "Next"
- Name required, segment required, at least 1 channel

#### [MODIFY] [ComposeForm.jsx](file:///Users/nguyennamkhanh/Documents/project/Digital%20Marketing%20-%20MVP/src/components/push-notification/ComposeForm.jsx)
- Campaign required, title required, body required
- Character count limits with visual indicator

---

## User Review Required

> [!IMPORTANT]
> Có **28 items** trong kế hoạch. Với scope lớn như vậy, đề xuất chia làm **4 batch** thực hiện theo thứ tự ưu tiên:
> - **Batch A**: Flow fixes — Settings, 404, Search, User menu, Sidebar collapse
> - **Batch B**: Missing features — Push History, Live Dashboard, Calendar, Segment Detail
> - **Batch C**: UI/UX — Skeletons, Error Boundary, Confirm Dialogs, Pagination, Empty states
> - **Batch D**: Validation & Data — Form validation, Supabase error handling

> [!WARNING]
> Anh muốn ưu tiên batch nào trước? Hoặc có muốn bỏ/thêm item nào không?

---

## Verification Plan

### Browser Testing (cho mỗi batch)
1. Navigate to each new/modified page → verify rendering, no console errors
2. Test all CRUD flows → create, edit, delete — verify toast notifications
3. Test destructive actions → confirm dialog appears before delete
4. Test search (Cmd+K) → results show matching entities
5. Test 404 → navigate to `/invalid-route` → see 404 page
6. Test sidebar collapse → toggle, verify persists on reload

### Manual Verification
- Resize browser window to mobile widths → verify responsive behavior
- Disconnect Supabase → verify fallback to mock data with user feedback
- Submit empty forms → verify validation prevents submission
- Click through full user journeys:
  - Create Segment → Create Campaign targeting it → View Reports
  - Compose Push → View in History
  - Review Optimization suggestion → Apply
