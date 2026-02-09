import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ScrollToTop } from './components/ScrollToTop';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { PageLoader } from './components/PageLoader';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for loader (prevents flash)
    const minDisplayTime = 1500;
    const startTime = Date.now();

    // Check if page resources are loaded
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // If document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <ThemeProvider>
      <PageLoader isLoading={isLoading} />
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-warm-light dark:bg-zinc-900 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 transition-colors duration-300">
          <ScrollToTop />
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}