# SOGIF Design System

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

- Use `AppCard` with `variant="interactive"` for reusable value-card hover behavior.
- This encapsulates the established hover language from homepage value cards.

### Image Zoom

- Apply `media-zoom-hover` to card images inside a `.group` parent.
- This keeps image hover behavior consistent for property/team/media cards.

### Motion

- Prefer existing framer-motion pattern already in sections: fade-up with short stagger.
- Keep hover transitions subtle and consistent (`duration-base`, `ease-standard`).
- Respect reduced motion: `media-zoom-hover` and lift helpers are disabled in reduced-motion mode.

## Reusable UI Primitives

Location: `components/ui`

- `Button` / `ButtonLink`: variant-based action controls
- `AppLink`: internal/external links with optional directional icon
- `Container`: standard page width and responsive horizontal padding
- `Badge`: status, announcement, and trust chips
- `DisclaimerText`: reusable legal/informational disclaimer text
- `AppCard`: card shells for interactive/property/stat/plain use cases
- `SectionHeader`: eyebrow/title/description section intro block

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
- repeated value-card shell classes -> `AppCard variant="interactive"`

## Recommended Use on New Pages

1. Start each major section with `Container` and `SectionHeader`.
2. Use `Button`/`ButtonLink` variants instead of new ad-hoc button classes.
3. Reuse `AppCard` variants before creating bespoke card styling.
4. Keep disclaimer and trust signals visible near high-intent CTAs.
