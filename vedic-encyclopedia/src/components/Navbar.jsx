"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const goHome = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const goCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const goAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#ffedd5] to-[#f6ceb4] border-b border-orange-300">
        <div className="w-full px-10 py-2 flex items-center gap-3">
          <img src="/categories/logo.jpeg" className="h-12 w-auto" />

          <h1 className="text-2xl font-serif text-orange-900">
            Vedic Encyclopedia
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="ml-auto text-orange-900 font-medium"
          >
            ☰ Menu
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* RIGHT SIDE MENU */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-semibold text-orange-900">Navigation</h3>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-orange-800 font-medium">
          <li onClick={goHome} className="cursor-pointer hover:text-orange-600">
            Home
          </li>
          <li onClick={goCategories} className="cursor-pointer hover:text-orange-600">
            Categories
          </li>
          <li onClick={goAbout} className="cursor-pointer hover:text-orange-600">
            About
          </li>
        </ul>
      </nav>
    </>
  );
}
