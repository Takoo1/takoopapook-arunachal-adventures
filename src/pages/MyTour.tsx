
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageDetail from '@/components/PackageDetail';
import DestinationDetail from '@/components/DestinationDetail';
import { usePlannedLocations, useRemoveFromPlanned } from '@/hooks/usePlannedLocations';
import { MapPin, Calendar, Trash2, Plus, Clock, CreditCard, Users, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MyTour = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: plannedLocations = [], isLoading } = usePlannedLocations();
  const removeFromPlanned = useRemoveFromPlanned();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  
  const currentPath = window.location.pathname;

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, currentPath]);

  // Check for booking data from localStorage
  useEffect(() => {
    const storedBooking = localStorage.getItem('currentBooking');
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking));
    }
  }, []);

  // If we have an ID, determine if it's a package or destination
  if (id) {
    if (currentPath.includes('/package/')) {
      return (
        <div className="min-h-screen">
          <Header />
          <main className="pt-20 min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
            <PackageDetail />
          </main>
          <Footer />
        </div>
      );
    } else if (currentPath.includes('/destination/')) {
      return (
        <div className="min-h-screen">
          <Header />
          <main className="pt-20 min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
            <DestinationDetail />
          </main>
          <Footer />
        </div>
      );
    }
  }

  const handleRemoveLocation = (locationId: string) => {
    removeFromPlanned.mutate(locationId);
  };

  const handleExploreDestinations = () => {
    navigate('/explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your tour plans...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  // If we have booking data, show the booking details
  if (bookingData) {
    const { packageData, tourists, totalPrice, bookingDate } = bookingData;
    
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <h1 className="text-4xl font-bold text-gray-800">
                  Booking <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Confirmed</span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your package has been booked successfully. Here are your tour details and payment information.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Package Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={packageData.image_url}
                        alt={packageData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{packageData.title}</h3>
                      <div className="space-y-2 text-muted-foreground mb-4">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {packageData.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {packageData.duration}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {packageData.group_size}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {packageData.features.slice(0, 3).map((feature: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tourist Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-500" />
                    Tourist Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {tourists.map((tourist: any, index: number) => (
                      <div key={tourist.id} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Tourist {index + 1}</h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Name:</span> {tourist.name}
                          </div>
                          <div>
                            <span className="font-medium">ID Type:</span> {tourist.idType}
                          </div>
                          <div>
                            <span className="font-medium">ID Number:</span> {tourist.idNumber}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Invoice */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-emerald-500" />
                    Payment Invoice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Package Price:</span>
                    <span>{packageData.price}</span>
                  </div>
                  {tourists.length > parseInt(packageData.group_size.replace(/[^\d]/g, '')) && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>Extra Charges ({tourists.length - parseInt(packageData.group_size.replace(/[^\d]/g, ''))} × ₹2,000):</span>
                      <span>₹{((tourists.length - parseInt(packageData.group_size.replace(/[^\d]/g, ''))) * 2000).toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Booking Date: {new Date(bookingDate).toLocaleDateString()}</p>
                    <p>Payment Status: <span className="text-green-600 font-medium">Confirmed</span></p>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-500" />
                    Terms & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Booking Terms:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• All bookings are subject to availability and confirmation</li>
                      <li>• Cancellation policy: 48 hours before departure for full refund</li>
                      <li>• Valid government-issued ID required for all participants</li>
                      <li>• Package prices include all mentioned services and accommodations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Payment Terms:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Payment confirmation required within 24 hours of booking</li>
                      <li>• Additional charges for extra participants beyond group size</li>
                      <li>• All prices are inclusive of applicable taxes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Tour Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Tour Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Before You Travel:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Carry valid photo identification for all participants</li>
                      <li>• Inform us of any medical conditions or dietary restrictions</li>
                      <li>• Pack appropriate clothing for the season and activities</li>
                      <li>• Arrive at meeting point 30 minutes before departure</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">During the Tour:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Follow instructions from your tour guide at all times</li>
                      <li>• Respect local customs, culture, and environmental guidelines</li>
                      <li>• Do not litter or damage natural surroundings</li>
                      <li>• Stay with the group and inform guide if you need assistance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Safety Guidelines:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Travel insurance is recommended for all participants</li>
                      <li>• Emergency contact numbers will be provided</li>
                      <li>• First aid facilities available with trained guides</li>
                      <li>• Weather conditions may affect itinerary - flexibility required</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    localStorage.removeItem('currentBooking');
                    setBookingData(null);
                  }}
                  variant="outline"
                  size="lg"
                >
                  Plan Another Trip
                </Button>
                <Button 
                  onClick={() => navigate('/packages')}
                  size="lg"
                >
                  Explore More Packages
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              My Tour <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Planner</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your planned destinations and create your perfect Arunachal Pradesh adventure
            </p>
          </div>

          {plannedLocations.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <Card className="text-center p-12">
                <CardContent>
                  <MapPin className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">No Destinations Planned Yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Start building your dream trip by exploring locations on our interactive map and adding them to your tour plan.
                  </p>
                  <button 
                    onClick={handleExploreDestinations}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Explore Destinations</span>
                  </button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-emerald-500" />
                      <span>Planned Destinations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-gray-800">{plannedLocations.length}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                      <span>Trip Duration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-gray-800">{Math.max(plannedLocations.length, 1)}</p>
                    <p className="text-sm text-gray-600">Days recommended</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-emerald-500" />
                      <span>Last Updated</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold text-gray-800">
                      {new Date(plannedLocations[0]?.planned_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Planned Locations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plannedLocations.map((planned, index) => (
                  <Card key={planned.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative">
                      {/* Location Image */}
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={planned.locations.images?.[0] || 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80'}
                          alt={planned.locations.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Day number badge */}
                      <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Day {index + 1}
                      </div>
                      
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveLocation(planned.location_id)}
                        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove from tour"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {planned.locations.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {planned.locations.description || 'Discover the beauty and culture of this amazing destination.'}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Added {new Date(planned.planned_at).toLocaleDateString()}</span>
                        </span>
                      </div>
                      
                      {planned.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700 italic">"{planned.notes}"</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Add More Button */}
              <div className="text-center mt-12">
                <button 
                  onClick={handleExploreDestinations}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add More Destinations</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyTour;