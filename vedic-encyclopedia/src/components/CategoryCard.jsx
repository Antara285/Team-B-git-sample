import Link from "next/link";

export default function CategoryCard({ id, title, desc, image }) {
  if (!id) return null; // prevents undefined UUID crash

  return (
    <Link
      href={`/encyclopedia/${id}`}
      className="min-w-[320px] bg-orange-100 rounded-3xl border border-orange-400 shadow-md p-5
                 transform transition duration-300 hover:-translate-y-3 hover:scale-95 hover:shadow-lg"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="h-72 w-full object-cover rounded-2xl mb-6"
        />
      )}

      <h4 className="text-xl font-semibold text-orange-950 mb-1">
        {title}
      </h4>

      <p className="text-sm text-orange-700">
        {desc}
      </p>
    </Link>
  );
}
