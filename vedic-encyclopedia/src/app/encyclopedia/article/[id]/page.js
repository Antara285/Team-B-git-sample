
import BackButton from "@/components/BackButton";
import { getPublishedArticleById } from "@/actions/article.public.actions";

export default async function ArticleContentPage({ params }) {
  const { id } = await params;

  if (!id) {
    return <div className="p-10 text-center text-red-600">Article not selected</div>;
  }

  const article = await getPublishedArticleById(id);

  if (!article) {
    return <div className="p-10 text-center text-gray-600">Article not found.</div>;
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-repeat"
      style={{ backgroundImage: "url('/categories/parchment.png')" }}
    >
      {/* Light parchment wash */}
      <div className="min-h-screen bg-[#fff7e6]/85">

        {/* Header box */}
        <header className="px-6 pt-12 pb-8">
          <div
            className="
              relative
              mx-auto
              max-w-5xl
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

            <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-[#5a2d0c]">
              {article.title}
            </h1>

            <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#cfae7a] to-transparent" />

            <p className="text-sm text-[#6b3b1a] font-serif">
              Vedic Encyclopedia
            </p>
          </div>
        </header>

        {/* Toolbar */}
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <BackButton />
        </div>

        {/* Article content (NO extra box added) */}
        <article className="max-w-5xl mx-auto px-6 pb-24">
          <div
            className="
              prose
              prose-lg
              max-w-none
              font-serif
              prose-headings:text-[#5a2d0c]
              prose-p:text-[#4a2a12]
              leading-relaxed
            "
          >
            {article.content}
          </div>
        </article>

      </div>
    </div>
  );
}