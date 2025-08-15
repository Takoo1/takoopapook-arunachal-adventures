
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
      
      {/* Mobile Menu Overlay - Compact Bottom Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[300] bg-black/20 backdrop-blur-sm">
          <div className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-md border-t border-border shadow-2xl rounded-t-3xl p-6 pb-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-primary">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu Grid - Two Rows */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl hover:from-primary/20 hover:to-primary/10 transition-all duration-200 active:scale-95"
              >
                <svg className="h-6 w-6 mb-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-medium">Home</span>
              </a>
              
              <a 
                href="/packages" 
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center p-4 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-2xl hover:from-secondary/20 hover:to-secondary/10 transition-all duration-200 active:scale-95"
              >
                <svg className="h-6 w-6 mb-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
                <span className="text-sm font-medium">Packages</span>
              </a>
              
              <a 
                href="/explore" 
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl hover:from-accent/20 hover:to-accent/10 transition-all duration-200 active:scale-95"
              >
                <svg className="h-6 w-6 mb-2 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium">Explore</span>
              </a>
              
              <a 
                href="/my-tour" 
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center p-4 bg-gradient-to-r from-muted-foreground/10 to-muted-foreground/5 rounded-2xl hover:from-muted-foreground/20 hover:to-muted-foreground/10 transition-all duration-200 active:scale-95"
              >
                <svg className="h-6 w-6 mb-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">My Tour</span>
              </a>
            </div>
            
            {/* Additional Links */}
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex justify-center space-x-4">
                <a 
                  href="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
                <a 
                  href="/auth" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
