// Supabase Client with Mock Mode Fallback

import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase credentials are available
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create Supabase client or null if not configured
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Helper function to check if we're in mock mode
export const isMockMode = () => !isSupabaseConfigured;

// Log mode on initialization
if (typeof window !== 'undefined') {
  console.log(
    `[Supabase] Running in ${isMockMode() ? 'MOCK' : 'PRODUCTION'} mode`
  );
}
