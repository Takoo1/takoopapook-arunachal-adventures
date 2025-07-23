
import { useAllLocations } from '@/hooks/useLocations';
import DestinationCard from './DestinationCard';
import { MapPin, Compass } from 'lucide-react';

const DestinationCarousel = () => {
  const { data: locations = [], isLoading, error } = useAllLocations();

  // Filter only active locations
  const activeLocations = locations.filter(location => location.is_active);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing places and create unforgettable memories
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-xl w-80 h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Popular Destinations
            </h2>
            <p className="text-red-600">Failed to load destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <Compass className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h2 className="text-gray-800">
              Popular Destinations
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover amazing places and create unforgettable memories with our carefully curated destinations
          </p>
        </div>

        {activeLocations.length === 0 ? (
          <div className="text-center py-8 sm:py-12 lg:py-16">
            <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No Destinations Available Yet
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              We're working on adding amazing destinations for you to explore. 
              Check back soon for exciting new places to visit!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 pb-4" style={{ width: `${activeLocations.length * (window.innerWidth < 640 ? 280 : 320)}px` }}>
              {activeLocations.map((location) => (
                <div key={location.id} className="flex-shrink-0">
                  <DestinationCard location={location} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationCarousel;
