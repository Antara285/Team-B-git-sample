"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* ===== TOP NAVBAR (UNCHANGED LOOK) ===== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#ffedd5] to-[#f6ceb4] border-b border-orange-300">
       <div className="w-full px-4 py-3 flex items-center justify-between">

          
          {/* LEFT LOGO */}
          <div className="flex items-center gap-3">
            <img src="/categories/logo.jpeg" className="h-10 w-auto" />
            <span className="text-xl font-serif text-orange-900">
              Vedic Encyclopedia
            </span>
          </div>

          {/* RIGHT MENU */}
          <button
            onClick={() => setOpen(true)}
            className="text-orange-900 font-medium hover:text-orange-700 transition"
          >
            ☰ Menu
          </button>
        </div>
      </header>

      {/* ===== OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== SIDE NAVIGATION ===== */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 z-999
        bg-[#ffedd5]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="w-full px-4 py-3 flex items-center justify-between">

          <h3 className="text-orange-900 font-semibold">Navigation</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-orange-900 text-xl"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-3 p-6 text-orange-800 font-medium">
          <li
            onClick={() => scrollTo("home")}
            className="px-4 py-2 rounded-lg hover:bg-orange-200 cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => scrollTo("categories")}
            className="px-4 py-2 rounded-lg hover:bg-orange-200 cursor-pointer"
          >
            Categories
          </li>
          <li
            onClick={() => scrollTo("about")}
            className="px-4 py-2 rounded-lg hover:bg-orange-200 cursor-pointer"
          >
            About
          </li>
        </ul>
      </nav>
    </>
  );
}