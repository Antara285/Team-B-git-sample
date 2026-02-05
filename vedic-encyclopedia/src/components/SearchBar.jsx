'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ categories: [], articles: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const boxRef = useRef(null);

  const runSearch = async (text) => {
    if (!text || text.trim().length < 2) {
      setOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setOpen(true);
    const res = await fetch(`/api/search?q=${text}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      runSearch(query);
    }, 350);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      {/* SEARCH BAR CONTAINER */}
      <div className="flex bg-white rounded-2xl border border-orange-700 overflow-hidden shadow-md">
        <input
          type="text"
          placeholder="Search scriptures..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 md:px-5 md:py-4 outline-none text-orange-800 text-sm md:text-base min-w-0"
        />

        <button
          type="button"
          onClick={() => runSearch(query)}
          className="bg-orange-800 text-white font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center
                     px-4 md:px-8" // Narrower padding on mobile for the icon
        >
          {/* DESKTOP TEXT */}
          <span className="hidden md:inline">Search</span>
          
          {/* MOBILE ICON */}
          <span className="md:hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </span>
        </button>
      </div>

      {/* RESULTS DROPDOWN */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-3 bg-[#fff7ed]
                     border border-orange-300 rounded-2xl shadow-2xl
                     p-4 md:p-6 z-[9999] 
                     max-h-[60vh] overflow-y-auto"
        >
          {loading && (
            <div className="flex justify-center items-center py-6">
              <div className="w-10 h-10 rounded-full border-4 border-orange-300 border-t-orange-800 animate-spin" />
            </div>
          )}

          {!loading && (
            <div className="text-left">
              {/* Articles - FIRST */}
              {results.articles.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-900/50 mb-2 px-2">
                    Articles
                  </p>
                  {results.articles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => {
                        router.push(`/encyclopedia/article/${art.id}`);
                        setOpen(false);
                        setQuery('');
                      }}
                      className="px-3 py-2 cursor-pointer rounded-lg hover:bg-orange-200 text-orange-900 transition-colors"
                    >
                      📜 {art.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Categories - SECOND */}
              {results.categories.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-900/50 mb-2 px-2">
                    Categories
                  </p>
                  {results.categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        router.push(`/encyclopedia/${cat.id}`);
                        setOpen(false);
                        setQuery('');
                      }}
                      className="px-3 py-2 cursor-pointer rounded-lg hover:bg-orange-200 text-orange-900 transition-colors"
                    >
                      📂 {cat.name}
                    </div>
                  ))}
                </div>
              )}

              {results.categories.length === 0 && results.articles.length === 0 && (
                <div className="text-sm text-orange-700 text-center py-3">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}