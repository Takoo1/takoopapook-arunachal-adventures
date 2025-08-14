import React from 'react';
import { Capacitor } from '@capacitor/core';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  const isNativeApp = Capacitor.isNativePlatform();

  return (
    <div className={`min-h-screen font-sans ${isNativeApp ? 'pb-20' : ''} ${className}`}>
      <Header />
      <main className={`${isNativeApp ? 'pt-20' : 'pt-16 sm:pt-20'}`}>
        {children}
      </main>
      {!isNativeApp && <Footer />}
      {isNativeApp && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;