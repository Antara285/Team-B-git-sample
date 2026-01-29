"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#ffedd5] to-[#f6ceb4] border-b border-orange-300">
      <div className="w-full px-10 py-2 flex flex items-center gap-3 justify-start">
         <img src="/categories/logo.jpeg" className="h-13 w-auto"></img>
        <h1 className=" text-center text-2xl font-serif text-orange-900 flex items-center gap-3 justify-start">
          Vedic Encyclopedia
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-orange-900 font-medium ml-auto"
        >
          Menu ☰
        </button>
      </div>

      {open && (
        <nav className="w-full bg-white border-t border-orange-200">
          <div className="px-10 py-4 flex gap-10 text-orange-800">
            <Link href="/">Home</Link>
            <Link href="/encyclopedia">Encyclopedia</Link>
            <Link href="/login">Admin Login</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
