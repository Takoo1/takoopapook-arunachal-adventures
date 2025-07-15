import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useMapSettings = () => {
  return useQuery({
    queryKey: ['map-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('map_settings')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching map settings:', error);
        return null;
      }
      
      return data;
    },
  });
};