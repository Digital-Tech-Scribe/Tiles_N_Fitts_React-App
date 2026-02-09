import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ScrollToTop } from './components/ScrollToTop';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { PageLoader } from './components/PageLoader';
import { LoadingProvider, usePageLoading } from './contexts/LoadingContext';

// Inner App component to use hooks
function InnerApp() {
  const { isLoading } = usePageLoading();
  
  return (
    <>
        <PageLoader isLoading={isLoading} />
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
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <LoadingProvider>
          <InnerApp />
        </LoadingProvider>
      </Router>
    </ThemeProvider>
  );
}