import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  registerImageLoad: () => () => void; // Returns a "loaded" callback
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Reset loading to true on route change
  useEffect(() => {
    setIsLoading(true);
    // Minimum load time even if cached, to prevent layout flashing
    // But for "strict" loading, we rely on the page to call setIsLoading(false)
    // We set a failsafe timeout just in case
    const failsafe = setTimeout(() => setIsLoading(false), 8000); 
    return () => clearTimeout(failsafe);
  }, [location.pathname]);

  const value = {
    isLoading,
    setIsLoading,
    registerImageLoad: () => {
        // This is a placeholder for more advanced tracking if needed
        return () => {};
    }
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function usePageLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('usePageLoading must be used within a LoadingProvider');
  }
  return context;
}
