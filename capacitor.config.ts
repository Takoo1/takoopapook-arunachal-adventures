import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Takoopaook',
  appName: 'TakooPapook',
  webDir: 'dist',
  server: {
    url: 'https://1d3f6d28-35e7-4a1d-b317-c3d3ec5faf81.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;