import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";

// Function to get random images from all project galleries
const getRandomImages = (count: number): string[] => {
  // Flatten all project gallery images into one array
  const allImages: string[] = [];
  projects.forEach((project) => {
    // Add the main project image
    allImages.push(project.image);
    // Add all gallery images
    if (project.gallery) {
      allImages.push(...project.gallery);
    }
  });

  // Fisher-Yates shuffle algorithm
  const shuffled = [...allImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' images
  return shuffled.slice(0, count);
};

export function GallerySection() {
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasRefreshed = useRef(false);

  // Initialize with random images on mount
  useEffect(() => {
    setDisplayImages(getRandomImages(5));
  }, []);

  // Intersection Observer for scroll-based refresh
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section is visible and we've scrolled past it before
          if (entry.isIntersecting && hasRefreshed.current) {
            // Refresh images
            setDisplayImages(getRandomImages(5));
          }
          
          // Mark that we've seen this section (scrolled past it)
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            hasRefreshed.current = true;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="gallery" 
      className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col items-center mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
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
            className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase text-center"
          >
            Gallery
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={displayImages[0]}
                alt="Gallery 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={displayImages[1]}
                alt="Gallery 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-8 md:pt-24">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={displayImages[2]}
                alt="Gallery 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={displayImages[3]}
                alt="Gallery 4"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={displayImages[4]}
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
