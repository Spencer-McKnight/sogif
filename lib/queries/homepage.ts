import { cache } from 'react'
import { performQuery, REVALIDATION_TIMES } from '../datocms'
import { responsiveImageFragment } from '../fragments/image'
import type { HomePageData, HomePageQueryResponse, CmsProperty, PropertiesQueryResponse } from '../types/homepage'

/**
 * GraphQL query for the home_page singleton
 * Fetches all section content including nested block records
 */
const HOME_PAGE_QUERY = `
  query HomePageQuery {
    homePage {
      heroHeadlineTop
      heroHeadlineBottom
      heroSubheadline { value }
      heroStaticStats {
        ... on HeroStatBlockRecord {
          id
          value
          label
        }
      }
      heroCtaLabel
      heroCtaHref
      heroBackgroundImage {
        responsiveImage(imgixParams: { auto: format, q: 60, w: 1920 }) {
          ...responsiveImageFragment
        }
      }
      heroDisclaimer

      performanceEyebrow
      performanceTitle
      performanceLinkLabel
      performanceDisclaimers { value }

      propertiesEyebrow
      propertiesTitle
      propertiesDescription
      propertiesLinkLabel

      teamEyebrow
      teamTitle
      teamDescription
      teamMembers {
        ... on TeamMemberBlockRecord {
          id
          name
          role
          credentials
          tagline { value }
          image {
            responsiveImage(imgixParams: { auto: format, q: 75, w: 400, h: 400, fit: crop }) {
              ...responsiveImageFragment
            }
          }
        }
      }
      teamLinkLabel

      stepsEyebrow
      stepsTitle
      steps {
        ... on InvestmentStepBlockRecord {
          id
          title
          description { value }
        }
      }
      stepsCtaLabel
      stepsCtaHref

      ctaEyebrow
      ctaHeadline
      ctaFormTitle
      ctaDisclaimer { value }
    }
  }
  ${responsiveImageFragment}
`

/**
 * Fetches the home page singleton from DatoCMS
 * Cached with React cache() for request deduplication
 */
export const getHomePage = cache(async (preview = false): Promise<HomePageData | null> => {
  try {
    const data = await performQuery<HomePageQueryResponse>(HOME_PAGE_QUERY, undefined, preview)
    return data.homePage
  } catch (error) {
    console.error('Failed to fetch home page:', error)
    return null
  }
})

/**
 * GraphQL query for the property collection
 * Fetches all properties ordered by acquisition date
 */
const PROPERTIES_QUERY = `
  query PropertiesQuery {
    allProperties(orderBy: acquiredDate_DESC) {
      id
      address
      slug
      headline
      shortDescription
      longDescription { value }
      propertyType
      acquiredDate
      soldDate
      purchasePrice
      salePrice
      landSize
      buildingSize
      independentValuation
      capitalisationRate
      valuationDate
      occupancyAtPurchase
      financing
      waleLeaseExpiry
      waleIncome
      waleLettableArea
      mapEmbed
      mapLink
      images {
        responsiveImage(imgixParams: { auto: format, q: 70, w: 800 }) {
          ...responsiveImageFragment
        }
      }
    }
  }
  ${responsiveImageFragment}
`

/**
 * Fetches all property records from DatoCMS
 * Cached with React cache() for request deduplication
 */
export const getProperties = cache(async (preview = false): Promise<CmsProperty[]> => {
  try {
    const data = await performQuery<PropertiesQueryResponse>(PROPERTIES_QUERY, undefined, preview)
    return data.allProperties ?? []
  } catch (error) {
    console.error('Failed to fetch properties:', error)
    return []
  }
})

export const homePageRevalidate = REVALIDATION_TIMES.PAGES
export const propertiesRevalidate = REVALIDATION_TIMES.PROPERTIES
