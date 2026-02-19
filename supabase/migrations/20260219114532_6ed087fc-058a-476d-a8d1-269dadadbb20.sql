
-- 1. Create a security definer helper to check admin role (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = _user_id AND role = 'admin'
  )
$$;

-- =============================================
-- 2. FIX BOOKINGS TABLE RLS
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on bookings" ON public.bookings;

CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid()::text = user_session OR public.is_admin(auth.uid()));

CREATE POLICY "Users can create own bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid()::text = user_session);

CREATE POLICY "Users can update own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid()::text = user_session OR public.is_admin(auth.uid()))
  WITH CHECK (auth.uid()::text = user_session OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete bookings"
  ON public.bookings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================
-- 3. FIX BOOKING_CANCELLATIONS TABLE RLS
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on booking_cancellations" ON public.booking_cancellations;

CREATE POLICY "Users can view own cancellations"
  ON public.booking_cancellations FOR SELECT
  USING (auth.uid()::text = user_session OR public.is_admin(auth.uid()));

CREATE POLICY "Users can create own cancellations"
  ON public.booking_cancellations FOR INSERT
  WITH CHECK (auth.uid()::text = user_session);

CREATE POLICY "Admins can update cancellations"
  ON public.booking_cancellations FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete cancellations"
  ON public.booking_cancellations FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================
-- 4. FIX PACKAGES TABLE RLS (public read, admin write)
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on packages" ON public.packages;
-- Keep existing "Allow public read access to packages" policy

CREATE POLICY "Admins manage packages"
  ON public.packages FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins update packages"
  ON public.packages FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins delete packages"
  ON public.packages FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================
-- 5. FIX LOCATIONS TABLE RLS (public read, admin write)
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on locations" ON public.locations;
-- Keep existing "Allow public read access to locations" policy

CREATE POLICY "Admins manage locations"
  ON public.locations FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins update locations"
  ON public.locations FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins delete locations"
  ON public.locations FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================
-- 6. FIX SLIDER_IMAGES TABLE RLS (public read active, admin write)
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on slider_images" ON public.slider_images;
-- Keep existing "Allow public read access to active slider images" policy

CREATE POLICY "Admins manage slider_images"
  ON public.slider_images FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins update slider_images"
  ON public.slider_images FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins delete slider_images"
  ON public.slider_images FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================
-- 7. FIX REVIEWS TABLE RLS (public read published, authenticated insert, admin manage)
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on reviews" ON public.reviews;
-- Keep existing "Allow public read access to published reviews" policy

CREATE POLICY "Authenticated users can submit reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins update reviews"
  ON public.reviews FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins delete reviews"
  ON public.reviews FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================
-- 8. FIX PLANNED_LOCATIONS TABLE RLS (user-scoped)
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on planned_locations" ON public.planned_locations;

CREATE POLICY "Users can view own planned locations"
  ON public.planned_locations FOR SELECT
  USING (auth.uid()::text = user_session OR public.is_admin(auth.uid()));

CREATE POLICY "Users can create own planned locations"
  ON public.planned_locations FOR INSERT
  WITH CHECK (auth.uid()::text = user_session);

CREATE POLICY "Users can delete own planned locations"
  ON public.planned_locations FOR DELETE
  USING (auth.uid()::text = user_session OR public.is_admin(auth.uid()));

CREATE POLICY "Users can update own planned locations"
  ON public.planned_locations FOR UPDATE
  USING (auth.uid()::text = user_session);

-- =============================================
-- 9. FIX PLANNED_PACKAGES TABLE RLS (user-scoped)
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on planned_packages" ON public.planned_packages;

CREATE POLICY "Users can view own planned packages"
  ON public.planned_packages FOR SELECT
  USING (auth.uid()::text = user_session OR public.is_admin(auth.uid()));

CREATE POLICY "Users can create own planned packages"
  ON public.planned_packages FOR INSERT
  WITH CHECK (auth.uid()::text = user_session);

CREATE POLICY "Users can delete own planned packages"
  ON public.planned_packages FOR DELETE
  USING (auth.uid()::text = user_session OR public.is_admin(auth.uid()));

CREATE POLICY "Users can update own planned packages"
  ON public.planned_packages FOR UPDATE
  USING (auth.uid()::text = user_session);

-- =============================================
-- 10. FIX MAP_SETTINGS TABLE RLS (public read, admin write)
-- =============================================
DROP POLICY IF EXISTS "Allow all operations on map_settings" ON public.map_settings;
-- Keep existing "Allow public read access to map_settings" policy

CREATE POLICY "Admins manage map_settings"
  ON public.map_settings FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins update map_settings"
  ON public.map_settings FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins delete map_settings"
  ON public.map_settings FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =============================================
-- 11. FIX STORAGE BUCKET POLICIES
-- =============================================
-- Remove public write policies for location-media
DROP POLICY IF EXISTS "Public upload access for location-media" ON storage.objects;
DROP POLICY IF EXISTS "Public update access for location-media" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access for location-media" ON storage.objects;

-- Remove public write policies for review-media
DROP POLICY IF EXISTS "Public upload access for review-media" ON storage.objects;
DROP POLICY IF EXISTS "Public update access for review-media" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access for review-media" ON storage.objects;

-- Remove public write policies for review-videos
DROP POLICY IF EXISTS "Public upload access for review-videos" ON storage.objects;
DROP POLICY IF EXISTS "Public update access for review-videos" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access for review-videos" ON storage.objects;

-- location-media: admin-only uploads
CREATE POLICY "Admin upload to location-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'location-media' AND auth.role() = 'authenticated' AND public.is_admin(auth.uid()));

CREATE POLICY "Admin update location-media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'location-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admin delete location-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'location-media' AND public.is_admin(auth.uid()));

-- review-media: authenticated users can upload, admins can modify/delete
CREATE POLICY "Authenticated upload to review-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'review-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update review-media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'review-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admin delete review-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'review-media' AND public.is_admin(auth.uid()));

-- review-videos: authenticated users can upload, admins can modify/delete
CREATE POLICY "Authenticated upload to review-videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'review-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update review-videos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'review-videos' AND public.is_admin(auth.uid()));

CREATE POLICY "Admin delete review-videos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'review-videos' AND public.is_admin(auth.uid()));
