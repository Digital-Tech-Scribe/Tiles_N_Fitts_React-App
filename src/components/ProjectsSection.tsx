import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';

export function ProjectsSection() {
  const featuredProjectTitles = ['VERIDIAN', 'YANGO HOTEL', 'URBLE'];
  const featuredProjects = projects.filter(project => featuredProjectTitles.includes(project.title));

  return <section id="projects" className="py-24 md:py-32 px-6 md:px-12 bg-warm-light dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase mb-24">
          Projects
        </motion.h2>

        <div className="space-y-32">
          {featuredProjects.map((project) => <div key={project.id} className="relative group">
              <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                <OptimizedImage 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />

                {/* Hover Overlay Card */}
                <div className="absolute top-1/2 right-12 md:right-24 -translate-y-1/2 w-[400px] bg-warm-light dark:bg-zinc-950 p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block shadow-xl">
                  <h3 className="text-3xl font-medium text-zinc-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.type}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <Link to={`/project/${project.id}`} className="bg-zinc-900 dark:bg-warm-light text-white dark:text-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors inline-block">
                    See Project
                  </Link>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="md:hidden mt-6">
                <h3 className="text-2xl font-medium text-zinc-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.type}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
                <Link to={`/project/${project.id}`} className="text-xs font-bold uppercase tracking-widest border-b border-zinc-900 dark:border-white pb-1 inline-block text-zinc-900 dark:text-white">
                  See Project
                </Link>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}