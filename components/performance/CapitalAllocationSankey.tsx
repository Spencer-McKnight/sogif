'use client'

import { useMemo } from 'react'
import { Sankey, Tooltip, ResponsiveContainer } from 'recharts'
import type { LatestKpiSnapshot, MonthlyKpiRow } from '@/lib'
import {
  CHART_COLORS, formatCompactCurrency, formatPercent,
  TOOLTIP_CLASSES, TOOLTIP_HEADER, TOOLTIP_LABEL,
} from './chart-utils'

interface CapitalAllocationSankeyProps {
  snapshot: LatestKpiSnapshot
  latestRow: MonthlyKpiRow
}

function toDollars(raw: number, parentDollar: number, isPercent: boolean): number {
  return isPercent ? (raw / 100) * parentDollar : raw
}

function withOpacity(color: string, opacity: number): string {
  return color.replace('hsl(', 'hsla(').replace(')', `, ${opacity})`)
}

function byValueAscending<T extends { value: number; label: string }>(a: T, b: T): number {
  if (a.value === b.value) return a.label.localeCompare(b.label)
  return a.value - b.value
}

interface SankeyNodeData {
  name: string
  fill: string
}

interface SankeyLinkData {
  source: number
  target: number
  value: number
  fill: string
}

interface SankeyTooltipItem {
  payload?: {
    name?: string
    value?: number
    source?: { name?: string }
    target?: { name?: string }
  }
}

interface SankeyTooltipProps {
  active?: boolean
  payload?: SankeyTooltipItem[]
}

function buildSankeyData(snapshot: LatestKpiSnapshot, latestRow: MonthlyKpiRow) {
  const { assetAllocation, efficientAssetsByType, inefficientByState } = snapshot
  const total = assetAllocation.total || 1
  const effTypeIsPercent = latestRow.rawBreakdowns.efficientAssetsType?.type === 'percentage'
  const stateIsPercent = latestRow.rawBreakdowns.inefficientState?.type === 'percentage'

  const nodes: SankeyNodeData[] = []
  const links: SankeyLinkData[] = []

  function addNode(name: string, fill: string): number {
    const idx = nodes.length
    nodes.push({ name, fill })
    return idx
  }

  function addLink(source: number, target: number, value: number, color: string) {
    links.push({ source, target, value, fill: withOpacity(color, 0.24) })
  }

  const fumIdx = addNode('Total FUM', CHART_COLORS.navyLight)

  const categories = [
    { key: 'cash', label: 'Cash', value: assetAllocation.cash, color: CHART_COLORS.gold },
    { key: 'efficient', label: 'Efficient', value: assetAllocation.efficient, color: CHART_COLORS.green },
    { key: 'inefficient', label: 'Inefficient', value: assetAllocation.inefficient, color: CHART_COLORS.cyan },
  ].filter(c => c.value > 0)

  const catIdx: Record<string, number> = {}
  for (const cat of categories) {
    catIdx[cat.key] = addNode(cat.label, cat.color)
    addLink(fumIdx, catIdx[cat.key], cat.value, cat.color)
  }

  // Cash pass-through to keep it in column 1
  if (catIdx.cash !== undefined) {
    const idx = addNode('Cash Reserves', CHART_COLORS.gold)
    addLink(catIdx.cash, idx, assetAllocation.cash, CHART_COLORS.gold)
  }

  // Efficient sub-types
  if (catIdx.efficient !== undefined) {
    const subs = [
      { label: 'International', value: toDollars(efficientAssetsByType.international, assetAllocation.efficient, effTypeIsPercent) },
      { label: 'Australian', value: toDollars(efficientAssetsByType.australian, assetAllocation.efficient, effTypeIsPercent) },
    ]
      .filter(s => s.value > 0)
      .sort(byValueAscending)
    subs.forEach((sub) => {
      const idx = addNode(sub.label, CHART_COLORS.green)
      addLink(catIdx.efficient, idx, sub.value, CHART_COLORS.green)
    })
  }

  // Inefficient by state
  if (catIdx.inefficient !== undefined) {
    const subs = [
      { label: 'NSW', value: toDollars(inefficientByState.nsw, assetAllocation.inefficient, stateIsPercent) },
      { label: 'VIC', value: toDollars(inefficientByState.vic, assetAllocation.inefficient, stateIsPercent) },
      { label: 'QLD', value: toDollars(inefficientByState.qld, assetAllocation.inefficient, stateIsPercent) },
      { label: 'WA', value: toDollars(inefficientByState.wa, assetAllocation.inefficient, stateIsPercent) },
      { label: 'SA', value: toDollars(inefficientByState.sa, assetAllocation.inefficient, stateIsPercent) },
      { label: 'TAS', value: toDollars(inefficientByState.tas, assetAllocation.inefficient, stateIsPercent) },
      { label: 'NT', value: toDollars(inefficientByState.nt, assetAllocation.inefficient, stateIsPercent) },
      { label: 'ACT', value: toDollars(inefficientByState.act, assetAllocation.inefficient, stateIsPercent) },
    ]
      .filter(s => s.value > 0)
      .sort(byValueAscending)
    subs.forEach((sub) => {
      const idx = addNode(sub.label, CHART_COLORS.cyan)
      addLink(catIdx.inefficient, idx, sub.value, CHART_COLORS.cyan)
    })
  }

  return { data: { nodes, links }, total }
}

interface SankeyNodeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: { name?: string; value?: number; fill?: string }
  total: number
}

function SankeyNode({ x = 0, y = 0, width = 0, height = 0, payload, total }: SankeyNodeProps) {
  const name = payload?.name ?? ''
  const value = payload?.value ?? 0
  const fill = payload?.fill ?? CHART_COLORS.navyLight
  const percentLabel = formatPercent((value / total) * 100)
  const showLabel = height > 6
  const showTwoLineValue = height > 20
  const isTinyNode = height <= 20
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={3} fill={fill} />
      {showLabel && (
        <>
          <text
            x={x + width + 8} y={y + (isTinyNode ? 1 : -1) + height / 2}
            dominantBaseline="central"
            className="fill-sogif-navy text-[13px] font-medium"
          >
            {isTinyNode ? `${name} (${percentLabel})` : name}
          </text>
          {showTwoLineValue && (
            <text
              x={x + width + 8} y={y + height / 2 + 15}
              dominantBaseline="central"
              className="fill-text-muted text-[12px]"
            >
              {formatCompactCurrency(value)} ({percentLabel})
            </text>
          )}
        </>
      )}
    </g>
  )
}

interface SankeyLinkProps {
  sourceX?: number
  targetX?: number
  sourceY?: number
  targetY?: number
  sourceControlX?: number
  targetControlX?: number
  linkWidth?: number
  payload?: { fill?: string }
}

function SankeyLink({
  sourceX = 0,
  targetX = 0,
  sourceY = 0,
  targetY = 0,
  sourceControlX = 0,
  targetControlX = 0,
  linkWidth = 0,
  payload,
}: SankeyLinkProps) {
  const sourceTop = sourceY - linkWidth / 2
  const sourceBottom = sourceY + linkWidth / 2
  const targetTop = targetY - linkWidth / 2
  const targetBottom = targetY + linkWidth / 2

  const d = [
    `M${sourceX},${sourceTop}`,
    `C${sourceControlX},${sourceTop} ${targetControlX},${targetTop} ${targetX},${targetTop}`,
    `L${targetX},${targetBottom}`,
    `C${targetControlX},${targetBottom} ${sourceControlX},${sourceBottom} ${sourceX},${sourceBottom}`,
    'Z',
  ].join(' ')

  return <path d={d} fill={payload?.fill ?? withOpacity(CHART_COLORS.navyLight, 0.18)} stroke="none" />
}

function SankeyTooltip({ active, payload, total }: SankeyTooltipProps & { total: number }) {
  if (!active || !payload?.length) return null
  const item = payload[0]?.payload
  if (!item) return null

  const isLink = item.source && item.target
  const name = isLink
    ? `${item.source?.name ?? 'Unknown'} → ${item.target?.name ?? 'Unknown'}`
    : item.name
  const value = item.value ?? 0

  return (
    <div className={TOOLTIP_CLASSES}>
      <p className={TOOLTIP_HEADER}>{name}</p>
      <p className={TOOLTIP_LABEL}>
        {formatCompactCurrency(value)} ({formatPercent((value / total) * 100)})
      </p>
    </div>
  )
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function CapitalAllocationSankey({ snapshot, latestRow }: CapitalAllocationSankeyProps) {
  const { data, total } = useMemo(
    () => buildSankeyData(snapshot, latestRow),
    [snapshot, latestRow],
  )

  return (
    <div className="w-full h-[520px]" role="img" aria-label="Capital allocation Sankey diagram">
      <ResponsiveContainer>
        <Sankey
          data={data}
          nodeWidth={14}
          nodePadding={14}
          linkCurvature={0.5}
          iterations={24}
          sort={false}
          margin={{ top: 28, right: 180, bottom: 24, left: 10 }}
          node={<SankeyNode total={total} />}
          link={<SankeyLink />}
        >
          <Tooltip content={<SankeyTooltip total={total} />} />
        </Sankey>
      </ResponsiveContainer>
    </div>
  )
}
