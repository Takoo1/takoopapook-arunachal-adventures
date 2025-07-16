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
  
  // Create infinite loop by duplicating cards
  const duplicatedPackages = packages.length > 0 ? [
    ...packages.slice(-itemsPerView), // Last few cards at the beginning
    ...packages, // Original cards
    ...packages.slice(0, itemsPerView) // First few cards at the end
  ] : [];

  // Start from the first real card (after the duplicated last cards)
  const realStartIndex = itemsPerView;
  const realEndIndex = realStartIndex + packages.length - 1;

  // Auto-scroll functionality
  useEffect(() => {
    if (packages.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [packages.length, itemsPerView]);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex > realEndIndex) {
      // Reset to the start without animation
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(realStartIndex);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
    } else if (currentIndex < realStartIndex) {
      // Reset to the end without animation
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(realEndIndex);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
    }
  }, [currentIndex, realStartIndex, realEndIndex]);

  // Initialize to the first real card
  useEffect(() => {
    if (packages.length > 0 && currentIndex === 0) {
      setCurrentIndex(realStartIndex);
    }
  }, [packages.length, realStartIndex, currentIndex]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

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
          {packages.length > itemsPerView && (
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
          <div className="overflow-hidden mx-12">
            <div 
              className={`flex gap-6 ${!isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(duplicatedPackages.length / itemsPerView) * 100}%`
              }}
            >
              {duplicatedPackages.map((pkg, index) => (
                <div 
                  key={`${pkg.id}-${index}`} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / duplicatedPackages.length}%` }}
                >
                  <div 
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2 h-full cursor-pointer"
                    onClick={() => navigate(`/my-tour/package/${pkg.id}`)}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
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
                        {pkg.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="bg-emerald-500/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
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

                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
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
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group/btn flex items-center justify-center space-x-2"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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