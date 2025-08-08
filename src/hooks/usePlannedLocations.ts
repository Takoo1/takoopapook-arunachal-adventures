import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PlannedLocation, Location, Package } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

// Generate a session ID for the user (simple implementation)
const getUserSession = () => {
  let session = localStorage.getItem('user_session');
  if (!session) {
    session = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('user_session', session);
  }
  return session;
};

export const usePlannedLocations = () => {
  const userSession = getUserSession();
  
  return useQuery({
    queryKey: ['planned-locations', userSession],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('planned_locations')
        .select(`
          *,
          locations:location_id (*)
        `)
        .eq('user_session', userSession)
        .order('planned_at', { ascending: false });
      
      if (error) throw error;
      return data as (PlannedLocation & { locations: Location })[];
    },
  });
};

// New interfaces for planned items
export interface PlannedItem {
  id: string;
  item_id: string;
  item_type: 'location' | 'package';
  user_session: string;
  planned_at: string;
  notes?: string | null;
  item_data?: Location | Package;
}

export const usePlannedItems = () => {
  const userSession = getUserSession();
  
  return useQuery({
    queryKey: ['planned-items', userSession],
    queryFn: async () => {
      // Get planned locations
      const { data: locations, error: locError } = await supabase
        .from('planned_locations')
        .select(`
          *,
          locations:location_id (*)
        `)
        .eq('user_session', userSession);
      
      if (locError) throw locError;

      // Get planned packages (we'll create this table)
      const { data: packages, error: pkgError } = await supabase
        .from('planned_packages')
        .select(`
          *,
          packages:package_id (*)
        `)
        .eq('user_session', userSession);

      // If table doesn't exist yet, just use empty array
      const plannedPackages = pkgError ? [] : packages || [];

      // Combine and format the data
      const plannedItems: PlannedItem[] = [
        ...(locations || []).map((item: any) => ({
          id: item.id,
          item_id: item.location_id,
          item_type: 'location' as const,
          user_session: item.user_session,
          planned_at: item.planned_at,
          notes: item.notes,
          item_data: item.locations
        })),
        ...(plannedPackages || []).map((item: any) => ({
          id: item.id,
          item_id: item.package_id,
          item_type: 'package' as const,
          user_session: item.user_session,
          planned_at: item.planned_at,
          notes: item.notes,
          item_data: item.packages
        }))
      ];

      return plannedItems.sort((a, b) => new Date(b.planned_at).getTime() - new Date(a.planned_at).getTime());
    },
  });
};

export const useAddToPlanned = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const userSession = getUserSession();
  
  return useMutation({
    mutationFn: async ({ itemId, itemType, notes }: { itemId: string; itemType: 'location' | 'package'; notes?: string }) => {
      if (itemType === 'location') {
        const { data, error } = await supabase
          .from('planned_locations')
          .insert({
            location_id: itemId,
            user_session: userSession,
            notes
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('planned_packages')
          .insert({
            package_id: itemId,
            user_session: userSession,
            notes
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['planned-items'] });
      queryClient.invalidateQueries({ queryKey: ['planned-locations'] });
      queryClient.invalidateQueries({ queryKey: ['is-planned'] });
      toast({
        title: "Added to My Tour",
        description: `${variables.itemType === 'location' ? 'Destination' : 'Package'} has been added to your planned items.`,
      });
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        toast({
          title: "Already Planned",
          description: "This item is already in your tour plan.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add item to your tour plan.",
          variant: "destructive",
        });
      }
    },
  });
};

export const useRemoveFromPlanned = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const userSession = getUserSession();
  
  return useMutation({
    mutationFn: async ({ itemId, itemType }: { itemId: string; itemType: 'location' | 'package' }) => {
      if (itemType === 'location') {
        const { error } = await supabase
          .from('planned_locations')
          .delete()
          .eq('location_id', itemId)
          .eq('user_session', userSession);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('planned_packages')
          .delete()
          .eq('package_id', itemId)
          .eq('user_session', userSession);
        
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['planned-items'] });
      queryClient.invalidateQueries({ queryKey: ['planned-locations'] });
      queryClient.invalidateQueries({ queryKey: ['is-planned'] });
      toast({
        title: "Removed from My Tour",
        description: `${variables.itemType === 'location' ? 'Destination' : 'Package'} has been removed from your planned items.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from your tour plan.",
        variant: "destructive",
      });
    },
  });
};

export const useIsItemPlanned = (itemId: string, itemType: 'location' | 'package') => {
  const userSession = getUserSession();
  
  return useQuery({
    queryKey: ['is-planned', itemId, itemType, userSession],
    queryFn: async () => {
      if (itemType === 'location') {
        const { data, error } = await supabase
          .from('planned_locations')
          .select('id')
          .eq('location_id', itemId)
          .eq('user_session', userSession)
          .maybeSingle();
        
        if (error) throw error;
        return !!data;
      } else {
        const { data, error } = await supabase
          .from('planned_packages')
          .select('id')
          .eq('package_id', itemId)
          .eq('user_session', userSession)
          .maybeSingle();
        
        // If table doesn't exist yet, return false
        if (error) return false;
        return !!data;
      }
    },
  });
};

// Keep the old hook for backward compatibility
export const useIsLocationPlanned = (locationId: string) => {
  return useIsItemPlanned(locationId, 'location');
};