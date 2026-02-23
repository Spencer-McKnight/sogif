'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ComputedPerformanceData, PerformanceStats, ChartDataPoint, YAxisConfig, SpecialPoints } from '../calculations/performance'

/**
 * Performance Data Context
 *
 * This context provides access to pre-computed financial performance metrics
 * throughout the component tree, enabling client components to access computed
 * data without recalculating.
 *
 * Architecture:
 * - Metrics are pre-computed server-side during data fetch (getConstants)
 * - Passed to this provider for client-side access
 * - Uses React Context for efficient prop drilling avoidance
 * - Components can compute locally on demand if needed (e.g., for filtered views)
 */

interface PerformanceContextValue {
  computed: ComputedPerformanceData
  // Convenience accessors for common use cases
  chartData: ChartDataPoint[]
  stats: PerformanceStats
  yAxisConfig: YAxisConfig
  specialPoints: SpecialPoints
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null)

interface PerformanceProviderProps {
  children: ReactNode
  computed: ComputedPerformanceData
}

/**
 * Provider component for performance data
 *
 * Wrap this around components that need access to computed performance metrics.
 * Typically used once at the app root or layout level.
 *
 * @example
 * ```tsx
 * // In layout.tsx (Server Component)
 * const constants = await getConstants()
 * const performanceData = constants.computedPerformance
 *
 * return (
 *   <PerformanceProvider computed={performanceData}>
 *     {children}
 *   </PerformanceProvider>
 * )
 * ```
 */
export function PerformanceProvider({ children, computed }: PerformanceProviderProps) {
  const value: PerformanceContextValue = {
    computed,
    chartData: computed.chartData,
    stats: computed.stats,
    yAxisConfig: computed.yAxisConfig,
    specialPoints: computed.specialPoints,
  }

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  )
}

/**
 * Hook to access performance data in client components
 *
 * @returns Performance data context value
 * @throws Error if used outside of PerformanceProvider
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * function PerformanceChart() {
 *   const { chartData, stats } = usePerformance()
 *   return <Chart data={chartData} stats={stats} />
 * }
 * ```
 */
export function usePerformance(): PerformanceContextValue {
  const context = useContext(PerformanceContext)

  if (!context) {
    throw new Error(
      'usePerformance must be used within a PerformanceProvider. ' +
      'Ensure your component is wrapped in the PerformanceProvider in layout.tsx.'
    )
  }

  return context
}

/**
 * Optional hook variant that returns null instead of throwing
 * Useful for components that may render outside the provider
 *
 * @returns Performance data context value or null
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * function OptionalPerformanceWidget() {
 *   const performanceData = usePerformanceSafe()
 *   if (!performanceData) return null
 *   return <PerformanceWidget data={performanceData} />
 * }
 * ```
 */
export function usePerformanceSafe(): PerformanceContextValue | null {
  return useContext(PerformanceContext)
}
