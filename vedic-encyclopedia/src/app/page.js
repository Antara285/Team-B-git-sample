import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";


export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="pt-28 w-full min-h-screen bg-transparent ">
        {/* Add horizontal spacing using px-6 sm:px-12 md:px-16 lg:px-24 */}
        <div className="px-6 sm:px-12 md:px-16 lg:px-24">
          <HeroSection />
          <CategorySection />
          <AboutSection />
          <Footer />
          
        </div>
      </main>
    </>
  );
}
