import { useState, useEffect, useCallback } from 'react';
import { MapPin, Clock, Users, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlanButton from './PlanButton';
import { usePackages } from '@/hooks/usePackages';

const PackageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { data: allPackages = [], isLoading } = usePackages();
  const navigate = useNavigate();

  const packages = allPackages;
  const itemsPerView = 3;
  const maxIndex = Math.max(0, packages.length - itemsPerView);

  // Note: Auto-scroll functionality removed per user request

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex; // Loop to end
      }
      return prev - 1;
    });
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, maxIndex]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0; // Loop to start
      }
      return prev + 1;
    });
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, maxIndex]);

  if (isLoading) {
    return (
      <section className="section-padding-lg bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center">
            <div className="text-lg text-muted-foreground">Loading packages...</div>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return (
      <section className="section-padding-lg bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center">
            <h2 className="mb-4 sm:mb-6">
              Popular Tour
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground">No packages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding-lg bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
      <div className="container mx-auto container-padding relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <h2 className="mb-4 sm:mb-6">
            Popular Tour
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Packages</span>
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 sm:mb-6" />
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover handcrafted journeys that showcase the best of Arunachal Pradesh's natural beauty, 
            rich culture, and adventurous spirit.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {packages.length > itemsPerView && (
            <>
              <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/95 hover:bg-background border border-border text-foreground p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group hover:border-primary/50"
                aria-label="Previous packages"
              >
                <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform group-hover:text-primary" />
              </button>
              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/95 hover:bg-background border border-border text-foreground p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group hover:border-primary/50"
                aria-label="Next packages"
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
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(packages.length / itemsPerView) * 100}%`
              }}
            >
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / packages.length}%` }}
                >
                  <div 
                    className="bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2 h-full cursor-pointer backdrop-blur-sm"
                    onClick={() => navigate(`/my-tour/package/${pkg.id}`)}
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <img 
                        src={pkg.image_url} 
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary/20 backdrop-blur-md text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-primary/30">
                        {pkg.price}
                      </div>
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                        <PlanButton 
                          locationId={pkg.id.toString()} 
                          locationName={pkg.title}
                          variant="compact"
                        />
                      </div>
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex flex-wrap gap-1">
                        {pkg.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="bg-primary/90 text-primary-foreground px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                          <span className="text-xs sm:text-sm font-medium ml-1">{pkg.rating}</span>
                          <span className="text-muted-foreground text-xs sm:text-sm ml-1">({pkg.reviews_count})</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-xs sm:text-sm">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {pkg.group_size}
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {pkg.title}
                      </h3>

                      <div className="flex items-center text-muted-foreground mb-1 sm:mb-2">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary" />
                        <span className="text-xs sm:text-sm line-clamp-1">{pkg.location}</span>
                      </div>

                      <div className="flex items-center text-muted-foreground mb-3 sm:mb-4">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary" />
                        <span className="text-xs sm:text-sm">{pkg.duration}</span>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click when button is clicked
                          navigate(`/my-tour/package/${pkg.id}`);
                        }}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all duration-300 group/btn flex items-center justify-center space-x-1 sm:space-x-2 hover:scale-105"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          {packages.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in">
          <button 
            onClick={() => navigate('/packages')}
            className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto border border-primary/20"
          >
            <span>View All Packages</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageCarousel;