import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useActiveSliderImages } from '@/hooks/useSliderImages';
import { MediaLightbox } from '@/components/ui/MediaLightbox';
import { useIsMobile } from '@/hooks/use-mobile';

const ImageSlider = () => {
  const { data: images = [], isLoading } = useActiveSliderImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const autoSlideRef = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();
  
  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Minimum swipe distance for triggering navigation
  const minSwipeDistance = 50;

  // Handle touch events for mobile horizontal swipe
  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsUserInteracting(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    
    // Resume auto-sliding after a delay
    setTimeout(() => setIsUserInteracting(false), 6000);
  };

  // Handle scroll-based navigation for mobile only
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (e.deltaX > 0 || e.deltaY > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }, 100);
    };

    container.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [images.length, isMobile]);

  // Auto-slide functionality
  useEffect(() => {
    if (!images || images.length <= 1 || isUserInteracting) return;

    autoSlideRef.current = setInterval(() => {
      goToNext();
    }, 4000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [images.length, isUserInteracting]);

  // Loading and empty states must come AFTER hooks to avoid hook order mismatches
  if (isLoading) {
    return (
      <section className="mobile-section bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="mobile-container">
          <div className="text-center mobile-spacing-lg hidden sm:block">
            <h2 className="mobile-heading-xl mb-3 sm:mb-4">Featured Gallery</h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse bg-muted rounded-xl w-full max-w-4xl h-64" />
          </div>
        </div>
      </section>
    );
  }

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageClick = (image: typeof images[0]) => {
    if (image.link_url) {
      window.open(image.link_url, '_blank');
    } else {
      setLightboxImage(image.image_url);
      setShowLightbox(true);
    }
  };

  const getVisibleImages = () => {
    if (images.length === 1) {
      return [{ ...images[0], position: 'center' as const }];
    }
    
    if (images.length === 2) {
      return [
        { ...images[currentIndex], position: 'center' as const },
        { ...images[(currentIndex + 1) % images.length], position: 'right' as const }
      ];
    }

    return [
      { ...images[currentIndex === 0 ? images.length - 1 : currentIndex - 1], position: 'left' as const },
      { ...images[currentIndex], position: 'center' as const },
      { ...images[(currentIndex + 1) % images.length], position: 'right' as const }
    ];
  };

  const visibleImages = getVisibleImages();

  return (
    <>
      <section className="mobile-section bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="mobile-container">
          <div className="text-center mobile-spacing-lg hidden sm:block">
            <h2 className="mobile-heading-xl mb-3 sm:mb-4">Featured Gallery</h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div ref={containerRef} className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons - Hidden on mobile */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    setIsUserInteracting(true);
                    goToPrevious();
                    setTimeout(() => setIsUserInteracting(false), 6000);
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-background/80 hover:bg-background rounded-full shadow-lg transition-all duration-300 hover:scale-105 hidden sm:block"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </button>
                <button
                  onClick={() => {
                    setIsUserInteracting(true);
                    goToNext();
                    setTimeout(() => setIsUserInteracting(false), 6000);
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-background/80 hover:bg-background rounded-full shadow-lg transition-all duration-300 hover:scale-105 hidden sm:block"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div 
              className="relative flex items-center justify-center px-2 sm:px-8 md:px-16 py-4 overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {visibleImages.map((image, index) => (
                <div
                  key={`${image.id}-${image.position}`}
                  className={`relative transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer group ${
                    image.position === 'center'
                      ? 'w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-[400px] z-20'
                      : image.position === 'left'
                      ? 'w-32 h-40 sm:w-40 sm:h-50 md:w-48 md:h-60 scale-90 -mr-6 sm:-mr-8 md:-mr-12'
                      : 'w-32 h-40 sm:w-40 sm:h-50 md:w-48 md:h-60 scale-90 -ml-6 sm:-ml-8 md:-ml-12'
                  }`}
                  style={{
                    transform: `${
                      image.position === 'center' 
                        ? 'scale(1.1) translate3d(0, 0, 0)' 
                        : image.position === 'left' 
                        ? 'scale(0.9) translate3d(-20px, 0, 0)' 
                        : 'scale(0.9) translate3d(20px, 0, 0)'
                    }`,
                    willChange: 'transform'
                  }}
                  onClick={() => image.position === 'center' && handleImageClick(image)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={image.image_url}
                      alt="Featured gallery image"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      style={{ 
                        aspectRatio: image.position === 'center' ? '4/5' : '3/4',
                        transformOrigin: 'center'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Link indicator */}
                    {image.position === 'center' && image.link_url && (
                      <div className="absolute top-3 right-3 p-2 bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator - Hidden on mobile */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-6 hidden sm:flex">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsUserInteracting(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsUserInteracting(false), 6000);
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary scale-125'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {showLightbox && (
        <MediaLightbox
          isOpen={showLightbox}
          onClose={() => setShowLightbox(false)}
          media={[{ type: 'image', url: lightboxImage, index: 0 }]}
          currentIndex={0}
          onIndexChange={() => {}}
        />
      )}
    </>
  );
};

export default ImageSlider;