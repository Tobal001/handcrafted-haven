
// src/lib/data/reviews.ts
'use server';

import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/lib/prisma';
import { Review } from '@/lib/definitions';

export async function createReview(reviewData: {
  productId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
}) {
  noStore();
  try {
    const review = await prisma.review.create({
      data: {
        productId: reviewData.productId,
        userId: reviewData.userId,
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
        isApproved: true, // Set to false if you want admin approval
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    
    // Update product's average rating
    await updateProductAverageRating(reviewData.productId);
    
    return review;
  } catch (error) {
    console.error('Database Error (createReview):', error);
    throw new Error('Failed to create review.');
  }
}



export async function updateProductAverageRating(productId: string) {
  noStore();
  try {
    const result = await prisma.review.aggregate({
      where: { productId, isApproved: true }, // Only approved reviews contribute to public rating
      _avg: { rating: true },
      _count: { rating: true },
    });
    
    // Calculate the actual average and count, handling null for no reviews
    const averageRating = result._avg.rating || 0;
    const reviewCount = result._count.rating || 0;

    await prisma.product.update({
      where: { productId },
      data: {
        averageRating: averageRating, // Update the product's average rating
        reviewCount: reviewCount,     // Update the product's review count
      },
    });
    
    return {
      averageRating: averageRating,
      reviewCount: reviewCount,
    };
  } catch (error) {
    console.error('Database Error (updateProductAverageRating):', error);
    throw new Error('Failed to update product rating.');
  }
}


export async function fetchProductReviews(productId: string): Promise<Review[]> {
  noStore();
  try {
    const reviews = await prisma.review.findMany({
      where: { productId, isApproved: true },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        reviewDate: 'desc',
      },
    });
    
    return reviews.map(review => ({
      ...review,
      user: review.user ? { name: review.user.name } : undefined,
    }));
  } catch (error) {
    console.error('Database Error (fetchProductReviews):', error);
    throw new Error('Failed to fetch product reviews.');
  }
}