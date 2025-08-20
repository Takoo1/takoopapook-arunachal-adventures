import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Takoopaook',
  appName: 'TakooPapook',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#000000',
      overlaysWebView: false,
    },
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      launchFadeOutDuration: 500,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false,
    },
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    appendUserAgent: 'TakooPapook',
    backgroundColor: '#000000',
    overrideUserAgent: false,
    loggingBehavior: 'none',
    useLegacyBridge: false,
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
  }
};

export default config;