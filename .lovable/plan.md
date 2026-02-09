

# AI Resume Builder — Frontend-Only MVP

## Overview
A polished, frontend-only resume builder where users fill in their details, see a live preview, choose from multiple templates, and export to PDF. Data is saved in localStorage so it persists across sessions.

---

## Pages & Navigation

### 1. Landing Page
- Hero section explaining the app with a "Get Started" CTA
- Feature highlights (templates, live preview, PDF export)
- Clean, modern design

### 2. Resume Builder Page (Main App)
- **Left panel**: Multi-step form to enter resume data
  - Personal Info (name, email, phone, LinkedIn, website)
  - Professional Summary
  - Work Experience (multiple entries, add/remove)
  - Education (multiple entries)
  - Skills (tags/chips)
  - Projects (optional)
  - Certifications (optional)
- **Right panel**: Live resume preview that updates in real-time as user types
- Template selector at the top to switch between designs
- Save & Export buttons

### 3. My Resumes Page
- List of saved resumes (stored in localStorage)
- Create new, duplicate, rename, or delete resumes
- Quick preview thumbnails

---

## Resume Templates (3 to start)
1. **Modern** — Clean layout with accent colors and icons
2. **Minimal** — Simple black & white, traditional formatting
3. **Corporate** — Two-column layout, professional look

All templates render the same data, just styled differently.

---

## Key Features

### Live Preview
- Real-time rendering as the user fills in the form
- Template switching updates the preview instantly

### PDF Export
- One-click download as PDF using client-side generation
- Preserves the selected template's styling

### Multi-Resume Management
- Save multiple resumes in localStorage
- Each resume can use a different template
- Duplicate existing resumes as starting points

### Dark/Light Mode
- Toggle between dark and light themes
- Persisted in localStorage

### Mobile Responsive
- Form and preview stack vertically on mobile
- Usable on all screen sizes

---

## Data Storage
- All resume data stored in browser localStorage
- Auto-save as user types (debounced)
- No account needed — works immediately

---

## Design Style
- Clean, modern UI using Tailwind CSS and shadcn/ui components
- Smooth transitions and polished interactions
- Professional color palette suitable for a career tool

