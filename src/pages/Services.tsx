
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Globe, 
  Mountain, 
  Leaf, 
  Camera, 
  Users, 
  Shield, 
  Calendar,
  Home,
  Plane,
  CreditCard,
  Phone,
  TreePine,
  Fish,
  Flower2,
  Clock,
  Star,
  Award,
  Heart,
  Compass,
  Route,
  Utensils,
  Wifi,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const tourPackageFeatures = [
    { 
      icon: Plane, 
      title: "Complete Transportation", 
      desc: "All modes covered - flights to Guwahati, road transfers via Bhalukpong/Tenga, helicopter services to remote areas, and local vehicle arrangements with experienced drivers familiar with mountain terrain"
    },
    { 
      icon: Home, 
      title: "Authentic Accommodation", 
      desc: "Eco-friendly homestays with local families, heritage hotels showcasing regional architecture, luxury resorts with mountain views, and camping sites in pristine wilderness areas with proper facilities"
    },
    { 
      icon: Users, 
      title: "Expert Local Guidance", 
      desc: "Certified local guides fluent in multiple languages, wildlife experts for nature tours, cultural interpreters for festival participation, and safety specialists for adventure activities"
    },
    { 
      icon: Calendar, 
      title: "Immersive Cultural Programs", 
      desc: "Participation in Mopin, Solung, and Losar festivals, traditional craft workshops, tribal cooking classes, meditation sessions at monasteries, and authentic village ceremonies"
    },
    { 
      icon: TreePine, 
      title: "Nature & Wildlife Expeditions", 
      desc: "Guided treks through Namdapha National Park, bird watching tours with over 500 species, orchid trails during blooming season, and responsible wildlife photography experiences"
    },
    { 
      icon: Utensils, 
      title: "Authentic Cuisine Experience", 
      desc: "Traditional Arunachali dishes including thukpa, momos, and bamboo shoot delicacies, cooking demonstrations by local chefs, organic farm-to-table meals, and special dietary accommodations"
    }
  ];

  const platformFeatures = [
    { 
      icon: CreditCard, 
      title: "Smart Custom Packages", 
      desc: "AI-powered itinerary planning based on your interests, travel dates, budget, and group size. Real-time pricing with transparent cost breakdown and flexible payment options"
    },
    { 
      icon: Globe, 
      title: "Live Travel Intelligence", 
      desc: "Real-time weather updates, road conditions, permit status, festival schedules, and location-based recommendations. Interactive map with GPS coordinates for all destinations"
    },
    { 
      icon: MapPin, 
      title: "Verified Destinations", 
      desc: "Hand-curated locations verified by our local team, detailed accessibility information, crowd density indicators, best visiting times, and insider tips from experienced travelers"
    },
    { 
      icon: Shield, 
      title: "Military-Grade Security", 
      desc: "256-bit SSL encryption, PCI DSS compliant payment processing, secure document storage for permits, and comprehensive travel insurance options with emergency evacuation coverage"
    },
    { 
      icon: Phone, 
      title: "24/7 Concierge Support", 
      desc: "Multi-language support team, emergency assistance hotline, real-time trip monitoring, instant rebooking for weather delays, and local emergency contacts in every destination"
    },
    { 
      icon: Wifi, 
      title: "Offline-First Technology", 
      desc: "Downloadable maps and guides for areas with limited connectivity, offline translation tools, emergency contact information, and pre-loaded local tips and cultural etiquette guides"
    }
  ];

  const localExperiences = [
    { 
      icon: Mountain, 
      title: "Sacred Ancient Sites", 
      desc: "Explore Tawang Monastery (largest in India), Urgelling Monastery (birthplace of 6th Dalai Lama), Malithan Temple with its mystical caves, and Akashi Ganga's sacred waters with spiritual significance"
    },
    { 
      icon: TreePine, 
      title: "Epic Trekking Adventures", 
      desc: "Multi-day treks through Sela Pass (13,700 ft), Bumla Pass border crossing, Mechuka Valley's hidden trails, Ziro Valley's rice fields, and virgin forests with rare flora and fauna"
    },
    { 
      icon: Fish, 
      title: "Pristine Wilderness Areas", 
      desc: "Kane Wildlife Sanctuary with golden langurs, Magi Lake's crystal waters, Namdapha's four big cats, Dibru-Saikhowa's river dolphins, and Eaglenest's endemic bird species"
    },
    { 
      icon: Calendar, 
      title: "Vibrant Cultural Festivals", 
      desc: "BASCON celebration with traditional competitions, Yomgo River Festival's community gatherings, Mopin harvest celebrations, Solung agricultural festivals, and Losar Tibetan New Year ceremonies"
    },
    { 
      icon: Home, 
      title: "Authentic Community Living", 
      desc: "Stay with Monpa families in Tawang, experience Apatani culture in Ziro, live with Mishmi tribes in remote villages, participate in daily routines, and learn traditional crafts and farming"
    },
    { 
      icon: Compass, 
      title: "Adventure Sports & Activities", 
      desc: "White water rafting on Brahmaputra tributaries, paragliding over Ziro Valley, rock climbing in Sela Pass, fishing in pristine mountain streams, and camping under star-filled skies"
    },
    { 
      icon: Camera, 
      title: "Photography Expeditions", 
      desc: "Specialized tours for wildlife photography, landscape captures of dramatic mountain vistas, cultural documentation of tribal life, and exclusive access to remote photogenic locations"
    },
    { 
      icon: Heart, 
      title: "Wellness & Spiritual Retreats", 
      desc: "Meditation programs at ancient monasteries, yoga sessions amid Himalayan peaks, traditional healing therapies, spiritual guidance from Buddhist monks, and digital detox experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-16 sm:pt-20">
        <section className="section-padding container-padding">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="mb-4 sm:mb-6">
                Our Services
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12">
                Discover Arunachal Pradesh through our comprehensive travel solutions, 
                designed to create unforgettable experiences while preserving local culture and nature.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive Tour Packages */}
        <section className="section-padding container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <h2>Comprehensive Tour Packages</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Catering to nature enthusiasts, adventure seekers, cultural tourists, and pilgrims
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {tourPackageFeatures.map((feature, index) => (
                <Card key={index} className="group hover-scale border-0 bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader className="text-center pb-3 sm:pb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Platform */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-bold">Digital Platform Features</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our digital platforms provide seamless booking and comprehensive travel support
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <Card key={index} className="group hover-scale border-0 bg-background/80 backdrop-blur-sm h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1">
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Local Experiences */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <Camera className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-bold">Unique Local Experiences</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Immerse yourself in authentic Arunachal Pradesh culture and pristine nature
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {localExperiences.map((experience, index) => (
                <Card key={index} className="group hover-scale border-0 bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <experience.icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1">
                    <p className="text-muted-foreground leading-relaxed">{experience.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Eco-Friendly Initiatives */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-bold">Eco-Friendly Initiatives</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
                Promoting responsible tourism through partnerships with local NGOs like the Eco-Friendly Society, 
                Magi, to protect wildlife, preserve biodiversity, and ensure tourism benefits local communities while maintaining environmental integrity
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="border-0 bg-background/80 backdrop-blur-sm h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Zero-Waste Tourism</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Comprehensive waste management systems, plastic-free initiatives, composting programs at homestays, and leave-no-trace trekking protocols
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-background/80 backdrop-blur-sm h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Community Empowerment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Direct employment of local guides and drivers, women's cooperative partnerships, youth skill development programs, and cultural preservation initiatives
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-background/80 backdrop-blur-sm h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <TreePine className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">Forest Conservation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Reforestation projects, wildlife corridor protection, endangered species monitoring, and sustainable trail maintenance with minimal environmental impact
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-background/80 backdrop-blur-sm h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Certified Standards</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    ISO 14001 environmental management certification, responsible tourism accreditation, carbon offset programs, and third-party sustainability audits
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Additional Sustainability Stats */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Local Employment Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">0</div>
                <p className="text-sm text-muted-foreground">Single-Use Plastics</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-foreground mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Community Partners</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15</div>
                <p className="text-sm text-muted-foreground">Conservation Projects</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Services?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Decades of expertise, local connections, and commitment to responsible tourism make us your ideal partner for Arunachal Pradesh exploration
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 bg-background/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Expert Local Knowledge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">15+ years of experience with deep local connections, insider access to remote locations, and relationships with tribal communities</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-background/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Safety & Permits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Complete permit assistance for Inner Line Permits, Protected Area Permits, and border area access with full legal compliance</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-background/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">Flexible Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Weather-adaptive itineraries, alternative route planning, and flexible booking policies to ensure your trip succeeds regardless of conditions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Explore Arunachal Pradesh?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join over 10,000+ satisfied travelers who've discovered the hidden gems of Northeast India through our responsible and memorable travel experiences. Start planning your adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8 py-6">
                <MapPin className="mr-2 h-5 w-5" />
                Explore Packages
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">10,000+</div>
                <p className="text-sm text-muted-foreground">Happy Travelers</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                <p className="text-sm text-muted-foreground">Destinations Covered</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-foreground mb-1">15+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
