import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface LightboxProps {
  isOpen: boolean;
  images: Array<{
    imageUrl: string;
    title: string;
    caption?: string;
    category?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#12241D]/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview gallery"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-[#F7F5F0] z-10">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-wide">
            {current.title}
          </span>
          {current.category && (
            <span className="text-xs text-[#F7F5F0]/60 tracking-wider">
              · {current.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs tracking-widest text-[#F7F5F0]/60 tabular-nums">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#F7F5F0]/80 hover:text-white transition-colors cursor-pointer rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Area with Previous/Next controls */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-2 md:left-6 z-10 p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 transition-colors rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center px-4">
          <ImageWithFallback
            src={current.imageUrl}
            alt={current.title}
            className="max-h-[75vh] max-w-full rounded shadow-2xl object-contain"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-2 md:right-6 z-10 p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 transition-colors rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption Bottom Bar */}
      <div className="text-center text-sm text-[#F7F5F0]/80 max-w-2xl mx-auto py-2">
        {current.caption || current.title}
      </div>
    </div>
  );
};
