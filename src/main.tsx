import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Configure StatusBar only on native (Android/iOS) and lazy-load the plugin
if (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()) {
  import('@capacitor/status-bar')
    .then(({ StatusBar, Style }) => {
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      StatusBar.setBackgroundColor({ color: '#ffffffff' }).catch(() => {});
      StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
    })
    .catch(() => {});
}

createRoot(document.getElementById("root")!).render(<App />);
