# Prompt — Speech Analytics Software (B2B SaaS for Call Centers)

> **Dashboard: YES** — Managers upload calls, view sentiment analysis, and track agent performance metrics.

---

## IDENTITY & CONCEPT

Build a complete multipage website for **"VoxInsight"** — a B2B SaaS platform that uses AI to analyze call center conversations, score sentiment, and surface coaching opportunities for agents. The site must feel like a **mission control for customer intelligence** -- precise, data-rich, and authoritative — not a generic SaaS template. Every section should communicate "we understand your calls better than you do."

**Technology**: Bootstrap 5 + Bootstrap Icons + Vanilla JS only (Chart.js allowed for dashboard graphs).  
**Branding**: Single SVG logo (waveform-brain icon + "VoxInsight" text). Reuse across header, footer, dashboard. Favicon from SVG.

---

## ANTI-REDUNDANCY RULES (MANDATORY)

- ❌ No generic SaaS hero ("Supercharge your workflow" + laptop mockup).  
- ❌ No feature grids with abstract icons that could apply to any software.  
- ❌ No "How it works: 1-2-3" numbered steps with generic descriptions.  
- ✔ Every section must be **call-center specific** — agent scores, sentiment curves, escalation rates.  
- ✔ Content must reference real metrics: CSAT, AHT, First Call Resolution, Sentiment Score.  
- ✔ If a section could sell CRM, project management, or HR software, **redesign it entirely**.

---

## FOLDER STRUCTURE (STRICT — DO NOT CHANGE)

```
voxinsight/
├── index.html
├── home-2.html
├── about.html
├── services.html
├── service-details.html
├── blog.html
├── blog-details.html
├── pricing.html
├── contact.html
├── login.html
├── register.html
├── dashboard.html
├── 404.html
├── coming-soon.html
└── assets/
    ├── css/
    │   ├── style.css
    │   ├── dark-mode.css
    │   └── rtl.css
    ├── js/
    │   ├── main.js
    │   └── dashboard.js
    ├── images/
    └── fonts/
```

❌ No extra folders. ❌ No nested page directories.

---

## DESIGN SYSTEM

**Palette** (STRICT — 3 colors only):
- **Black** (#000) → text in light mode, dark mode backgrounds use #1A1A1A.  
- **White** (#FFF) → backgrounds in light mode, text in dark mode.  
- **Accent: Signal Blue** (#2563EB) → buttons, links, active data points, chart accents, warning badges, indicators.  
- ❌ NO other colors. No Alert Amber, no grey, no muted tones.

**Typography**:
- H1: 40–48px. Sharp, modern sans-serif (e.g., Inter or Space Grotesk).  
- H2: 32–36px. H3: 24–28px. Body: 16–18px.
- Line height: 1.25–1.5. Monospace for data/metric readouts.
- Max 2–3 font families. Use Google Fonts.

**Dark Mode**: Separate `dark-mode.css` file. Deep Navy (#0F172A). Perfect for "dashboard-native" feel. Full contrast.

**RTL**: Separate `rtl.css` file. Full support.

---

## RESPONSIVE BREAKPOINTS (NON-NEGOTIABLE)

- **280px – 1100px** → Hamburger ONLY. Offcanvas. Centered logo.  
- **1100px+** → Full desktop nav.

Test at: 320px, 480px, 768px, 1024px, 1440px.

Mobile-specific:
- Touch-friendly buttons (minimum 44px).
- Reduced animations on mobile.
- Simplified tables/data display.
- Optimized image sizes for mobile data.

---

## HEADER (ALL PAGES IDENTICAL)

- SVG Logo + "VoxInsight." Nav: Home, Platform, Solutions, Pricing, Blog, Contact.  
- "Request Demo" (primary CTA) + Login. Theme toggle (top-right). Mobile → Offcanvas.

## FOOTER (ALL PAGES IDENTICAL)

4 columns: Product, Company, Resources, Legal. © 2026 VoxInsight. Back-to-top.

---

## PAGE-BY-PAGE SECTION BLUEPRINTS (UNIQUE LAYOUTS ONLY)

### `index.html` — HOME 1: "Hear What Your Data Is Saying"

**Section 1 — Live Transcript Simulation** (NOT a hero with a stock image):  
A **mock call transcript** scrolling in real-time on the left side of the viewport — lines of conversation between "Agent Sarah" and "Customer Mike" appear one by one (JS timed animation, 1 line per second). On the right side: a live **sentiment gauge** that shifts from green (positive) to yellow (neutral) to red (negative) as specific lines appear. H1 below the simulation: "Stop Guessing. Start Hearing." CTA: "See VoxInsight in Action." This is not a hero image — it's a **live product demo on the landing page**.

**Section 2 — The Problem You Already Have** (NOT a features list):  
A **2-column "pain vs. solution" layout**. Left column (dark background): 4 real call-center problems, each as a short bold statement: "Your agents wing every call." / "You review 2% of conversations." / "Complaints spike before you notice." / "Top performers' habits stay hidden." Right column (light/primary background): VoxInsight's answer to each, in the same row. Not icons. Not cards. Raw split-screen text comparison.

**Section 3 — Metric Dashboard Preview** (NOT generic feature cards):  
A **static screenshot-style mock dashboard** embedded as a styled HTML section — not an image, but actual HTML/CSS components mimicking a dashboard view. Show: 4 metric tiles (CSAT Score: 87%, AHT: 4m 12s, Sentiment: 72% Positive, Escalation Rate: 3.1%). Below: a placeholder bar chart showing "Weekly Sentiment Trend" (CSS bars, or Chart.js if preferred). This gives the visitor a tangible feel of the product's output.

**Section 4 — Who Uses VoxInsight** (NOT a testimonial section):  
An **industry vertical layout** — 4 full-width rows, each showing: industry name (Insurance, Telecom, Banking, Healthcare), a 1-line use case ("Detect policy confusion in real-time"), and a key metric improvement ("↑ 23% First Call Resolution"). No logos. No quotes. Data-driven credibility.

**Section 5 — Integration Strip**:  
A single horizontal bar showing compatible platforms: "Works with Salesforce, Zendesk, Five9, Twilio, Genesys." Logos as SVG/icon placeholders in an even row. Not a section — a **trust strip**.

**Section 6 — "Hear Your Calls Differently" CTA**:  
Dark section. H2: "Your call recordings are a goldmine. Are you mining them?" Email + "Request a Demo" button.

---

### `home-2.html` — HOME 2: "The Intelligence Layer"

**Section 1 — Waveform Visual**:  
A full-width **audio waveform SVG** animation (CSS pulse) with the tagline overlaid: "Every Call Tells a Story. VoxInsight Reads Between the Lines."

**Section 2 — "3 Things You're Missing"**:  
An **expandable accordion** — each item is a specific blind spot: "Tone shifts in the first 30 seconds predict escalation." / "Silence gaps over 5 seconds correlate with churn." / "Agents who mirror customer language close 40% more." Each expands with a paragraph of explanation.

**Section 3 — ROI Calculator** (Interactive):  
A **mini form** embedded on the page: Input fields for "Monthly Call Volume" and "Average Agent Count." A "Calculate" button. Below: a results panel showing estimated savings: "Projected annual savings: $184,000 in reduced escalations." (Static JS calculation — no backend.) This is a conversion tool, not a section.

**Section 4 — Security & Compliance**: 2×2 grid: SOC 2, HIPAA, GDPR, PCI-DSS badges with 1-line descriptions.  
**Section 5 — Blog Preview**: 2-column, 2 posts.  
**Section 6 — CTA**: Same as Home 1 Section 6.

---

### `about.html`

**Section 1**: Origin story — "Founded by call center managers who were tired of spreadsheets." Vertical timeline.  
**Section 2**: Leadership — 4 profiles (2×2). Name, title, 1-line background.  
**Section 3**: "Our Approach to AI" — philosophy statement. Single blockquote.  
**Section 4**: Investors/Partners — logo strip (even count).

### `services.html` — Platform Features

6 feature cards (2×3): "Sentiment Scoring," "Agent Performance Index," "Call Transcription," "Keyword Flagging," "Escalation Prediction," "Coaching Recommendations." Each: domain-specific icon, title, 2-line description, "Learn More."

### `service-details.html`

Feature hero → How the algorithm works (4 steps, alternating layout) → Use cases by industry → FAQ accordion → CTA.

### `blog.html` — Call Center Intelligence Hub

Search + filter (AI, Analytics, Agent Training, Case Studies). Full-width post list.

### `blog-details.html` — Article + sidebar.

### `pricing.html` — Plans

2-column: "Starter" (up to 10,000 calls/mo) vs. "Enterprise" (unlimited). Feature table. "Contact Sales" for Enterprise.

### `contact.html`

Form: Name, Company, Email, Phone, "Company Size" dropdown, Message. No map.

---

## AUTH PAGES (`login.html`, `register.html`)

No header/footer. Centered form. SSO options (Google Workspace, Microsoft 365). Vertical inputs.
Client-side form validation with clear error messages.

---

## DASHBOARD (`dashboard.html`)

This is an **Admin Dashboard** for call center managers — feature-rich analytics panel.

**Layout**: Sidebar + main content area.

**Sidebar Links**: Overview, Call Upload, Sentiment Analysis, Agent Scoreboard, Alerts, Reports, Settings, Logout.

**Include**: Theme toggle, RTL toggle, Notifications, Profile avatar.

**Dashboard Sections** (JS tabs):

1. **Overview**: 4 stat cards (2×2): Total Calls Analyzed, Average Sentiment Score, Top Alert (e.g., "3 escalations today"), Agent of the Week. Below: weekly trend chart (Chart.js bar or CSS bars).

2. **Call Upload**: A drag-and-drop zone (styled div with dashed border). "Upload .wav or .mp3" instructions. Upload history table: filename, date, status badge ("Processed" / "Pending").

3. **Sentiment Analysis**: A sentiment breakdown panel. Pie/donut chart placeholder: Positive %, Neutral %, Negative %. Below: a table of recent calls showing Call ID, Agent, Customer, Sentiment Score, Duration.

4. **Agent Scoreboard**: Table: Agent Name, Calls Handled, Avg Sentiment, CSAT Score, Coaching Flag (Yes/No badge). Sortable columns (JS). Top performer highlighted.

5. **Alerts**: List of flagged events: "Call #4521 — Negative sentiment spike at 2:34" / "Agent Tom — 3 consecutive low scores." Each: timestamp, severity badge, action button ("Review").

6. **Reports**: Download buttons for "Weekly Summary," "Agent Performance," "Sentiment Trends." Placeholder — styled as file download cards.

7. **Settings**: Account settings, notification preferences, data retention options.

**Branding**: Same logo, palette, buttons as frontend. dashboard.js handles tab switching.

---

## FORM VALIDATION

All forms must include client-side validation with:
- Clear, user-friendly error messages.
- Tooltips to guide users.
- Visual feedback on invalid inputs.

## GRID RULES

Even grids only. No 3-column. No 5-column.

## CRITICAL UI RULES (NON-NEGOTIABLE)

❌ No low contrast. ❌ No overlaps. ❌ No horizontal scroll. ❌ No broken layouts. ❌ No inconsistent buttons. If detected → FIX.

## PERFORMANCE & SEO

- Optimize images (alt text, WebP format where possible).
- Minimal CSS/JS. CSS/JS minified for production.
- SEO meta tags on every page. Unique title tags (60 chars max). Meta descriptions (150–160 chars).
- One H1 per page, proper heading hierarchy.
- Structured data (JSON-LD) for business info.
- PageSpeed 90+ on mobile and desktop.

## CODE QUALITY

- HTML: Semantic markup (`header`, `main`, `section`, `footer`), proper heading hierarchy.
- CSS: CSS variables for theming.
- JavaScript: ES6+, modular structure, no console logs in production.
- Section headers commented in HTML.
- Function descriptions commented in JS.
- CSS organized by sections.

## FINAL CHECKLIST

✔ Readable. ✔ Buttons work. ✔ Nav works. ✔ Dark mode. ✔ RTL. ✔ Dashboard tabs functional. ✔ No spacing issues. ✔ All forms validated. ✔ Cross-browser tested (Chrome, Firefox, Safari, Edge). ✔ Accessibility tested (keyboard navigation). ✔ Images optimized with alt text.
