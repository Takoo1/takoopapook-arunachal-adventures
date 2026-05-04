
import { Home, MapPin, Package, Compass, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface BottomNavigationProps {
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
}

const BottomNavigation = ({ isMenuOpen = false, onMenuToggle }: BottomNavigationProps) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'My Tour', path: '/my-tour', icon: Package },
    { name: 'Packages', path: '/packages', icon: MapPin },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Menu', path: '#', icon: isMenuOpen ? X : Menu, isMenuButton: true },
  ];

  const isActive = (path: string) => location.pathname === path;


  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/60 shadow-elegant pb-safe-area-bottom">
      <div className="flex items-center justify-around py-1.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = !item.isMenuButton && isActive(item.path);

          if (item.isMenuButton) {
            return (
              <button
                key={item.name}
                onClick={onMenuToggle}
                className="flex flex-col items-center space-y-1 p-1.5 rounded-xl transition-all duration-300 text-muted-foreground hover:text-primary"
              >
                <div className="p-2 rounded-xl bg-gradient-sunset text-white shadow-warm transition-transform duration-300 hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold tracking-wide">{item.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center space-y-1 p-1.5 rounded-xl transition-all duration-300 ${
                isItemActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isItemActive
                  ? 'bg-gradient-primary text-white shadow-glow scale-110'
                  : 'bg-muted/60 hover:bg-primary/10'
              }`}>
                <Icon className="h-5 w-5 transition-transform" />
              </div>
              <span className={`text-[10px] tracking-wide ${isItemActive ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
