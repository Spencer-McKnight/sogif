import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client using service_role key
 * Only use in server contexts (API routes, server components)
 * This bypasses RLS for admin operations
 */
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
    )
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export interface FormSubmissionRow {
  id: string
  created_at: string
  email: string
  phone: string | null
  investment_min_k: number
  investment_max_k: number
  source: string
  turnstile_success: boolean
  ip_hash: string | null
  user_agent: string | null
}

export interface FormSubmissionInsert {
  email: string
  phone?: string | null
  investment_min_k: number
  investment_max_k: number
  source?: string
  turnstile_success?: boolean
  ip_hash?: string | null
  user_agent?: string | null
}
