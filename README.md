# HireIQ — Candidate Review Dashboard

> A production-grade internal hiring tool for reviewing 1000+ candidates with speed and clarity.

---

## Overview

**HireIQ** is a feature-complete recruiter dashboard built with React 18 + Tailwind CSS. It enables recruiters to inspect candidates, evaluate assignments and video submissions, auto-compute priority scores, and shortlist the best talent — all in one dark-themed, polished interface.

---

## Features

| Feature | Details |
|---|---|
| 🏠 **Dashboard Summary** | Total / Reviewed / Shortlisted / Pending counts at a glance |
| 📋 **Candidate List** | Table + Card views with 100 auto-generated candidates |
| 🔍 **Search & Filter** | Search by name/college; filter by assignment, video, ATS score ranges & review status |
| 🔀 **Sort** | Sort by Priority, Assignment, Video, ATS, or Name |
| 👤 **Candidate Detail** | Side-drawer with score breakdown, editable sliders, and review actions |
| 🎯 **Assignment Eval** | Rate UI Quality, Component Structure, State Handling, Edge Cases, Responsiveness, Accessibility (1–5) |
| 🎥 **Video Eval** | Rate Clarity, Confidence, Architecture, Tradeoffs, Communication + timestamp notes |
| ⚡ **Priority Engine** | Live P0–P3 labels using weighted formula; updates instantly as scores change |
| 🆚 **Compare Mode** | Side-by-side comparison of 2–3 candidates with visual score bars |
| ✅ **Review Actions** | Mark reviewed, add to shortlist per candidate |
| 🎨 **Visual Priority** | Green (P0) / Yellow (P1) / Orange (P2) / Red (P3) badges throughout |

---

## Priority Formula

```
Priority Score =
  Assignment Score × 30%
+ Video Score       × 25%
+ ATS Score         × 20%
+ GitHub Score      × 15%
+ Communication     × 10%
```

| Label | Score Range | Action |
|---|---|---|
| 🟢 **P0** | ≥ 80 | Interview Immediately |
| 🟡 **P1** | 65 – 79 | Strong Shortlist |
| 🟠 **P2** | 50 – 64 | Review Later |
| 🔴 **P3** | < 50 | Reject |

---

## Tech Stack

- **React 18** — UI library
- **Vite 5** — build tool & dev server
- **Tailwind CSS 3** — utility-first styling
- **IBM Plex Sans** — body typeface (Google Fonts)
- **DM Serif Display** — logo typeface

---

## Project Structure

```
candidate-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Root state, filtering, routing
    ├── index.css             # Tailwind + global styles
    ├── data/
    │   └── candidates.js     # 100-candidate generator
    ├── utils/
    │   └── priority.js       # Priority formula + color maps
    └── components/
        ├── Header.jsx         # Sticky nav bar
        ├── DashboardSummary.jsx  # 4-stat summary cards
        ├── FilterBar.jsx      # Search, sort, filter controls
        ├── CandidateList.jsx  # Table + card views
        ├── PriorityBadge.jsx  # Reusable badge + score bar
        ├── CandidateDetail.jsx  # Drawer with 3 tabs
        ├── AssignmentEval.jsx   # 6-criteria rating panel
        ├── VideoEval.jsx        # 5-criteria + timestamp notes
        └── ComparePanel.jsx     # Side-by-side comparison modal
```

---

## Setup & Installation

### Prerequisites

- Node.js v18 or later
- npm v9 or later

### Steps

```bash
# 1. Clone / download the project
cd candidate-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview    # preview the production build locally
```

---

## Usage Guide

### Browsing Candidates
- The main screen loads 100 auto-generated candidates in table view
- Switch to **Cards** view using the toggle top-right of the filter bar
- Use the **search box** to filter by name or college
- Use the **Sort** dropdown to reorder by Priority, Assignment, Video, ATS, or Name

### Filtering
- Click **Filters ▼** to expand score range sliders
- Filter by **Assignment / Video / ATS** score range using dual sliders
- Filter by **Review Status**: All / Reviewed / Shortlisted / Pending

### Reviewing a Candidate
1. Click any row or card to open the **detail drawer**
2. On the **Overview tab**: drag score sliders to adjust scores — priority updates live
3. Switch to **Assignment Eval**: rate each criterion 1–5
4. Switch to **Video Eval**: rate video criteria + add timestamp notes
5. Use **Mark as Reviewed** and **Add to Shortlist** buttons

### Comparing Candidates
1. Click the **+** button on any candidate row to add them to compare (up to 3)
2. Click **Compare (N)** in the filter bar
3. The comparison modal shows all scores side-by-side with highlighted winners

---

## Evaluation Criteria Addressed

| Criterion | Implementation |
|---|---|
| **UI Clarity (25%)** | Clean dark theme, clear hierarchy, color-coded priorities |
| **Component Structure (20%)** | Each concern in its own component; shared utilities extracted |
| **State Handling (20%)** | All state in App.jsx; derived state via useMemo; callbacks via useCallback |
| **Priority Logic (15%)** | Weighted formula in `utils/priority.js`; live updates on score edit |
| **Edge-Case Handling (10%)** | Empty states, 0-score defaults, no candidates found message |
| **Visual Hierarchy (10%)** | Priority badges, score bars, color semantics, typography scale |

---

## Screenshots

> Run the app to see the full dashboard in action.

- **Main Table View** — sortable, filterable candidate list with priority badges
- **Detail Drawer** — editable scores + live priority recalculation
- **Assignment Evaluation** — 1–5 rating grid with reviewer notes
- **Video Evaluation** — star ratings + timestamped annotations
- **Compare Modal** — visual score comparison with highlighted winners

---

## License

MIT — free to use and modify.
