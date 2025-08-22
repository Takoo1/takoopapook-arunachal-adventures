import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

export const useBackButtonHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only handle back button on native platforms
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const handleBackButton = () => {
      // If we're on the home page, exit the app
      if (location.pathname === '/') {
        App.exitApp();
        return;
      }

      // Otherwise, navigate back
      navigate(-1);
    };

    // Add back button listener
    let backButtonListener: any;
    
    const setupListener = async () => {
      backButtonListener = await App.addListener('backButton', handleBackButton);
    };
    
    setupListener();

    // Cleanup listener on unmount
    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [location.pathname, navigate]);
};
