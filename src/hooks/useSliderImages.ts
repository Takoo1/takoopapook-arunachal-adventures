import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SliderImage {
  id: string;
  image_url: string;
  link_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Hook to fetch all slider images for admin
export const useSliderImages = () => {
  return useQuery({
    queryKey: ['slider-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slider_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as SliderImage[];
    },
  });
};

// Hook to fetch active slider images for public display
export const useActiveSliderImages = () => {
  return useQuery({
    queryKey: ['active-slider-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slider_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as SliderImage[];
    },
  });
};

// Hook to create a new slider image
export const useCreateSliderImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sliderImage: Omit<SliderImage, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('slider_images')
        .insert([sliderImage])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slider-images'] });
      queryClient.invalidateQueries({ queryKey: ['active-slider-images'] });
    },
  });
};

// Hook to update a slider image
export const useUpdateSliderImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SliderImage> & { id: string }) => {
      const { data, error } = await supabase
        .from('slider_images')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slider-images'] });
      queryClient.invalidateQueries({ queryKey: ['active-slider-images'] });
    },
  });
};

// Hook to delete a slider image
export const useDeleteSliderImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('slider_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slider-images'] });
      queryClient.invalidateQueries({ queryKey: ['active-slider-images'] });
    },
  });
};