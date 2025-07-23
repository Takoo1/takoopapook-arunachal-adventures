
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
  Flower2
} from 'lucide-react';

const Services = () => {
  const tourPackageFeatures = [
    { icon: Plane, title: "Transportation", desc: "Road, air, and water routes as available" },
    { icon: Home, title: "Accommodation", desc: "Eco-friendly homestays and resorts" },
    { icon: Users, title: "Local Guided Tours", desc: "Expert local guides for authentic experiences" },
    { icon: Calendar, title: "Cultural Experiences", desc: "Participation in local festivals and traditions" },
    { icon: TreePine, title: "Nature & Wildlife Tours", desc: "Explore pristine wilderness areas" }
  ];

  const platformFeatures = [
    { icon: CreditCard, title: "Book Custom Packages", desc: "Tailored to your preferences" },
    { icon: Globe, title: "Real-time Information", desc: "Up-to-date travel details" },
    { icon: MapPin, title: "Curated Destinations", desc: "Handpicked locations and experiences" },
    { icon: Shield, title: "Secure Payments", desc: "Safe and encrypted transactions" },
    { icon: Phone, title: "24/7 Support", desc: "Round-the-clock customer assistance" }
  ];

  const localExperiences = [
    { icon: Mountain, title: "Ancient Sites", desc: "Visit Malithan Temple and Akashi Ganga" },
    { icon: TreePine, title: "Trekking Adventures", desc: "Through Arunachal Pradesh's lush landscapes" },
    { icon: Fish, title: "Untouched Destinations", desc: "Kane Wildlife Sanctuary and Magi Lake" },
    { icon: Calendar, title: "Local Festivals", desc: "BASCON and Yomgo River Festival" },
    { icon: Home, title: "Community Homestays", desc: "Eco-friendly local accommodations" }
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
                <Card key={index} className="group hover-scale border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-3 sm:pb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm sm:text-base text-muted-foreground">{feature.desc}</p>
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
                <Card key={index} className="group hover-scale border-0 bg-background/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.desc}</p>
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localExperiences.map((experience, index) => (
                <Card key={index} className="group hover-scale border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <experience.icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{experience.desc}</p>
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
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Promoting responsible tourism and working with local NGOs like the Eco-Friendly Society, 
                Magi, to protect wildlife and preserve biodiversity
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 bg-background/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Sustainable Practices</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Encouraging visitors to follow eco-friendly guidelines that protect the pristine environment of Arunachal Pradesh
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-background/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="h-10 w-10 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Community Partnership</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Collaborating with local NGOs and communities to ensure tourism benefits local people while preserving cultural heritage
                  </p>
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
              Join us in discovering the hidden gems of Northeast India through responsible and memorable travel experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <MapPin className="mr-2 h-5 w-5" />
                Explore Packages
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
