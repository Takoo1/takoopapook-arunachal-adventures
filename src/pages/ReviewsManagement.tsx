import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useReviews, useUpdateReview, useDeleteReview } from '@/hooks/useReviews';
import { Review } from '@/types/database';
import { Edit, Eye, EyeOff, Trash2, Star, Calendar, User, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ReviewsManagement = () => {
  const { data: reviews = [], isLoading } = useReviews();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();
  
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editForm, setEditForm] = useState({
    experience_summary: '',
    detailed_review: '',
    reviewer_name: '',
    rating: 5
  });

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setEditForm({
      experience_summary: review.experience_summary,
      detailed_review: review.detailed_review,
      reviewer_name: review.reviewer_name,
      rating: review.rating
    });
  };

  const handleUpdate = async () => {
    if (!editingReview) return;
    
    await updateReview.mutateAsync({
      id: editingReview.id,
      ...editForm
    });
    
    setEditingReview(null);
  };

  const togglePublished = async (review: Review) => {
    await updateReview.mutateAsync({
      id: review.id,
      is_published: !review.is_published
    });
  };

  const handleDelete = async (id: string) => {
    await deleteReview.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Reviews Management
        </h2>
        <p className="text-gray-600">
          Manage user reviews for packages and destinations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Reviews Yet</h3>
                <p className="text-gray-500">Reviews will appear here once users submit them.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={review.item_type === 'package' ? 'default' : 'secondary'}>
                        {review.item_type}
                      </Badge>
                      <Badge variant={review.is_published ? 'default' : 'destructive'}>
                        {review.is_published ? 'Published' : 'Unpublished'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">
                      {review.item_type === 'package' ? `Package ID: ${review.item_id}` : `Destination ID: ${review.item_id}`}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({review.rating})</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-1">Experience Summary</h4>
                  <p className="text-gray-800 italic">&ldquo;{review.experience_summary}&rdquo;</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-1">Detailed Review</h4>
                  <p className="text-gray-700 line-clamp-3">{review.detailed_review}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{review.reviewer_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Media Display */}
                {(review.images.length > 0 || review.videos.length > 0) && (
                  <div className="space-y-2">
                    {review.images.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 mb-2">Images ({review.images.length})</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {review.images.slice(0, 4).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-full h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {review.videos.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 mb-2">Videos ({review.videos.length})</h4>
                        <div className="text-sm text-gray-500">
                          {review.videos.length} video{review.videos.length > 1 ? 's' : ''} attached
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(review)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Review</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          <div className="space-y-2">
                            <Label>Rating</Label>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEditForm(prev => ({ ...prev, rating: star }))}
                                  className={`p-1 ${
                                    star <= editForm.rating
                                      ? 'text-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                >
                                  <Star className="h-5 w-5 fill-current" />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Experience Summary</Label>
                            <Input
                              value={editForm.experience_summary}
                              onChange={(e) => setEditForm(prev => ({ ...prev, experience_summary: e.target.value }))}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Detailed Review</Label>
                            <Textarea
                              value={editForm.detailed_review}
                              onChange={(e) => setEditForm(prev => ({ ...prev, detailed_review: e.target.value }))}
                              rows={4}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Reviewer Name</Label>
                            <Input
                              value={editForm.reviewer_name}
                              onChange={(e) => setEditForm(prev => ({ ...prev, reviewer_name: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" onClick={() => setEditingReview(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdate}>
                            Update Review
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePublished(review)}
                      className={
                        review.is_published
                          ? 'text-orange-600 hover:text-orange-700'
                          : 'text-green-600 hover:text-green-700'
                      }
                    >
                      {review.is_published ? (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Publish
                        </>
                      )}
                    </Button>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Review</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this review? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(review.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsManagement;