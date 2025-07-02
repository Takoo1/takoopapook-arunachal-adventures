
export interface Location {
  id: string;
  name: string;
  coordinates_x: number;
  coordinates_y: number;
  description: string;
  bullet_points: string[];
  images: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlannedLocation {
  id: string;
  location_id: string;
  user_session: string;
  planned_at: string;
  notes?: string;
}

export interface MapSettings {
  id: string;
  initial_zoom: number;
  center_x: number;
  center_y: number;
  min_zoom: number;
  max_zoom: number;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: Location;
        Insert: Omit<Location, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Location, 'id' | 'created_at' | 'updated_at'>>;
      };
      map_settings: {
        Row: MapSettings;
        Insert: Omit<MapSettings, 'id' | 'updated_at'>;
        Update: Partial<Omit<MapSettings, 'id' | 'updated_at'>>;
      };
      planned_locations: {
        Row: PlannedLocation;
        Insert: Omit<PlannedLocation, 'id' | 'planned_at'>;
        Update: Partial<Omit<PlannedLocation, 'id' | 'planned_at'>>;
      };
    };
  };
}
