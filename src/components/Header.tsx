import { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { theme, effectiveTheme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('');
  
  // mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(() => ['About', 'Services', 'Projects', 'Gallery', 'Reviews', 'Contact'], []);

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 50);
  });

  // active section tracking
  useEffect(() => {
    if (!isHome) {
      if (location.pathname === '/about') {
        setActiveSection('about');
      } else if (location.pathname.startsWith('/project/')) {
        setActiveSection('projects');
      } else {
        setActiveSection('');
      }
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach(item => {
      const element = document.getElementById(item.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHome, location.pathname, navItems]);

  // close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-[99999] px-6 md:px-12 py-6 transition-colors duration-300 ${
        isScrolled || !isHome
          ? 'bg-warm-light/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-sm border-b border-warm-charcoal/10 dark:border-zinc-800' 
          : 'bg-transparent'
      }`} 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <img 
            src={`${import.meta.env.BASE_URL}Logo/logo_${effectiveTheme}-mode.png`} 
            alt="Tiles N Fitt Logo" 
            className={`w-12 h-12 object-contain transition-all duration-500 group-hover:scale-110 ${
              effectiveTheme === 'light' ? 'scale-[1.6]' : ''
            }`}
          />
          <div className="flex flex-row whitespace-nowrap">
            <span className={`text-2xl font-bold tracking-tight uppercase transition-colors ${
              isScrolled 
                ? 'text-zinc-900 dark:text-white' 
                : 'text-zinc-900 dark:text-white'
            }`}>
              TILES N FITT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, i) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            
            return (
              <div key={item} className="relative py-2">
                <motion.a 
                  href={isHome ? `#${id}` : `${import.meta.env.BASE_URL}#${id}`} 
                  className={`text-sm font-medium transition-colors relative z-10 ${
                    isActive
                      ? 'text-zinc-900 dark:text-white'
                      : isScrolled 
                        ? 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white' 
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
                  }`} 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
                >
                  {item}
                </motion.a>
                
                {/* Active Indicator Mark */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-warm-light"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                
                {isActive && (
                  <motion.div
                    className="absolute -right-2 top-2 w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-warm-light"
                    layoutId="activeNavMark"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
          
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ml-4 ${
              isScrolled
                ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                : 'text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={`Theme: ${theme} (${effectiveTheme})`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * navItems.length + 0.5, duration: 0.5 }}
          >
            {effectiveTheme === 'dark' ? (
              <Moon className="w-5 h-5 transition-transform hover:rotate-12" />
            ) : (
              <Sun className="w-5 h-5 transition-transform hover:rotate-90" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-zinc-900 dark:text-white p-2"
            title={`Theme: ${theme}`}
          >
            {effectiveTheme === 'dark' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          
          <button 
            className="p-2 text-zinc-900 dark:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                className="h-0.5 bg-current block rounded-full origin-right transition-all"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0, width: 16 }}
                className="h-0.5 bg-current block rounded-full transition-all"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                className="h-0.5 bg-current block rounded-full origin-right transition-all"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed top-24 left-0 right-0 bg-warm-light/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 lg:hidden z-[99998] overflow-hidden"
            >
              <div className="flex flex-col p-8 space-y-6">
                {navItems.map((item) => {
                  const id = item.toLowerCase();
                  const isActive = activeSection === id;
                  
                  return (
                    <motion.a 
                      key={item}
                      href={isHome ? `#${id}` : `${import.meta.env.BASE_URL}#${id}`} 
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-bold tracking-tight uppercase flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-zinc-900 dark:text-white'
                          : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <span>{item}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeMarkMobile"
                          className="w-12 h-0.5 bg-zinc-900 dark:bg-warm-light" 
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
}