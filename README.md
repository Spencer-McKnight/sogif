# SOGIF — Strategic Opportunities Growth & Income Fund

> **sogif.au** — Delivering regular income and reliable long-term growth to Australian investors.

---

## Fund Overview

SOGIF is an unlisted Australian investment fund with a strategic property focus, complemented by equity allocations for diversification. Since inception (30 September 2023), the fund has achieved:

- **15% cumulative return** over 27 months
- **AUD 130M+** in invested capital
- **10% performance fee** on investor gains

**Board:** Paul Harper, Steve McKnight, Ewan MacDonald

---

## Project Vision

### The Two Keys

**1. Bifurcated Experience Architecture**
> Meaningfully bifurcate the experience between convincing entry paths for the new investor, and insightful metrics and tools for the existing.

- **Prospects** → Compelling narrative, trust signals, clear conversion pathways
- **Investors** → Portal with metrics, transparency tools, portfolio insights

**2. Multi-Faceted Trust Signalling**
> Convey trust rationale through naturally viewable and multi-faceted signalling.

Trust surfaces include:
- Property profiles with visual storytelling
- Real-time data visualisations
- Board and team introductions
- Investor portal showcases
- Performance transparency

---

## Target Audience

| Segment | Characteristics |
|---------|-----------------|
| **Risk Profile** | High risk tolerance |
| **Horizon** | Medium to long-term |
| **Income** | Quarterly passive returns |
| **Minimum** | AUD 10,000 initial investment |
| **Note** | Fund may close to new investors in 2026 |

---

## Non-Functional Requirements

| Requirement | Standard |
|-------------|----------|
| **Open-Ownership** | No vendor lock-in; all accounts client-owned |
| **Compliance** | Deliberate wording per fund investing regulations |
| **Trust & Transparency** | Process visibility emphasised throughout |
| **Usability** | Intuitive navigation and investment flows |
| **Flexibility** | Platform for future feature ideation |
| **Compatibility** | Mobile, tablet, desktop; all modern browsers |
| **Performance** | Outstanding page load and query response times |
| **Reliability** | 99.9%+ uptime; investment availability guaranteed |
| **Security** | ISO 27001 standard and beyond |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Runtime** | React 19 |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **CMS** | DatoCMS + GraphQL |
| **Images** | imgix CDN |
| **Analytics** | Vercel Analytics + Speed Insights |
| **SEO** | next-seo, next-sitemap |
| **Hosting** | Vercel |
| **Language** | TypeScript (strict) |

---

## Architecture Principles

### Information Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        SOGIF.AU                             │
├─────────────────────────┬───────────────────────────────────┤
│     PUBLIC SITE         │        INVESTOR PORTAL            │
├─────────────────────────┼───────────────────────────────────┤
│  • Landing/Hero         │  • Dashboard                      │
│  • Fund Overview        │  • Portfolio Performance          │
│  • Property Profiles    │  • Property Holdings              │
│  • Performance Data     │  • Quarterly Statements           │
│  • Team/Board           │  • Investment Tools               │
│  • Application Flow     │  • Documents & Reports            │
│  • FAQs & Compliance    │  • Account Settings               │
└─────────────────────────┴───────────────────────────────────┘
```

### Page Performance Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 200ms

---

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint codebase
npm run lint

# Generate sitemap (runs automatically post-build)
npm run postbuild
```

---

## Key Conversion Pathways

### Prospect Journey
1. **Awareness** → Landing page with value proposition
2. **Interest** → Performance data, property profiles
3. **Trust** → Team bios, transparency features, testimonials
4. **Action** → Clear CTA to application form
5. **Conversion** → Streamlined onboarding with required compliance

### Investor Journey
1. **Login** → Secure 2FA authentication
2. **Dashboard** → Portfolio overview, recent activity
3. **Insights** → Performance metrics, property updates
4. **Actions** → Additional investment, document access
5. **Support** → Direct communication channels

---

## Content Strategy

### Trust Signals (Priority Order)
1. **Performance Data** — Clear, honest return visualisations
2. **Property Profiles** — Tangible asset visibility
3. **Board Credibility** — Track record and expertise
4. **Process Transparency** — How the fund operates
5. **Investor Testimonials** — Social proof (compliance-permitting)

### Compliance Considerations
- All performance claims require appropriate disclaimers
- Past performance statements must not guarantee future results
- Risk disclosures must be prominent and accessible
- PDS (Product Disclosure Statement) readily available
- Investment suitability warnings where appropriate

---

## File Structure

```
sogif/
├── app/
│   ├── (public)/           # Prospect-facing pages
│   │   ├── page.tsx        # Landing
│   │   ├── fund/           # Fund overview
│   │   ├── properties/     # Property profiles
│   │   ├── team/           # Board & team
│   │   └── apply/          # Application flow
│   ├── (portal)/           # Authenticated investor area
│   │   ├── dashboard/
│   │   ├── portfolio/
│   │   └── documents/
│   ├── api/                # API routes
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                 # Design system primitives
│   ├── charts/             # Data visualisations
│   ├── property/           # Property-related components
│   └── portal/             # Portal-specific components
├── lib/
│   ├── datocms/            # CMS utilities
│   ├── auth/               # Authentication helpers
│   └── utils/              # Shared utilities
├── types/                  # TypeScript definitions
└── public/                 # Static assets
```

---

## Environment Variables

```env
# DatoCMS
DATOCMS_API_TOKEN=
DATOCMS_PREVIEW_TOKEN=

# Authentication (future)
AUTH_SECRET=
AUTH_URL=

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

---

## Contributing

1. Follow the `.cursorrules` for development guidelines
2. All components must be accessible (WCAG 2.1 AA)
3. Test on mobile-first, then scale up
4. Performance budget: No JS bundle > 100kb (gzipped)
5. All copy must be reviewed for compliance before deploy

---

## Licence

Proprietary — SOGIF Pty Ltd. All rights reserved.

