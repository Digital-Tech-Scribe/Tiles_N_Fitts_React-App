import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { projects } from "../data/projects";
import { GalleryBox } from "./GalleryBox";
import { MobileGalleryCarousel } from "./MobileGalleryCarousel";

// Consolidate and unique-ify images from all projects
const ALL_IMAGES = Array.from(new Set(
  projects.flatMap(p => [p.image, ...(p.gallery || [])])
)).filter(Boolean);

// Shuffle helper
const shuffle = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export function GallerySection() {
  const [sequences, setSequences] = useState<string[][]>([]);

  // Initialize unique sequences for 5 boxes
  useEffect(() => {
    const shuffled = shuffle(ALL_IMAGES);
    const boxCount = 5;
    const imagesPerBox = Math.floor(shuffled.length / boxCount);
    
    const newSequences: string[][] = [];
    for (let i = 0; i < boxCount; i++) {
      newSequences.push(shuffled.slice(i * imagesPerBox, (i + 1) * imagesPerBox));
    }
    setSequences(newSequences);
  }, []);

  if (sequences.length === 0) return null;

  return (
    <section 
      id="gallery" 
      className="py-24 md:py-32 px-6 md:px-12 bg-warm-light dark:bg-zinc-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col items-center mb-24">
          <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-400 mb-4">
            Our Work
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase text-center"
          >
            Gallery
          </motion.h2>
        </div>

        {/* Desktop View (5 Boxes) */}
        {/* Removed global hover pause - now handled independently by each Box */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="space-y-8">
            <GalleryBox 
              sequence={sequences[0]} 
              aspectRatio="3/4" 
              staggerDelay={0}
            />
            <GalleryBox 
              sequence={sequences[1]} 
              aspectRatio="4/3" 
              staggerDelay={400}
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-8 md:pt-24">
            <GalleryBox 
              sequence={sequences[2]} 
              aspectRatio="3/4" 
              staggerDelay={800}
            />
          </div>

          {/* Column 3 */}
          <div className="space-y-8">
            <GalleryBox 
              sequence={sequences[3]} 
              aspectRatio="4/3" 
              staggerDelay={1200}
            />
            <GalleryBox 
              sequence={sequences[4]} 
              aspectRatio="3/4" 
              staggerDelay={1600}
            />
          </div>
        </div>

        {/* Mobile View (Single Carousel) */}
        <div className="md:hidden">
          <MobileGalleryCarousel images={ALL_IMAGES} />
        </div>
      </div>
    </section>
  );
}
