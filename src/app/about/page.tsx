

// // src/app/about/page.tsx

// import Link from 'next/link';

// export default function AboutPage() {
//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4">
//       <h1 className="text-4xl font-serif text-amber-900 mb-8 border-b border-amber-200 pb-4">
//         Our Story
//       </h1>
      
//       <div className="grid md:grid-cols-2 gap-8 mb-12">
//         <div>
//           <h2 className="text-2xl font-serif text-amber-800 mb-4">Who We Are</h2>
//           <p className="text-amber-700 mb-4">
//             Handcrafted Haven is a passionate collective of artisans, craftsmen, and designers 
//             dedicated to preserving traditional craftsmanship in the modern world.
//           </p>
//           <p className="text-amber-700">
//             Founded in 2015, we've grown from a small local cooperative to an international 
//             platform connecting makers with appreciative customers worldwide.
//           </p>
//         </div>
//         <div className="bg-amber-100 rounded-lg p-6">
//           <h3 className="text-xl font-serif text-amber-800 mb-3">Our Mission</h3>
//           <ul className="space-y-2 text-amber-700">
//             <li className="flex items-start">
//               <span className="text-amber-600 mr-2">✓</span>
//               Preserve traditional crafting techniques
//             </li>
//             <li className="flex items-start">
//               <span className="text-amber-600 mr-2">✓</span>
//               Support independent artisans
//             </li>
//             <li className="flex items-start">
//               <span className="text-amber-600 mr-2">✓</span>
//               Promote sustainable, handmade goods
//             </li>
//             <li className="flex items-start">
//               <span className="text-amber-600 mr-2">✓</span>
//               Build a community of craft enthusiasts
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="mb-12">
//         <h2 className="text-2xl font-serif text-amber-800 mb-6">Meet Our Artisans</h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3].map((item) => (
//             <div key={item} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//               <div className="bg-amber-200 h-48 rounded-md mb-4"></div>
//               <h3 className="text-xl font-serif text-amber-900">Artisan Name</h3>
//               <p className="text-amber-700 mt-2">Specialty: Woodworking</p>
//               <p className="text-amber-600 text-sm mt-2">10+ years experience</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-amber-800 text-amber-50 rounded-lg p-6">
//         <h2 className="text-2xl font-serif mb-4">Join Our Community</h2>
//         <p className="mb-4">
//           Whether you're an artisan looking to showcase your work or a customer who appreciates 
//           handmade quality, we'd love to connect with you.
//         </p>
//         <Link 
//           href="/contact" 
//           className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md transition-colors"
//         >
//           Get in Touch
//         </Link>
//       </div>
//     </div>
//   );
// }



















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
