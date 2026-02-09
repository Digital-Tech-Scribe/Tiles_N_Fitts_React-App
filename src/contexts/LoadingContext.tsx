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
  const [pendingImages, setPendingImages] = useState(0);
  const location = useLocation();

  // Reset loading to true on route change
  useEffect(() => {
    setIsLoading(true);
    // Minimum load time failsafe
    const failsafe = setTimeout(() => setIsLoading(false), 8000); 
    return () => clearTimeout(failsafe);
  }, [location.pathname]);

  // Check if all images are loaded
  useEffect(() => {
    if (pendingImages === 0) {
      // Small buffer to ensure smoothness
      const timeout = setTimeout(() => {
         // Only set to false if it's STILL 0 after the buffer
         // This prevents flickering if images load/register in rapid succession
         setIsLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
        setIsLoading(true);
    }
  }, [pendingImages]);

  const registerImageLoad = () => {
    setPendingImages(prev => prev + 1);
    
    // Return cleanup function (called when image loads or errors)
    return () => {
      setPendingImages(prev => Math.max(0, prev - 1));
    };
  };

  const value = {
    isLoading,
    setIsLoading,
    registerImageLoad
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
