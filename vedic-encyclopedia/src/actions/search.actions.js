'use server';

import { supabaseServer } from '@/lib/supabase/server';

export async function globalSearch(query) {
  // safety check
  if (!query || query.trim().length < 2) {
    return {
      categories: [],
      articles: [],
    };
  }

  const searchText = query.trim();

  // search categories
  const { data: categories, error: categoryError } =
    await supabaseServer
      .from('categories')
      .select('id, name, image')
      .ilike('name', `%${searchText}%`);

  if (categoryError) throw new Error(categoryError.message);

  // search articles (published only)
  const { data: articles, error: articleError } =
    await supabaseServer
      .from('articles')
      .select('id, title, category_id')
      .eq('status', 'published')
      .ilike('title', `%${searchText}%`);

  if (articleError) throw new Error(articleError.message);

  return {
    categories: categories || [],
    articles: articles || [],
  };
}
