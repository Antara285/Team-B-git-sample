'use client';

import SearchBar from "@/components/SearchBar";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="w-full px-4 md:px-12 mt-4 mb-12 md:mb-20 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-7xl"> 
        <div
          // Removed overflow-hidden so the search results can "pop out"
          className="rounded-[1.5rem] p-6 md:p-14 shadow-lg bg-cover bg-center min-h-[300px] md:h-85 flex flex-col justify-center relative"
          style={{ 
            backgroundImage: "url('/categories/temple.jpeg')",
            // Adding this ensures the background image respects the border radius
            // even without overflow-hidden on the main container
            backgroundClip: 'padding-box' 
          }}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-[1.5rem]" />

          {/* TITLE */}
          <div className="relative z-10 flex flex-col items-center justify-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-orange-950 leading-tight">
              Discover Timeless <br className="sm:hidden" /> Vedic Knowledge
            </h2>
          </div>

          {/* SEARCH — Elevated Z-index */}
          <div className="relative z-[100] mx-auto w-full max-w-xl mt-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}