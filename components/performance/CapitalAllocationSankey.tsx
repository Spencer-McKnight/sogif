'use client'

import { useMemo, useState, useCallback } from 'react'
import { Sankey, Tooltip, Rectangle, Layer } from 'recharts'
import { useConstants } from '@/lib'
import type { LatestKpiSnapshot } from '@/lib'
import { CHART_COLORS, formatFUM, formatMonthLabel } from './chart-constants'

// ---------------------------------------------------------------------------
// Sankey data builder
// ---------------------------------------------------------------------------

interface SankeyNode {
  name: string
  color: string
}

interface SankeyLink {
  source: number
  target: number
  value: number
  color: string
}

function buildSankeyData(snapshot: LatestKpiSnapshot) {
  const { assetAllocation, efficientAssetsByType, inefficientByState } = snapshot
  const totalFUM = snapshot.fum

  // Nodes — index order matters for links
  const nodes: SankeyNode[] = [
    { name: 'Total FUM', color: CHART_COLORS.navy },                // 0
    { name: 'Asset Allocation', color: CHART_COLORS.navy },         // 1
    { name: 'Cash', color: CHART_COLORS.success },                  // 2
    { name: 'Efficient', color: CHART_COLORS.cyan },                // 3
    { name: 'Inefficient', color: CHART_COLORS.gold },              // 4
    { name: 'Australian', color: CHART_COLORS.cyan },               // 5
    { name: 'International', color: CHART_COLORS.cyan },            // 6
  ]

  // Collect non-zero states for inefficient breakdown
  const stateEntries = Object.entries(inefficientByState)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)

  const stateStartIndex = nodes.length
  for (const [key] of stateEntries) {
    nodes.push({ name: key.toUpperCase(), color: CHART_COLORS.gold })
  }

  // Links
  const links: SankeyLink[] = []

  // Total FUM → Asset Allocation
  if (totalFUM > 0) {
    links.push({ source: 0, target: 1, value: totalFUM, color: CHART_COLORS.navy })
  }

  // Asset Allocation → Cash / Efficient / Inefficient
  if (assetAllocation.cash > 0) {
    links.push({ source: 1, target: 2, value: assetAllocation.cash, color: CHART_COLORS.success })
  }
  if (assetAllocation.efficient > 0) {
    links.push({ source: 1, target: 3, value: assetAllocation.efficient, color: CHART_COLORS.cyan })
  }
  if (assetAllocation.inefficient > 0) {
    links.push({ source: 1, target: 4, value: assetAllocation.inefficient, color: CHART_COLORS.gold })
  }

  // Efficient → Australian / International
  if (efficientAssetsByType.australian > 0) {
    links.push({ source: 3, target: 5, value: efficientAssetsByType.australian, color: CHART_COLORS.cyan })
  }
  if (efficientAssetsByType.international > 0) {
    links.push({ source: 3, target: 6, value: efficientAssetsByType.international, color: CHART_COLORS.cyan })
  }

  // Inefficient → State breakdown
  stateEntries.forEach(([, value], i) => {
    links.push({ source: 4, target: stateStartIndex + i, value, color: CHART_COLORS.gold })
  })

  return { nodes, links }
}

// ---------------------------------------------------------------------------
// Custom Sankey node renderer
// ---------------------------------------------------------------------------

function SankeyNodeComponent(props: Record<string, unknown>) {
  const { x, y, width, height, payload } = props as {
    x: number; y: number; width: number; height: number;
    payload: SankeyNode & { value: number }
  }
  const [hovered, setHovered] = useState(false)

  return (
    <Layer>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.color}
        opacity={hovered ? 1 : 0.85}
        radius={[2, 2, 2, 2]}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'default', transition: 'opacity 150ms' }}
      />
      {height > 18 && (
        <text
          x={x + width + 8}
          y={y + height / 2}
          textAnchor="start"
          dominantBaseline="central"
          className="fill-gray-700 text-xs font-medium"
        >
          {payload.name}
        </text>
      )}
    </Layer>
  )
}

// ---------------------------------------------------------------------------
// Custom link with hover brightness
// ---------------------------------------------------------------------------

function SankeyLinkComponent(props: Record<string, unknown>) {
  const {
    sourceX, sourceY, sourceControlX,
    targetX, targetY, targetControlX,
    linkWidth, payload,
  } = props as {
    sourceX: number; sourceY: number; sourceControlX: number;
    targetX: number; targetY: number; targetControlX: number;
    linkWidth: number; payload: SankeyLink;
  }

  const [hovered, setHovered] = useState(false)

  return (
    <path
      d={`
        M${sourceX},${sourceY}
        C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
      `}
      fill="none"
      stroke={payload.color}
      strokeWidth={linkWidth}
      strokeOpacity={hovered ? 0.5 : 0.3}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: 'stroke-opacity 150ms', cursor: 'default' }}
    />
  )
}

// ---------------------------------------------------------------------------
// Custom tooltip
// ---------------------------------------------------------------------------

function SankeyTooltipContent({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number } }> }) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload
  if (!data) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="type-caption font-medium text-gray-900">{data.name}</p>
      <p className="type-caption tabular-nums text-gray-600">{formatFUM(data.value)}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function CapitalAllocationSankey() {
  const { performanceKpiData } = useConstants()
  const snapshot = performanceKpiData.latestSnapshot

  const sankeyData = useMemo(() => {
    if (!snapshot) return null
    return buildSankeyData(snapshot)
  }, [snapshot])

  const [containerWidth, setContainerWidth] = useState(800)

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) setContainerWidth(entry.contentRect.width)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (!snapshot || !sankeyData) {
    return <div className="h-[320px] md:h-[400px] w-full bg-sogif-silver-light/50 rounded-lg animate-pulse" />
  }

  const monthLabel = formatMonthLabel(snapshot.month)
  const height = Math.max(320, Math.min(500, sankeyData.nodes.length * 36))

  return (
    <div>
      <div className="mb-6">
        <h3 className="type-title font-display font-semibold text-gray-900 mb-1">
          Capital Allocation for {monthLabel}
        </h3>
        <p className="type-caption text-gray-500">
          Flow of funds from total FUM through asset classes to underlying allocations
        </p>
      </div>

      <div ref={containerRef} className="w-full overflow-x-auto">
        <Sankey
          width={Math.max(containerWidth, 600)}
          height={height}
          data={sankeyData}
          node={<SankeyNodeComponent />}
          link={<SankeyLinkComponent />}
          nodePadding={24}
          nodeWidth={12}
          margin={{ top: 16, right: 140, left: 16, bottom: 16 }}
        >
          <Tooltip content={<SankeyTooltipContent />} />
        </Sankey>
      </div>
    </div>
  )
}
