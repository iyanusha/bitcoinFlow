import { useState, useCallback, memo } from 'react';
import { useLazyLoad } from '../hooks/useLazyLoad';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: React.ReactNode;
}

export const LazyImage = memo(function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
}: LazyImageProps) {
  const { ref, hasLoaded: isInView } = useLazyLoad({ rootMargin: '200px' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => setHasError(true), []);

  return (
    <div
      ref={ref}
      className={`lazy-image-wrapper ${className}`.trim()}
      style={{ width, height }}
    >
      {!isInView && (placeholder ?? <div className="lazy-image-placeholder" style={{ width, height }} />)}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`lazy-image ${isLoaded ? 'lazy-image-loaded' : 'lazy-image-loading'}`}
        />
      )}
      {hasError && (
        <div className="lazy-image-error" role="img" aria-label={`Failed to load: ${alt}`}>
          <span aria-hidden="true">⚠</span>
        </div>
      )}
    </div>
  );
});
