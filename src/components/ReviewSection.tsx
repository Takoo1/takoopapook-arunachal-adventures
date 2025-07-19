import { usePublishedReviews } from '@/hooks/useReviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, User, Image, Video } from 'lucide-react';
import { Review } from '@/types/database';

interface ReviewSectionProps {
  itemType: 'package' | 'destination';
  itemId: string;
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-800">{review.reviewer_name}</span>
              <Badge variant="outline" className="text-xs">
                Verified Review
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
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
        {/* Experience Summary */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg">
          <p className="text-lg font-medium text-gray-800 italic">
            &ldquo;{review.experience_summary}&rdquo;
          </p>
        </div>

        {/* Detailed Review */}
        <div>
          <p className="text-gray-700 leading-relaxed">
            {review.detailed_review}
          </p>
        </div>

        {/* Media Section */}
        {(review.images.length > 0 || review.videos.length > 0) && (
          <div className="space-y-3">
            {/* Images */}
            {review.images.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Image className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Journey Images ({review.images.length})
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {review.images.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => window.open(image, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {review.videos.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Video className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Journey Videos ({review.videos.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {review.videos.map((video, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <video
                        src={video}
                        controls
                        className="w-full h-full object-cover"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ReviewSection = ({ itemType, itemId }: ReviewSectionProps) => {
  const { data: reviews = [], isLoading } = usePublishedReviews(itemType, itemId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Reviews</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center space-x-2">
          <span>Reviews</span>
          <Badge variant="secondary">{reviews.length}</Badge>
        </h3>
        {reviews.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => {
                const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
                return (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(avgRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-sm text-gray-600">
              {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)} average
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">No Reviews Yet</h4>
            <p className="text-gray-500">Be the first to share your experience!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;