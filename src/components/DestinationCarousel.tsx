
import { useState, useEffect, useCallback } from 'react';
import { useAllLocations } from '@/hooks/useLocations';
import DestinationCard from './DestinationCard';
import { MapPin, Compass, ChevronLeft, ChevronRight } from 'lucide-react';

const DestinationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { data: locations = [], isLoading, error } = useAllLocations();

  // Filter only active locations and limit to 9
  const activeLocations = locations.filter(location => location.is_active).slice(0, 9);
  
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : 3; // mobile: 1, desktop: 3
    }
    return 3;
  };
  
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const totalSlides = Math.ceil(activeLocations.length / itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Reset to first slide on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      return prev <= 0 ? totalSlides - 1 : prev - 1; // Loop from first to last
    });
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalSlides]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      return prev >= totalSlides - 1 ? 0 : prev + 1; // Loop from last to first
    });
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalSlides]);

  if (isLoading) {
    return (
      <section className="section-padding-lg bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="mb-4 sm:mb-6">
              Popular
              <span className="text-primary"> Destinations</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-primary mx-auto rounded-full mb-4 sm:mb-6" />
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover amazing places and create unforgettable memories
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted rounded-xl w-80 h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding-lg bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center">
            <h2 className="mb-4 sm:mb-6">
              Popular
              <span className="text-primary"> Destinations</span>
            </h2>
            <p className="text-destructive">Failed to load destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding-lg bg-background">
      <div className="container mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="mb-4 sm:mb-6">
            Popular
            <span className="text-primary"> Destinations</span>
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-primary mx-auto rounded-full mb-4 sm:mb-6" />
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover amazing places and create unforgettable memories with our carefully curated destinations
          </p>
        </div>

        {activeLocations.length === 0 ? (
          <div className="text-center py-8 sm:py-12 lg:py-16">
            <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/50 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
              No Destinations Available Yet
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground/70 max-w-md mx-auto">
              We're working on adding amazing destinations for you to explore. 
              Check back soon for exciting new places to visit!
            </p>
          </div>
        ) : (
          /* Carousel Container */
          <div className="relative">
            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  disabled={isTransitioning}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/95 hover:bg-background border border-border text-foreground p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group hover:border-primary/50"
                  aria-label="Previous destinations"
                >
                  <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform group-hover:text-primary" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={isTransitioning}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/95 hover:bg-background border border-border text-foreground p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group hover:border-primary/50"
                  aria-label="Next destinations"
                >
                  <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform group-hover:text-primary" />
                </button>
              </>
            )}

            {/* Carousel Viewport */}
            <div className="overflow-hidden mx-6 sm:mx-8 lg:mx-12">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4 lg:gap-6"
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${totalSlides * 100}%`
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div 
                    key={slideIndex}
                    className="flex gap-3 sm:gap-4 lg:gap-6"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    {activeLocations.slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView).map((location) => (
                      <div 
                        key={location.id} 
                        className="flex-shrink-0"
                        style={{ width: `${100 / itemsPerView}%` }}
                      >
                        <DestinationCard location={location} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationCarousel;
