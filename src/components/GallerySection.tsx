import { motion } from "framer-motion";
const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
];
export function GallerySection() {
  return (
    <section id="gallery" className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col items-center mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
            As Featured In
          </span>
          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 uppercase text-center"
          >
            Gallery
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={images[0]}
                alt="Gallery 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={images[1]}
                alt="Gallery 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-8 md:pt-24">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={images[2]}
                alt="Gallery 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={images[3]}
                alt="Gallery 4"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={images[4]}
                alt="Gallery 5"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
