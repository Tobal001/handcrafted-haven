
// src/app/page.tsx

import { fetchFeaturedProducts } from '@/lib/data/products';
import { fetchTopArtisansForHomepage } from '@/lib/data/artisans';
import HomeProductCard from '@/components/products/HomeProductCard';
import TopArtisanCard from '@/components/artisans/TopArtisanCard';
import Link from 'next/link';
import HeroSlider from '@/components/ui/HeroSlider';

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts();
  const topArtisans = await fetchTopArtisansForHomepage();

  const heroSlides = [
    {
      src: '/images/slider/slide1.jpg',
      alt: 'Handcrafted Pottery on display',
      link: '/products?category=jewelry',
      title: 'Exquisite Handmade Pottery'
    },
    {
      src: '/images/slider/slide2.jpg',
      alt: 'Welding in a rustic setting',
      link: '/products?category=pottery',
      title: 'Artisan Welding Collections'
    },
    {
      src: '/images/slider/slide3.jpg',
      alt: 'Knitted textiles with natural dyes',
      link: '/products?category=textiles',
      title: 'Beautiful Handwoven Textiles'
    },
    {
      src: '/images/slider/slide4.jpg',
      alt: 'Unique Handmade accessories',
      link: '/products?category=woodwork',
      title: 'Unique Handmade Accessories'
    },
    {
      src: '/images/slider/slide5.jpg',
      alt: 'Wooden carvings and sculptures',
      link: '/products?category=accessories',
      title: 'Intricate Wooden Masterpieces'
    },
  ];

  return (
    <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 p-8 md:p-8 bg-[#F3ECE5]">
        {/* Text and buttons - now takes 1 column on medium screens */}
        <div className="md:col-span-1">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Discover Unique <br /> Handcrafted Creations
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="bg-[#B55B3D] text-white px-6 py-3 rounded font-semibold hover:bg-[#9E4F37] text-center">
              Explore Products
            </Link>
            <Link href="/meet-artisans" className="border-2 border-[#3E3E3E] px-6 py-3 rounded font-semibold hover:bg-[#F0ECE8] text-center">
              Meet Artisans
            </Link>
          </div>
        </div>
        {/* Slider - now takes 2 columns on medium screens */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] md:col-span-2">
          {/* Changed heights from [400px, 500px, 600px] to [300px, 400px, 500px] */}
          <HeroSlider slides={heroSlides} autoplay={true} interval={5000} heightClass="h-full" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="p-8 md:p-16">
        <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <HomeProductCard key={product.productId} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-[#6C6C6C]">No featured products available at the moment.</p>
          )}
        </div>
      </section>

      {/* Top Artisans */}
      <section className="p-8 md:p-16 bg-[#FFF]">
        <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topArtisans.length > 0 ? (
            topArtisans.map((artisan) => (
              <TopArtisanCard key={artisan.id} artisan={artisan} />
            ))
          ) : (
            <p className="col-span-full text-center text-[#6C6C6C]">No top artisans available at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}