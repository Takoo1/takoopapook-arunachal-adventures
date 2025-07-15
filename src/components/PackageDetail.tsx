import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { usePackage } from '@/hooks/usePackages';
import { Location } from '@/types/database';
import { Star, MapPin, Clock, Users, Edit, CreditCard, ArrowLeft, Eye, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import DestinationCard from '@/components/DestinationCard';
import InteractiveLeafletSection from '@/components/InteractiveLeafletSection';

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // Fetch package data
  const { data: packageData, isLoading: packageLoading } = usePackage(id || '');

  // Fetch included locations
  const { data: includedLocations, isLoading: locationsLoading } = useQuery({
    queryKey: ['package-locations', packageData?.locations_included],
    queryFn: async () => {
      if (!packageData?.locations_included.length) return [];
      
      console.log('Fetching locations for package:', packageData.locations_included);
      
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .in('name', packageData.locations_included)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching package locations:', error);
        throw error;
      }
      
      console.log('Fetched package locations:', data);
      return data as Location[];
    },
    enabled: !!packageData?.locations_included.length,
  });

  const handlePreviousImage = () => {
    const imageUrl = packageData?.image_url;
    if (imageUrl) {
      setCurrentImageIndex(prev => prev === 0 ? 0 : prev - 1);
    }
  };

  const handleNextImage = () => {
    const imageUrl = packageData?.image_url;
    if (imageUrl) {
      setCurrentImageIndex(prev => prev === 0 ? 0 : prev + 1);
    }
  };

  if (packageLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Package not found</h1>
        <Link to="/packages" className="text-primary hover:underline">
          Back to Packages
        </Link>
      </div>
    );
  }

  // For now, we'll show single image (can be enhanced later for multiple images)
  const images = [packageData.image_url];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link to="/packages">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Packages
          </Link>
        </Button>
      </div>

      {/* Package Title */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {packageData.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{packageData.location}</span>
              </div>
              <Badge variant="secondary">{packageData.package_code}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary mb-1">{packageData.price}</div>
            <div className="flex items-center justify-end">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{packageData.rating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm ml-1">
                ({packageData.reviews_count} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Description */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Duration: {packageData.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Group Size: {packageData.group_size}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What's Included</h4>
                <div className="flex flex-wrap gap-2">
                  {packageData.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Experience the beauty and culture of {packageData.location} with this carefully curated {packageData.duration} adventure. 
                  This package includes visits to {packageData.locations_included.length} amazing destinations and offers 
                  {packageData.features.join(', ').toLowerCase()} to make your journey unforgettable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Image Gallery */}
        <div>
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={images[currentImageIndex] || '/placeholder.svg'}
                  alt={packageData.title}
                  className="w-full h-80 object-cover rounded-lg cursor-pointer"
                  onClick={() => setShowLightbox(true)}
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => setShowLightbox(true)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Points */}
      {packageData.features.length > 0 && (
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packageData.features.map((feature, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locations Included */}
      {includedLocations && includedLocations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Destinations Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedLocations.map((location) => (
              <DestinationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      )}

      {/* Interactive Map */}
      {(() => {
        console.log('Rendering map section. includedLocations:', includedLocations, 'length:', includedLocations?.length);
        return null;
      })()}
      {includedLocations && includedLocations.length > 0 ? (
        <div className="mb-12">
          <p className="text-sm text-muted-foreground mb-4">Locations included in this package ({includedLocations.length})</p>
          {/* Container with 5:3 aspect ratio to match map image (2000x1200) */}
          <div className="w-full max-w-4xl mx-auto aspect-[5/3] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
            <InteractiveLeafletSection filterLocations={includedLocations} useFullView={true} />
          </div>
        </div>
      ) : (
        <div className="mb-12">
          <p className="text-sm text-muted-foreground mb-4">Loading map...</p>
          {/* Loading container with same aspect ratio */}
          <div className="w-full max-w-4xl mx-auto aspect-[5/3] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading locations...</p>
            </div>
          </div>
        </div>
      )}

      {/* Price and Action Buttons */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">{packageData.price}</div>
              <div className="text-muted-foreground">Total package price</div>
            </div>
            <div className="flex gap-3">
              {packageData.is_editable && (
                <Button variant="outline" asChild>
                  <Link to={`/admin/map-editor`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Package
                  </Link>
                </Button>
              )}
              <Button size="lg" className="px-8">
                <CreditCard className="h-4 w-4 mr-2" />
                Book Package
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      {packageData.reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Reviews ({packageData.reviews_count})</span>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-bold text-lg">{packageData.rating.toFixed(1)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packageData.reviews.map((review, index) => (
                <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < packageData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Anonymous</span>
                  </div>
                  <p className="text-muted-foreground">{review}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Lightbox */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="relative">
            <img
              src={images[currentImageIndex] || '/placeholder.svg'}
              alt={packageData.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setShowLightbox(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageDetail;