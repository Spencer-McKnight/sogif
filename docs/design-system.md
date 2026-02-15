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

### Typography Guidance

Typography sizing is now centralized through eight role-based utility classes in `app/globals.css`.
Use these classes instead of repeating inline responsive `text-*` chains in each component.

- `type-display`: hero headlines and primary numeric moments (`text-4xl sm:text-5xl lg:text-6xl`)
- `type-heading`: section-level headings and strong stat headings (`text-3xl sm:text-4xl lg:text-5xl`)
- `type-title`: card titles, logo wordmarks, and compact emphasis (`text-xl sm:text-2xl`)
- `type-metric`: KPI values and data-heavy highlights (`text-2xl sm:text-3xl lg:text-4xl`, tabular)
- `type-body`: primary paragraph copy and larger CTA support text (`text-base sm:text-lg`)
- `type-support`: secondary body text, controls, and dense UI copy (`text-sm sm:text-base`)
- `type-caption`: legal notes, tooltips, and microcopy (`text-xs sm:text-sm`)
- `type-overline`: eyebrow/meta labels in uppercase with tracking (`text-xs sm:text-sm`)

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
