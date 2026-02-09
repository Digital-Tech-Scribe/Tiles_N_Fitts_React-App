import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isLoading: boolean;
}

/**
 * Full-page loading screen with logo and elegant animated elements
 * Shows until critical images are loaded
 */
export function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-warm-light dark:bg-zinc-900 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Background Gradient Animation */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(142,175,193,0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(142,175,193,0.25) 0%, transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(142,175,193,0.15) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo with Elegant Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12"
          >
            {/* Pulsing Glow Behind Logo */}
            <motion.div
              className="absolute inset-0 blur-2xl opacity-40"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(circle, rgba(142,175,193,0.6) 0%, transparent 70%)' }}
            />
            
            {/* Dark Mode Logo */}
            <img 
              src={`${import.meta.env.BASE_URL}Logo/logo_dark-mode.png`}
              alt="Tiles N Fitt"
              className="hidden dark:block h-14 md:h-16 w-auto relative z-10"
            />
            {/* Light Mode Logo */}
            <img 
              src={`${import.meta.env.BASE_URL}Logo/logo_light-mode.png`}
              alt="Tiles N Fitt"
              className="block dark:hidden h-14 md:h-16 w-auto relative z-10"
            />
          </motion.div>

          {/* Architectural Bar Animation */}
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-zinc-400 dark:bg-zinc-500 rounded-full"
                initial={{ height: 8 }}
                animate={{ 
                  height: [8, 24, 8],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {/* Elegant Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex items-center gap-1"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 font-light">
              Loading
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs text-zinc-400 dark:text-zinc-500"
            >
              ...
            </motion.span>
          </motion.div>

          {/* Bottom Decorative Line */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-600 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
