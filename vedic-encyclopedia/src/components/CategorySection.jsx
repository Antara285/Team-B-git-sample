"use client";

import { useRef } from "react";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const categories = [
    { title: "Scriptures", desc: "Ancient Sacred Texts", slug: "scriptures", image: "/categories/script.jpeg" },
    { title: "Deities", desc: "Gods & Avatars", slug: "deities", image: "/categories/diety.jpeg" },
    { title: "Spirituality", desc: "Sacred Celebrations", slug: "spirituality", image: "/categories/spri.jpeg" },
    { title: "Philosophy", desc: "Vedic Thought", slug: "philosophy", image: "/categories/philo.jpeg" },
    { title: "Rituals", desc: "Sacred Practices", slug: "rituals", image: "/categories/ritiuals.jpeg" },
    { title: "Mantras", desc: "Divine Sounds", slug: "mantras", image: "/categories/mantra.jpeg" },
  ];

  return (
    <section className="w-full mb-20">
      <h3 className="text-4xl font-serif text-orange-950 mb-9 text-center">
        Explore Categories
      </h3>

      <div className="relative">
        
     
      <button
  onClick={() => scroll("left")}
  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
  w-12 h-12 bg-orange-900 border border-orange-400
  shadow-md hover:bg-orange-800 transition"
  style={{
    clipPath: "polygon(85% 50%, 15% 10%, 15% 90%)",
  }}
></button>


<button
  onClick={() => scroll("right")}
  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
  w-12 h-12 bg-orange-900 border border-orange-400
  shadow-md hover:bg-orange-800 transition"
  style={{
    clipPath: "polygon(15% 50%, 85% 10%, 85% 90%)",
  }}
></button>





        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth "
        >
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
