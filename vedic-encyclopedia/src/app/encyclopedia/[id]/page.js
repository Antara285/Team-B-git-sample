import Link from "next/link";
import { getPublishedArticlesByCategory } from "@/actions/article.public.actions";
import BackButton from "@/components/BackButton";

export default async function EncyclopediaCategoryPage({ params }) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="p-10 text-center text-red-600">
        Category not selected
      </div>
    );
  }

  const articles = await getPublishedArticlesByCategory(id);

  if (!articles || articles.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        No articles found in this category.
      </div>
    );
  }

  return (
    <div
       className="min-h-screen bg-cover bg-center"
       style={{
        backgroundImage: "url('/categories/parchment.png')",
        }}
     >   
    
  <div className="min-h-screen bg-[#fff4dc]/80">
    {/* content */}
 


        {/* Header */}
        {/* Header */}
<header className="px-6 pt-12 pb-8">
  <div
    className="
      relative
      mx-auto
      max-w-6xl
      rounded-3xl
      bg-[#fff3dc]/95
      border border-[#d9b88c]
      px-10
      py-10
      text-center
      shadow-[0_10px_25px_rgba(120,80,40,0.25)]
      shadow-[inset_0_2px_6px_rgba(255,255,255,0.6),inset_0_-6px_10px_rgba(120,80,40,0.25)]
      overflow-hidden
    "
  >
    {/* Golden strip */}
    <div
      className="
        absolute
        top-0
        left-0
        right-0
        h-3
        bg-gradient-to-r
        from-[#c89b5c]
        via-[#f1d08a]
        to-[#c89b5c]
        shadow-[inset_0_-1px_2px_rgba(120,80,40,0.5)]
      "
    />

    <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-[#5a2e0f] tracking-tight">
      📜 Vedic Encyclopedia
    </h1>

    <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#cfae7a] to-transparent" />

    <p className="text-lg text-[#6b3f1d] font-serif">
      Explore wisdom through sacred articles
    </p>
  </div>
</header>


        {/* Toolbar */}
        <div className="max-w-6xl mx-auto px-6 mt-6 flex items-center justify-between">
          <BackButton />

          <div className="text-sm text-[#7c4a2d] font-medium">
            {articles.length} Articles
          </div>
        </div>

        {/* Article grid */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/encyclopedia/article/${article.id}`}
              className="
                group
                relative
                bg-[#fff3dc]
                rounded-3xl
                border border-[#d9b88c]
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                duration-300
                p-8
                flex flex-col
                overflow-hidden
              "
            >
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#c89b5c] via-[#e6c48a] to-[#c89b5c]" />

              {/* Card header */}
              <h2 className="mt-2 text-2xl font-serif font-bold text-[#5a2e0f] group-hover:text-[#8b4513] transition">
                {article.title}
              </h2>

              {/* Divider */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#cfae7a] to-transparent" />

              {/* Preview */}
              <p className="text-sm text-[#5a3a1b] leading-relaxed line-clamp-4 flex-grow">
                {article.content}
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-[#8b4513] font-semibold tracking-wide">
                  Read more
                </span>

                <span className="text-[#8b4513] opacity-0 group-hover:opacity-100 transition text-lg">
                  ➜
                </span>
              </div>

              {/* Subtle parchment glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[#e6c48a]/40" />
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}