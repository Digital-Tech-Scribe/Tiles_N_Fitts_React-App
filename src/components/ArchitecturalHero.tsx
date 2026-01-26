import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroImageBackground } from './Hero-Image-Background';
import { HeroImageForeground } from './Hero-Image-Foreground';

// @ts-ignore
export const ArchitecturalHero = () => {
  // putting any here just in case
  const containerRef = useRef<any>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Start position is slightly higher (-2rem up) and slides further (-120vh total travel)
  const textY = useTransform(scrollYProgress, [0, 1], ['-2rem', '-120vh']);
  // Opacity starts at 0.5 (50%) and fades out completely by 40% scroll progress
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 0]);

  // some constants
  const TITLE_COLOR = '#8EAFC1';

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white dark:bg-zinc-900 transition-colors duration-300">
      {/* Hero Images Wrapper */}
      <div className="relative w-full h-full">
        
        {/* 1. Hero Image Background (Sky) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroImageBackground />
        </div>

        {/* 2. Page Title (TILES N FITT) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.h1 
            style={{ y: textY, opacity: textOpacity, color: TITLE_COLOR }}
            className="text-[18vw] font-bold leading-none tracking-tighter select-none whitespace-nowrap drop-shadow-sm"
          >
            TILES N FITT
          </motion.h1>
        </div>

        {/* 3. Hero Image Foreground (House) */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20 }}>
          <HeroImageForeground />
        </div>

        {/* 4. Animated Overlay Blocks */}
        <div className="absolute inset-0 z-30 pointer-events-none flex justify-between items-end p-8">
          {/* Left Overlay Block */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-32 h-32 bg-zinc-900/10 dark:bg-white/5 backdrop-blur-sm"
          />
          {/* Right Overlay Block */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-32 h-32 bg-zinc-900/10 dark:bg-white/5 backdrop-blur-sm"
          />
        </div>

      </div>
    </section>
  );
}