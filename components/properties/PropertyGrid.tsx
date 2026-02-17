import { PropertyCard } from './PropertyCard'
import type { Property } from './types'

interface PropertyGridProps {
  properties: Property[]
  onPropertyClick?: (property: Property) => void
}

export function PropertyGrid({
  properties,
  onPropertyClick,
}: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
