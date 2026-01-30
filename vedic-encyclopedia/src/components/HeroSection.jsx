'use client';

import SearchBar from "@/components/SearchBar";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="w-full px-12 -mt-4 mb-20 flex flex-col items-center text-center"
    >
      <div className="w-full px-9">
        <div
          className="rounded-[1.5rem] p-14 pt-10 pb-10 shadow-lg bg-cover bg-center h-85 relative"
          style={{ backgroundImage: "url('/categories/temple.jpeg')" }}
        >
          {/* TITLE */}
          <div className="flex flex-col items-center justify-center mt-6 mb-6">
            <h2 className="text-4xl md:text-5xl font-serif text-center text-orange-950">
              Discover Timeless Vedic Knowledge
            </h2>
          </div>

          {/* SEARCH — REAL COMPONENT */}
          <div className="relative z-50 mx-auto max-w-xl mt-2">
            <SearchBar />
          </div>

        </div>
      </div>
    </section>
  );
}
