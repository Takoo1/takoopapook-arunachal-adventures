
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      
      {/* Company Description */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    About TAKOO-PAPOOK
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    TAKOO - PAPOOK Eco-Tourist seeks to revolutionize eco-tourism in Arunachal Pradesh by providing tourists with memorable experiences that reflect the region's rich culture, natural beauty, and ecological diversity. Our focus on sustainability, local employment, and customer satisfaction will ensure that we not only grow as a business but also contribute to the well-being of the local community and environment.
                  </p>
                </div>
              </div>
              
              <div className="relative animate-scale-in">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Arunachal Pradesh landscape"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full opacity-30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Background */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Founder's Background
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Founder Image */}
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
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full animate-pulse" />
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-emerald-500/30 rounded-full animate-pulse" />
                  
                  {/* Founder Name Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800">Jumnya John Dini</h3>
                    <p className="text-emerald-600 font-semibold">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Founder Description */}
              <div className="space-y-6 animate-fade-in order-1 lg:order-2">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    About Jumnya John Dini
                    <span className="block text-lg font-normal text-emerald-600 mt-2">(Founder)</span>
                  </h3>
                  
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Jumnya John Dini, founder of TAKOO - PAPOOK Eco-Tourist, hails from Llikabali, Arunachal Pradesh—a land of rich cultural heritage and natural beauty. Growing up amidst dense forests, flowing rivers, and vibrant indigenous traditions, Jumnya developed a deep-rooted love for nature and his homeland's unique culture.
                    </p>
                    
                    <p>
                      His journey into eco-tourism began early, inspired by the environment around him. With a Diploma in Tourism Studies, Jumnya combined formal education with real-world knowledge gained from local communities, history, and ecology. His passion for travel and conservation drives his mission to promote sustainable tourism while preserving the environment and culture of Arunachal Pradesh.
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-8 text-center">
                    <button 
                      onClick={() => window.location.href = '/founder-profile'}
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
              {/* Vision */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white">🌟</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-emerald-800">Our Vision</h3>
                </div>
                <p className="text-emerald-700 leading-relaxed text-center">
                  To become the leading eco-tourism service provider in the region, offering sustainable, culturally enriching travel experiences that contribute to the conservation of nature and the upliftment of local communities.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white">🎯</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-teal-800">Our Mission</h3>
                </div>
                <ul className="space-y-3 text-teal-700">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>To promote the unique and diverse culture of Arunachal Pradesh and its natural beauty to a global audience.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>To provide affordable and genuine eco-tourism packages with a focus on environmental conservation and sustainable travel.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>To offer tourists a seamless travel experience via our digital platforms, providing detailed, curated tour plans, transportation, accommodation, and guided experiences.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>To hire and empower local youth, offering them meaningful employment and an opportunity to preserve and promote their heritage.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 animate-fade-in">
              Our Core Values
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white">🌿</span>
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-3">Sustainability</h3>
                <p className="text-emerald-700">Preserving nature for future generations through responsible tourism practices.</p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-teal-800 mb-3">Community</h3>
                <p className="text-teal-700">Supporting local employment and empowering indigenous communities.</p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white">⭐</span>
                </div>
                <h3 className="text-xl font-bold text-cyan-800 mb-3">Excellence</h3>
                <p className="text-cyan-700">Delivering memorable experiences that exceed expectations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
