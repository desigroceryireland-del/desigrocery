import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
              {review.userName.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{review.userName}</span>
            {review.verified && (
              <span className="text-xs bg-green-light text-green px-2 py-0.5 rounded-full">
                Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? 'fill-turmeric text-turmeric' : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">{review.comment}</p>
      
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
        <ThumbsUp className="h-4 w-4 mr-2" />
        Helpful ({review.helpful})
      </Button>
    </div>
  );
};

// Sample reviews data
export const sampleReviews: Review[] = [
  {
    id: '1',
    userName: 'Rahul M.',
    rating: 5,
    date: 'January 15, 2024',
    comment: 'Excellent quality! The basmati rice has a wonderful aroma and cooks perfectly every time. Will definitely order again.',
    helpful: 12,
    verified: true,
  },
  {
    id: '2',
    userName: 'Priya S.',
    rating: 4,
    date: 'January 10, 2024',
    comment: 'Good product, fast delivery. The packaging could be better but overall satisfied with the purchase.',
    helpful: 5,
    verified: true,
  },
  {
    id: '3',
    userName: 'Amit K.',
    rating: 5,
    date: 'January 5, 2024',
    comment: 'Authentic taste! Reminds me of home. The spices are fresh and aromatic. Highly recommended for anyone missing Indian flavors.',
    helpful: 8,
    verified: true,
  },
];
