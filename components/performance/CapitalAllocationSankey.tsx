'use client'

import { useMemo, useState, useCallback } from 'react'
import { useConstants } from '@/lib'
import type { LatestKpiSnapshot } from '@/lib'
import { CHART_COLORS, formatFUM, formatMonthLabel } from './chart-constants'
import { ChartStats } from './ChartStats'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PositionedNode {
  name: string
  x: number
  y: number
  width: number
  height: number
  color: string
  value: number
  totalFUM: number
  isRoot: boolean
}

interface PositionedLink {
  sourceX: number
  sourceTop: number
  sourceBottom: number
  targetX: number
  targetTop: number
  targetBottom: number
  color: string
  fillOpacity: number
}

// ---------------------------------------------------------------------------
// Layout computation
// ---------------------------------------------------------------------------

const NODE_WIDTH = 12
const NODE_PADDING = 20
// Col 1 reference height — cols 2 & 3 grow symmetrically around this
const BASE_H = 380

function computeLayout(snapshot: LatestKpiSnapshot, width: number) {
  const totalFUM = snapshot.fum
  const { assetAllocation, efficientAssetsByType, inefficientByState } = snapshot

  const colX = [0, (width - NODE_WIDTH) / 2, width - NODE_WIDTH]

  // --- Tier 1: sorted ascending (smallest on top) ---
  const categories = [
    { name: 'Cash', value: assetAllocation.cash, color: CHART_COLORS.success },
    { name: 'Efficient', value: assetAllocation.efficient, color: CHART_COLORS.cyan },
    { name: 'Inefficient', value: assetAllocation.inefficient, color: CHART_COLORS.gold },
  ].filter(n => n.value > 0).sort((a, b) => a.value - b.value)

  // --- Col 1: Total FUM — fixed reference ---
  const totalNode: PositionedNode = {
    name: 'Total FUM', x: colX[0], y: 0,
    width: NODE_WIDTH, height: BASE_H,
    color: CHART_COLORS.navy, value: totalFUM,
    totalFUM, isRoot: true,
  }

  // --- Col 2: each category bar proportional to BASE_H; gaps are additive.
  //     Symmetrically centered on BASE_H midpoint so equal space is added
  //     above and below relative to col 1. ---
  const col2TotalGap = Math.max(0, categories.length - 1) * NODE_PADDING
  const col2StartY = -(col2TotalGap / 2)

  const catNodes: PositionedNode[] = []
  let catY = col2StartY
  for (const cat of categories) {
    const h = (cat.value / totalFUM) * BASE_H
    catNodes.push({
      name: cat.name, x: colX[1], y: catY,
      width: NODE_WIDTH, height: h,
      color: cat.color, value: cat.value,
      totalFUM, isRoot: false,
    })
    catY += h + NODE_PADDING
  }

  // --- Children per parent ---
  const childrenMap = new Map<string, { name: string; value: number; color: string }[]>()

  if (assetAllocation.cash > 0) {
    childrenMap.set('Cash', [
      { name: 'Cash Reserves', value: assetAllocation.cash, color: CHART_COLORS.success },
    ])
  }

  const efficientKids = [
    { name: 'Australian', value: efficientAssetsByType.australian, color: CHART_COLORS.cyan },
    { name: 'International', value: efficientAssetsByType.international, color: CHART_COLORS.cyan },
  ].filter(n => n.value > 0).sort((a, b) => a.value - b.value)
  if (efficientKids.length) childrenMap.set('Efficient', efficientKids)

  const stateKids = Object.entries(inefficientByState)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => a - b)
    .map(([key, value]) => ({ name: key.toUpperCase(), value, color: CHART_COLORS.gold }))
  if (stateKids.length) childrenMap.set('Inefficient', stateKids)

  // --- Col 3: flat list with NODE_PADDING between every node, centered on BASE_H midpoint.
  //     Uniform gap throughout eliminates the inconsistency from per-group centering. ---
  const allKids = catNodes.flatMap(catNode =>
    (childrenMap.get(catNode.name) ?? []).map(k => ({ ...k, parentName: catNode.name }))
  )
  const col3BarHeights = allKids.map(k => (k.value / totalFUM) * BASE_H)
  const col3TotalBarsH = col3BarHeights.reduce((a, b) => a + b, 0)
  const col3TotalGap = Math.max(0, allKids.length - 1) * NODE_PADDING
  const col3TotalH = col3TotalBarsH + col3TotalGap
  const col3StartY = BASE_H / 2 - col3TotalH / 2

  const childNodes: PositionedNode[] = []
  let kidY = col3StartY
  for (let i = 0; i < allKids.length; i++) {
    const kid = allKids[i]
    childNodes.push({
      name: kid.name, x: colX[2], y: kidY,
      width: NODE_WIDTH, height: col3BarHeights[i],
      color: kid.color, value: kid.value,
      totalFUM, isRoot: false,
    })
    kidY += col3BarHeights[i] + NODE_PADDING
  }

  // --- Bounding box for dynamic SVG sizing ---
  const allNodes = [totalNode, ...catNodes, ...childNodes]
  const minY = Math.min(...allNodes.map(n => n.y))
  const maxY = Math.max(...allNodes.map(n => n.y + n.height))

  // --- Links ---
  const links: PositionedLink[] = []

  // Col 1 → Col 2: source bands tile [0, BASE_H] proportionally
  let srcY = 0
  for (const catNode of catNodes) {
    const srcH = (catNode.value / totalFUM) * BASE_H
    links.push({
      sourceX: colX[0] + NODE_WIDTH,
      sourceTop: srcY, sourceBottom: srcY + srcH,
      targetX: colX[1],
      targetTop: catNode.y, targetBottom: catNode.y + catNode.height,
      color: catNode.color,
      fillOpacity: 0.4,
    })
    srcY += srcH
  }

  // Col 2 → Col 3: source bands tile within each category node
  for (const catNode of catNodes) {
    const kids = childrenMap.get(catNode.name)
    if (!kids) continue

    const kidNodes = childNodes.filter(cn => kids.some(k => k.name === cn.name))
    const opacityTiers = [0.3, 0.25, 0.2]
    const ranked = [...kidNodes].sort((a, b) => b.value - a.value)
    const opacityMap = new Map(ranked.map((n, i) => [n.name, opacityTiers[Math.min(i, opacityTiers.length - 1)]]))

    let catSrcY = catNode.y
    for (const kidNode of kidNodes) {
      const srcH = (kidNode.value / catNode.value) * catNode.height
      links.push({
        sourceX: colX[1] + NODE_WIDTH,
        sourceTop: catSrcY, sourceBottom: catSrcY + srcH,
        targetX: colX[2],
        targetTop: kidNode.y, targetBottom: kidNode.y + kidNode.height,
        color: kidNode.color,
        fillOpacity: opacityMap.get(kidNode.name) ?? 0.5,
      })
      catSrcY += srcH
    }
  }

  return { nodes: allNodes, links, minY, totalHeight: maxY - minY }
}

// ---------------------------------------------------------------------------
// Link band (filled bezier path)
// ---------------------------------------------------------------------------

function LinkBand({ link }: { link: PositionedLink }) {
  const [hovered, setHovered] = useState(false)
  const cx = (link.sourceX + link.targetX) / 2

  const d = [
    `M ${link.sourceX},${link.sourceTop}`,
    `C ${cx},${link.sourceTop} ${cx},${link.targetTop} ${link.targetX},${link.targetTop}`,
    `L ${link.targetX},${link.targetBottom}`,
    `C ${cx},${link.targetBottom} ${cx},${link.sourceBottom} ${link.sourceX},${link.sourceBottom}`,
    'Z',
  ].join(' ')

  return (
    <path
      d={d}
      fill={link.color}
      fillOpacity={hovered ? Math.min(link.fillOpacity + 0.1, 1) : link.fillOpacity}
      stroke="none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: 'fill-opacity 150ms', cursor: 'default' }}
    />
  )
}

// ---------------------------------------------------------------------------
// Node bar and label rendered in separate passes so labels always sit above bars
// ---------------------------------------------------------------------------

function NodeBar({ node }: { node: PositionedNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <rect
      x={node.x} y={node.y}
      width={node.width} height={node.height}
      rx={2}
      fill={node.color}
      opacity={hovered ? 1 : 0.85}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'default', transition: 'opacity 150ms' }}
    />
  )
}

function NodeLabel({ node }: { node: PositionedNode }) {
  const pct = `${((node.value / node.totalFUM) * 100).toFixed(1)}%`
  const dollar = formatFUM(node.value)
  const labelX = node.x + node.width + 8
  const cy = node.y + node.height / 2
  return (
    <g>
      <text
        x={labelX} y={cy - 7}
        textAnchor="start"
        dominantBaseline="central"
        className="fill-gray-700 font-semibold"
        style={{ fontSize: 12 }}
      >
        {node.name}
      </text>
      <text
        x={labelX} y={cy + 9}
        textAnchor="start"
        dominantBaseline="central"
        className="fill-gray-500"
        style={{ fontSize: 12 }}
      >
        {dollar} ({pct})
      </text>
    </g>
  )
}

// ---------------------------------------------------------------------------
// Mini donut for stat blocks
// ---------------------------------------------------------------------------

interface DonutSlice {
  label: string
  value: number
  color: string
}

function MiniDonut({ slices }: { slices: DonutSlice[] }) {
  const size = 56
  const cx = size / 2
  const cy = size / 2
  const r = 20
  const strokeWidth = 8
  const total = slices.reduce((s, d) => s + d.value, 0)
  if (total === 0) return null

  let cumulative = 0
  const arcs = slices.map((slice) => {
    const pct = slice.value / total
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    cumulative += pct
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2
    const largeArc = pct > 0.5 ? 1 : 0
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    return { ...slice, d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`, pct }
  })

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} className="shrink-0">
        {arcs.map((arc) => (
          <path
            key={arc.label}
            d={arc.d}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="space-y-0.5">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="type-caption text-gray-600">
              {s.label} <span className="font-semibold tabular-nums text-sogif-navy">{total > 0 ? `${((s.value / total) * 100).toFixed(0)}%` : '—'}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const MARGIN = { top: 24, right: 160, bottom: 24, left: 12 }

export function CapitalAllocationSankey() {
  const { performanceKpiData } = useConstants()
  const snapshot = performanceKpiData.latestSnapshot

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

  const svgWidth = Math.max(containerWidth, 400)
  const innerWidth = svgWidth - MARGIN.left - MARGIN.right

  const layout = useMemo(() => {
    if (!snapshot) return null
    return computeLayout(snapshot, innerWidth)
  }, [snapshot, innerWidth])

  if (!snapshot || !layout) {
    return <div className="h-[380px] w-full bg-sogif-silver-light/50 rounded-lg animate-pulse" />
  }

  const svgHeight = layout.totalHeight + MARGIN.top + MARGIN.bottom
  // Shift the inner group so the topmost node aligns with MARGIN.top
  const innerOffsetY = MARGIN.top - layout.minY

  const monthLabel = formatMonthLabel(snapshot.month)

  const legendItems = [
    { label: 'Cash', color: CHART_COLORS.success },
    { label: 'Efficient', color: CHART_COLORS.cyan },
    { label: 'Inefficient', color: CHART_COLORS.gold },
  ]

  return (
    <div>
      <div className="mb-6">
        <h3 className="type-title font-display font-semibold text-sogif-navy mb-3">
          Asset Allocation for {monthLabel}
        </h3>
        <div className="flex py-1.5 items-center gap-4 type-caption text-gray-500">
          {legendItems.map(({ label, color }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 lg:gap-12 lg:items-center">
        <div ref={containerRef} className="col-span-12 lg:col-span-9 overflow-x-auto">
          <svg width={svgWidth} height={svgHeight} className="select-none">
            <g transform={`translate(${MARGIN.left},${innerOffsetY})`}>
              {layout.links.map((link, i) => (
                <LinkBand key={i} link={link} />
              ))}
              {layout.nodes.map((node) => (
                <NodeBar key={node.name} node={node} />
              ))}
              {layout.nodes.map((node) => (
                <NodeLabel key={node.name} node={node} />
              ))}
            </g>
          </svg>
        </div>

        <ChartStats
          items={[
            { heading: 'Currency Reserve', value: 'AUD' },
            {
              heading: 'Efficient Providers',
              content: (
                <MiniDonut
                  slices={[
                    { label: 'Dimensional', value: snapshot.efficientAssetsAllocation.dimensionalFunds, color: CHART_COLORS.cyan },
                    { label: 'Vanguard', value: snapshot.efficientAssetsAllocation.vanguard, color: CHART_COLORS.cyanDark },
                  ]}
                />
              ),
            },
            {
              heading: 'Property Location',
              content: (
                <MiniDonut
                  slices={[
                    { label: 'Metro', value: snapshot.inefficientByLocation.metro, color: CHART_COLORS.gold },
                    { label: 'Regional', value: snapshot.inefficientByLocation.regional, color: CHART_COLORS.navy },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
