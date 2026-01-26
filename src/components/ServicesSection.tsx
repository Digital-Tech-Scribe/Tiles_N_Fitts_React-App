import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
const services = [{
  id: '01',
  title: 'Architecture',
  description: 'We design buildings that are purposeful, enduring, and deeply connected to their surroundings.',
  items: ['Concept Design', 'Architectural Planning', '3D Visualization & Modeling', 'Construction Documentation'],
}, {
  id: '02',
  title: 'Interior Design',
  description: 'Beyond surface-level styling, we craft interiors that feel as good as they look.',
  items: ['Spatial Identity', 'Material & Finish Selection', 'Furniture & Lighting Design', 'Detail Development'],
}, {
  id: '03',
  title: 'Layout Planning',
  description: 'We organize environments around people, movement, and use, creating clarity, comfort, and adaptability.',
  items: ['Functional Zoning', 'Human-Centered Design', 'Circulation Strategy', 'Flexibility & Future Use'],
}, {
  id: '04',
  title: 'Project Management',
  description: 'We ensure your vision is delivered on time, on budget, and to the highest standards.',
  items: ['Concept Design', 'Stakeholder Coordination', 'Quality Control', 'Budget & Timeline Tracking'],
}];
export function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>('01');
  return <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column - Heading */}
          <div className="lg:w-[350px] lg:shrink-0">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase lg:sticky lg:top-24">
              Services
            </motion.h2>
          </div>

          {/* Right Column - Accordion */}
          <div className="flex-1 flex gap-12">
            <div className="flex-1">
              {services.map(service => <div key={service.id} className="border-t border-zinc-200 dark:border-zinc-700 last:border-b">
                  <button onClick={() => setActiveService(activeService === service.id ? null : service.id)} className="w-full py-8 flex items-start justify-between group text-left">
                    <div className="flex gap-8">
                      <span className="text-zinc-400 dark:text-zinc-500 font-medium pt-1">
                        {service.id}
                      </span>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white mb-4">
                          {service.title}
                        </h3>
                        <AnimatePresence>
                          {activeService === service.id && <motion.div initial={{
                        height: 0,
                        opacity: 0
                      }} animate={{
                        height: 'auto',
                        opacity: 1
                      }} exit={{
                        height: 0,
                        opacity: 0
                      }} className="overflow-hidden">
                              <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
                                {service.description}
                              </p>
                              <ul className="space-y-2">
                                {service.items.map((item, i) => <li key={i} className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-2">
                                    <span className="w-1 h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full" />
                                    {item}
                                  </li>)}
                              </ul>
                              <div className="h-8" />
                            </motion.div>}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="pt-2">
                      {activeService === service.id ? <X className="w-6 h-6 text-zinc-900 dark:text-white" /> : <Plus className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />}
                    </div>
                  </button>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
}