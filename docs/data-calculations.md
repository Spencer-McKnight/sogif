# Data Calculations Architecture

## Overview

This document establishes architectural patterns and best practices for data computations in the SOGIF frontend system. It ensures consistency, maintainability, and performance across all data transformation logic.

## Core Principles

### 1. Separation of Concerns

**Rule:** All business logic calculations live in `lib/calculations/` modules, not in React components.

- **Benefit:** Pure functions can be unit tested without React dependencies
- **Benefit:** Same calculations can power multiple components or pages
- **Benefit:** Easier to debug and modify calculation logic

**Example:**
```tsx
// ✅ GOOD: Pure calculation function
export function calculateStats(data: PerformanceDataRow[]): PerformanceStats {
  // No React hooks, no side effects
}

// ❌ BAD: Calculation embedded in component
export function StatsComponent({ data }) {
  const stats = useMemo(() => {
    // Complex calculations inside component
  }, [data])
}
```

### 2. Pure Functions

**Rule:** All calculation functions must be pure (deterministic, no side effects).

**Characteristics:**
- Same input always produces same output
- No external state mutations
- No I/O operations (fetch, localStorage, etc.)
- No React hooks

**Why it matters:**
- Calculations can run on both server and client
- Easy to test with simple input/output assertions
- Results are cacheable and predictable

**Example:**
```tsx
// ✅ GOOD: Pure function
export function computeMetrics(data: RawData[]): ComputedMetrics {
  // Only transforms input data
  // No side effects
  return { ...computed }
}

// ❌ BAD: Impure function
export function computeMetrics(data: RawData[]): ComputedMetrics {
  const metrics = { ...computed }
  localStorage.setItem('metrics', JSON.stringify(metrics)) // Side effect!
  return metrics
}
```

### 3. Server-First Computation

**Rule:** Pre-compute data on the server during initial fetch when possible.

**Strategy:**
1. Fetch raw data from CMS (server-side in `getConstants()`)
2. Compute derived metrics using pure functions (server-side)
3. Pass pre-computed data to React Context
4. Client components consume ready-made calculations

**Benefits:**
- Reduces client JavaScript execution
- Computed data is serializable (works with RSC)
- Same data available to all client components
- Fallback available if context unavailable

**When to compute client-side:**
- Dynamic filtering by user (date ranges, categories)
- Real-time calculations based on user input
- Optional views with secondary computations

**Implementation:**
```tsx
// Server: lib/queries/constants.ts
export const getConstants = cache(async () => {
  const rawData = await fetchPerformanceData(url)
  const computed = computePerformanceMetrics(rawData) // Pre-compute

  return {
    performanceData: rawData,
    computedPerformance: computed, // Pass to context
  }
})

// Client: components/PerformanceSnapshot.tsx
export function PerformanceSnapshot({ performanceData }) {
  const contextData = usePerformanceSafe()

  const computed = useMemo(() => {
    if (contextData) return contextData.computed // Use pre-computed
    return computePerformanceMetrics(performanceData) // Fallback
  }, [contextData, performanceData])
}
```

### 4. Type Safety

**Rule:** All computed data structures must have explicit TypeScript interfaces.

**Requirements:**
- Define interfaces for all calculation outputs
- Document the meaning and units of numeric fields
- Use discriminated unions for conditional data
- Import types from `lib/types/` or export from calculation modules

**Example:**
```tsx
// ✅ GOOD: Explicit types with documentation
export interface PerformanceStats {
  /** Year-over-year capital growth as percentage */
  capitalGrowthPrevYear: number
  /** Dollar value of distributions */
  distributionsPrevYear: number
  /** Total return: price growth + distributions */
  cumulativePrevYear: number
}

// ❌ BAD: Vague types
export interface Stats {
  value1: number
  value2: number
  value3: number
}
```

### 5. Context Pattern for Complex Data

**Rule:** Complex computed data structures should be exposed via React Context, following the `ConstantsContext` pattern.

**Pattern Structure:**
```tsx
// 1. Define context value interface
interface PerformanceContextValue {
  computed: ComputedPerformanceData
  chartData: ChartDataPoint[]
  stats: PerformanceStats
}

// 2. Create context
const PerformanceContext = createContext<PerformanceContextValue | null>(null)

// 3. Provider component
export function PerformanceProvider({ children, computed }) {
  return (
    <PerformanceContext.Provider value={{ computed, ... }}>
      {children}
    </PerformanceContext.Provider>
  )
}

// 4. Hooks for access
export function usePerformance(): PerformanceContextValue { }
export function usePerformanceSafe(): PerformanceContextValue | null { }
```

**When to use Context:**
- Data used by multiple deeply-nested components
- Pre-computed at app initialization
- Should be accessible throughout component tree
- Backwards compatibility with components outside provider

## Performance Optimizations

### 1. Single-Pass Iterations

Minimize array traversals to reduce O(n) iterations:

```tsx
// ✅ GOOD: Single pass
export function calculateMetrics(data: DataRow[]): Metrics {
  let totalDist = 0
  let minPrice = Infinity
  let maxPrice = -Infinity

  for (const item of data) {
    totalDist += item.distribution
    minPrice = Math.min(minPrice, item.price)
    maxPrice = Math.max(maxPrice, item.price)
  }

  return { totalDist, minPrice, maxPrice }
}

// ❌ BAD: Multiple passes
export function calculateMetrics(data: DataRow[]): Metrics {
  const totalDist = data.reduce((s, d) => s + d.distribution, 0) // Pass 1
  const minPrice = Math.min(...data.map(d => d.price)) // Pass 2
  const maxPrice = Math.max(...data.map(d => d.price)) // Pass 3
}
```

### 2. Early Returns for Empty Data

```tsx
// ✅ GOOD: Early return
export function calculateMetrics(data: DataRow[]): Metrics {
  if (!data.length) {
    return { /* default values */ }
  }
  // Expensive calculations follow
}
```

### 3. Explicit Numeric Precision

Avoid floating-point precision issues:

```tsx
// ✅ GOOD: Explicit rounding
cumulativeReturn: Number((issuePrice + distributions).toFixed(4))

// ❌ BAD: Floating-point drift
cumulativeReturn: issuePrice + distributions // May have precision issues
```

### 4. Memoization at Component Level

Use React.useMemo for client-side recalculations:

```tsx
// ✅ GOOD: Memoized fallback calculation
const computed = useMemo(() => {
  if (contextData) return contextData.computed
  return computePerformanceMetrics(performanceData)
}, [contextData, performanceData])
```

## File Organization

```
lib/
├── calculations/          # Pure calculation functions
│   └── performance.ts     # Financial metrics computations
├── contexts/             # React Context providers
│   └── PerformanceContext.tsx
├── types/               # TypeScript definitions
│   └── datocms.ts
├── queries/            # Data fetching + pre-computation
│   └── constants.ts
└── index.ts           # Barrel exports
```

## Adding New Computations

### Checklist

- [ ] Create pure function in `lib/calculations/[domain].ts`
- [ ] Define TypeScript interfaces for inputs and outputs
- [ ] Add JSDoc comments documenting calculation logic
- [ ] Use single-pass iterations where possible
- [ ] Handle empty data gracefully
- [ ] Create unit tests for calculation functions
- [ ] If server pre-computed: integrate into `getConstants()`
- [ ] If needs context access: follow `PerformanceContext` pattern
- [ ] Export from `lib/index.ts`
- [ ] Import properly typed in consuming components
- [ ] Document in this file if establishing new pattern

## Example: Adding Portfolio Breakdown

```tsx
// 1. Define types (lib/types/datocms.ts)
export interface PortfolioBreakdown {
  category: string
  percentage: number
  value: number
}

// 2. Create pure calculation (lib/calculations/portfolio.ts)
export function calculatePortfolioBreakdown(
  holdings: Holding[]
): PortfolioBreakdown[] {
  const total = holdings.reduce((sum, h) => sum + h.value, 0)

  return holdings.map(holding => ({
    category: holding.category,
    percentage: (holding.value / total) * 100,
    value: holding.value,
  }))
}

// 3. Pre-compute server-side (lib/queries/constants.ts)
const portfolioBreakdown = computePortfolioBreakdown(holdings)

// 4. Expose via context if needed
// Or use directly in components if simple data

// 5. Export from lib/index.ts
export { calculatePortfolioBreakdown }
export type { PortfolioBreakdown }
```

## Testing

All calculation functions should have unit tests:

```tsx
// portfolio.test.ts
describe('calculatePortfolioBreakdown', () => {
  it('calculates percentages correctly', () => {
    const holdings = [
      { category: 'Growth', value: 60 },
      { category: 'Income', value: 40 },
    ]

    const result = calculatePortfolioBreakdown(holdings)

    expect(result[0].percentage).toBe(60)
    expect(result[1].percentage).toBe(40)
  })

  it('handles empty holdings', () => {
    const result = calculatePortfolioBreakdown([])
    expect(result).toEqual([])
  })
})
```

## Migration Guide: Component-Embedded → Extracted Calculations

### Before
```tsx
function Component({ data }) {
  const stats = useMemo(() => {
    // Complex calculation logic
    return computed
  }, [data])
}
```

### After
```tsx
// lib/calculations/domain.ts
export function calculateStats(data) {
  // Pure function
}

// component.tsx
function Component({ data }) {
  const contextData = usePerformanceSafe()
  const stats = useMemo(() => {
    if (contextData?.stats) return contextData.stats
    return calculateStats(data)
  }, [contextData, data])
}
```

## FAQ

**Q: Should all calculations be server-pre-computed?**
A: No. Only calculations on stable, frequently-accessed data. User-driven filtering or dynamic views should compute client-side.

**Q: When should I create a new context vs. importing functions?**
A: Use context for data accessed by many nested components. Use direct imports for single-use or simple calculations.

**Q: How do I handle calculations that depend on user preferences?**
A: Compute server-side with defaults, then recalculate client-side when user settings change.

**Q: Can calculation functions import from other calculations?**
A: Yes, but keep dependencies minimal. Prefer composing simple functions over one monolithic function.
