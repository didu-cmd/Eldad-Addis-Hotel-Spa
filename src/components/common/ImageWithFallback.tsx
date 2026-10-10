import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div 
        className={`bg-[#203129] text-[#F7F5F0] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        aria-label={alt || 'Image'}
      >
        <span className="font-serif text-lg tracking-wide text-[#F7F5F0]/90 mb-1">
          {fallbackTitle || 'Eldad Addis Hotel & Spa'}
        </span>
        <span className="text-xs text-[#F7F5F0]/60 tracking-widest uppercase">
          Addis Ababa, Ethiopia
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-[#EFECE6] animate-pulse" />
      )}
    </div>
  );
};
