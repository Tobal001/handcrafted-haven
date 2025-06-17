
// src/app/(main)/meet-artisans/[artisanId]/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

// Data fetching functions
import { fetchArtisanProfileAndUserDetails } from '@/lib/data/artisans';
import { fetchProductsBySellerWithShopInfo, fetchSellerAverageRating } from '@/lib/data/products';
// Corrected import: ArtisanProfileForDisplay should be imported from definitions.ts
import { Product, ArtisanProfileForDisplay } from '@/lib/definitions'; 

// Components
import ArtisanProductCard from '@/components/products/ArtisanProductCard';
import { Button } from '@/components/ui/Button';

// Icons
import {
    StarIcon,
    MapPinIcon,
    UserCircleIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    BuildingStorefrontIcon,
    IdentificationIcon,
    GlobeAltIcon,
    ScaleIcon,
    TruckIcon,
    ArrowUturnLeftIcon
} from '@heroicons/react/24/outline';

export default function PublicArtisanProfilePage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const artisanId = Array.isArray(params.artisanId) ? params.artisanId[0] : params.artisanId;

    const [artisanProfile, setArtisanProfile] = useState<ArtisanProfileForDisplay | null>(null);
    const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
    const [averageArtisanRating, setAverageArtisanRating] = useState<{ averageRating: number; reviewCount: number }>({ averageRating: 0, reviewCount: 0 });
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
    const [isUpdatingRatings, setIsUpdatingRatings] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isProfileOwner = session?.user?.id === artisanId;

    const fetchDynamicData = useCallback(async () => {
        if (!artisanId) return;

        setIsUpdatingRatings(true);
        try {
            const [fetchedProducts, fetchedRating] = await Promise.all([
                fetchProductsBySellerWithShopInfo(artisanId),
                fetchSellerAverageRating(artisanId),
            ]);
            setArtisanProducts(fetchedProducts);
            setAverageArtisanRating(fetchedRating);
        } catch (err: any) {
            console.error("Failed to update dynamic artisan data:", err);
        } finally {
            setIsUpdatingRatings(false);
        }
    }, [artisanId]);

    useEffect(() => {
        async function loadInitialArtisanData() {
            if (!artisanId) {
                setError("Artisan ID is missing.");
                setIsLoadingInitialData(false);
                return;
            }

            setIsLoadingInitialData(true);
            setError(null);

            try {
                const fetchedCombinedArtisanData = await fetchArtisanProfileAndUserDetails(artisanId);
                
                // --- FIX FOR THE TYPE ERROR START ---
                // If fetchedCombinedArtisanData is undefined, set artisanProfile to null.
                // Otherwise, set it to the fetched data.
                if (fetchedCombinedArtisanData === undefined) {
                    setArtisanProfile(null);
                    setError("Artisan profile not found."); // Set an explicit error for not found
                } else {
                    setArtisanProfile(fetchedCombinedArtisanData);
                }
                // --- FIX FOR THE TYPE ERROR END ---
                
                const [fetchedProducts, fetchedRating] = await Promise.all([
                    fetchProductsBySellerWithShopInfo(artisanId),
                    fetchSellerAverageRating(artisanId),
                ]);

                setArtisanProducts(fetchedProducts);
                setAverageArtisanRating(fetchedRating);

            } catch (err: any) {
                console.error("Failed to load initial artisan data:", err);
                setError(err.message || "An unexpected error occurred while loading artisan data.");
            } finally {
                setIsLoadingInitialData(false);
            }
        }
        loadInitialArtisanData();

        const intervalId = setInterval(fetchDynamicData, 30000);
        return () => clearInterval(intervalId);

    }, [artisanId, fetchDynamicData]);

    useEffect(() => {
        if (session) {
            fetchDynamicData();
        }
    }, [session, fetchDynamicData]);

    if (isLoadingInitialData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6] text-[#B55B3D]">
                <svg className="animate-spin h-10 w-10 text-[#B55B3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-xl font-semibold">Loading artisan profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F6] p-6">
                <p className="text-xl text-red-600 mb-4 font-semibold">Error: {error}</p>
                <Button onClick={() => router.back()} className="mt-4 bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
                    Go Back
                </Button>
            </div>
        );
    }

    if (!artisanProfile) {
        return (
            <div className="flex justify-center items-center h-screen flex-col bg-[#FDF9F9] p-6">
                <p className="text-xl text-gray-700 mb-4 font-semibold">Artisan not found.</p>
                <Button onClick={() => router.push('/meet-artisans')} className="bg-[#B55B3D] hover:bg-[#9E4F37] text-white py-2 px-4 rounded-lg">
                    Browse All Artisans
                </Button>
            </div>
        );
    }

    const artisanDisplayName = artisanProfile.userName;
    const artisanDisplayEmail = artisanProfile.userEmail;

    return (
        <div className="min-h-screen bg-[#FDF9F6] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Artisan Profile Header Section */}
                <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] flex flex-col md:flex-row items-center justify-center relative overflow-hidden md:gap-x-20">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#F9F4EF] rounded-full opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F3ECE5] rounded-full opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

                    <div className="flex-shrink-0 relative z-10">
                        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 md:mb-0 border-4 border-[#B55B3D] shadow-lg flex items-center justify-center bg-gray-100">
                            {artisanProfile?.profileImageUrl ? (
                                <Image
                                    src={artisanProfile.profileImageUrl}
                                    alt={`${artisanProfile.shopName} profile`}
                                    fill
                                    sizes="160px"
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            ) : (
                                <UserCircleIcon className="h-32 w-32 text-[#6C6C6C]" />
                            )}
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-grow relative z-10">
                        <h1 className="text-5xl font-extrabold text-[#3E3E3E] mb-2 leading-tight tracking-tight">
                            {artisanProfile.shopName || 'Untitled Shop'}
                        </h1>

                        {artisanDisplayName && (
                            <p className="text-xl text-[#6C6C6C] font-semibold mb-1 flex items-center">
                                <UserIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
                                By: {artisanDisplayName}
                            </p>
                        )}

                        {artisanDisplayEmail && (
                            <p className="text-lg text-[#6C6C6C] mb-1 flex items-center">
                                <EnvelopeIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
                                {artisanDisplayEmail}
                            </p>
                        )}

                        {artisanProfile?.phoneNumber && (
                            <p className="text-lg text-[#6C6C6C] mb-4 flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-2 text-[#B55B3D]" />
                                {artisanProfile.phoneNumber}
                            </p>
                        )}

                        {artisanProfile.location && (
                            <p className="text-lg text-[#6C6C6C] flex items-center justify-center md:justify-start mb-4">
                                <MapPinIcon className="h-6 w-6 mr-2 text-[#B55B3D]" />
                                {artisanProfile.location}
                            </p>
                        )}

                        {averageArtisanRating.averageRating > 0 ? (
                            <div className="flex items-center justify-center md:justify-start mt-4">
                                <div className="flex mr-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className={`h-6 w-6 ${
                                                star <= Math.round(averageArtisanRating.averageRating) ? 'text-yellow-400' : 'text-gray-300'
                                            } transition-colors duration-200`}
                                            fill={star <= Math.round(averageArtisanRating.averageRating) ? 'currentColor' : 'none'}
                                        />
                                    ))}
                                </div>
                                <span className="text-2xl font-bold text-[#3E3E3E]">
                                    {averageArtisanRating.averageRating.toFixed(1)}
                                </span>
                                <span className="text-md text-[#6C6C6C] ml-2">
                                    ({averageArtisanRating.reviewCount} reviews)
                                </span>
                                {isUpdatingRatings && (
                                    <span className="ml-2 text-sm text-[#B55B3D] animate-pulse">
                                        (Updating...)
                                    </span>
                                )}
                            </div>
                        ) : (
                            <p className="text-[#6C6C6C] mt-4 text-lg">No product reviews yet.</p>
                        )}
                    </div>
                </section>

                {/* Public Artisan Bio & Policies */}
                <section className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-[#E6E1DC] overflow-hidden">
                    <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
                        About {artisanProfile.shopName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {artisanProfile.shopDescription && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <BuildingStorefrontIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Our Story / Shop Description
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shopDescription}</p>
                            </div>
                        )}
                        {artisanProfile.bio && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <IdentificationIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    About The Artisan
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.bio}</p>
                            </div>
                        )}
                        {artisanProfile.website && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <GlobeAltIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Website
                                </h3>
                                <a href={artisanProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#B55B3D] hover:underline text-lg">
                                    {artisanProfile.website}
                                </a>
                            </div>
                        )}
                        {artisanProfile.policies && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <ScaleIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Shop Policies
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.policies}</p>
                            </div>
                        )}
                        {artisanProfile.shippingInfo && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <TruckIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Shipping Information
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.shippingInfo}</p>
                            </div>
                        )}
                        {artisanProfile.returnPolicy && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3 flex items-center">
                                    <ArrowUturnLeftIcon className="h-6 w-6 mr-2 text-[#B55B3D]" fill="none" />
                                    Return Policy
                                </h3>
                                <p className="text-[#6C6C6C] leading-relaxed">{artisanProfile.returnPolicy}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Artisan's Products Display Section (Visible to everyone) */}
                <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6E1DC]">
                    <h2 className="text-3xl font-bold text-[#3E3E3E] mb-8 border-b-2 pb-4 border-[#F3ECE5] text-center md:text-left">
                        Products by {artisanProfile.shopName}
                    </h2>
                    {artisanProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {artisanProducts.map((product) => (
                                <ArtisanProductCard key={product.productId} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600 mb-6 font-medium">No products found from this artisan yet.</p>
                            {isProfileOwner && (
                                <Link
                                    href="/products/create"
                                    className="inline-block bg-[#B55B3D] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#9E4F37] transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                    Add Your First Product
                                </Link>
                            )}
                        </div>
                    )}
                </section>

                <div className="mt-10 text-center">
                    <Link href="/meet-artisans" className="text-[#B55B3D] hover:underline text-lg font-medium transition-colors duration-200">
                        ← Back to All Artisans
                    </Link>
                </div>
            </div>
        </div>
    );
}