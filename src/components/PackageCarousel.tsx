import { useState, useEffect, useCallback } from 'react';
import { MapPin, Clock, Users, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlanButton from './PlanButton';
import { usePackages } from '@/hooks/usePackages';

const PackageCarousel = () => {
  const { data: allPackages = [], isLoading } = usePackages();
  const navigate = useNavigate();

  const packages = allPackages;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Responsive settings
  const getCarouselSettings = () => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      console.log('Window width:', window.innerWidth, 'Is mobile:', isMobile);
      return {
        itemsPerView: isMobile ? 2 : 3,
        slideBy: isMobile ? 2 : 3
      };
    }
    return { itemsPerView: 3, slideBy: 3 };
  };

  const [carouselSettings, setCarouselSettings] = useState(getCarouselSettings());
  
  console.log('Current carousel settings:', carouselSettings);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const newSettings = getCarouselSettings();
      console.log('Resize detected, new settings:', newSettings);
      setCarouselSettings(newSettings);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force update on mount to ensure correct initial state
  useEffect(() => {
    const correctSettings = getCarouselSettings();
    console.log('Force update on mount:', correctSettings);
    setCarouselSettings(correctSettings);
  }, []);

  // Create infinite loop by duplicating cards
  const createInfiniteLoop = () => {
    if (packages.length === 0) return [];
    
    const { itemsPerView } = carouselSettings;
    const duplicatesNeeded = Math.max(itemsPerView, 3);
    
    return [
      ...packages.slice(-duplicatesNeeded),
      ...packages,
      ...packages.slice(0, duplicatesNeeded)
    ];
  };

  const extendedPackages = createInfiniteLoop();
  const duplicatesCount = packages.length > 0 ? Math.max(carouselSettings.itemsPerView, 3) : 0;

  // Initialize to show real cards (skip initial duplicates)
  useEffect(() => {
    if (packages.length > 0) {
      console.log('Initializing carousel, setting currentIndex to:', duplicatesCount);
      setCurrentIndex(duplicatesCount);
    }
  }, [packages.length, duplicatesCount]);

  // Force correct initial state
  useEffect(() => {
    if (packages.length > 0 && currentIndex === 0) {
      console.log('Force setting currentIndex to:', duplicatesCount);
      setCurrentIndex(duplicatesCount);
    }
  }, [packages.length, duplicatesCount, currentIndex]);

  // Auto-scroll functionality
  useEffect(() => {
    if (packages.length === 0 || currentIndex === 0) return;

    console.log('Starting auto-scroll with currentIndex:', currentIndex);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        console.log('Auto-scroll: changing from', prev, 'to', prev + carouselSettings.slideBy);
        return prev + carouselSettings.slideBy;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [packages.length, carouselSettings.slideBy, currentIndex]);

  // Handle infinite loop reset
  useEffect(() => {
    if (packages.length === 0) return;

    const maxIndex = duplicatesCount + packages.length;
    const minIndex = duplicatesCount;

    if (currentIndex >= maxIndex) {
      // Reset to beginning without animation
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(minIndex);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
    } else if (currentIndex < minIndex) {
      // Reset to end without animation
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(maxIndex - carouselSettings.slideBy);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
    }
  }, [currentIndex, duplicatesCount, packages.length, carouselSettings.slideBy]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || packages.length === 0) return;
    setCurrentIndex((prev) => prev - carouselSettings.slideBy);
  }, [isTransitioning, packages.length, carouselSettings.slideBy]);

  const goToNext = useCallback(() => {
    if (isTransitioning || packages.length === 0) return;
    setCurrentIndex((prev) => prev + carouselSettings.slideBy);
  }, [isTransitioning, packages.length, carouselSettings.slideBy]);


  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg">Loading packages...</div>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Popular Tour
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Packages</span>
            </h2>
            <p className="text-xl text-gray-600">No packages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Popular Tour
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Packages</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover handcrafted journeys that showcase the best of Arunachal Pradesh's natural beauty, 
            rich culture, and adventurous spirit.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {packages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                aria-label="Previous packages"
              >
                <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={goToNext}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                aria-label="Next packages"
              >
                <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Carousel Viewport */}
          <div className="overflow-hidden mx-4 md:mx-12">
            <div 
              className={`flex ${!isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${(currentIndex * 100) / carouselSettings.itemsPerView}%)`,
                width: `${(extendedPackages.length * 100) / carouselSettings.itemsPerView}%`
              }}
            >
              {(() => {
                console.log(`Transform: translateX(-${(currentIndex * 100) / carouselSettings.itemsPerView}%)`);
                console.log(`Container width: ${(extendedPackages.length * 100) / carouselSettings.itemsPerView}%`);
                console.log(`Current index: ${currentIndex}, Items per view: ${carouselSettings.itemsPerView}, Extended packages length: ${extendedPackages.length}`);
                return null;
              })()}
              {extendedPackages.map((pkg, index) => {
                console.log(`Rendering card ${index} for package ${pkg.title}`);
                return (
                  <div 
                    key={`${pkg.id}-${index}`}
                    className="flex-shrink-0"
                    style={{ 
                      width: `${100 / carouselSettings.itemsPerView}%`
                    }}
                  >
                    <div 
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2 h-full cursor-pointer mx-1"
                      onClick={() => navigate(`/my-tour/package/${pkg.id}`)}
                    >
                      {/* Image */}
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <img 
                          src={pkg.image_url} 
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                          {pkg.price}
                        </div>
                        <div className="absolute top-4 left-4">
                          <PlanButton 
                            locationId={pkg.id.toString()} 
                            locationName={pkg.title}
                            variant="compact"
                          />
                        </div>
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                          {pkg.features.slice(0, 2).map((feature, featureIndex) => (
                            <span key={featureIndex} className="bg-emerald-500/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium ml-1">{pkg.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({pkg.reviews_count})</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Users className="h-4 w-4 mr-1" />
                            {pkg.group_size}
                          </div>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                          {pkg.title}
                        </h3>

                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{pkg.location}</span>
                        </div>

                        <div className="flex items-center text-gray-600 mb-4">
                          <Clock className="h-4 w-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{pkg.duration}</span>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click when button is clicked
                            navigate(`/my-tour/package/${pkg.id}`);
                          }}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group/btn flex items-center justify-center space-x-2"
                        >
                          <span>Book Now</span>
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/packages')}
            className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
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