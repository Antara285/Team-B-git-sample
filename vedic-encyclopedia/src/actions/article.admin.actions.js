'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';

export async function getArticles() {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function addArticle(article) {
  const { error } = await supabaseAdmin
    .from('articles')
    .insert([article]);

  if (error) throw new Error(error.message);
}

export async function updateArticle(id, article) {
  const { error } = await supabaseAdmin
    .from('articles')
    .update(article)
    .eq('id', id);

  if (error) throw new Error(error.message);
}

export async function deleteArticle(id) {
  const { error } = await supabaseAdmin
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}

export async function deleteArticlesByCategory(categoryId) {
  const { error } = await supabaseAdmin
    .from('articles')
    .delete()
    .eq('category_id', categoryId);

  if (error) throw new Error(error.message);
}
