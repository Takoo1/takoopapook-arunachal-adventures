
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BookingCancellation {
  id: string;
  booking_id: string;
  reason: string;
  details: string | null;
  status: 'processing' | 'cancelled' | string;
  user_session: string | null;
  created_at: string;
  updated_at: string;
}

export const useBookingCancellations = () => {
  return useQuery({
    queryKey: ['booking_cancellations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booking_cancellations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching booking cancellations:', error);
        throw error;
      }

      return data as BookingCancellation[];
    },
  });
};

export const useCreateCancellationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Omit<BookingCancellation, 'id' | 'created_at' | 'updated_at' | 'user_session'>) => {
      const { data, error } = await supabase
        .from('booking_cancellations')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Error creating cancellation request:', error);
        throw error;
      }

      return data as BookingCancellation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking_cancellations'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useUpdateCancellationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cancellationId, status }: { cancellationId: string; status: 'processing' | 'cancelled' | string }) => {
      const { data, error } = await supabase
        .from('booking_cancellations')
        .update({ status })
        .eq('id', cancellationId)
        .select()
        .single();

      if (error) {
        console.error('Error updating cancellation status:', error);
        throw error;
      }

      return data as BookingCancellation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking_cancellations'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
