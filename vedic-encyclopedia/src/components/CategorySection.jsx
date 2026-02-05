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
      const validCategories = (data || []).filter(
        (cat) => cat.id && typeof cat.id === "string"
      );
      setCategories(validCategories);
    }
    loadCategories();
  }, []);

  const scroll = (dir) => {
    const scrollAmount = window.innerWidth < 768 ? 300 : 340;
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="categories" className="w-full mt-10 md:-mt-6 mb-16 md:mb-24 px-4 md:px-16 overflow-hidden">
      <h3 className="text-3xl md:text-4xl font-serif text-orange-950 mb-8 text-center">
        Explore Categories
      </h3>

      <div className="relative group">
        {/* Navigation Buttons (Desktop Only) */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-orange-900 border border-orange-400 shadow-md hover:bg-orange-800 transition-all opacity-0 group-hover:opacity-100"
          style={{ clipPath: "polygon(85% 50%, 15% 10%, 15% 90%)" }}
        />
        <button
          onClick={() => scroll("right")}
          className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-orange-900 border border-orange-400 shadow-md hover:bg-orange-800 transition-all opacity-0 group-hover:opacity-100"
          style={{ clipPath: "polygon(15% 50%, 85% 10%, 85% 90%)" }}
        />

        {/* Scroll Container */}
        <div
          ref={sliderRef}
          // items-stretch ensures all cards take the height of the tallest card
          className="flex items-stretch gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 px-2"
        >
          {categories.map((cat) => (
            // flex flex-shrink-0 allows the wrapper to hold the stretch property
            <div key={cat.id} className="flex flex-shrink-0">
              <CategoryCard
                id={cat.id}
                title={cat.name}
                desc={cat.description}
                image={cat.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}