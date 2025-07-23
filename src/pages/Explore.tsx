
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { useLocations } from '@/hooks/useLocations';
import { Search, Filter } from 'lucide-react';

const Explore = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const categoryFilter = searchParams.get('category');
  const { data: locations = [], isLoading } = useLocations();

  const categories = ['Nature', 'Adventure', 'Cultural', 'Pilgrims'];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || 
                           (location.categories && location.categories.includes(categoryFilter));
    
    return matchesSearch && matchesCategory && location.is_active;
  });

  const getCategoryTitle = () => {
    if (categoryFilter) {
      return `${categoryFilter} Destinations`;
    }
    return 'All Destinations';
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/explore?category=${category}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5" />
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {getCategoryTitle()}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover the breathtaking beauty and rich culture of Arunachal Pradesh through our curated destinations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-8 rounded-full" />
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-transparent bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xl text-lg placeholder:text-muted-foreground transition-all duration-300"
              />
            </div>
          </div>

          {/* Category Filters */}
          {!categoryFilter && (
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {categories.map((category) => {
                const categoryCount = locations.filter(loc => 
                  loc.categories?.includes(category) && loc.is_active
                ).length;
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group border border-white/20"
                  >
                    <div className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors duration-300">
                      {category}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {categoryCount} destinations
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading destinations...</div>
            </div>
          ) : filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLocations.map((location) => (
                <DestinationCard key={location.id} location={location} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">
                {searchTerm || categoryFilter 
                  ? 'No destinations found matching your criteria.'
                  : 'No destinations available at the moment.'
                }
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
