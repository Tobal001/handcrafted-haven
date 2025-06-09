
// src/app/about/page.tsx

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3E3E3E] mb-6">
          Celebrating Handcrafted Excellence
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-[#6C6C6C] mb-8">
            Where timeless craftsmanship meets modern appreciation
          </p>
          <div className="w-24 h-1 bg-[#B55B3D] mx-auto"></div>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/about/ab3.jpg"
            alt="Artisan crafting process"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        <div>
          <h2 className="text-3xl font-serif text-[#3E3E3E] mb-6">Our Story</h2>
          <div className="space-y-4 text-[#6C6C6C]">
            <p>
              Born from a shared passion for authentic craftsmanship, Handcrafted Haven emerged in 2015 as a humble 
              collective of local artisans. Today, we stand as a global marketplace bridging the gap between 
              skilled makers and discerning customers who value quality over quantity.
            </p>
            <p>
              Each piece in our collection tells a story - of tradition preserved, of skills perfected over 
              generations, and of the human touch that no machine can replicate.
            </p>
            <p>
              We're more than a marketplace; we're a movement championing the return to thoughtfully made, 
              sustainable goods in an age of mass production.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-[#F9F4EF] rounded-2xl p-8 md:p-12 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-[#3E3E3E] mb-8">Our Guiding Principles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#B55B3D] text-3xl mb-4">01</div>
              <h3 className="text-xl font-medium text-[#3E3E3E] mb-3">Preservation of Craft</h3>
              <p className="text-[#6C6C6C]">
                We document and promote traditional techniques at risk of being lost, ensuring they're passed to future generations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#B55B3D] text-3xl mb-4">02</div>
              <h3 className="text-xl font-medium text-[#3E3E3E] mb-3">Fair Partnerships</h3>
              <p className="text-[#6C6C6C]">
                Our artisans receive equitable compensation, with transparent pricing that respects their time and expertise.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#B55B3D] text-3xl mb-4">03</div>
              <h3 className="text-xl font-medium text-[#3E3E3E] mb-3">Sustainable Practices</h3>
              <p className="text-[#6C6C6C]">
                From material sourcing to packaging, we prioritize environmental responsibility at every step.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#B55B3D] text-3xl mb-4">04</div>
              <h3 className="text-xl font-medium text-[#3E3E3E] mb-3">Community Building</h3>
              <p className="text-[#6C6C6C]">
                We foster connections through workshops, stories, and events that bring makers and appreciators together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship Showcase */}
      <div className="mb-20">
        <h2 className="text-3xl font-serif text-[#3E3E3E] mb-12 text-center">The Artisan Difference</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-xl aspect-square">
            <Image
              src="/images/about/ab1.jpg"
              alt="Woodworking detail"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-6">
              <h3 className="text-xl font-medium text-white">Woodworking Traditions</h3>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl aspect-square">
            <Image
              src="/images/about/ab2.jpg"
              alt="Textile art"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-6">
              <h3 className="text-xl font-medium text-white">Textile Arts</h3>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl aspect-square">
            <Image
              src="/images/about/ab7.jpg"
              alt="Pottery wheel"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-6">
              <h3 className="text-xl font-medium text-white">Ceramic Mastery</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Join Community CTA */}
      <div className="bg-[#B55B3D] text-white rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-serif mb-6">Become Part of Our Story</h2>
            <p className="mb-8 text-[#F0ECE8]">
              Whether you create with your hands or appreciate those who do, there's a place for you in our 
              growing community of craftsmanship enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="bg-white text-[#B55B3D] hover:bg-[#F9F4EF] px-6 py-3 rounded-md text-center font-medium transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                href="/products" 
                className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-center font-medium transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative aspect-square">
            <Image
              src="/images/about/ab6.jpg"
              alt="Artisan community"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
