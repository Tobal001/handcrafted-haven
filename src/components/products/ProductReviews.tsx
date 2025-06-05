import React from 'react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const ProductReviews = ({ productId }: { productId: string }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Reviews</h2>
      <div className="mb-8">
        <ReviewForm />
      </div>
      <div>
        <ReviewList />
      </div>
    </div>
  );
};

export default ProductReviews;
