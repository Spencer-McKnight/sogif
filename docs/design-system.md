# SOGIF Design System

Importantly, never let existing components stifle the creativity of current tasks.
Use the system as a base to create new, beautiful componentry with a high level of design fidelity bespoke for each task.

## Intent and Conversion Strategy

The current visual system is designed to build investor confidence while moving users toward action:

- **Trust foundation**: deep navy backgrounds and structured layouts signal stability.
- **Growth signals**: cyan and gold accents highlight momentum, opportunity, and outcomes.
- **Clear progression**: repeated CTA patterns guide users from awareness to investment pathways.
- **Risk-aware communication**: lightweight disclaimers and trust badges reduce ambiguity.

This system preserves that intent while making styles reusable across all pages.

## Core Tokens

Primary tokens are defined in:

- `app/globals.css` (CSS variables and utility classes)
- `tailwind.config.ts` (Tailwind semantic mappings)

### Typefaces

Two fonts, loaded via `next/font/google` as CSS variable pairs, self-hosted at build time:

| Role | Font | Variable | Tailwind class | Weights |
|------|------|----------|---------------|---------|
| Body / UI / metrics | Inter | `--font-sans` | `font-sans` | 300–700 |
| Display / headings | Montserrat | `--font-display` | `font-display` | 500–900 |

Both variables are applied once on `<html>` in `app/layout.tsx`. `font-sans` is set globally on `body`. `font-display` is composed into `type-display` and `type-heading` in `globals.css`.

To use the display font ad-hoc: add `font-display` to any element. Italic variant is available via the standard `italic` utility.

### Typography Guidance

Typography sizing is now centralized through eight role-based utility classes in `app/globals.css`.
Use these classes instead of repeating inline responsive `text-*` chains in each component.

- `type-display`: hero headlines and primary numeric moments (`text-4xl sm:text-5xl` → 38px / 44px)
- `type-heading`: section-level headings and strong stat headings (`text-3xl sm:text-4xl lg:text-5xl` → 32 / 38 / 44px)
- `type-title`: card titles, logo wordmarks, and compact emphasis (`text-xl sm:text-2xl` → 22px / 26px)
- `type-metric`: KPI values and data-heavy highlights (`text-2xl sm:text-3xl lg:text-4xl`, tabular → 26 / 32 / 38px)
- `type-body`: primary paragraph copy and larger CTA support text (`text-lg sm:text-xl` → 18px / 22px)
- `type-support`: secondary body text, controls, and dense UI copy (`text-base sm:text-lg` → 16px / 18px)
- `type-caption`: legal notes, tooltips, and microcopy (`text-sm sm:text-base` → 14px / 16px)
- `type-overline`: eyebrow/meta labels in uppercase with tracking (`text-sm sm:text-base` → 14px / 16px)

The scale overrides `xl`–`5xl` in `tailwind.config.ts → theme.extend.fontSize`. **To increment the scale, update those token values — not individual components.**

Button and badge sizes remain variant-driven in `components/ui/button.tsx` and `components/ui/badge.tsx`, but now consume these role classes so sizing logic still lives in one typography system.

All roles include deliberate line-height defaults to improve readability and keep rhythm consistent.

#### Tailwind Best Practice For Text Sizing

1. Prefer semantic typography classes (role-based) over repeated utility chains.
2. Keep size, rhythm, and breakpoint logic in one place (`globals.css`) so scale changes are safe.
3. Keep color/weight local to the component unless they are true design tokens.
4. Prefer existing roles and local modifiers (`font-semibold`, `tabular-nums`, `normal-case`) before creating another typography role.
5. Keep responsive behavior consistent by using the role classes directly rather than ad-hoc `text-*` chains.
6. Pair size with line-height in the same role class so readability does not drift component-to-component.

### Color Guidance

- `sogif.navy`: structural surfaces, trust-heavy sections, primary dark backgrounds.
- `sogif.cyan-light` / `sogif.cyan-dark`: navigation highlights, educational context, section eyebrows.
- `sogif.gold`: primary conversion actions (`Invest`, `Start Application`).
- `sogif.success`: investor portal and positive-status cues.
- `surface.*`, `text.*`, `border.soft`: neutral semantic support tokens.

Use high contrast text first:

- On dark backgrounds: `text-white`, `text-white/90`, `text-white/75`.
- On light backgrounds: `text-gray-900` for headings, `text-gray-800` for body.

## Grid & Layout Structure

Every section shares a single spatial framework so that content edges align vertically as the user scrolls. The system is built on three layers: **container**, **section rhythm**, and **content grid**.

### Container

All page content flows through `Container` (`components/ui/container.tsx`), which applies the `.section-container` utility:

```
max-w-7xl (1280 px)  ·  px-4 sm:px-6 lg:px-8
```

This gives a consistent left and right content edge at every breakpoint. Never override these padding values inside a section — let the container own horizontal rhythm.

### Section Rhythm

Vertical spacing between section backgrounds uses `.section-padding`:

```
py-24 (96 px)  ·  md:py-28 (112 px)  ·  lg:py-32 (128 px)
```

Apply `section-padding` to the outer `<section>` element. For areas that intentionally break rhythm (footer, hero), use bespoke vertical padding but keep it proportional.

Section headers sit between the section top and the content grid. Use a consistent bottom margin of **`mb-12`** for compact sections (where the header sits alongside other elements, e.g. PropertyShowcase) or **`mb-16`** for standard sections where the header stands alone above the grid.

### 12-Column Content Grid

Interior layouts use a **conceptual 12-column grid** implemented with Tailwind's `grid-cols-12`. This is the canonical system for all two-column and asymmetric layouts on desktop (`lg`+). Three-column equal layouts may use the shorthand `grid-cols-3` directly.

#### Breakpoint Behavior

| Breakpoint | Width     | Typical behavior                                                           |
| ---------- | --------- | -------------------------------------------------------------------------- |
| Base       | < 640 px  | Single column. Content stacks vertically.                                  |
| `sm`       | ≥ 640 px  | Minor adjustments (button rows, inline stats). Grid stays single-column.   |
| `md`       | ≥ 768 px  | Card grids may go to 2–3 columns. Two-column prose layouts remain stacked. |
| `lg`       | ≥ 1024 px | Full grid activates. Two-column and three-column layouts engage.           |
| `xl`       | ≥ 1280 px | Content reaches max-width. Extra space is margin.                          |

#### Standard Layout Templates

Use these named patterns. They keep the vertical split-point consistent across sections so that left/right edges align as the user scrolls.

**4. Footer Grid**

Brand-heavy left column with two narrow right columns.

```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8
├── lg:col-span-2   (brand + legal entity)
├── col              (page links)
└── col              (contact)
```

#### Gap Scale

Use only these gap values to keep spacing predictable:

| Token    | Value | Use case                                                                |
| -------- | ----- | ----------------------------------------------------------------------- |
| `gap-4`  | 16 px | Tight inline groups (stat pairs, badge rows)                            |
| `gap-6`  | 24 px | Compact card grids, stacked stat cards, footer columns on mobile        |
| `gap-8`  | 32 px | **Standard grid gap.** Card grids, three-column layouts, footer desktop |
| `gap-12` | 48 px | Wide gap for two-column content splits on mobile/tablet                 |
| `gap-16` | 64 px | Wide gap for two-column content splits on desktop (`lg:gap-16`)         |

Avoid orphan values like `gap-9`, `gap-10`, `gap-24`, or `gap-32`. If a layout feels too tight at `gap-8`, step up to `gap-12` — do not invent intermediate values.

#### Responsive Gap Pattern

Two-column content layouts should follow the standard responsive ramp:

```
gap-8 lg:gap-12
```

For wide hero-style splits where desktop breathing room is essential:

```
gap-8 lg:gap-16
```

Card grids stay at a flat `gap-8` across all breakpoints unless density requires `gap-6`.

### Mobile Layout Rules

- **Single-column stacking**: All grids collapse to 1 column on mobile. No horizontal scrolling.
- **Centered single cards**: On mobile, single-column card groups may use `max-w-md mx-auto lg:max-w-none` to prevent overly wide cards at tablet-ish widths.
- **Content reordering**: Use `order-1 / order-2` with `lg:order-*` overrides when mobile should show a visual element (chart, image) before text for engagement, but desktop should lead with text for scanability.
- **Full-width CTAs**: Primary action buttons should be `w-full sm:w-auto` so they fill the viewport on small screens.

### Alignment Checklist (New Sections)

When adding a new section to any page:

1. Wrap content in `Container`.
2. Apply `section-padding` to the `<section>`.
3. Start with `SectionHeader` using the appropriate `align` prop.
4. Choose a layout template (5/7, 6/6, 3-col, or single-column).
5. Use only gap tokens from the scale above.
6. Verify vertical alignment with adjacent sections — left edges of content columns should match.

## Interaction Rules

### CTA Glow

- Gold conversion actions should use `Button`/`ButtonLink` with `glow="gold"`.
- Cyan-based standout actions can use `glow="cyan"` when needed.

### Card Hover

- Use `AppCard` with `variant="plain"` and add `card-gradient-hover` for the homepage value-card hover behavior.
- This keeps the hover language reusable while preserving a consistent white card base.

### Image Zoom

- Apply `media-zoom-hover` to card images inside a `.group` parent.
- This keeps image hover behavior consistent for property/team/media cards.

### Motion

**Load-in animations are banned.** No fade-up, slide-in, stagger, or opacity transitions on page load or scroll into view. Content must render immediately and be fully visible without JavaScript animation. This ensures SEO crawlers index all content and suits the serious tone of the business.

Allowed animation contexts:

- **Interactions only**: hover effects, button presses, modal open/close, menu transitions, tooltips.
- **Scroll-linked transforms**: parallax backgrounds (e.g. hero `useScroll`/`useTransform`) are acceptable since they don't hide content.
- Keep hover transitions subtle and consistent (`duration-base`, `ease-standard`).
- Respect reduced motion: `media-zoom-hover` and lift helpers are disabled in reduced-motion mode.

Do **not** use `initial`, `animate`, `whileInView`, `variants`, or `useInView` from framer-motion for entrance animations. Use plain HTML elements instead of `motion.*` for static content.

## Reusable UI Primitives

Location: `components/ui`

- `Button` / `ButtonLink`: variant-based action controls
- `AppLink`: internal/external links with optional directional icon
- `Container`: standard page width and responsive horizontal padding
- `Badge`: status, announcement, and trust chips
- `DisclaimerText`: reusable legal/informational disclaimer text
- `AppCard`: card shells for plain/property-light/stat use cases
- `SectionHeader`: eyebrow/title/description section intro block with responsive alignment via `align` prop:
  - `center` (default): always centered — use for hero sections
  - `left`: always left-aligned
  - `left-to-center`: left on mobile, centered from `lg` — good for content-heavy sections
  - `center-to-left`: centered on mobile, left from `lg` — use when desktop layout needs a left anchor

All primitives are exported from `components/ui/index.ts`.

## Accessibility Baseline

- Use `focus-ring` or `focus-ring-inverse` on interactive elements.
- Keep button/link touch targets at least `min-h-10`.
- Do not communicate status with color alone; keep visible text labels.
- Maintain legal disclaimers in conversion-heavy sections and footer.

## Migration Pattern (Homepage)

Common replacements used in homepage refactor:

- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` -> `Container`
- repeated gold CTA class strings -> `ButtonLink variant="primary" glow="gold"`
- inline legal text classes -> `DisclaimerText`
- repeated section intro markup -> `SectionHeader`
- repeated value-card shell classes -> `AppCard variant="plain" + card-gradient-hover`

## Recommended Use on New Pages

1. Start each major section with `Container` and `SectionHeader`.
2. Use `Button`/`ButtonLink` variants instead of new ad-hoc button classes.
3. Reuse `AppCard` variants before creating bespoke card styling.
4. Keep disclaimer and trust signals visible near high-intent CTAs.
