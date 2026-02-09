import { useState, useEffect, useRef } from 'react';
import { usePageLoading } from '../contexts/LoadingContext';
import { MiniLoader } from './MiniLoader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onLoad?: () => void;
  priority?: boolean;
  skipFadeIn?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  onLoad,
  priority = false, // Default to false
  skipFadeIn = false // Default to false
}: OptimizedImageProps) {
  const { registerImageLoad } = usePageLoading();
  const [isLoaded, setIsLoaded] = useState(skipFadeIn);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // We need to hold the unregister function.
  const unregisterRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (skipFadeIn) return;

    // Register
    unregisterRef.current = registerImageLoad();

    // Check immediate cache
    if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
        setIsLoaded(true);
        if (unregisterRef.current) {
            unregisterRef.current();
            unregisterRef.current = null;
        }
        onLoad?.();
    }
    
    return () => {
        // Unregister on unmount
        if (unregisterRef.current) {
            unregisterRef.current();
            unregisterRef.current = null;
        }
    };
  }, [src, skipFadeIn]);

  const onImageLoad = () => {
      setIsLoaded(true);
      if (unregisterRef.current) {
          unregisterRef.current();
          unregisterRef.current = null;
      }
      onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    if (unregisterRef.current) {
        unregisterRef.current();
        unregisterRef.current = null;
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* MiniLoader - Only show if NOT loaded and NO error and NOT skipping fade in */}
      {!isLoaded && !hasError && !skipFadeIn && (
        <MiniLoader />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <span className="text-zinc-400 dark:text-zinc-500 text-sm">Failed</span>
        </div>
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={onImageLoad}
        onError={handleError}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : (skipFadeIn ? 'opacity-100' : 'opacity-0')} ${className}`}
      />
    </div>
  );
}

export default OptimizedImage;
