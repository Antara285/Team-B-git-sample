'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';

export async function getCategories() {
  const { data, error } = await supabaseAdmin
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function addCategory(category) {
  const { error } = await supabaseAdmin.from('categories').insert([category]);
  if (error) throw new Error(error.message);
}

export async function updateCategory(id, category) {
  const { error } = await supabaseAdmin
    .from('categories')
    .update(category)
    .eq('id', id);

  if (error) throw new Error(error.message);
}

export async function deleteCategory(id) {
  const { error } = await supabaseAdmin
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
