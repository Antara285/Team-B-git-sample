export default function AboutSection() {
  return (
    <section className="mt-">
      <h3 className="text-4xl font-serif text-orange-950 mb-10 text-left px-9">
        About the Vedic Encyclopedia
      </h3>

        <div className="flex w-full">
            <div className="w-3/4 px-10">
            <p className="text-xl leading-relaxed text-orange-900 mb-16 text-justify">
       A Vedic Encyclopedia is a comprehensive compilation of knowledge derived from the ancient Vedic texts of India, including the Rigveda, Samaveda, Yajurveda, Atharvaveda, Upanishads, and Puranas.
       It seeks to preserve and organize the profound wisdom of the Vedas, covering a wide range of subjects such as philosophy, spirituality, rituals, astronomy, mathematics, medicine (Ayurveda), arts, and cultural practices.
       By providing structured information, translations, and references, a Vedic Encyclopedia serves as an invaluable resource for scholars, students, and enthusiasts, allowing them to explore the deep connections between Vedic knowledge and 
       contemporary science, culture, and spiritual practice. Modern digital versions often include images, diagrams, and search features, making this ancient wisdom easily accessible and applicable for education, research, and personal growth.
      </p>
      </div>
    <div className="w-1/4 p-3 ">
      <img
        src="/categories/krishna.jpeg"
        alt="Vedic heritage"
        className="w-110 h-120 object-cover rounded-xl"
      />
      </div>
        </div>
      
    </section>
  );
}
