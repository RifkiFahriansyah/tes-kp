import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

const supabaseUrl      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-side Supabase client using the service role key.
 * Bypasses RLS — safe to use only in Server Components / Server Actions.
 */
export function createServerSupabase(): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Browser-safe Supabase client using the anon key.
 * Used in Client Components.
 */
export function createBrowserSupabase(): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

/** @deprecated use createServerSupabase or createBrowserSupabase directly */
export const getSupabaseClient = createBrowserSupabase;
