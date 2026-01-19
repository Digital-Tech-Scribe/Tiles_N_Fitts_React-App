import { motion } from 'framer-motion';
const projects = [{
  id: 1,
  title: 'LYRA MANOR',
  location: 'Lagos',
  type: 'Residential',
  year: '2025',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: "/3_upscale01-2.png"
}, {
  id: 2,
  title: 'GWARINPA ESTATE',
  location: 'Abuja',
  type: 'Residential',
  year: '2025',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: "Scene20-2.png"
}, {
  id: 3,
  title: 'BTQ HOTEL',
  location: 'Lagos',
  type: 'Residential',
  year: '2025',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: "3DView13_style_transfer01-3.png"
}];
export function ProjectsSection() {
  return <section id="projects" className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1920px] mx-auto">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 uppercase mb-24">
          Projects
        </motion.h2>

        <div className="space-y-32">
          {projects.map((project) => <div key={project.id} className="relative group">
              <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-zinc-100 relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                {/* Hover Overlay Card */}
                <div className="absolute top-1/2 right-12 md:right-24 -translate-y-1/2 w-[400px] bg-white p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block shadow-xl">
                  <h3 className="text-3xl font-medium text-zinc-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm mb-6">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.type}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <p className="text-zinc-600 mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <button className="bg-zinc-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                    See Project
                  </button>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="md:hidden mt-6">
                <h3 className="text-2xl font-medium text-zinc-900 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.type}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest border-b border-zinc-900 pb-1">
                  See Project
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}