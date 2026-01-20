'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { SiteConstants } from '../types/datocms'

/**
 * Global Constants Context
 * 
 * This context provides access to CMS-managed site constants throughout
 * the component tree, enabling both server and client components to
 * access shared configuration values.
 * 
 * Architecture:
 * - Constants are fetched once at the root layout (server-side)
 * - Passed to this provider for client-side access
 * - Uses React Context for efficient prop drilling avoidance
 */

const ConstantsContext = createContext<SiteConstants | null>(null)

interface ConstantsProviderProps {
  children: ReactNode
  constants: SiteConstants
}

/**
 * Provider component for global site constants
 * 
 * Wrap this around your app in the root layout to make constants
 * available to all client components via useConstants() hook.
 * 
 * @example
 * ```tsx
 * // In layout.tsx (Server Component)
 * const constants = await getConstants()
 * 
 * return (
 *   <ConstantsProvider constants={constants}>
 *     {children}
 *   </ConstantsProvider>
 * )
 * ```
 */
export function ConstantsProvider({ children, constants }: ConstantsProviderProps) {
  return (
    <ConstantsContext.Provider value={constants}>
      {children}
    </ConstantsContext.Provider>
  )
}

/**
 * Hook to access global site constants in client components
 * 
 * @returns Site constants object
 * @throws Error if used outside of ConstantsProvider
 * 
 * @example
 * ```tsx
 * 'use client'
 * 
 * function InvestButton() {
 *   const { onlineApplicationUrl } = useConstants()
 *   return <a href={onlineApplicationUrl}>Invest Now</a>
 * }
 * ```
 */
export function useConstants(): SiteConstants {
  const context = useContext(ConstantsContext)
  
  if (!context) {
    throw new Error(
      'useConstants must be used within a ConstantsProvider. ' +
      'Ensure your component is wrapped in the ConstantsProvider in layout.tsx.'
    )
  }
  
  return context
}

/**
 * Optional hook variant that returns null instead of throwing
 * Useful for components that may render outside the provider
 */
export function useConstantsSafe(): SiteConstants | null {
  return useContext(ConstantsContext)
}

