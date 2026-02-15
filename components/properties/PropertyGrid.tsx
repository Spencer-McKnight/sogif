'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PropertyCard } from './PropertyCard'
import type { Property } from './types'

interface PropertyGridProps {
  properties: Property[]
  onPropertyClick?: (property: Property) => void
  /** Expand to 4–5 columns on wide screens */
  fullWidth?: boolean
  /** Disable staggered entrance animation */
  disableAnimation?: boolean
}

export function PropertyGrid({
  properties,
  onPropertyClick,
  fullWidth = false,
  disableAnimation = false,
}: PropertyGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const gridCols = fullWidth
    ? 'grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
    : 'grid-cols-1 md:grid-cols-3'

  return (
    <div ref={ref} className={`grid ${gridCols} gap-8`}>
      {properties.map((property, index) => {
        const card = (
          <PropertyCard
            property={property}
            onClick={onPropertyClick ? () => onPropertyClick(property) : undefined}
          />
        )

        if (disableAnimation) return <div key={property.id} className="h-full">{card}</div>

        return (
          <motion.div
            key={property.id}
            className="h-full"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            {card}
          </motion.div>
        )
      })}
    </div>
  )
}
