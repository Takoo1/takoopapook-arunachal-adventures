
-- Update slider images with beautiful Arunachal Pradesh landscape images
UPDATE slider_images SET image_url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' WHERE id = '9c505619-e399-4360-92f2-4596179c5171';

UPDATE slider_images SET image_url = 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' WHERE id = '311d6479-9e41-4b8c-9a10-a4d833186912';

UPDATE slider_images SET image_url = 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' WHERE id = 'dc43104a-dda6-43e9-a971-6053fa8b0dc3';

-- Update the broken location images
UPDATE locations SET images = ARRAY[
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
] WHERE id = '207e5c8d-5738-4a3c-a79b-ff9e48ac643c';
