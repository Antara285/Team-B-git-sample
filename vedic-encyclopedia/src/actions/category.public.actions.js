'use server';

import { supabaseServer } from '@/lib/supabase/server';

export async function getPublicCategories() {
  const { data, error } = await supabaseServer
    .from('categories')
    .select('id, name, description, image')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
