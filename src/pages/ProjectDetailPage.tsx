import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { usePageLoading } from '../contexts/LoadingContext';

export function ProjectDetailPage() {
  const { id } = useParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { setIsLoading } = usePageLoading();
  
  const project = projects.find(p => p.id === Number(id));
  const [heroImage, setHeroImage] = useState<string | null>(null);

  // Initialize and preload project image
  useEffect(() => {
    if (project?.image) {
        setHeroImage(project.image);
        const img = new Image();
        img.src = project.image;
        img.onload = () => setTimeout(() => setIsLoading(false), 300);
        img.onerror = () => setIsLoading(false);
    } else {
        setIsLoading(false);
    }
  }, [project, setIsLoading]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-light dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
        <h1 className="text-4xl font-bold">Project Not Found</h1>
      </div>
    );
  }

  // Get ALL other projects
  const otherProjects = projects.filter(p => p.id !== project.id);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        const style = window.getComputedStyle(container);
        const gap = parseInt(style.gap) || 0;
        const scrollAmount = firstChild.offsetWidth + gap;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        // Fallback
        container.scrollBy({ left: 400, behavior: 'smooth' });
      }
    }
  };

  const handleHeroSwap = (imgSrc: string) => {
    setHeroImage(imgSrc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-warm-light dark:bg-zinc-900 transition-colors duration-300 text-zinc-900 dark:text-white">
      
      {/* 1. Hero Section (Dynamic Image) */}
      <div className="h-[80vh] md:h-[90vh] w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/20 z-10" /> 
            <OptimizedImage 
              src={heroImage || project.image} 
              alt={project.title} 
              priority={true}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 text-white pointer-events-none">
          <div className="max-w-[1920px] mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-4"
            >
              {project.title}
            </motion.h1>
            <div className="flex gap-6 text-sm uppercase tracking-widest font-medium text-zinc-100">
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.type}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-24">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-12 transition-colors">
          ← Back to Projects
        </Link>

        {/* 2. Description */}
        <div className="max-w-4xl mb-24">
           <p className="text-2xl md:text-3xl font-light text-zinc-800 dark:text-zinc-200 leading-relaxed">
             {project.description}
           </p>
        </div>

        {/* 3. Gallery Grid */}
        {((project.gallery && project.gallery.length > 0) || project.image) && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Include the main image in the gallery as well */}
              {[project.image, ...(project.gallery || [])].map((img, index) => (
                <motion.div 
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className={`aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                     heroImage === img 
                       ? "border-zinc-900 dark:border-white scale-[0.98]" 
                       : "border-transparent opacity-70 hover:opacity-100"
                   }`}
                   onClick={() => handleHeroSwap(img)}
                >
                  <OptimizedImage 
                    src={img} 
                    alt={`${project.title} view ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 4. Other Projects Section (Click / Slide Nav) */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-700 overflow-hidden transition-colors duration-300">
        <div className="max-w-[1920px] mx-auto pl-6 md:pl-12 relative">
          
          {/* Header Row */}
          <div className="flex items-end justify-between pr-6 md:pr-48 mb-12">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold tracking-tighter uppercase text-zinc-900 dark:text-white">
                More Projects
              </h2>
            </div>
            
            {/* Desktop Interaction Hint - Moved further left */}
            {!isTouchDevice && (
              <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-500 mr-12">
                <span>Click or slide right to explore</span>
                <ChevronRight size={16} />
              </div>
            )}
          </div>

          {/* Horizontal Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {otherProjects.map((p) => (
              <Link 
                to={`/project/${p.id}`} 
                key={p.id} 
                className="group flex-shrink-0 w-[85vw] md:w-[400px] xl:w-[500px] 2xl:w-[600px] snap-start"
              >
                <div className="aspect-[4/3] bg-warm-light dark:bg-zinc-900 overflow-hidden mb-6 relative rounded-lg">
                  <OptimizedImage 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-medium text-zinc-900 dark:text-white mb-2 group-hover:underline decoration-1 underline-offset-4">
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-widest">
                  <span>{p.location}</span>
                  <span>•</span>
                  <span>{p.year}</span>
                </div>
              </Link>
            ))}
            
            {/* Padding element for right spacing */}
            <div className="w-12 md:w-24 xl:w-48 flex-shrink-0" />
          </div>

          {/* Desktop Click Interaction Zone - Fixed to Click Only */}
          {!isTouchDevice && (
            <div 
              className="absolute top-0 right-0 bottom-0 w-[150px] md:w-[200px] z-30 flex items-center justify-end pr-12 cursor-pointer bg-gradient-to-l from-zinc-50 dark:from-zinc-800 via-zinc-50/80 dark:via-zinc-800/80 to-transparent group"
              onClick={scrollRight}
            >
              <div className="w-16 h-16 bg-zinc-900 dark:bg-warm-light rounded-full flex items-center justify-center text-white dark:text-zinc-900 shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 group-hover:bg-zinc-800 dark:group-hover:bg-zinc-100 active:scale-95">
                <ChevronRight size={32} />
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
