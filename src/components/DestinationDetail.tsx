import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Package, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLocations } from '@/hooks/useLocations';
import { usePackages } from '@/hooks/usePackages';
import PackageCard from './PackageCard';
import StaticImageMap from './StaticImageMap';
import { useMapSettings } from '@/hooks/useMapSettings';

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: locations = [] } = useLocations();
  const { data: packages = [] } = usePackages();
  const { data: mapSettings } = useMapSettings();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageLightbox, setShowImageLightbox] = useState(false);

  const destination = locations.find(loc => loc.id === id);
  
  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h2>
          <Button onClick={() => navigate('/my-tour')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Tour
          </Button>
        </div>
      </div>
    );
  }

  const destinationPackages = packages.filter(pkg => 
    pkg.locations_included.includes(destination.name) || pkg.locations_included.includes(destination.id)
  );

  const defaultImage = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop";
  const images = destination.images && destination.images.length > 0 ? destination.images : [defaultImage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          onClick={() => navigate('/my-tour')} 
          variant="ghost" 
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Tour
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative">
              <div 
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                onClick={() => setShowImageLightbox(true)}
              >
                <img
                  src={images[selectedImageIndex]}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3">
                    <Plus className="h-6 w-6 text-gray-800" />
                  </div>
                </div>
              </div>
              
              {/* Image thumbnails */}
              {images.length > 1 && (
                <div 
                  className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide"
                  onClick={(e) => e.stopPropagation()} // Prevent parent lightbox trigger
                >
                  {images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedImageIndex(index);
                      }}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                        index === selectedImageIndex 
                          ? 'border-emerald-500 shadow-lg ring-2 ring-emerald-200' 
                          : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${destination.name} view ${index + 1}`}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          index === selectedImageIndex ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src = defaultImage;
                        }}
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {destination.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-700">{destination.rating}</span>
                  <span className="text-gray-500">({destination.reviews_count} reviews)</span>
                </div>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>Arunachal Pradesh</span>
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.description || 'Discover the beauty and culture of this amazing destination in Arunachal Pradesh.'}
                  </p>
                </div>

                {destination.bullet_points && destination.bullet_points.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Key Highlights</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {destination.bullet_points.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mb-12 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <span>Location on Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full max-w-4xl mx-auto aspect-[5/3]">
              <StaticImageMap 
                locations={[destination]}
                selectedLocation={destination}
                onLocationSelect={() => {}}
                mapSettings={mapSettings}
                useFullView={false}
              />
            </div>
          </CardContent>
        </Card>

        {/* Packages Available Section */}
        {destinationPackages.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Packages</h2>
                <p className="text-gray-600">Explore curated packages that include this destination</p>
              </div>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Package className="h-3 w-3" />
                <span>{destinationPackages.length} packages</span>
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        )}

        {/* Build My Package Button */}
        <div className="text-center mb-12">
          <Card className="max-w-2xl mx-auto p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Create Your Custom Package</h3>
              <p className="text-gray-600 mb-6">
                Don't see what you're looking for? Build a personalized package tailored to your preferences.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3">
                <Plus className="mr-2 h-5 w-5" />
                Build My Package
              </Button>
            </div>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Reviews & Ratings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Rating Summary */}
              <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800">{destination.rating}</div>
                  <div className="flex items-center justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(destination.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{destination.reviews_count} reviews</div>
                </div>
                <Separator orientation="vertical" className="h-16" />
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="text-sm w-2">{rating}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 80 + 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {destination.reviews && destination.reviews.length > 0 ? (
                  destination.reviews.slice(0, 3).map((review, index) => (
                    <Card key={index} className="border-l-4 border-l-emerald-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">Anonymous Traveler</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{review}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Lightbox */}
        {showImageLightbox && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageLightbox(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={images[selectedImageIndex]}
                alt={destination.name}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = defaultImage;
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setShowImageLightbox(false)}
              >
                <Plus className="h-6 w-6 rotate-45" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetail;