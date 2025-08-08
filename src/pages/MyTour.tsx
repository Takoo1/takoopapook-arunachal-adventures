import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageDetail from '@/components/PackageDetail';
import DestinationDetail from '@/components/DestinationDetail';
import PackageCard from '@/components/PackageCard';
import DestinationCard from '@/components/DestinationCard';
import { usePlannedLocations, usePlannedPackages } from '@/hooks/usePlannedLocations';
import { useCompletedBookings } from '@/hooks/useBookings';
import { MapPin, Plus, CheckCircle, Clock, CreditCard, Users, FileText, Calendar, Trash2, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const MyTour = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: plannedLocations = [], isLoading: locationsLoading } = usePlannedLocations();
  const { data: plannedPackages = [], isLoading: packagesLoading } = usePlannedPackages();
  const { data: completedBookings = [], isLoading: completedBookingsLoading } = useCompletedBookings();
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

  const handleExploreDestinations = () => {
    navigate('/explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoading = locationsLoading || packagesLoading || completedBookingsLoading;
  const hasAnyPlanned = plannedLocations.length > 0 || plannedPackages.length > 0 || completedBookings.length > 0;

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

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Booking Details - Left Side */}
                <div className="lg:col-span-2 space-y-8">
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

                {/* Sidebar - Liked Destinations */}
                <div className="space-y-6">
                  {/* Liked Packages */}
                  {plannedPackages.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Liked Packages</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {plannedPackages.slice(0, 3).map((planned: any) => (
                          planned.packages && (
                            <div key={planned.id} className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                              <img
                                src={planned.packages.image_url}
                                alt={planned.packages.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{planned.packages.title}</h4>
                                <p className="text-xs text-muted-foreground">{planned.packages.location}</p>
                                <p className="text-xs text-muted-foreground">{planned.packages.price}</p>
                              </div>
                            </div>
                          )
                        ))}
                        {plannedPackages.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center">
                            +{plannedPackages.length - 3} more packages
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Liked Destinations */}
                  {plannedLocations.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Liked Destinations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {plannedLocations.slice(0, 3).map((planned) => (
                          planned.locations && (
                            <div key={planned.id} className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                              <img
                                src={planned.locations.images?.[0] || '/placeholder.svg'}
                                alt={planned.locations.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{planned.locations.name}</h4>
                                <p className="text-xs text-muted-foreground">{planned.locations.rating} ⭐</p>
                              </div>
                            </div>
                          )
                        ))}
                        {plannedLocations.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center">
                            +{plannedLocations.length - 3} more destinations
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
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

          {!hasAnyPlanned ? (
            <div className="max-w-2xl mx-auto">
              <Card className="text-center p-12">
                <CardContent>
                  <MapPin className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">No Items Planned Yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Start building your dream trip by exploring destinations and packages, then add them to your tour plan.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleExploreDestinations}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Explore Destinations</span>
                    </button>
                    <button 
                      onClick={() => navigate('/packages')}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Browse Packages</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto space-y-12">
              {/* My Plannings Section */}
              {(plannedPackages.length > 0 || plannedLocations.length > 0) && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Plannings</span>
                    </h2>
                  </div>

                  {/* Liked Packages */}
                  {plannedPackages.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-700 mb-4">Liked Packages ({plannedPackages.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plannedPackages.map((planned: any) => (
                          planned.packages && (
                            <PackageCard 
                              key={planned.id} 
                              package={planned.packages}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Liked Destinations */}
                  {plannedLocations.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-700 mb-4">Liked Destinations ({plannedLocations.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plannedLocations.map((planned) => (
                          planned.locations && (
                            <DestinationCard 
                              key={planned.id} 
                              location={planned.locations}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tour History Section */}
              {completedBookings.length > 0 && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Tour <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">History</span>
                    </h2>
                    <p className="text-gray-600">Your completed travel experiences</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {completedBookings.map((booking) => (
                      <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={booking.package_image_url}
                              alt={booking.package_title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-1">{booking.package_title}</h3>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {booking.package_location}
                                </p>
                                <p className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {booking.package_duration}
                                </p>
                                <p className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {booking.tourists.length} tourists
                                </p>
                                <p className="flex items-center gap-1">
                                  <History className="h-3 w-3" />
                                  Completed: {new Date(booking.updated_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                                <span className="font-semibold">₹{booking.total_price.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Add More Items Button */}
              <div className="text-center pt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleExploreDestinations}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add More Destinations</span>
                  </button>
                  <button 
                    onClick={() => navigate('/packages')}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add More Packages</span>
                  </button>
                </div>
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