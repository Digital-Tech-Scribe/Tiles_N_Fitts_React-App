import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 50);
  });

  // close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // forgot to clean up
  }, []);

  const navItems = ['About', 'Services', 'Projects', 'Gallery', 'Reviews', 'Contact'];

  return (
    <motion.header 
      // z-index 99999 just to be safe
      className={`fixed top-0 left-0 right-0 z-[99999] px-6 md:px-12 py-6 transition-colors duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`} 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/TilesNfitt.png" 
            alt="Tiles N Fitt Logo" 
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <a href="#" className={`text-2xl font-bold tracking-tight uppercase ${isScrolled ? 'text-zinc-900' : 'text-zinc-900'}`}>
              TILES N FITT
            </a>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-sm font-medium transition-colors ${isScrolled ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-800 hover:text-zinc-950'}`} 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-zinc-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div style={{
            position: 'fixed',
            top: 80,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: 20,
            borderBottom: '1px solid #ccc'
          }}>
            {navItems.map((item) => (
              <div key={item} style={{ marginBottom: 10 }}>
                <a href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                  {item}
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </motion.header>
  );
}