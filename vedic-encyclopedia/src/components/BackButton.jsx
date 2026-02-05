"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        inline-flex items-center gap-2
        px-4 py-2
        rounded-lg
        border border-[#4b2e19]
        bg-white
        text-[#4b2e19] font-semibold
        shadow-sm
        hover:bg-[#ffedd5]
        hover:shadow-md
        active:scale-95
        transition
      "
    >
      ← Back
    </button>
  );
}