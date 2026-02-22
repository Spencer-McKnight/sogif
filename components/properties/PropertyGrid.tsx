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
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
      {properties.map((property) => (
        <div key={property.id} className="h-full sm:col-span-6 lg:col-span-4">
          <PropertyCard
            property={property}
            onClick={onPropertyClick ? () => onPropertyClick(property) : undefined}
          />
        </div>
      ))}
    </div>
  )
}
