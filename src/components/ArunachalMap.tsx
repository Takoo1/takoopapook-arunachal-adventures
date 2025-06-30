
import { useRef, useState, useEffect } from 'react';
import { Location, MapSettings } from '@/types/database';
import MapHotspot from './MapHotspot';

interface ArunachalMapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  mapSettings?: MapSettings;
}

const ArunachalMap = ({ locations, selectedLocation, onLocationSelect, mapSettings }: ArunachalMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(mapSettings?.initial_zoom || 1);
  const [pan, setPan] = useState({ x: mapSettings?.center_x || 0, y: mapSettings?.center_y || 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const minZoom = mapSettings?.min_zoom || 0.5;
  const maxZoom = mapSettings?.max_zoom || 3;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(minZoom, Math.min(maxZoom, prev + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
      <div
        ref={mapRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative w-full h-full transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          {/* Arunachal Pradesh SVG Map */}
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simplified Arunachal Pradesh outline */}
            <path
              d="M100 200 L200 150 L300 100 L450 120 L550 140 L650 160 L700 200 L680 300 L650 400 L600 450 L500 480 L400 470 L300 450 L200 420 L150 380 L120 300 Z"
              fill="url(#mapGradient)"
              stroke="#059669"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Mountain ranges */}
            <path
              d="M150 250 L200 200 L250 240 L300 190 L350 230 L400 180 L450 220 L500 170 L550 210"
              stroke="#065f46"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </svg>

          {/* Location Hotspots */}
          {locations.map((location) => (
            <MapHotspot
              key={location.id}
              location={location}
              isSelected={selectedLocation?.id === location.id}
              onClick={() => onLocationSelect(location)}
              style={{
                left: `${location.coordinates_x}%`,
                top: `${location.coordinates_y}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setZoom(prev => Math.min(maxZoom, prev + 0.2))}
          className="bg-white/90 hover:bg-white shadow-lg rounded-lg p-2 transition-all duration-200 hover:scale-105"
        >
          <span className="text-emerald-600 font-bold text-xl">+</span>
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(minZoom, prev - 0.2))}
          className="bg-white/90 hover:bg-white shadow-lg rounded-lg p-2 transition-all duration-200 hover:scale-105"
        >
          <span className="text-emerald-600 font-bold text-xl">−</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-gray-600">
        Scroll to zoom • Drag to pan • Click locations to explore
      </div>
    </div>
  );
};

export default ArunachalMap;
