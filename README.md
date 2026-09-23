# Portfolio Automation Framework (Playwright + TypeScript POM)

An end-to-end test automation suite built for **Sandeep Usakoyala's Portfolio Website** using [Playwright](https://playwright.dev/) with TypeScript and the **Page Object Model (POM)** design pattern.

---

## 🏗️ Architecture & Project Structure

The project separates test logic, page interactions, fixtures, and configuration:

```
Portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI workflow
├── src/
│   ├── fixtures/
│   │   └── testFixtures.ts        # Extended test fixtures (PortfolioPage, ConsoleListener)
│   ├── pages/                     # Page Object Model (POM) layer
│   │   ├── BasePage.ts            # Common page interactions and utilities
│   │   ├── NavigationBar.ts       # Header, brand, and navigation anchors
│   │   ├── HeroSection.ts         # Hero bio, status pill, CTA buttons
│   │   ├── TerminalComponent.ts   # Interactive terminal simulator
│   │   ├── BentoStatsSection.ts   # Career impact stats and counters
│   │   ├── AIShowcaseSection.ts   # AI workflows & MCP cards
│   │   ├── SkillsSection.ts       # Technical arsenal categories & tags
│   │   ├── ExperienceSection.ts   # Work history tabbed switcher
│   │   ├── CertificationsSection.ts # Accreditations & degrees
│   │   ├── ContactSection.ts      # Footer contact points & social links
│   │   └── PortfolioPage.ts       # Master page object aggregator
│   └── utils/
│       ├── testData.ts            # Centralized test dataset & assertions
│       └── consoleListener.ts     # Captures runtime errors & network failures
├── tests/
│   ├── navigation.spec.ts         # Header, brand, section anchor transitions
│   ├── heroAndTerminal.spec.ts    # Hero CTA, terminal simulation execution
│   ├── experienceAndSkills.spec.ts# Tab switching, skills categories verification
│   ├── contactAndFooter.spec.ts   # Mailto, phone, LinkedIn targets
│   ├── responsive.spec.ts         # Mobile & tablet viewports behavior
│   └── accessibilityAndHealth.spec.ts # Console errors, missing attributes, SEO
├── playwright.config.ts           # Multi-browser & device configuration
├── tsconfig.json                  # TypeScript compiler settings
└── package.json                   # Dependencies and npm test scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
npm install
npx playwright install chromium
```

---

## 🧪 Running Tests

### Run all tests headless
```bash
npm test
```

### Run specific test suite
```bash
npx playwright test tests/navigation.spec.ts
```

### Run in headed mode
```bash
npm run test:headed
```

### Run in UI Mode (Interactive Playwright UI)
```bash
npm run test:ui
```

### View HTML Test Report
```bash
npm run test:report
```
