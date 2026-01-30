import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({
      categories: [],
      articles: [],
    });
  }

  const text = query.trim();

  const { data: categories } = await supabaseServer
    .from('categories')
    .select('id, name, image')
    .ilike('name', `%${text}%`);

  const { data: articles } = await supabaseServer
    .from('articles')
    .select('id, title')
    .eq('status', 'published')
    .ilike('title', `%${text}%`);

  return NextResponse.json({
    categories: categories || [],
    articles: articles || [],
  });
}
