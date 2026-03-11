# Hiren Patel - Aveva PI Portfolio - Project Specification

## 1. Project Overview
A highly professional, responsive portfolio website designed specifically to target the **Sr. Manufacturing Systems Engineer** role at **Amgen India**. The portfolio will position Hiren Patel as an expert AVEVA PI Data Historian specialist, showcasing his 3+ years of experience, technical expertise, and relevant projects.

## 2. Technical Stack
- **Framework:** Next.js 14 App Router
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Utility classes only, no custom CSS files)
- **Animations:** Framer Motion (Page transitions, micro-interactions, scroll animations)
- **Database/Backend:** Supabase (for handling Contact Form submissions only)
- **Data Visualization:** Recharts (to demonstrate data handling capabilities)
- **Icons:** Lucide React
- **Package Manager:** npm

## 3. Design System & Aesthetics
**Theme:** "Industrial Precision" - Clean, data-driven, no purple or generic gradients. A premium aesthetic that appeals to manufacturing and enterprise stakeholders.
- **Primary Background:** Dark Navy (`#0D1B2A`)
- **Accent Color:** PI Orange (`#D4521A`)
- **Typography:**
  - Headings & Primary Text: **Syne** (Google Fonts)
  - Data Values & Technical Text: **IBM Plex Mono** (Google Fonts)

## 4. Architecture & Application Structure

### 4.1. Directory Structure (App Router)
```text
/src
  /app
    layout.tsx         # Global layout with Syne/IBM Plex Mono and Navy background
    page.tsx           # Single-page scrolling portfolio
    api/               # Serverless functions (if needed)
  /components
    /layout
      Header.tsx       # Sticky navigation, mobile-responsive menu
      Footer.tsx       # Links to LinkedIn, GitHub, Contact Info
    /sections
      Hero.tsx         # Landing section with Canvas/SVG animated pipeline
      ImpactMetrics.tsx # Animated counters (30+ dashboards, etc.)
      ValueProps.tsx   # Direct mapping to Amgen Role Requirements
      Experience.tsx   # Professional history and Key Projects
      Skills.tsx       # Tech stack, PI Ecosystem stack
      Certifications.tsx # Dedicated section for AVEVA & related certs
      Contact.tsx      # Supabase integrated contact form
    /ui                # Reusable atoms (Buttons, Cards, Inputs)
  /lib
    supabaseClient.ts  # Supabase initialization
    utils.ts           # Tailwind/clsx utility functions (camelCase)
  /types
    index.ts           # Global TS interfaces
```

## 5. Page Sections & Content Strategy

### 5.1. Hero Section
- **Visuals:** Animated background (Canvas/SVG) representing a data pipeline flowing into a database/PI Archive.
- **Content:** Title ("Hiren Patel"), Subtitle ("AVEVA PI Data Historian Specialist"), Value Proposition ("Translating industrial data into actionable enterprise intelligence").
- **Call-to-Action:** "View My Work" or "Get in Touch".

### 5.2. Impact Metrics
- **Visuals:** Animated number counters triggered on scroll entry.
- **Content:** Key quantitative achievements to capture hiring manager attention instantly:
  - 30+ Comprehensive Dashboards delivered
  - 3 Plant integrations/deployments (or relative metric)
  - 2+ PI Servers managed/migrated

### 5.3. Target Role Alignment (Amgen India)
A dedicated section emphasizing the 5 core pillars of the target role:
  1. Lifecycle upgrades & migrations of PI Data Historian systems
  2. Technical SME for PI Historian across enterprise infrastructure
  3. PI Asset Framework templates, Analyses, PI Vision displays
  4. Cross-functional collaboration with manufacturing, automation, IT teams
  5. Compliance, validation, change management

### 5.4. Experience & Key Projects
Showcasing the role as Technical Manager at **SSM Infotech** (Sept 2023-Present) and highlighting key projects:
- **Petronet LNG (Delhi):** Delivered 30+ comprehensive dashboards.
- **IOCL Pipeline (Noida):** Deployed OPC UA Connector v2.
- **GAIL Digital Logbook:** Orchestrated shift-logging solutions.

### 5.5. Skills
- **Expertise:** PI Interface, PI Data Archive, PI Asset Framework, PI Vision.
- **Languages & Tools:** Python, Power BI, GCP, AWS, Data Science, Streamlit.
- **Education:** B.E. Computer Engineering, GTU.

### 5.6. Certifications
A dedicated visual section highlighting industry compliance and expertise, crucial for Amgen's regulated pharma environment.
- **Core:** AVEVA CSI PI Infrastructure Specialist
- **Analytics & Data:** Predictive Analytics, GFG Data Science, Meta Data Analytics, KPMG Data Analytics Internship

### 5.7. Contact Section
- **Functionality:** Form capturing Name, Email, Subject, and Message.
- **Backend:** Data inserted directly into a Supabase PostgreSQL table.

## 6. Development Standards & Performance
- **Responsiveness:** Fluid scaling from 320px (mobile) to 1440px+ (desktop).
- **Performance:** Lighthouse Score 90+ target. Exclusive use of Next.js Image component and lazy-loading for sections below the fold.
- **Accessibility:** Semantic HTML5 (`<article>`, `<section>`, `<nav>`) and exhaustive `aria-labels` on all interactive forms/buttons.
