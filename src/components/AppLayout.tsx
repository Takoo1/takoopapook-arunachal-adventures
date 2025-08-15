
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  const isNativeApp = Capacitor.isNativePlatform();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use mobile design for both native apps and mobile browsers
  const useMobileLayout = isNativeApp || isMobile;
  
  // Show header only on home page for mobile, always show for desktop
  const showHeader = !useMobileLayout || isHomePage;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen font-sans ${useMobileLayout ? 'pb-16' : ''} ${className}`}>
      {showHeader && <Header />}
      <main className={`${isNativeApp ? 'pt-safe-area-top' : ''} ${
        useMobileLayout && isHomePage && !className?.includes('hero-no-gap') ? 'pt-20' : ''
      } ${className?.includes('hero-no-gap') && useMobileLayout && isHomePage ? 'pt-14' : ''}`}>
        {children}
      </main>
      {useMobileLayout && (
        <BottomNavigation 
          isMenuOpen={isMenuOpen} 
          onMenuToggle={handleMenuToggle} 
        />
      )}
      {!useMobileLayout && <Footer />}
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-md overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-border/20">
              <h2 className="text-xl font-bold">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Menu items will be added here */}
              <div className="space-y-2">
                <a href="/" className="block p-3 rounded-lg hover:bg-muted text-lg font-medium">Home</a>
                <a href="/packages" className="block p-3 rounded-lg hover:bg-muted text-lg font-medium">Packages</a>
                <a href="/explore" className="block p-3 rounded-lg hover:bg-muted text-lg font-medium">Explore</a>
                <a href="/my-tour" className="block p-3 rounded-lg hover:bg-muted text-lg font-medium">My Tour</a>
                <a href="/about" className="block p-3 rounded-lg hover:bg-muted text-lg font-medium">About</a>
                <a href="/auth" className="block p-3 rounded-lg hover:bg-muted text-lg font-medium">Login</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
