import { useFont, FontSettings } from '@/contexts/FontContext';

interface FontPreset {
  name: string;
  description: string;
  settings: Partial<FontSettings>;
}

export const fontPresets: FontPreset[] = [
  {
    name: "Modern & Clean",
    description: "Inter-based design for modern websites",
    settings: {
      primaryFont: 'inter',
      displayFont: 'inter',
      bodyFont: 'inter',
      sizeScale: 'medium',
      lineHeightScale: 'normal'
    }
  },
  {
    name: "Elegant Classic",
    description: "Playfair Display for sophisticated feel",
    settings: {
      primaryFont: 'playfair',
      displayFont: 'playfair',
      bodyFont: 'inter',
      sizeScale: 'medium',
      lineHeightScale: 'relaxed'
    }
  },
  {
    name: "Friendly & Approachable",
    description: "Poppins for warm, welcoming design",
    settings: {
      primaryFont: 'poppins',
      displayFont: 'poppins',
      bodyFont: 'poppins',
      sizeScale: 'medium',
      lineHeightScale: 'normal'
    }
  },
  {
    name: "Large & Accessible",
    description: "Larger fonts for better readability",
    settings: {
      primaryFont: 'opensans',
      displayFont: 'opensans',
      bodyFont: 'opensans',
      sizeScale: 'large',
      lineHeightScale: 'relaxed'
    }
  },
  {
    name: "Extra Large",
    description: "Maximum accessibility with extra large fonts",
    settings: {
      primaryFont: 'roboto',
      displayFont: 'roboto',
      bodyFont: 'roboto',
      sizeScale: 'extra-large',
      lineHeightScale: 'relaxed'
    }
  },
  {
    name: "Compact & Dense",
    description: "Space-efficient typography",
    settings: {
      primaryFont: 'montserrat',
      displayFont: 'montserrat',
      bodyFont: 'opensans',
      sizeScale: 'small',
      lineHeightScale: 'tight'
    }
  }
];

export function useFontPresets() {
  const { updateFontSettings } = useFont();

  const applyPreset = (preset: FontPreset) => {
    updateFontSettings(preset.settings);
  };

  return {
    presets: fontPresets,
    applyPreset
  };
}