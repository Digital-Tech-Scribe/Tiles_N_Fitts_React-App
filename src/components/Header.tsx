import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { theme, effectiveTheme, setTheme } = useTheme();
  
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

  const navItems = ['About', 'Services', 'Projects', 'Gallery', 'Reviews', 'Contact'];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-[99999] px-6 md:px-12 py-6 transition-colors duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`} 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}Logo/logo.png`} 
            alt="Tiles N Fitt Logo" 
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <span className={`text-2xl font-bold tracking-tight uppercase ${
              isScrolled 
                ? 'text-zinc-900 dark:text-white' 
                : 'text-zinc-900 dark:text-white'
            }`}>
              TILES N FITT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a 
              key={item} 
              href={isHome ? `#${item.toLowerCase()}` : `${import.meta.env.BASE_URL}#${item.toLowerCase()}`} 
              className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white' 
                  : 'text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
              }`} 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
            >
              {item}
            </motion.a>
          ))}
          
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
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
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
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
            className="text-zinc-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed top-20 left-0 right-0 bg-white dark:bg-zinc-900 p-6 border-b border-gray-200 dark:border-zinc-800 md:hidden">
            {navItems.map((item) => (
              <div key={item} className="mb-4">
                <a 
                  href={isHome ? `#${item.toLowerCase()}` : `${import.meta.env.BASE_URL}#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400"
                >
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