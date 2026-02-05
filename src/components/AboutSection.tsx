import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export function AboutSection() {
  return <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-warm-light dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Left Column - Heading */}
          <div className="md:w-1/3">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase">
              About
            </motion.h2>
          </div>

          {/* Right Column - Content */}
          <div className="md:w-2/3 grid grid-cols-1 gap-12 pt-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg text-zinc-800 dark:text-zinc-300 leading-relaxed mb-8">
                {/* TODO: Replace with Overview Info from PDF */}
                Since 2017, we have been creating projects intertwining Nigerian traditions, world trends and the Japanese philosophy of wabi-sabi, the forces of nature, human talent and architectural mind.

We have completed a few projects in lagos and are ready to create something significant for you.

The main task of our specialists — architects, designers is to create comfort that will become near and dear
              </p>
              
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors group">
                <div className="w-12 h-12 border border-zinc-900 dark:border-white rounded-full flex items-center justify-center group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
                  <span className="text-xl">&gt;</span>
                </div>
                <span>Learn More</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
}