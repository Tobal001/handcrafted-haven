
// src/components/reviews/ReviewForm.tsx

'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { createReview } from '../../lib/data/reviews';

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: () => void;
}

export default function ReviewForm({ productId, onReviewSubmit }: ReviewFormProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      setError('You must be logged in to submit a review');
      return;
    }
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await createReview({
        productId,
        userId: session.user.id,
        rating,
        title,
        comment
      });
      
      // Reset form
      setRating(0);
      setTitle('');
      setComment('');
      onReviewSubmit();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Review submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#E6E1DC]">
      <h3 className="text-lg font-medium text-[#3E3E3E] mb-4">Write a Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#3E3E3E] mb-1">
            Your Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <StarIcon
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            Review Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
            placeholder="Summarize your experience"
          />
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-[#3E3E3E] mb-1">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxLength={1000}
            className="block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
            placeholder="Share details about your experience with this product"
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-[#B55B3D] hover:bg-[#9E4F37]"
            disabled={isSubmitting || !session?.user}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  );
}

