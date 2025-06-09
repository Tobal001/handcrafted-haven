
// src/lib/utils.ts

import { Review } from './definitions'; // <--- ADD THIS IMPORT!

export function calculateAverageRating(reviews?: Review[]): number {
  if (!reviews || reviews.length === 0) {
    return 0;
  }
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}