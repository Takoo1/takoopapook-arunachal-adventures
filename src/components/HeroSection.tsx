
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Discover the Hidden Paradise',
      subtitle: 'Experience the untouched beauty of Arunachal Pradesh',
      description: 'From snow-capped peaks to lush valleys, embark on a journey through India\'s northeastern gem.'
    },
    {
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Pristine Rivers & Waterfalls',
      subtitle: 'Nature\'s symphony awaits your arrival',
      description: 'Witness the power and beauty of cascading waterfalls and crystal-clear mountain streams.'
    },
    {
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Majestic Mountain Ranges',
      subtitle: 'Touch the clouds, feel the serenity',
      description: 'Explore the Eastern Himalayas and discover peaks that have stories to tell.'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[55vh] sm:h-[65vh] lg:h-[85vh] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1400ms] ease-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-110'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0" style={{ background: 'var(--gradient-hero-overlay)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative h-full flex items-end pb-16 sm:pb-24 lg:items-center lg:pb-0">
              <div className="container mx-auto px-5 sm:px-8">
                <div className="max-w-xl lg:max-w-2xl">
                  <div className={`transform transition-all duration-1000 delay-300 ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-white/90 text-xs sm:text-sm font-medium mb-4 tracking-wide uppercase">
                      <Compass className="h-3.5 w-3.5" />
                      Arunachal Pradesh
                    </span>
                    <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.05] tracking-tight drop-shadow-2xl">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-xl lg:text-2xl text-white/90 mb-6 font-light italic">
                      {slide.subtitle}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-white/75 mb-8 leading-relaxed hidden md:block max-w-xl">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate('/explore')}
                        className="mobile-btn-sunset text-sm sm:text-base"
                      >
                        Start Exploring
                      </button>
                      <button
                        onClick={() => navigate('/packages')}
                        className="px-6 py-3 rounded-full glass-dark text-white font-semibold text-sm sm:text-base hover:bg-white/15 transition-all duration-300"
                      >
                        View Packages
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
