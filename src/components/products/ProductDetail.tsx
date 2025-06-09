
// // src/components/products/ProductDetail.tsx

// 'use client';

// import Image from 'next/image';
// import { Product, Review } from '@/lib/definitions'; // Ensure Review is imported here
// import { StarIcon } from '@heroicons/react/24/solid';
// import { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import { fetchProductReviews } from '@/lib/data/reviews';
// import ReviewForm from '../reviews/ReviewForm';
// import { useSession } from 'next-auth/react'; // Import useSession
// import Link from 'next/link'; // Import Link for navigation
// import { ShoppingCartIcon, TagIcon, SparklesIcon, CheckCircleIcon, XCircleIcon, CalendarIcon, AcademicCapIcon } from '@heroicons/react/24/outline'; // Added more icons for detail sections

// // Assuming ProductDetailProps is defined similarly to:
// interface ProductDetailProps {
//   product: Product;
// }

// export default function ProductDetail({ product }: ProductDetailProps) {
//   const { data: session, status } = useSession(); // Get session data
//   const currentUserId = session?.user?.id; // Assuming user.id is available in session
//   const currentUserRole = session?.user?.role; // Assuming user.role is available (e.g., 'buyer', 'artisan', 'admin')

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [reviews, setReviews] = useState<Review[]>(product.reviews as Review[] || []);
//   const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle form visibility

//   const primaryImage = product.images?.[selectedImage] || product.images?.find(img => img.isPrimary) || product.images?.[0]; // Use selectedImage for primary display first

//   const refreshReviews = async () => {
//     try {
//       const updatedReviews: Review[] = await fetchProductReviews(product.productId);
//       setReviews(updatedReviews);
//     } catch (error) {
//       console.error('Failed to refresh reviews:', error);
//     }
//   };

//   useEffect(() => {
//     refreshReviews();
//   }, [product.productId]);

//   const averageRating = reviews.length > 0
//     ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//     : 0;

//   // --- RBAC Logic for Review Submission ---
//   const isLoggedIn = status === 'authenticated';
//   const isBuyer = currentUserRole === 'buyer';
//   const isArtisan = currentUserRole === 'artisan';
//   const isProductOwner = product.seller?.userId === currentUserId; // Check if the logged-in user owns this product

//   let canWriteReview = false;
//   let reviewSubmissionMessage = '';

//   if (!isLoggedIn) {
//     reviewSubmissionMessage = "Please sign in to write a review.";
//   } else if (isArtisan) {
//     // If the user has the 'artisan' role, they are generally not allowed to review.
//     // A more specific message is shown if it's their own product.
//     reviewSubmissionMessage = "Artisans are not allowed to submit reviews.";
//     if (isProductOwner) {
//       reviewSubmissionMessage = "Artisans cannot review their own products.";
//     }
//   } else if (!isBuyer) {
//     // This catches 'admin' or any other non-buyer role if they are logged in.
//     reviewSubmissionMessage = "Only users with the buyer role can submit reviews.";
//   } else {
//     // All checks passed: logged in, is a buyer, and not an artisan trying to review (since artisan check is above)
//     canWriteReview = true;
//   }
//   // --- End RBAC Logic ---

//   return (
//     <div className="bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8"> {/* Added main background */}
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E6E1DC] p-8 md:p-12"> {/* Enhanced main card styling */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"> {/* Increased gap */}
//             {/* Product Images */}
//             <div className="flex flex-col items-center">
//               <div className="w-full h-96 bg-[#F9F4EF] relative rounded-2xl overflow-hidden shadow-lg mb-6 flex items-center justify-center"> {/* Larger, more prominent main image */}
//                 {primaryImage?.imageUrl ? (
//                   <Image
//                     src={primaryImage.imageUrl}
//                     alt={product.name}
//                     fill
//                     sizes="(max-width: 1024px) 100vw, 50vw"
//                     className="object-cover transition-transform duration-300 hover:scale-105" // Changed object-contain to object-cover
//                   />
//                 ) : (
//                   <div className="text-xl text-[#6C6C6C] font-semibold">
//                     No Image Available
//                   </div>
//                 )}
//               </div>

//               {product.images && product.images.length > 1 && (
//                 <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 w-full max-w-md"> {/* More columns for thumbnails */}
//                   {product.images.map((image, index) => (
//                     <button
//                       key={image.imageId}
//                       onClick={() => setSelectedImage(index)}
//                       className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#B55B3D] ${
//                         selectedImage === index ? 'border-[#B55B3D] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
//                       }`}
//                     >
//                       <Image
//                         src={image.imageUrl}
//                         alt={`${product.name} thumbnail ${index + 1}`}
//                         fill
//                         sizes="80px"
//                         className="object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Product Info */}
//             <div className="lg:pt-4"> {/* Added padding for alignment with image */}
//               <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-4 leading-tight tracking-tight">
//                 {product.name}
//               </h1>

//               {/* Featured and Active Status */}
//               <div className="flex items-center gap-4 mb-5 text-base font-semibold">
//                 {product.isFeatured && (
//                   <span className="bg-[#FFF8F5] text-[#B55B3D] px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
//                     <SparklesIcon className="h-4 w-4 fill-current" /> Featured
//                   </span>
//                 )}
//                 <span className={`px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm ${
//                   product.isActive
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-red-100 text-red-700'
//                 }`}>
//                   {product.isActive ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
//                   {product.isActive ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>

//               {/* Rating Display */}
//               <div className="flex items-center mb-5">
//                 <div className="flex mr-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <StarIcon
//                       key={star}
//                       className={`h-6 w-6 ${
//                         star <= Math.round(averageRating)
//                           ? 'text-yellow-400'
//                           : 'text-gray-300'
//                       } transition-colors duration-200`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-lg text-[#6C6C6C] font-medium">
//                   {averageRating.toFixed(1)} ({reviews.length} reviews)
//                 </span>
//               </div>

//               {/* Price */}
//               <p className="text-4xl font-extrabold text-[#B55B3D] mb-8">
//                 ${product.price.toFixed(2)}
//               </p>

//               {/* Description */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-bold text-[#3E3E3E] mb-3 border-b pb-2 border-[#F3ECE5]">Description</h2>
//                 <p className="text-[#6C6C6C] leading-relaxed whitespace-pre-line">{product.description}</p>
//               </div>

//               {/* Details Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
//                 {product.materialsUsed && (
//                   <div className="flex items-start">
//                     <AcademicCapIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" />
//                     <div>
//                       <h3 className="text-base font-semibold text-[#6C6C6C]">Materials</h3>
//                       <p className="text-[#3E3E3E] text-lg">{product.materialsUsed}</p>
//                     </div>
//                   </div>
//                 )}
//                 {product.dimensions && (
//                   <div className="flex items-start">
//                     <AcademicCapIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" /> {/* Placeholder, ideally a dimension icon */}
//                     <div>
//                       <h3 className="text-base font-semibold text-[#6C6C6C]">Dimensions</h3>
//                       <p className="text-[#3E3E3E] text-lg">{product.dimensions}</p>
//                     </div>
//                   </div>
//                 )}
//                 {product.weight && (
//                   <div className="flex items-start">
//                     <AcademicCapIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" /> {/* Placeholder, ideally a weight icon */}
//                     <div>
//                       <h3 className="text-base font-semibold text-[#6C6C6C]">Weight</h3>
//                       <p className="text-[#3E3E3E] text-lg">{product.weight} lbs</p>
//                     </div>
//                   </div>
//                 )}
//                 {product.careInstructions && (
//                   <div className="flex items-start">
//                     <AcademicCapIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" /> {/* Placeholder, ideally a care icon */}
//                     <div>
//                       <h3 className="text-base font-semibold text-[#6C6C6C]">Care Instructions</h3>
//                       <p className="text-[#3E3E3E] text-lg whitespace-pre-line">{product.careInstructions}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Seller */}
//               {product.seller && (
//                 <div className="mb-8 p-4 bg-[#F9F4EF] rounded-xl flex items-center gap-4 shadow-inner border border-[#E6E1DC]"> {/* Styled seller box */}
//                   <div className="w-16 h-16 rounded-full bg-[#E6E1DC] flex items-center justify-center flex-shrink-0 border-2 border-[#B55B3D] shadow-md">
//                     <span className="text-[#B55B3D] text-xl font-bold">
//                       {product.seller?.shopName?.charAt(0).toUpperCase() || 'A'}
//                     </span>
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-bold text-[#3E3E3E]">{product.seller.shopName}</h2>
//                     <p className="text-base text-[#6C6C6C]">
//                       By: <Link href={`/artisans/${product.seller.userId}`} className="text-[#B55B3D] hover:underline font-medium">{product.seller?.user?.name || 'Artisan'}</Link>
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Add to Cart */}
//               <div className="flex flex-col sm:flex-row gap-4"> {/* Responsive buttons */}
//                 <div className="flex items-center border border-[#E6E1DC] rounded-xl overflow-hidden shadow-sm">
//                   <button className="px-5 py-3 text-[#6C6C6C] hover:bg-[#F3ECE5] transition-colors duration-200 text-lg font-semibold">-</button>
//                   <span className="px-6 py-3 text-lg font-bold text-[#3E3E3E]">1</span>
//                   <button className="px-5 py-3 text-[#6C6C6C] hover:bg-[#F3ECE5] transition-colors duration-200 text-lg font-semibold">+</button>
//                 </div>
//                 <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex-1 text-white py-3.5 rounded-xl text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
//                   <ShoppingCartIcon className="h-5 w-5" /> Add to Cart
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Reviews Section */}
//           <div className="border-t border-[#E6E1DC] pt-10 mt-10"> {/* More padding and margin for separation */}
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
//               <h2 className="text-3xl font-bold text-[#3E3E3E]">
//                 Customer Reviews ({reviews.length})
//               </h2>
//               {/* Conditionally render the "Write a Review" button */}
//               {canWriteReview && (
//                 <Button
//                   onClick={() => setShowReviewForm(!showReviewForm)}
//                   className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2.5 px-6 rounded-xl text-base font-semibold shadow-md transition-all duration-300"
//                 >
//                   {showReviewForm ? 'Cancel Review' : 'Write a Review'}
//                 </Button>
//               )}
//             </div>

//             {/* Display messages if review submission is restricted */}
//             {!canWriteReview && reviewSubmissionMessage && (
//               <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6 text-center font-medium shadow-sm">
//                 {reviewSubmissionMessage}
//                 {!isLoggedIn && (
//                   <>
//                     <Link href="/api/auth/signin" className="text-[#B55B3D] hover:underline ml-1">
//                       Sign In
//                     </Link>
//                     <span className="mx-1">or</span>
//                     <Link href="/register" className="text-[#B55B3D] hover:underline">
//                       Create an Account
//                     </Link>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Review Form (only show if canWriteReview is true and showReviewForm is toggled) */}
//             {showReviewForm && canWriteReview && (
//               <div className="mb-8 p-6 bg-[#F9F4EF] rounded-xl shadow-inner border border-[#E6E1DC]"> {/* Styled review form container */}
//                 <ReviewForm
//                   productId={product.productId}
//                   onReviewSubmit={() => {
//                     refreshReviews();
//                     setShowReviewForm(false);
//                   }}
//                 />
//               </div>
//             )}

//             {/* Existing reviews display */}
//             {reviews.length === 0 ? (
//               <p className="text-[#6C6C6C] text-center py-6 text-lg font-medium">No reviews yet. Be the first to share your thoughts!</p>
//             ) : (
//               <div className="space-y-8"> {/* Increased space between reviews */}
//                 {reviews.map((review) => (
//                   <div key={review.reviewId} className="border-b border-[#E6E1DC] pb-8 last:border-0 last:pb-0"> {/* More padding */}
//                     <div className="flex items-center gap-4 mb-3"> {/* Increased gap */}
//                       <div className="w-12 h-12 rounded-full bg-[#F9F4EF] flex items-center justify-center flex-shrink-0 text-[#B55B3D] font-bold text-lg border-2 border-[#B55B3D]"> {/* Larger avatar */}
//                         {review.user?.name?.charAt(0).toUpperCase() || 'U'}
//                       </div>
//                       <div>
//                         <p className="text-[#3E3E3E] font-bold text-lg">{review.user?.name || 'Anonymous User'}</p>
//                         <div className="flex items-center mt-1">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <StarIcon
//                               key={star}
//                               className={`h-5 w-5 ${
//                                 star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
//                               }`}
//                             />
//                           ))}
//                           <span className="text-sm text-[#6C6C6C] ml-2 flex items-center">
//                             <CalendarIcon className="h-4 w-4 mr-1" /> {/* Calendar icon for date */}
//                             {new Date(review.reviewDate).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'short', // 'short' month name (e.g., "Jan")
//                               day: '2-digit',
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold text-[#3E3E3E] mb-2">{review.title}</h3>
//                     <p className="text-[#6C6C6C] leading-relaxed whitespace-pre-line text-base">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

























// src/components/products/ProductDetail.tsx

'use client';

import Image from 'next/image';
import { Product, Review } from '@/lib/definitions'; // Ensure Review is imported here
import { StarIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { fetchProductReviews } from '@/lib/data/reviews';
import ReviewForm from '../reviews/ReviewForm';
import { useSession } from 'next-auth/react'; // Import useSession
import Link from 'next/link'; // Import Link for navigation
import {
  ShoppingCartIcon,
  TagIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  AcademicCapIcon, // Keep AcademicCapIcon if it's used elsewhere, otherwise remove if only for this.
  AdjustmentsHorizontalIcon, // For Dimensions
  ScaleIcon, // For Weight
  SparklesIcon as MaterialIcon, // Re-using Sparkles for something crafted, or consider a different icon if available for 'materials'
  CubeTransparentIcon, // Another option for materials
  SwatchIcon, // Good for materials
  CubeIcon, // Good for dimensions
  WrenchScrewdriverIcon, // For care instructions
  PaintBrushIcon // Another option for materials
} from '@heroicons/react/24/outline'; // Added more icons for detail sections. Imported new ones here.

// Assuming ProductDetailProps is defined similarly to:
interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { data: session, status } = useSession(); // Get session data
  const currentUserId = session?.user?.id; // Assuming user.id is available in session
  const currentUserRole = session?.user?.role; // Assuming user.role is available (e.g., 'buyer', 'artisan', 'admin')

  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(product.reviews as Review[] || []);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle form visibility

  const primaryImage = product.images?.[selectedImage] || product.images?.find(img => img.isPrimary) || product.images?.[0]; // Use selectedImage for primary display first

  const refreshReviews = async () => {
    try {
      const updatedReviews: Review[] = await fetchProductReviews(product.productId);
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Failed to refresh reviews:', error);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, [product.productId]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // --- RBAC Logic for Review Submission ---
  const isLoggedIn = status === 'authenticated';
  const isBuyer = currentUserRole === 'buyer';
  const isArtisan = currentUserRole === 'artisan';
  const isProductOwner = product.seller?.userId === currentUserId; // Check if the logged-in user owns this product

  let canWriteReview = false;
  let reviewSubmissionMessage = '';

  if (!isLoggedIn) {
    reviewSubmissionMessage = "Please sign in to write a review.";
  } else if (isArtisan) {
    // If the user has the 'artisan' role, they are generally not allowed to review.
    // A more specific message is shown if it's their own product.
    reviewSubmissionMessage = "Artisans are not allowed to submit reviews.";
    if (isProductOwner) {
      reviewSubmissionMessage = "Artisans cannot review their own products.";
    }
  } else if (!isBuyer) {
    // This catches 'admin' or any other non-buyer role if they are logged in.
    reviewSubmissionMessage = "Only users with the buyer role can submit reviews.";
  } else {
    // All checks passed: logged in, is a buyer, and not an artisan trying to review (since artisan check is above)
    canWriteReview = true;
  }
  // --- End RBAC Logic ---

  return (
    <div className="bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8"> {/* Added main background */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E6E1DC] p-8 md:p-12"> {/* Enhanced main card styling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"> {/* Increased gap */}
            {/* Product Images */}
            <div className="flex flex-col items-center">
              <div className="w-full h-96 bg-[#F9F4EF] relative rounded-2xl overflow-hidden shadow-lg mb-6 flex items-center justify-center"> {/* Larger, more prominent main image */}
                {primaryImage?.imageUrl ? (
                  <Image
                    src={primaryImage.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 hover:scale-105" // Changed object-contain to object-cover
                  />
                ) : (
                  <div className="text-xl text-[#6C6C6C] font-semibold">
                    No Image Available
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 w-full max-w-md"> {/* More columns for thumbnails */}
                  {product.images.map((image, index) => (
                    <button
                      key={image.imageId}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#B55B3D] ${
                        selectedImage === index ? 'border-[#B55B3D] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:pt-4"> {/* Added padding for alignment with image */}
              <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-4 leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Featured and Active Status */}
              <div className="flex items-center gap-4 mb-5 text-base font-semibold">
                {product.isFeatured && (
                  <span className="bg-[#FFF8F5] text-[#B55B3D] px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <SparklesIcon className="h-4 w-4 fill-current" /> Featured
                  </span>
                )}
                <span className={`px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm ${
                  product.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.isActive ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
                  {product.isActive ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Rating Display */}
              <div className="flex items-center mb-5">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } transition-colors duration-200`}
                    />
                  ))}
                </div>
                <span className="text-lg text-[#6C6C6C] font-medium">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <p className="text-4xl font-extrabold text-[#B55B3D] mb-8">
                ${product.price.toFixed(2)}
              </p>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#3E3E3E] mb-3 border-b pb-2 border-[#F3ECE5]">Description</h2>
                <p className="text-[#6C6C6C] leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {product.materialsUsed && (
                  <div className="flex items-start">
                    {/* Replaced AcademicCapIcon with SwatchIcon for Materials */}
                    <SwatchIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-[#6C6C6C]">Materials</h3>
                      <p className="text-[#3E3E3E] text-lg">{product.materialsUsed}</p>
                    </div>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-start">
                    {/* Replaced AcademicCapIcon with CubeIcon for Dimensions */}
                    <CubeIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-[#6C6C6C]">Dimensions</h3>
                      <p className="text-[#3E3E3E] text-lg">{product.dimensions}</p>
                    </div>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-start">
                    {/* Replaced AcademicCapIcon with ScaleIcon for Weight */}
                    <ScaleIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-[#6C6C6C]">Weight</h3>
                      <p className="text-[#3E3E3E] text-lg">{product.weight} lbs</p>
                    </div>
                  </div>
                )}
                {product.careInstructions && (
                  <div className="flex items-start">
                    {/* Replaced AcademicCapIcon with WrenchScrewdriverIcon (or another suitable icon like HandRaisedIcon for 'care') for Care Instructions */}
                    <WrenchScrewdriverIcon className="h-6 w-6 mr-3 text-[#B55B3D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-[#6C6C6C]">Care Instructions</h3>
                      <p className="text-[#3E3E3E] text-lg whitespace-pre-line">{product.careInstructions}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Seller */}
              {product.seller && (
                <div className="mb-8 p-4 bg-[#F9F4EF] rounded-xl flex items-center gap-4 shadow-inner border border-[#E6E1DC]"> {/* Styled seller box */}
                  <div className="w-16 h-16 rounded-full bg-[#E6E1DC] flex items-center justify-center flex-shrink-0 border-2 border-[#B55B3D] shadow-md">
                    <span className="text-[#B55B3D] text-xl font-bold">
                      {product.seller?.shopName?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#3E3E3E]">{product.seller.shopName}</h2>
                    <p className="text-base text-[#6C6C6C]">
                      By: <Link href={`/artisans/${product.seller.userId}`} className="text-[#B55B3D] hover:underline font-medium">{product.seller?.user?.name || 'Artisan'}</Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4"> {/* Responsive buttons */}
                <div className="flex items-center border border-[#E6E1DC] rounded-xl overflow-hidden shadow-sm">
                  <button className="px-5 py-3 text-[#6C6C6C] hover:bg-[#F3ECE5] transition-colors duration-200 text-lg font-semibold">-</button>
                  <span className="px-6 py-3 text-lg font-bold text-[#3E3E3E]">1</span>
                  <button className="px-5 py-3 text-[#6C6C6C] hover:bg-[#F3ECE5] transition-colors duration-200 text-lg font-semibold">+</button>
                </div>
                <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex-1 text-white py-3.5 rounded-xl text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-[#E6E1DC] pt-10 mt-10"> {/* More padding and margin for separation */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-[#3E3E3E]">
                Customer Reviews ({reviews.length})
              </h2>
              {/* Conditionally render the "Write a Review" button */}
              {canWriteReview && (
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2.5 px-6 rounded-xl text-base font-semibold shadow-md transition-all duration-300"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </Button>
              )}
            </div>

            {/* Display messages if review submission is restricted */}
            {!canWriteReview && reviewSubmissionMessage && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6 text-center font-medium shadow-sm">
                {reviewSubmissionMessage}
                {!isLoggedIn && (
                  <>
                    <Link href="/api/auth/signin" className="text-[#B55B3D] hover:underline ml-1">
                      Sign In
                    </Link>
                    <span className="mx-1">or</span>
                    <Link href="/register" className="text-[#B55B3D] hover:underline">
                      Create an Account
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Review Form (only show if canWriteReview is true and showReviewForm is toggled) */}
            {showReviewForm && canWriteReview && (
              <div className="mb-8 p-6 bg-[#F9F4EF] rounded-xl shadow-inner border border-[#E6E1DC]"> {/* Styled review form container */}
                <ReviewForm
                  productId={product.productId}
                  onReviewSubmit={() => {
                    refreshReviews();
                    setShowReviewForm(false);
                  }}
                />
              </div>
            )}

            {/* Existing reviews display */}
            {reviews.length === 0 ? (
              <p className="text-[#6C6C6C] text-center py-6 text-lg font-medium">No reviews yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="space-y-8"> {/* Increased space between reviews */}
                {reviews.map((review) => (
                  <div key={review.reviewId} className="border-b border-[#E6E1DC] pb-8 last:border-0 last:pb-0"> {/* More padding */}
                    <div className="flex items-center gap-4 mb-3"> {/* Increased gap */}
                      <div className="w-12 h-12 rounded-full bg-[#F9F4EF] flex items-center justify-center flex-shrink-0 text-[#B55B3D] font-bold text-lg border-2 border-[#B55B3D]"> {/* Larger avatar */}
                        {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-[#3E3E3E] font-bold text-lg">{review.user?.name || 'Anonymous User'}</p>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-5 w-5 ${
                                star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-[#6C6C6C] ml-2 flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" /> {/* Calendar icon for date */}
                            {new Date(review.reviewDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short', // 'short' month name (e.g., "Jan")
                              day: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#3E3E3E] mb-2">{review.title}</h3>
                    <p className="text-[#6C6C6C] leading-relaxed whitespace-pre-line text-base">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}