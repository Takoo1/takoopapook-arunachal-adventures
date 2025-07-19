import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, X, Star } from 'lucide-react';
import { useAllPackages } from '@/hooks/usePackages';
import { useAllLocations } from '@/hooks/useLocations';
import { useCreateReview } from '@/hooks/useReviews';
import { supabase } from '@/integrations/supabase/client';
import PackageCard from '@/components/PackageCard';
import DestinationCard from '@/components/DestinationCard';

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'package' | 'destination';
  
  const { data: packages = [] } = useAllPackages();
  const { data: locations = [] } = useAllLocations();
  const createReview = useCreateReview();

  const [formData, setFormData] = useState({
    experience_summary: '',
    detailed_review: '',
    reviewer_name: '',
    rating: 5
  });
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const item = type === 'package' 
    ? packages.find(p => p.id === id)
    : locations.find(l => l.id === id);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (files: File[], type: 'images' | 'videos') => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('review-media')
        .upload(fileName, file);
      
      if (error) {
        console.error('Upload error:', error);
        continue;
      }
      
      const { data: urlData } = supabase.storage
        .from('review-media')
        .getPublicUrl(data.path);
      
      uploadedUrls.push(urlData.publicUrl);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    setUploading(true);
    
    try {
      const [imageUrls, videoUrls] = await Promise.all([
        handleFileUpload(images, 'images'),
        handleFileUpload(videos, 'videos')
      ]);

      await createReview.mutateAsync({
        item_type: type,
        item_id: id!,
        experience_summary: formData.experience_summary,
        detailed_review: formData.detailed_review,
        reviewer_name: formData.reviewer_name,
        rating: formData.rating,
        images: imageUrls,
        videos: videoUrls,
        is_published: false
      });

      navigate(-1);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number, fileType: 'images' | 'videos') => {
    if (fileType === 'images') {
      setImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setVideos(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item not found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
          <h1 className="text-3xl font-bold text-center mb-2">Add Review</h1>
          <p className="text-muted-foreground text-center">
            Share your experience with this {type}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{type} Details</CardTitle>
              </CardHeader>
              <CardContent>
                {type === 'package' ? (
                  <PackageCard 
                    package={item as any} 
                  />
                ) : (
                  <DestinationCard 
                    location={item as any} 
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Review Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Write Your Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div className="space-y-2">
                    <Label>Overall Rating</Label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleInputChange('rating', star)}
                          className={`p-1 ${
                            star <= formData.rating
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {formData.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Experience Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Your Experience in One Beautiful Sentence
                    </Label>
                    <Input
                      id="experience"
                      value={formData.experience_summary}
                      onChange={(e) => handleInputChange('experience_summary', e.target.value)}
                      placeholder="Describe your experience in one captivating sentence..."
                      required
                    />
                  </div>

                  {/* Detailed Review */}
                  <div className="space-y-2">
                    <Label htmlFor="detailed">
                      Tell Us More - What Went Good and Your Opinion
                    </Label>
                    <Textarea
                      id="detailed"
                      value={formData.detailed_review}
                      onChange={(e) => handleInputChange('detailed_review', e.target.value)}
                      placeholder="Share your detailed experience, what you loved, and your honest opinion..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Reviewer Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Your Name (as you want it to appear)
                    </Label>
                    <Input
                      id="name"
                      value={formData.reviewer_name}
                      onChange={(e) => handleInputChange('reviewer_name', e.target.value)}
                      placeholder="Enter your name or preferred display name"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Add Your Journey Images (Max 5)</Label>
                    <div className="space-y-4">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (images.length + files.length <= 5) {
                            setImages(prev => [...prev, ...files]);
                          }
                        }}
                        className="hidden"
                        id="images"
                      />
                      <label
                        htmlFor="images"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary"
                      >
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            Click to upload images ({images.length}/5)
                          </p>
                        </div>
                      </label>
                      
                      {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {images.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                                className="w-full h-20 object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'images')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Upload */}
                  <div className="space-y-2">
                    <Label>Add Videos (Max 2)</Label>
                    <div className="space-y-4">
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (videos.length + files.length <= 2) {
                            setVideos(prev => [...prev, ...files]);
                          }
                        }}
                        className="hidden"
                        id="videos"
                      />
                      <label
                        htmlFor="videos"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary"
                      >
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            Click to upload videos ({videos.length}/2)
                          </p>
                        </div>
                      </label>
                      
                      {videos.length > 0 && (
                        <div className="space-y-2">
                          {videos.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                              <span className="text-sm truncate">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index, 'videos')}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={uploading || createReview.isPending}
                  >
                    {uploading || createReview.isPending ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;