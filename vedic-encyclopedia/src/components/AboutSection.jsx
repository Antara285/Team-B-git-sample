export default function AboutSection() {
  return (
    <section id="about" className="mt-12 md:mt-20 px-4 md:px-16 mb-16">
      <h3 className="text-3xl md:text-4xl font-serif text-orange-950 mb-8 md:mb-10 text-center md:text-left md:px-9 font-bold">
        About ISKCON & its Vedic Encyclopedia
      </h3>

      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-0">
        <div className="w-full md:w-3/4 md:px-10">
          <p className="text-lg md:text-xl leading-relaxed text-orange-900 mb-8 md:mb-16 text-left md:text-justify">
            The International Society for Krishna Consciousness (ISKCON) is a global
            spiritual organization dedicated to preserving, practicing, and sharing
            the timeless wisdom of the Vedic tradition. Founded by His Divine Grace
            A. C. Bhaktivedanta Swami Prabhupada, ISKCON works to promote spiritual
            education, cultural values, and ethical living based on the teachings of
            the Bhagavad Gita, Srimad Bhagavatam, and other sacred scriptures.
            Through temples, educational initiatives, and community service
            programs, ISKCON strives to nurture inner growth, devotion, and harmony
            in society.
            <br />
            <br />
            The ISKCON Vedic Encyclopedia is a digital knowledge initiative designed
            to organize and present authentic Vedic information in a structured and
            accessible form. It brings together concepts from scriptures, philosophy,
            spirituality, rituals, deities, and traditional sciences to create a
            reliable learning platform for students, researchers, and seekers. By
            combining ancient wisdom with modern technology, the encyclopedia aims to
            preserve India’s spiritual heritage while making it easily searchable,
            understandable, and relevant for contemporary learning and exploration.
          </p>
        </div>
        <div className="w-full md:w-1/4 p-0 md:p-3 flex justify-center md:block">
          <img
            src="/categories/krishna.jpeg"
            alt="Vedic heritage"
            className="w-full h-auto md:h-[480px] object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}