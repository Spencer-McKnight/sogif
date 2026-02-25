The performance page contains a variety of visualisations on the fund data normalised in performance-normalization.ts

Style considerations:

- Short navy page hero section (no image, colour only)
- Relatively concise page, sitting charts on backgrounds and not in cards, with dividers, headers and explanations where necessary. The visual fidelity should be concentrated in chart usability.
- Performance in navy-navy-light
- All other visualisations in sogif-silver-light
- Components can be half width on desktop, but all components are full width on mobile
- Most responsiveness must be considered
- Colour scheme for visualisation areas are Cyan, Gold, Green, Navy. Variations in opacity are allowed. Keep these colours consistent in use case as possible.
- Text should be high contrast

Technical considerations:

- Loading states with height and width preserved to reduce CLS and increase page load speeds.
- Calculations are conducted in a strategised, performant and sensible manner in the relevant area. !important
- Download CSV functionality

Usability considerations:

- Consistent and strategised use of a simple, clearable date range filter where applicable
- Hover labels and states where they provide value
- Consider the most appropriate unit and tick range, interval for each value

Charts:

Performance - Navy

- Area chart (as performancesnapshot has achieved)
  Cumulative Unit Performance / Month

  Issue, redemption and cumulative price over time. Implemented on the home page.

  Style: same as existing component, Full section width

Capital Allocation

- Sankey diagram (always full width to section for readability)
  Capital Allocation for Month YY

  Total FUM -> Asset allocation ->
  -> Cash
  -> Efficient -> Fund Manager
  -> Inefficient -> Industry

  Style: Full section width

Capital Allocation - Efficient

- Pie chart
  Efficient Asset Allocation / Industry

  Style: Half section width

- Pie chart
  Efficient Asset Allocation / Fund Manager

  Style: Half section width

Capital Allocation - Inefficient

- Choropleth map
  Inefficient Asset Allocation % and $ / State

  Map of Australia with increasing opacity based on % of total in that state. Exact value displayed on each state.

  Style: Half section width

- Pie chart
  Inefficient Asset Allocation / Industry

  Style: Half section width

All Time

- Single Line Chart
  Funds Under Management / Month

  Style: Full section width

- Bar chart
  Distributions / Quarter

  Style: Half section width

- Area chart
  Capital Allocation History cash, efficient, inefficient / Month

  Style: Half section width
