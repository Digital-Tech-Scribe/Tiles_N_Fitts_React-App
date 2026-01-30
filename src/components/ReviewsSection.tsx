import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const reviews = [
  {
    text: "Working with the Tiles & Fitts team was a blessing for our home. We wanted a space that felt modern but still warm and inviting, and they absolutely nailed it. We highly recommend them for architecture and design projects.",
    author: "Zainab Ahmed",
    location: "Lagos, Nigeria"
  },
  {
    text: "The attention to detail in the Veridian project was simply outstanding. They took our vision and transformed it into a reality that exceeded all our expectations. Truly a professional team of builders and designers.",
    author: "Emeka Okafor",
    location: "Abuja, Nigeria"
  },
  {
    text: "Tiles & Fitts brought a level of creativity and technical expertise that transformed our commercial space. Their ability to manage the project from concept to completion was impressive.",
    author: "Sarah Johnson",
    location: "London, UK"
  }
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const traverse = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-32 px-6 md:px-12 bg-zinc-900 dark:bg-zinc-950 text-white transition-colors duration-300 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-8 block">
          Hear our clients
        </span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase mb-12">
          Reviews
        </h2>

        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <p className="text-xl md:text-2xl leading-relaxed text-zinc-300 dark:text-zinc-400 mb-8 font-light italic">
                "{reviews[currentIndex].text}"
              </p>
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-zinc-100 uppercase tracking-wider">{reviews[currentIndex].author}</span>
                <span className="text-sm text-zinc-500 uppercase tracking-widest">{reviews[currentIndex].location}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-12 relative z-10">
          <button 
            onClick={() => traverse(-1)}
            className="p-4 rounded-full border border-zinc-700 dark:border-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-800 transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => traverse(1)}
            className="p-4 rounded-full border border-zinc-700 dark:border-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-800 transition-colors group"
          >
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}