import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { OptimizedImage } from "./OptimizedImage";

interface GalleryBoxProps {
  sequence: string[];
  aspectRatio: "3/4" | "4/3";
  staggerDelay?: number;
}

export function GalleryBox({ sequence, aspectRatio, staggerDelay = 0 }: GalleryBoxProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  
  useEffect(() => {
    // Don't cycle if interaction is active
    if (isHovered || isTouched) return;

    // Calculate next index
    const nextIndex = (index + 1) % sequence.length;
    const nextImageSrc = sequence[nextIndex];

    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    // Create a "Smart Transition" loop
    const scheduleNextTransition = async () => {
      // 1. Wait for the standard delay (4s) + stagger (only on first run ideally, but simple here)
      // We subtract a bit of time to account for preloading, or just add it.
      // Let's stick to a robust 4s interval *between* transitions.
      
      timeoutId = setTimeout(() => {
        if (isCancelled) return;

        // 2. Preload the next image
        const img = new Image();
        img.src = nextImageSrc;

        const performTransition = () => {
           if (!isCancelled) setIndex(nextIndex);
        };

        if (img.complete) {
            performTransition();
        } else {
            img.onload = performTransition;
            img.onerror = performTransition; // Proceed even if error to avoid stuck gallery
        }
      }, 4000 + (index === 0 ? staggerDelay : 0)); 
    };

    scheduleNextTransition();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [index, isHovered, isTouched, sequence, staggerDelay]);

  return (
    <div 
      className={`relative overflow-hidden rounded-lg cursor-pointer ${
        aspectRatio === "3/4" ? "aspect-[3/4]" : "aspect-[4/3]"
      } bg-zinc-100 dark:bg-zinc-800`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={sequence[index]}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            scale: (isHovered || isTouched) ? 1.05 : 1
          }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ 
            x: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }, // Smoother slide
            opacity: { duration: 0.8 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <OptimizedImage
            src={sequence[index]}
            alt="Gallery item"
            priority={true} // Priority true because we pre-loaded it!
            className="w-full h-full object-cover pointer-events-none"
            containerClassName="w-full h-full"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
