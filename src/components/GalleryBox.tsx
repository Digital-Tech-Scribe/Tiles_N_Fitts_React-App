import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const rotateImage = () => {
    setIndex((prev) => (prev + 1) % sequence.length);
  };

  const startRotation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(rotateImage, 4000); // 4 seconds cycle
  };

  const stopRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Independent timer management
    if (!isHovered && !isTouched) {
      // Start with a small stagger delay on first load
      const timeout = setTimeout(startRotation, staggerDelay);
      return () => {
        clearTimeout(timeout);
        stopRotation();
      };
    } else {
      stopRotation();
    }
    return () => stopRotation();
    return () => stopRotation();
  }, [isHovered, isTouched, sequence.length, staggerDelay]); // Added dependencies safely

  return (
    <div 
      className={`relative overflow-hidden rounded-lg cursor-pointer ${
        aspectRatio === "3/4" ? "aspect-[3/4]" : "aspect-[4/3]"
      }`}
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
            scale: (isHovered || isTouched) ? 1.1 : 1
          }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ 
            x: { duration: 2, ease: [0.22, 1, 0.36, 1] }, // Slow graceful slide
            opacity: { duration: 1.5 },
            scale: { duration: 1, ease: "easeOut" }
          }}
          className="w-full h-full"
        >
          <OptimizedImage
            src={sequence[index]}
            alt="Gallery item"
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
