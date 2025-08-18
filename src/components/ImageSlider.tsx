import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useActiveSliderImages } from '@/hooks/useSliderImages';
import { MediaLightbox } from '@/components/ui/MediaLightbox';

const ImageSlider = () => {
  const { data: images = [], isLoading } = useActiveSliderImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  if (isLoading) {
    return (
      <section className="mobile-section bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="mobile-container">
          <div className="text-center mobile-spacing-lg">
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
          <div className="text-center mobile-spacing-lg">
            <h2 className="mobile-heading-xl mb-3 sm:mb-4">Featured Gallery</h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-background/80 hover:bg-background rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-background/80 hover:bg-background rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 px-8 sm:px-16 py-4">
              {visibleImages.map((image, index) => (
                <div
                  key={`${image.id}-${image.position}`}
                  className={`relative transition-all duration-500 ease-out cursor-pointer group ${
                    image.position === 'center'
                      ? 'w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-96 z-10 scale-105'
                      : 'w-32 h-40 sm:w-40 sm:h-50 md:w-48 md:h-60 opacity-60 scale-95'
                  }`}
                  onClick={() => image.position === 'center' && handleImageClick(image)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={image.image_url}
                      alt="Featured gallery image"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      style={{ aspectRatio: '4/5' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Link indicator */}
                    {image.position === 'center' && image.link_url && (
                      <div className="absolute top-3 right-3 p-2 bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
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