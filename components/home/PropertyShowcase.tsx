'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { AppLink, Container, SectionHeader } from '@/components/ui'
import { PropertyCard, PropertyDetailModal } from '@/components/properties'
import type { Property } from '@/components/properties'

// TODO: Replace with CMS-managed property data
const properties: Property[] = [
  {
    id: 3,
    address: '1 Prestige Place, Narre Warren, VIC 3805',
    slug: '1-prestige-place-narre-warren',
    headline: 'International Tenant | Melbourne Metro Asset | Brand Name Dealership',
    shortDescription: 'Our first acquisition in Victoria, this car dealership is located in busy Narre Warren. It is leased to an international tenant.',
    longDescription: 'The property is located in Narre Warren - an established residential area situated approximately 40 radial kilometres south east of Melbourne\'s CBD. The site comprises a two-storey purpose built car dealership (showroom and workshop) constructed circa 2006 that is leased to an Australian subsidiary of Inchcape Plc (which has a market cap of £2.66b is listed on the London Stock Exchange). Inchcape Australasia have the distribution rights to Subaru in Australia, and also control the retail Subaru sales network by owning most of the dealerships (especially in Victoria where they own all bar two small dealerships).\n\nThe Property comprises 4,062m² of land, and buildings of 1,331m² that comprise showroom/offices and a service area. There is parking for 106 outdoor display / parking places. The site is leased until 5 December 2026, with 2 × 5 year options.',
    propertyType: 'Retail (Showroom)',
    acquiredDate: '2024-04-15',
    soldDate: null,
    purchasePrice: '$10,250,000',
    salePrice: null,
    landSize: '4,062m²',
    buildingSize: '1,331m²',
    independentValuation: '$10,250,000',
    capitalisationRate: '5.00%',
    valuationDate: '6 December 2023',
    occupancyAtPurchase: '100%',
    financing: 'All cash purchase',
    waleLeaseExpiry: '2.68',
    waleIncome: '2.68',
    waleLettableArea: '2.68',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1571.4590699144921!2d145.3168609158708!3d-38.025687834277484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad61a002a8d217f%3A0x7e0a661a1b84c95e!2s1%20Prestige%20Pl%2C%20Narre%20Warren%20VIC%203805!5e0!3m2!1sen!2sau!4v1714442850570!5m2!1sen!2sau',
    mapLink: 'https://maps.app.goo.gl/o3N9KucFQ13RTy5f8',
    images: [],
  },
  {
    id: 5,
    address: '24 Main Road, Moonah, TAS 7009',
    slug: '24-main-road-moonah',
    headline: 'Strong Retail Asset | Long Lease | Brand Name Tenant',
    shortDescription: 'A recently modernised high profile retail building located in Moonah - just 7kms from Hobart\'s CBD.',
    longDescription: 'The site comprises a regular shaped allotment on the corner of Main Road and Florence Street, that is generally level throughout. The site has a good profile to passing pedestrian and vehicular traffic. Accommodation comprises a split level, "L" shaped showroom, goods inwards / delivery areas, staff amenities, low clearance mezzanine store and a higher clearance mezzanine store.\n\nThe property comprises a recently modernised retail showroom with open plan retail, ground floor storeroom, staff room and toilets with two upper level mezzanine store areas. The original building was constructed in 1960\'s then later extended in 2010 and 2013. There is concrete paved onsite parking with access from Florence Street.',
    propertyType: 'Retail (Showroom)',
    acquiredDate: '2024-01-19',
    soldDate: null,
    purchasePrice: '$7,540,200',
    salePrice: null,
    landSize: '2,519m²',
    buildingSize: '2,197m²',
    independentValuation: '$7,540,200',
    capitalisationRate: '6.50%',
    valuationDate: '30 November 2023',
    occupancyAtPurchase: '100%',
    financing: 'All cash purchase',
    waleLeaseExpiry: '4.81',
    waleIncome: '4.81',
    waleLettableArea: '4.81',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d869.6391462959836!2d147.2963550632522!3d-42.849499928785704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa6e74e8c7ada11d%3A0x38beacea0f6aee6f!2s24%20Main%20Rd%2C%20Moonah%20TAS%207009!5e0!3m2!1sen!2sau!4v1714442985186!5m2!1sen!2sau',
    mapLink: 'https://maps.app.goo.gl/VZ76AZCEf9xBUVtw9',
    images: [],
  },
  {
    id: 6,
    address: '68 Pimpama Jacobs Well Road, Pimpama, QLD 4209',
    slug: '68-pimpama-jacobs-well-road-pimpama-qld-4209',
    headline: 'Growth Area | Long Leases | Attractive Return',
    shortDescription: 'Strategically nestled in the high-growth corridor between Brisbane and the Gold Coast, this multi-tenant retail site is anchored by a Caltex service station.',
    longDescription: 'Pimpama, in the busy Brisbane - Gold Coast corridor, approximately 30kms north-west of Southport CBD and 51kms south-east of the Brisbane CBD, is (reported to be) the fastest growing area in Australia (with exception of capital cities). The property is situated on a high profile 3,292m2 (corner site) on the south-eastern intersection of Pimpama Jacobs Well Road and Attenborough Boulevard. The site is zoned \'Centre\' under the Gold Coast Planning Scheme 2003 (version 1.2 amended November 2011). This zoning has re-development potential to 27m (estimated to be 9 stories in height (STCA)).\n\nThe property comprises a single level retail building containing three attached tenancies, with the building positioned towards the southern end of the site.\n\nImprovements include Caltex Service station with 32 bowsers facilitating 8 vehicle service points and a tank capacity of 180,000 litres. The service station provides a convenience retail store of 151m2 in area and a connected 252m2 metre canopy which is 4.5metres in height. The convenience store has console, coolroom, back office, storeroom and bathroom amenities.\n\nAdjoining the Caltex retail store is a 95m2 store leased to The Cheesecake Shop. The third adjoining tenancy with a lettable area of 158m2, is leased to Ramen Danbo (Japanese Noodles), and includes two drive thru windows and a queuing capacity for 13 vehicles.',
    propertyType: 'Retail (Service Station)',
    acquiredDate: '2024-01-31',
    soldDate: null,
    purchasePrice: '$7,225,000',
    salePrice: null,
    landSize: '3,292m²',
    buildingSize: '404m²',
    independentValuation: '$7,225,000',
    capitalisationRate: '7.00%',
    valuationDate: '8 December 2023',
    occupancyAtPurchase: '100%',
    financing: 'All cash purchase',
    waleLeaseExpiry: '7.81',
    waleIncome: '10.07',
    waleLettableArea: '8.32',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1247.6136977880476!2d153.29069696277145!3d-27.816405800998737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91148412331df9%3A0x6d29f1d725b04710!2s68%20Pimpama%20Jacobs%20Well%20Rd%2C%20Pimpama%20QLD%204209!5e0!3m2!1sen!2sau!4v1714439241161!5m2!1sen!2sau',
    mapLink: 'https://maps.app.goo.gl/m1iJ4YYc1W5b6Hxd9',
    images: [],
  },
]

export function PropertyShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  return (
    <section className="section-padding bg-sogif-steel relative overflow-hidden" ref={ref}>
      {/* Subtle background decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sogif-cyan-dark/5 rounded-full blur-3xl" />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <SectionHeader
              centered={false}
              eyebrow="Property Showcase"
              title="Our Property Investments"
              description="SOGIF invests in strategic real estate opportunities across Australia, focusing on properties with strong income potential and growth upside."
            />
          </div>
          <AppLink
            href="/properties"
            showArrow
            variant="text"
            className="shrink-0"
          >
            View All Properties
          </AppLink>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <PropertyCard
                property={property}
                onClick={() => setSelectedProperty(property)}
              />
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-sogif-cyan-dark/10 rounded-full px-6 py-3 shadow-sm">
            <svg className="w-5 h-5 text-sogif-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sogif-navy font-medium">
              All investments independently valued and audited annually
            </span>
          </div>
        </motion.div>
      </Container>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        open={!!selectedProperty}
        onOpenChange={(open) => { if (!open) setSelectedProperty(null) }}
      />
    </section>
  )
}
