import { PropertyCard } from './PropertyCard'
import type { Property } from './types'

interface PropertyGridProps {
  properties: Property[]
  onPropertyClick?: (property: Property) => void
  /** Expand to 4–5 columns on wide screens */
  fullWidth?: boolean
}

export function PropertyGrid({
  properties,
  onPropertyClick,
  fullWidth = false,
}: PropertyGridProps) {
  const gridCols = fullWidth
    ? 'grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
    : 'grid-cols-1 md:grid-cols-3'

  return (
    <div className={`grid ${gridCols} gap-8`}>
      {properties.map((property) => (
        <div key={property.id} className="h-full">
          <PropertyCard
            property={property}
            onClick={onPropertyClick ? () => onPropertyClick(property) : undefined}
          />
        </div>
      ))}
    </div>
  )
}
