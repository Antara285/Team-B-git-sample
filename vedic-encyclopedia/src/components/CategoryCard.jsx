import Link from "next/link";

export default function CategoryCard({ id, title, desc, image }) {
  if (!id) return null;

  return (
    <Link
      href={`/encyclopedia/${id}`}
      // Fixed width (w-[280px] or w-[320px]) ensures every card is identical
      className="flex flex-col h-full w-[280px] md:w-[320px] bg-orange-100 rounded-3xl border border-orange-400 shadow-md p-5
                 transform transition duration-300 hover:-translate-y-3 hover:scale-[0.98] hover:shadow-lg"
    >
      {/* Image Container: Aspect-square or fixed height with object-cover ensures width/height consistency */}
      {image && (
        <div className="w-full h-52 md:h-64 mb-6 overflow-hidden rounded-2xl shadow-sm flex-shrink-0">
          <img
            src={image}
            alt={title}
            // object-cover ensures the image fills the area without distortion
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow">
        <h4 className="text-xl font-semibold text-orange-950 mb-2 leading-tight line-clamp-1">
          {title}
        </h4>

        {/* Truncates text consistently */}
        <p className="text-sm text-orange-700 line-clamp-3 md:line-clamp-4">
          {desc}
        </p>
      </div>
    </Link>
  );
}