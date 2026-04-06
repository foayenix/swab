# Sanko Vision Demo — Build Instructions

## What this is
6 prompts that build the Sanko Vision Demo step by step. Each prompt is small enough for Claude Code to complete in one session without hitting limits.

## How to use

### Setup
1. Create a new GitHub repo called `sanko-vision-demo` (private)
2. Upload all 6 phase files to the repo
3. Open Claude Code, connect to the repo

### Build order — paste one prompt at a time

**Phase 1** → `Phase1_Setup_Data_Shell.md`
- Creates the Vite + React project
- Creates the data layer (all mock data)
- Creates the app shell with nav bar
- Wait for it to finish and commit

**Phase 2** → `Phase2_Home_View.md`
- Builds the Home/Welcome view
- Journey timeline + data flywheel + role selector
- Wait for finish and commit

**Phase 3** → `Phase3_Practitioner_View.md`
- Builds the complete Practitioner view (BIGGEST phase)
- Dashboard, vault with search, formulation detail, patients, outcomes, community, reports
- This is the most complex — if it hits limits, tell Claude Code: "Continue from where you left off. The file is src/views/PractitionerView.jsx"
- Wait for finish and commit

**Phase 4** → `Phase4_Researcher_View.md`
- Builds the Researcher view
- Working search, formulation profiles, collaboration flow, compound explorer
- Wait for finish and commit

**Phase 5** → `Phase5_Regulator_View.md`
- Builds the Regulator view
- Interactive map, condition charts, pharmacovigilance, regulatory interest
- Wait for finish and commit

**Phase 6** → `Phase6_Public_View_Polish.md`
- Builds the Public data portal
- Country table, evidence findings, annual report
- Final integration check across all views
- Wait for finish and commit

### After all phases
Run `npm run build` to verify everything compiles.

Deploy to Netlify or Vercel:
- Connect your GitHub repo
- Build command: `npm run build`
- Output directory: `dist`
- Done — you have a live URL to share

### If Claude Code hits limits mid-phase
Say: "Continue building from where you left off. Read the current state of the files and complete the remaining work from [Phase X prompt filename]."

### Total estimated time
- Phase 1: 5 minutes
- Phase 2: 5 minutes
- Phase 3: 15-20 minutes (largest)
- Phase 4: 10 minutes
- Phase 5: 10 minutes
- Phase 6: 10 minutes
- Total: ~1 hour across 6 sessions

## File structure when complete
```
sanko-vision-demo/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── data.js          (all mock data)
│   ├── App.jsx           (shell + nav + view switching)
│   └── views/
│       ├── HomeView.jsx
│       ├── PractitionerView.jsx
│       ├── ResearcherView.jsx
│       ├── RegulatorView.jsx
│       └── PublicView.jsx
```
