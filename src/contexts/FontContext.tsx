import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FontSettings {
  primaryFont: string;
  displayFont: string;
  bodyFont: string;
  sizeScale: 'small' | 'medium' | 'large' | 'extra-large';
  lineHeightScale: 'tight' | 'normal' | 'relaxed';
}

interface FontContextType {
  fontSettings: FontSettings;
  updateFontSettings: (settings: Partial<FontSettings>) => void;
  resetToDefaults: () => void;
  availableFonts: { name: string; value: string; preview: string }[];
}

const defaultFontSettings: FontSettings = {
  primaryFont: 'inter',
  displayFont: 'playfair',
  bodyFont: 'inter',
  sizeScale: 'medium',
  lineHeightScale: 'normal',
};

const FontContext = createContext<FontContextType | undefined>(undefined);

const availableFonts = [
  { name: 'Inter', value: 'inter', preview: 'Clean & Modern' },
  { name: 'Playfair Display', value: 'playfair', preview: 'Elegant & Classic' },
  { name: 'Poppins', value: 'poppins', preview: 'Friendly & Rounded' },
  { name: 'Roboto', value: 'roboto', preview: 'Google\'s Choice' },
  { name: 'Open Sans', value: 'opensans', preview: 'Highly Readable' },
  { name: 'Montserrat', value: 'montserrat', preview: 'Geometric & Bold' },
];

// Font size scales for different screen sizes
const fontSizeScales = {
  small: {
    xs: { mobile: '0.625rem', desktop: '0.75rem' },
    sm: { mobile: '0.75rem', desktop: '0.875rem' },
    base: { mobile: '0.875rem', desktop: '1rem' },
    lg: { mobile: '1rem', desktop: '1.125rem' },
    xl: { mobile: '1.125rem', desktop: '1.25rem' },
    '2xl': { mobile: '1.25rem', desktop: '1.5rem' },
    '3xl': { mobile: '1.5rem', desktop: '1.875rem' },
    '4xl': { mobile: '1.875rem', desktop: '2.25rem' },
    '5xl': { mobile: '2.25rem', desktop: '3rem' },
    '6xl': { mobile: '3rem', desktop: '3.75rem' },
    '7xl': { mobile: '3.75rem', desktop: '4.5rem' },
    '8xl': { mobile: '4.5rem', desktop: '6rem' },
    '9xl': { mobile: '6rem', desktop: '8rem' },
  },
  medium: {
    xs: { mobile: '0.75rem', desktop: '0.75rem' },
    sm: { mobile: '0.875rem', desktop: '0.875rem' },
    base: { mobile: '1rem', desktop: '1rem' },
    lg: { mobile: '1.125rem', desktop: '1.125rem' },
    xl: { mobile: '1.25rem', desktop: '1.25rem' },
    '2xl': { mobile: '1.5rem', desktop: '1.5rem' },
    '3xl': { mobile: '1.875rem', desktop: '1.875rem' },
    '4xl': { mobile: '2.25rem', desktop: '2.25rem' },
    '5xl': { mobile: '3rem', desktop: '3rem' },
    '6xl': { mobile: '3.75rem', desktop: '3.75rem' },
    '7xl': { mobile: '4.5rem', desktop: '4.5rem' },
    '8xl': { mobile: '6rem', desktop: '6rem' },
    '9xl': { mobile: '8rem', desktop: '8rem' },
  },
  large: {
    xs: { mobile: '0.875rem', desktop: '0.875rem' },
    sm: { mobile: '1rem', desktop: '1rem' },
    base: { mobile: '1.125rem', desktop: '1.125rem' },
    lg: { mobile: '1.25rem', desktop: '1.25rem' },
    xl: { mobile: '1.375rem', desktop: '1.375rem' },
    '2xl': { mobile: '1.625rem', desktop: '1.625rem' },
    '3xl': { mobile: '2rem', desktop: '2rem' },
    '4xl': { mobile: '2.5rem', desktop: '2.5rem' },
    '5xl': { mobile: '3.25rem', desktop: '3.25rem' },
    '6xl': { mobile: '4rem', desktop: '4rem' },
    '7xl': { mobile: '5rem', desktop: '5rem' },
    '8xl': { mobile: '6.5rem', desktop: '6.5rem' },
    '9xl': { mobile: '8.5rem', desktop: '8.5rem' },
  },
  'extra-large': {
    xs: { mobile: '1rem', desktop: '1rem' },
    sm: { mobile: '1.125rem', desktop: '1.125rem' },
    base: { mobile: '1.25rem', desktop: '1.25rem' },
    lg: { mobile: '1.375rem', desktop: '1.375rem' },
    xl: { mobile: '1.5rem', desktop: '1.5rem' },
    '2xl': { mobile: '1.75rem', desktop: '1.75rem' },
    '3xl': { mobile: '2.25rem', desktop: '2.25rem' },
    '4xl': { mobile: '2.75rem', desktop: '2.75rem' },
    '5xl': { mobile: '3.5rem', desktop: '3.5rem' },
    '6xl': { mobile: '4.25rem', desktop: '4.25rem' },
    '7xl': { mobile: '5.5rem', desktop: '5.5rem' },
    '8xl': { mobile: '7rem', desktop: '7rem' },
    '9xl': { mobile: '9rem', desktop: '9rem' },
  },
};

const lineHeightScales = {
  tight: {
    xs: '1.2', sm: '1.25', base: '1.3', lg: '1.35', xl: '1.4', '2xl': '1.45',
    '3xl': '1.5', '4xl': '1.1', '5xl': '1.1', '6xl': '1', '7xl': '1', '8xl': '1', '9xl': '1'
  },
  normal: {
    xs: '1.5', sm: '1.5', base: '1.5', lg: '1.5', xl: '1.5', '2xl': '1.5',
    '3xl': '1.2', '4xl': '1.1', '5xl': '1.1', '6xl': '1', '7xl': '1', '8xl': '1', '9xl': '1'
  },
  relaxed: {
    xs: '1.75', sm: '1.75', base: '1.75', lg: '1.75', xl: '1.75', '2xl': '1.75',
    '3xl': '1.4', '4xl': '1.3', '5xl': '1.2', '6xl': '1.1', '7xl': '1.1', '8xl': '1', '9xl': '1'
  }
};

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontSettings, setFontSettings] = useState<FontSettings>(() => {
    const saved = localStorage.getItem('fontSettings');
    return saved ? JSON.parse(saved) : defaultFontSettings;
  });

  const updateFontSettings = (newSettings: Partial<FontSettings>) => {
    setFontSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setFontSettings(defaultFontSettings);
  };

  const applyCSSVariables = (settings: FontSettings) => {
    const root = document.documentElement;
    
    // Font families
    root.style.setProperty('--font-primary', `${settings.primaryFont}, Inter, ui-sans-serif, system-ui`);
    root.style.setProperty('--font-display', `${settings.displayFont}, Playfair Display, serif`);
    root.style.setProperty('--font-body', `${settings.bodyFont}, Inter, ui-sans-serif, system-ui`);

    // Apply font sizes and line heights
    const sizeScale = fontSizeScales[settings.sizeScale];
    const lineHeightScale = lineHeightScales[settings.lineHeightScale];

    Object.entries(sizeScale).forEach(([size, values]) => {
      // Use CSS clamp for responsive sizing
      const responsiveSize = `clamp(${values.mobile}, 2.5vw, ${values.desktop})`;
      root.style.setProperty(`--font-size-${size}`, responsiveSize);
      root.style.setProperty(`--line-height-${size}`, lineHeightScale[size as keyof typeof lineHeightScale]);
    });
  };

  useEffect(() => {
    applyCSSVariables(fontSettings);
    localStorage.setItem('fontSettings', JSON.stringify(fontSettings));
  }, [fontSettings]);

  return (
    <FontContext.Provider value={{
      fontSettings,
      updateFontSettings,
      resetToDefaults,
      availableFonts,
    }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}