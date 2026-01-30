'use server';

import { supabaseServer } from '@/lib/supabase/server';

export async function getPublishedArticlesByCategory(categoryId) {
    if (!categoryId) return [];
  const { data, error } = await supabaseServer
    .from('articles')
    .select('id, title, content')
    .eq('category_id', categoryId)
    .eq('status', 'published');

  if (error) throw new Error(error.message);
  return data;
}

export async function getPublishedArticleById(articleId) {
  if (!articleId) return null;

  const { data, error } = await supabaseServer
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .eq("status", "published")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
