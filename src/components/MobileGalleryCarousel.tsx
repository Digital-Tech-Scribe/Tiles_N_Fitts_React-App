import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface MobileGalleryCarouselProps {
  images: string[];
}

export function MobileGalleryCarousel({ images }: MobileGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        paginate(1);
      }, 3000); // 3 seconds per slide, but we will slow down animation to 2 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, index, paginate]);


  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 2, ease: [0.22, 1, 0.36, 1] }, // Slow graceful slide
        opacity: { duration: 1.5 },
        scale: { duration: 2 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { duration: 2, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 1.5 }
      }
    })
  };

  return (
    <div className="relative w-full overflow-hidden px-4">
      <div 
        className="relative aspect-[4/5] w-full"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsPaused(false), 3000); // Resume after 3s
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                paginate(1);
              } else if (swipe > 10000) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <img
              src={images[index]}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl shadow-2xl pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indication Overlay (subtle) */}
        <div className="absolute inset-y-1/2 left-4 right-4 flex justify-between pointer-events-none opacity-40">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-white text-xs">←</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-white text-xs">→</span>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {images.slice(0, 10).map((_, i) => ( // limit to 10 dots max for UI
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`transition-all duration-500 rounded-full h-1 ${
              i === index % 10 ? "bg-zinc-900 dark:bg-white w-8" : "bg-zinc-300 dark:bg-zinc-700 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
