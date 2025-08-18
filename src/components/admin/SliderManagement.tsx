import { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Upload, ExternalLink, GripVertical, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSliderImages, useCreateSliderImage, useUpdateSliderImage, useDeleteSliderImage, SliderImage } from '@/hooks/useSliderImages';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SliderManagement = () => {
  const { data: images = [], isLoading } = useSliderImages();
  const createSliderImage = useCreateSliderImage();
  const updateSliderImage = useUpdateSliderImage();
  const deleteSliderImage = useDeleteSliderImage();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<SliderImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    link_url: '',
    display_order: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      image_url: '',
      link_url: '',
      display_order: images.length,
      is_active: true,
    });
    setEditingImage(null);
  };

  const openDialog = (image?: SliderImage) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        image_url: image.image_url,
        link_url: image.link_url || '',
        display_order: image.display_order,
        is_active: image.is_active,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image_url) {
      toast({
        title: "Error",
        description: "Please upload an image",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingImage) {
        await updateSliderImage.mutateAsync({
          id: editingImage.id,
          ...formData,
        });
        toast({
          title: "Success",
          description: "Slider image updated successfully",
        });
      } else {
        await createSliderImage.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Slider image created successfully",
        });
      }
      closeDialog();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save slider image",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this slider image?')) {
      try {
        await deleteSliderImage.mutateAsync(id);
        toast({
          title: "Success",
          description: "Slider image deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete slider image",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const fileName = `slider-${Date.now()}-${Math.random().toString(36).substring(2)}.${file.name.split('.').pop()}`;
      
      const { data, error } = await supabase.storage
        .from('location-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('location-media')
        .getPublicUrl(fileName);
        
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Slider Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-64 bg-muted rounded-t-lg" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Slider Management</h2>
          <p className="text-muted-foreground">Manage images for the home page slider</p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={image.image_url}
                alt="Slider image"
                className="w-full h-48 object-cover rounded-t-lg"
                style={{ aspectRatio: '4/5' }}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openDialog(image)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(image.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              {!image.is_active && (
                <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                  <span className="text-white font-semibold">INACTIVE</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Order: {image.display_order}</span>
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  {image.link_url && (
                    <ExternalLink className="w-4 h-4 text-primary" />
                  )}
                </div>
              </div>
              {image.link_url && (
                <p className="text-xs text-muted-foreground truncate">
                  Link: {image.link_url}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingImage ? 'Edit Slider Image' : 'Add Slider Image'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Image (4:5 ratio recommended)</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center gap-2"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              {formData.image_url && (
                <div className="mt-2">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-20 h-25 object-cover rounded-lg mx-auto"
                    style={{ aspectRatio: '4/5' }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="link_url">Link URL (optional)</Label>
              <Input
                id="link_url"
                value={formData.link_url}
                onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
                placeholder="https://youtube.com/... or any URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                min={0}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={closeDialog}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={createSliderImage.isPending || updateSliderImage.isPending}
              >
                {editingImage ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SliderManagement;