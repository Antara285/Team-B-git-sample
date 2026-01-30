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

  // 🔍 SEARCH FUNCTION
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

  // ⌨️ typing debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      runSearch(query);
    }, 350);

    return () => clearTimeout(delay);
  }, [query]);

  // ❌ close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">

      {/* SEARCH BAR */}
      <div className="flex bg-white rounded-2xl border border-orange-700 overflow-hidden">
        <input
          type="text"
          placeholder="Search scriptures, deities, concepts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-5 py-4 outline-none text-orange-800"
        />

        <button
          type="button"
          onClick={() => runSearch(query)}
          className="px-8 bg-orange-800 text-white font-semibold hover:bg-orange-700"
        >
          Search
        </button>
      </div>

      {/* RESULTS */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-3 bg-[#fff7ed]
                     border border-orange-300 rounded-2xl shadow-xl
                     p-6 z-[9999]"
        >

          {/* 🔄 ROUND LOADER */}
          {loading && (
            <div className="flex justify-center items-center py-6">
              <div
                className="w-10 h-10 rounded-full border-4
                           border-orange-300 border-t-orange-800
                           animate-spin"
              />
            </div>
          )}

          {/* RESULTS */}
          {!loading && (
            <>
              {/* Categories */}
              {results.categories.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-orange-900 mb-2">
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
                      className="px-4 py-2 cursor-pointer rounded-lg
                                 hover:bg-orange-200 text-orange-900"
                    >
                      📂 {cat.name}
                    </div>
                  ))}
                </div>
              )}

              {/* Articles */}
              {results.articles.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-orange-900 mb-2">
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
                      className="px-4 py-2 cursor-pointer rounded-lg
                                 hover:bg-orange-200 text-orange-900"
                    >
                      📜 {art.title}
                    </div>
                  ))}
                </div>
              )}

              {results.categories.length === 0 &&
                results.articles.length === 0 && (
                  <div className="text-sm text-orange-700 text-center py-3">
                    No results found
                  </div>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
