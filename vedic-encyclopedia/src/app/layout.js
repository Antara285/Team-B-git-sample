import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-[#FFF8EE] text-stone-800">

        {/* 1️⃣ Parchment base */}
        <div
          className="fixed inset-0 -z-20 pointer-events-none opacity-50"
          style={{
            backgroundImage: "url('/categories/parchment.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* 2️⃣ Gradient overlay */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none
                     bg-gradient-to-b "
        />

        {/* 3️⃣ App content */}
        {children}

      </body>
    </html>
  );
}
