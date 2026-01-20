SOGIF (Strategic Opportunities Growth Index Fund) is a fund created in 2023.
It requires a website that is industry-leading for its optimised concise sales funnel and visually effective, unique, concise design language.

The task is a complete build and implementation of the Strategic Opportunities investment platform and funnel with modern design principles, enhanced user experience, and improved conversion optimization.

## Build Optimization & Visual Fidelity

### shadcn/ui
This project uses **shadcn/ui** as a core build optimization and visual fidelity layer. shadcn/ui provides:

- **Tree-shakeable components**: Only the components you use are bundled, minimizing bundle size
- **Accessible by default**: Built on Radix UI primitives with full ARIA compliance
- **Customizable design tokens**: Seamlessly integrated with Tailwind CSS variables for brand consistency
- **Copy-paste architecture**: Components live in your codebase, not in node_modules—full control without dependency bloat
- **Dark mode support**: Automatic theme switching with CSS variables

**Adding components:**
```bash
npx shadcn@latest add button
npx shadcn@latest add card dialog form input
```

Components are installed to `@/components/ui/` and can be customized directly.

### Lucide React Icons
**Lucide React** provides the iconography system across the site:

- **1500+ icons** in a consistent, clean design language
- **Tree-shakeable**: Import only what you use
- **Customizable**: Size, color, and stroke-width props
- **TypeScript native**: Full type safety

**Usage:**
```tsx
import { Building2, TrendingUp, Shield, ArrowRight } from 'lucide-react'

// Use with Tailwind classes
<Building2 className="h-6 w-6 text-sogif-cyan" />
<TrendingUp className="h-5 w-5 text-sogif-gold" />
```

### Utility Functions
The `cn()` utility from `@/lib/utils` merges Tailwind classes intelligently:
```tsx
import { cn } from '@/lib/utils'

<button className={cn(
  "px-4 py-2 rounded-md",
  isActive && "bg-primary text-primary-foreground",
  className
)} />

# Strategy
The key intention is to convert traffic into prospective investors for a campaign that will run until the fund is closed to new investment in June 2026.
Convey trust rationale through naturally viewable and multi-faceted signalling, such as property profiles, data visualisations, team introductions, portal showcases, and other strategised methods.
Meaningfully bifurcate the experience between convincing entry paths for the prospective investor, and insights for the existing.

There are vital three funnels with which we can convert a prospective user:
1. Register interest form (email)
2. Online investment application
3. Offline investment application (unpreferred alternative fallback)

There are three areas of concern for a existing investor:
1. What is happening to my money within the SOGIF fund?
- Performance statistics
- Information about current property acquisitions
- Property exit breakdowns and understanding rationale
- Announcements and updates that are investor-only (may be different to public)
- Frequently asked questions
- Contact methods
2. How do I invest more or withdraw?
- When investors clearly visualise their exit pathways, it reduces perieved risk of being unable to withdraw money.
- Pointing existing investors to their reinvestment pathway reduces the barrier to entry for reinvestment in the fund.
3. Will this continue to be a trustworthy and positive cashflow benefit?

The investor portal is being provided by a SaaS product called Titanium portal.sogif.au, so only the frontend shall be curated here.

see /SOGIF_CONTEXT.md for further detail

## Responsive Breakpoints

- **Desktop**: > 968px (full layout)
- **Tablet**: 640px - 968px (adapted grid)
- **Mobile**: < 640px (single column, optimized)

## Forms
Click the heading of the form you would like to download. If you are seeking a form that is not on the list please email us and we’ll investigate.

Target Market Determination (“TMD”)
The Fund’s TMD – a document which describes the type of customers who a product is appropriate for, based on their likely needs, objectives and financial situation (target market), and establishes the distribution conditions and restrictions around how the product can be distributed to customers.

Product Disclosure Statement (“PDS”)
The Fund’s PDS (dated 26 March 2024) – A document that financial service providers must provide when they offer a financial product. It must include information about the product’s key features, fees, commissions, benefits, risks and the complaints handling procedure.

Distribution Reinvestment Authority Form (DRAF) – US Fund Investors Only
The DRAF is for US Fund investors who want to reinvest some or all of their US Fund distributions.

Automatic Investment Plan (“AIP”)

The Fund offers an automatic investment plan option whereby you can elect to have an amount (minimum $250 and maximum of $5,000) per month deducted from your bank account and applied to additional units.

Distribution Reinvestment Plan (“DRP”)
You can participate in the Fund’s DRP by completing the relevant section during your initial application. To join or change your participation thereafter, please do so via the Online Investor Portal.

Applications
You have a choice of either completing an online application, you can download an offline application form in PDF format that can be printed, completed and mailed in. Instructions are outlined on the form.

Change of Details Form (banking and non-banking)
Change to account details (including distribution options and banking) can be made via the Online Investor Portal (noting that two-factor authentication (2FA) will need to be activated).

For changes related to the Automatic Investment Plan (AIP) and Redemption option, please email admin@sogif.au

Transfer of Units Form
Complete this form when making a off-market unit transfer between two entities that have already been issued as SOGIF investor number (i.e. have completed application forms and had their identification checked and approved). Please note that you should make your own inquiries as to the applicability of stamp duty on the transfer of units.