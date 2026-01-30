"use client";

import { useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";
import { getPublicCategories } from "@/actions/category.public.actions";


export default function CategorySection() {
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const data = await getPublicCategories();

      // 🔴 critical fix — prevent undefined UUID routing
      const validCategories = (data || []).filter(
        (cat) => cat.id && typeof cat.id === "string"
      );

      setCategories(validCategories);
    }

    loadCategories();
  }, []);

  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="categories"
      className="w-full -mt-6 mb-24 px-6 md:px-16"
    >
      <h3 className="text-4xl font-serif text-orange-950 mb-5 text-center">
        Explore Categories
      </h3>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 bg-orange-900 border border-orange-400
          shadow-md hover:bg-orange-800 transition"
          style={{ clipPath: "polygon(85% 50%, 15% 10%, 15% 90%)" }}
        />

        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 bg-orange-900 border border-orange-400
          shadow-md hover:bg-orange-800 transition"
          style={{ clipPath: "polygon(15% 50%, 85% 10%, 85% 90%)" }}
        />

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-0"
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              title={cat.name}
              desc={cat.description}
              image={cat.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
