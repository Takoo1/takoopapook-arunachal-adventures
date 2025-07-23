
import HeroSection from '@/components/HeroSection';
import PackageCarousel from '@/components/PackageCarousel';
import DestinationCarousel from '@/components/DestinationCarousel';
import InteractiveMapSection from '@/components/InteractiveMapSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Star, Eye, Heart, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        {/* About TAKOO-PAPOOK Section */}
        <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  About{' '}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    TAKOO-PAPOOK
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      TAKOO-PAPOOK Eco-Tourist seeks to revolutionize eco-tourism in Arunachal Pradesh by providing tourists with memorable experiences that reflect the region's rich culture, natural beauty, and ecological diversity.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Our focus on sustainability, local employment, and customer satisfaction ensures that we not only grow as a business but also contribute to the well-being of the local community and environment.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-full">
                      <Heart className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">Sustainable Tourism</span>
                    </div>
                    <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-950/30 px-4 py-2 rounded-full">
                      <Users className="w-5 h-5 text-teal-600" />
                      <span className="text-teal-700 dark:text-teal-300 font-medium">Local Employment</span>
                    </div>
                    <div className="flex items-center gap-2 bg-cyan-50 dark:bg-cyan-950/30 px-4 py-2 rounded-full">
                      <Star className="w-5 h-5 text-cyan-600" />
                      <span className="text-cyan-700 dark:text-cyan-300 font-medium">Cultural Heritage</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative animate-scale-in">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Arunachal Pradesh landscape"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-emerald-500/30 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 bg-gradient-to-br from-muted/30 to-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Meet Our Founder
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative animate-scale-in order-2 lg:order-1">
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <img
                        src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Jumnya John Dini - Founder"
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent" />
                    </div>
                    
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full animate-pulse" />
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-emerald-500/30 rounded-full animate-pulse" />
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800">Jumnya John Dini</h3>
                      <p className="text-emerald-600 font-semibold">Founder & CEO</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 animate-fade-in order-1 lg:order-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                      Visionary Leader
                      <span className="block text-lg font-normal text-emerald-600 mt-2">From Likabali, Arunachal Pradesh</span>
                    </h3>
                    
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Jumnya John Dini, founder of TAKOO-PAPOOK Eco-Tourist, hails from Likabali, Arunachal Pradesh—a land of rich cultural heritage and natural beauty. Growing up amidst dense forests, flowing rivers, and vibrant indigenous traditions, Jumnya developed a deep-rooted love for nature and his homeland's unique culture.
                      </p>
                      
                      <p>
                        With a Diploma in Tourism Studies and years of experience in environmental conservation, Jumnya combines formal education with real-world knowledge to promote sustainable tourism while preserving Arunachal Pradesh's environment and culture.
                      </p>
                    </div>

                    <div className="mt-8">
                      <button 
                        onClick={() => navigate('/founder-profile')}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Read More About Him
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Vision & Mission
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-emerald-800 dark:text-emerald-200">Our Vision</h3>
                  </div>
                  <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed text-center">
                    To become the leading eco-tourism service provider in the region, offering sustainable, culturally enriching travel experiences that contribute to the conservation of nature and the upliftment of local communities.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-teal-800 dark:text-teal-200">Our Mission</h3>
                  </div>
                  <ul className="space-y-3 text-teal-700 dark:text-teal-300">
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2 mt-1">•</span>
                      <span>Promote Arunachal Pradesh's unique culture and natural beauty globally</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2 mt-1">•</span>
                      <span>Provide affordable, genuine eco-tourism packages with environmental focus</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2 mt-1">•</span>
                      <span>Offer seamless digital travel experiences with curated tour plans</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2 mt-1">•</span>
                      <span>Empower local youth and preserve cultural heritage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PackageCarousel />
        <DestinationCarousel />
        <InteractiveMapSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
