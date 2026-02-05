import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


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
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  // Auto-scroll timer
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // 6 seconds per review

    return () => clearInterval(interval);
  }, [isPaused]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section 
      id="reviews" 
      className="py-32 px-6 md:px-12 bg-zinc-900 dark:bg-zinc-950 text-white transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-8 block">
          Hear our clients
        </span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase mb-12">
          Reviews
        </h2>

        <div 
          className="relative min-h-[300px] flex flex-col items-center justify-center cursor-default"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { 
                  type: "tween", 
                  ease: [0.25, 0.1, 0.25, 1],
                  duration: 0.15
                },
                opacity: { duration: 0.1 }
              }}
              className="absolute w-full px-4"
            >
              <p 
                className="text-xl md:text-3xl leading-relaxed text-zinc-300 dark:text-zinc-400 mb-10 font-light italic cursor-text"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                "{reviews[currentIndex].text}"
              </p>
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-zinc-100 uppercase tracking-wider mb-1">
                  {reviews[currentIndex].author}
                </span>
                <span className="text-sm text-zinc-500 uppercase tracking-widest">
                  {reviews[currentIndex].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute bottom-0 flex gap-3 mt-12">
            {reviews.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? "w-8 bg-white" : "w-2 bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
