import Link from "next/link";

export default function CategoryCard({ title, desc, slug, image }) {
  return (
    <Link
      href={`/encyclopedia/${slug}`}
      className="min-w-[320px] bg-orange-100 rounded-3xl border border-orange-400 shadow-md p-5
                 transform transition duration-300 hover:-translate-y-3 hover:scale-94 hover:shadow-lg"
    >
      <img
        src={image}
        alt={title}
        className="h-73 w-full object-cover rounded-2xl mb-6 
                   transform transition duration-300 hover:scale-100 border-orange-1000"
      />

      <h4 className="text-xl font-semibold text-orange-950  mb-1">
        {title}
      </h4>

      <p className="text-sm text-orange-700 hover:to-red-900">{desc}</p>
    </Link>
  );
}
