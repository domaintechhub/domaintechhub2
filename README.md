# Domain Tech Hub — Digital & Web Development Agency

> Innovate. Connect. Succeed. Premium digital engineering, enterprise web development, e-commerce with M-Pesa integration, live SEO audits, and custom business systems.

![Domain Tech Hub](public/logo.svg)

---

## Overview

**Domain Tech Hub** is a modern, high-performance web agency application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. It features a modern glassmorphism design, real-time client utilities, multi-currency display (USD / KES), multi-language localization (English, Français, Kiswahili), and seamless light/dark mode support.

---

## Features

- **5 Core Navigation Sections**:
  - **Services**: Web applications, e-commerce, SEO & speed optimization, custom CRM, and cloud DevOps.
  - **About Us**: Verified track record, company mission, team principles, and Nairobi headquarters overview.
  - **Client Tools**: Instant client utilities (Project Cost Calculator, Live Core Web Vitals SEO diagnostic, and `.co.ke` Domain Lookup).
  - **Projects**: Real client case studies, verified before/after metrics, and revenue growth benchmarks.
  - **Contact Us**: Instant consultation booking and direct communication channels.

- **Universal Burger Command Drawer**:
  - Global search bar with keyboard shortcut (`⌘K` / `Ctrl+K`).
  - Light & Dark mode toggle with persistent state.
  - Currency switcher: **USD ($)** and **KES (KSh)** with live exchange rates.
  - Localization: **English**, **Français**, and **Kiswahili**.
  - Direct WhatsApp Desk (`+254 740 806085`) and Phone Hotline (`+254 118 746676`).
  - Access to extended agency solutions (Tech Stack, Insights & Trends, Client Portal Demo, FAQ).

- **100% Production Ready & Self-Contained**:
  - Fully static, zero external server dependencies required to run the frontend.
  - Built-in server rewrite configurations for **cPanel / Apache** (`.htaccess`), **Vercel** (`vercel.json`), **Netlify & Cloudflare** (`_redirects`), and **GitHub Pages** (`404.html`).

---

## Project Structure

```text
├── public/                 # Static assets, logos, and server rewrite configs
│   ├── .htaccess           # Apache / cPanel URL rewrite configuration
│   ├── _redirects          # Netlify / Cloudflare Pages rewrite configuration
│   ├── 404.html            # GitHub Pages client-side routing fallback
│   ├── favicon.svg         # Browser favicon
│   ├── logo.svg            # Full horizontal agency logo
│   └── logo-icon.svg       # Square icon logo
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx      # Responsive header with 5-item menu & burger drawer
│   │   ├── Hero.tsx        # High-impact animated hero section
│   │   ├── CostCalculator.tsx # Dynamic quote calculator (USD / KES)
│   │   ├── SeoAuditTool.tsx   # Real-time Core Web Vitals speed diagnostic
│   │   ├── DomainChecker.tsx  # .co.ke domain availability lookup
│   │   ├── Portfolio.tsx   # Case studies with verified metrics
│   │   ├── ServicesExplorer.tsx # Service breakdown & tiers
│   │   ├── TechStackSection.tsx # Enterprise tech stack showcase
│   │   ├── ClientPortalDemo.tsx # Live project tracker demo
│   │   ├── GlobalSearchModal.tsx # ⌘K command palette
│   │   └── Footer.tsx      # Comprehensive footer with quick links
│   ├── context/            # React state contexts
│   │   ├── CurrencyContext.tsx # Currency provider (USD / KES)
│   │   ├── LanguageContext.tsx # Translation & localization provider
│   │   └── ThemeContext.tsx    # Light / Dark theme provider
│   ├── data/               # Structured content & portfolio records
│   ├── utils/              # Utility helpers & SEO metadata
│   ├── App.tsx             # Root application component & routing
│   ├── main.tsx            # React application entry point
│   └── index.css           # Tailwind CSS v4 imports & custom styles
├── index.html              # HTML entry point with meta tags & Google Fonts
├── metadata.json           # Application studio configuration
├── package.json            # Scripts, dependencies, and Node engine settings
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel zero-config routing file
└── vite.config.ts          # Vite bundler configuration
```

---

## Quick Start

### 1. Prerequisites
- **Node.js**: `>=18.0.0` (LTS 18, 20, or 22 recommended)
- **npm**: `>=9.0.0` (or `bun` / `pnpm` / `yarn`)

### 2. Installation
```bash
npm install
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates production-ready, minified static files in the `/dist` directory.

### 5. Preview Production Build
```bash
npm run preview
# Or run as a Node service:
npm start
```

---

## Deployment Guide

### Deploy to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project into Vercel.
3. Vercel automatically detects Vite with `npm run build` and `dist` output.

### Deploy to Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `_redirects` file handles client-side routing automatically.

### Deploy to GitHub Pages
Run the automated deploy script:
```bash
npm run deploy
```

### Deploy to cPanel / Traditional Web Hosting (.co.ke)
1. Run `npm run build`.
2. Upload all files from the `dist/` folder directly to your server's `public_html/` root.
3. The included `.htaccess` ensures all links and refreshes work seamlessly.

---

## License

Apache-2.0 © Domain Tech Hub. All rights reserved.
