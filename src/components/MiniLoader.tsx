import { motion } from 'framer-motion';

/**
 * Mini version of the PageLoader animation.
 * Used as a placeholder for images during loading.
 */
export function MiniLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-zinc-400 dark:bg-zinc-500 rounded-full"
            initial={{ height: 4 }}
            animate={{ 
              height: [4, 16, 4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
