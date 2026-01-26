import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
export function ReviewsSection() {
  return <section id="reviews" className="py-32 px-6 md:px-12 bg-zinc-900 dark:bg-zinc-950 text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-8 block">
          Hear our client
        </span>
        <h2 className="text-4xl md:text-6xl font-bold uppercase mb-12">
          Reviews
        </h2>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }}>
          <p className="text-xl md:text-2xl leading-relaxed text-zinc-300 dark:text-zinc-400 mb-12 font-light italic">
            "Working with Woodland Architects was a blessing for our home. We
            wanted a space that felt modern but still warm and inviting, and
            they absolutely nailed it. We highly recommend them for architecture
            and design projects."
          </p>
        </motion.div>

        <div className="flex justify-center gap-4">
          <button className="p-4 rounded-full border border-zinc-700 dark:border-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-900 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button className="p-4 rounded-full border border-zinc-700 dark:border-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-900 transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>;
}