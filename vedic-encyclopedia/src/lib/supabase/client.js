import { createClient as createSupabaseClient } from '@supabase/supabase-js';

let supabase;

export const createClient = () => {
  if (!supabase) {
    supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return supabase;
};
