import type { CmsImageField } from '@/lib'

export interface Property {
  id: number
  address: string
  slug: string
  headline: string
  shortDescription: string
  longDescription: string
  propertyType: string
  acquiredDate: string
  soldDate: string | null
  purchasePrice: string
  salePrice: string | null
  landSize: string
  buildingSize: string
  independentValuation: string
  capitalisationRate: string
  valuationDate: string
  occupancyAtPurchase: string
  financing: string
  waleLeaseExpiry: string
  waleIncome: string
  waleLettableArea: string
  mapEmbed: string | null
  mapLink: string | null
  images: CmsImageField[]
}
