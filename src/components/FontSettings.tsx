import React, { useState } from 'react';
import { Settings, Type, RefreshCw, X, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFont } from '@/contexts/FontContext';
import { useFontPresets } from '@/hooks/useFontPresets';

interface FontSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FontSettings({ isOpen, onClose }: FontSettingsProps) {
  const { fontSettings, updateFontSettings, resetToDefaults, availableFonts } = useFont();
  const { presets, applyPreset } = useFontPresets();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Font Settings
            </CardTitle>
            <CardDescription>
              Customize typography across the entire website
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quick Presets */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Quick Presets
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  onClick={() => applyPreset(preset)}
                  className="h-auto p-3 text-left flex flex-col items-start space-y-1"
                >
                  <span className="font-medium text-sm">{preset.name}</span>
                  <span className="text-xs text-muted-foreground">{preset.description}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t pt-6" />
          {/* Font Size Scale */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Font Size Scale</Label>
            <Select
              value={fontSettings.sizeScale}
              onValueChange={(value) => updateFontSettings({ sizeScale: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">
                  <div className="flex items-center justify-between w-full">
                    <span>Small</span>
                    <Badge variant="secondary" className="ml-2">Compact</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center justify-between w-full">
                    <span>Medium</span>
                    <Badge variant="secondary" className="ml-2">Default</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="large">
                  <div className="flex items-center justify-between w-full">
                    <span>Large</span>
                    <Badge variant="secondary" className="ml-2">Comfortable</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="extra-large">
                  <div className="flex items-center justify-between w-full">
                    <span>Extra Large</span>
                    <Badge variant="secondary" className="ml-2">Accessibility</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Line Height Scale */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Line Height</Label>
            <Select
              value={fontSettings.lineHeightScale}
              onValueChange={(value) => updateFontSettings({ lineHeightScale: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tight">
                  <div className="flex items-center justify-between w-full">
                    <span>Tight</span>
                    <Badge variant="secondary" className="ml-2">Dense</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="normal">
                  <div className="flex items-center justify-between w-full">
                    <span>Normal</span>
                    <Badge variant="secondary" className="ml-2">Standard</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="relaxed">
                  <div className="flex items-center justify-between w-full">
                    <span>Relaxed</span>
                    <Badge variant="secondary" className="ml-2">Spacious</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Primary Font */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Primary Font (Headers & UI)</Label>
            <Select
              value={fontSettings.primaryFont}
              onValueChange={(value) => updateFontSettings({ primaryFont: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableFonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex flex-col">
                      <span style={{ fontFamily: font.name }}>{font.name}</span>
                      <span className="text-xs text-muted-foreground">{font.preview}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Display Font */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Display Font (Large Headings)</Label>
            <Select
              value={fontSettings.displayFont}
              onValueChange={(value) => updateFontSettings({ displayFont: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableFonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex flex-col">
                      <span style={{ fontFamily: font.name }}>{font.name}</span>
                      <span className="text-xs text-muted-foreground">{font.preview}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Body Font */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Body Font (Paragraphs & Content)</Label>
            <Select
              value={fontSettings.bodyFont}
              onValueChange={(value) => updateFontSettings({ bodyFont: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableFonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex flex-col">
                      <span style={{ fontFamily: font.name }}>{font.name}</span>
                      <span className="text-xs text-muted-foreground">{font.preview}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Preview</Label>
            <div className="p-4 border rounded-lg space-y-3">
              <h1 className="font-display text-4xl font-bold">Display Heading</h1>
              <h2 className="font-sans text-2xl font-semibold">Primary Heading</h2>
              <p className="font-body text-base">
                This is body text. It should be highly readable and comfortable for long-form content. 
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Small text and captions should also be legible at this size.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={resetToDefaults} variant="outline" className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={onClose} className="flex-1">
              Apply Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FontSettingsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-40 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Settings className="h-4 w-4 mr-2" />
        Font Settings
      </Button>
      <FontSettings isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}