-- Create slider_images table for the home page image slider
CREATE TABLE public.slider_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  link_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.slider_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for displaying on home page)
CREATE POLICY "Allow public read access to active slider images" 
ON public.slider_images 
FOR SELECT 
USING (is_active = true);

-- Create policies for admin management (will need authentication later)
CREATE POLICY "Allow all operations on slider_images" 
ON public.slider_images 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_slider_images_updated_at
BEFORE UPDATE ON public.slider_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for ordering
CREATE INDEX idx_slider_images_display_order ON public.slider_images(display_order, is_active);