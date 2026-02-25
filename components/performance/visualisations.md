The performance page showcases SOGIF's price history, capital allocation and other visualisations that help the user understand the fund.

## Layout format:

Use full and half width col format on desktop, everything full width on mobile.

Header
Subpage Hero
Section Header

- Navy-light bg:
  Full width: Total Return / Month
- Sogif-silver-light bg:
  Half width: Funds Under Management / Month,
  Half width: Quarterly Distributions / Quarter

Section Header

- Sogif-silver-light bg:
  Half width: Capital Allocation for Month YY
  Half width: Capital allocation / Month

Footer

## Technical must-haves for all charts:

- Constant variables to ensure aligned approaches.
- Loading states with chart height and width set to reduce CLS and increase page load speeds.
- Calculations are conducted in a strategised, performant and sensible manner in the relevant area.
- Each chart with more than one mont of time has a simple individual componentised control that filters the data range months: All Time, 24M, 12M, 6M, 1M
  This also shows the exact months period selected (i.e. Jan '26 - Feb '26)
- Able to download CSV of all data formatted appropriately (download button in an appropriate area once)

## Style rules:

- Cyan light, success, gold and navy are the allowed colours for visualisations. Use one or multiple depending on what is best practice.
- Chart keys on top left.
- All chart containers have the same spacings on all sides, to retain consistent alignment and ensure value labels are visible. Be generous.
- Light text contrast on bg-navy-light
- Very dark text contrast on bg-sogif-silver-light

## Usability:

- Hover state brightness increase and consistent tooltip component and simple style.
- High opacity on coloured elements so they read cleanly
- High contrast text

## Charts:

- Rechart Area chart (as performancesnapshot block has achieved)
  Title: Total Return / Time

  Implemented on the home page. Componentise home page chart including the stats on the right, and implement that component here. Same background is used here, so colours stay the same.

  Style: same as existing component

- Rechart Area Chart
  Title: Funds Under Management / Time

- Rechart Bar Chart
  Title: Quarterly Distributions / Quarter

Capital Allocation

- Rechart Sankey diagram (always full width to section for readability)
  Title: Capital Allocation for Month YY

  Total FUM -> Asset allocation ->
  -> Cash
  -> Efficient -> Australia / International
  -> Inefficient -> State

- Rechart Area Chart
  Title: Capital allocation / Time
