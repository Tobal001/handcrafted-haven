

// src/app/about/page.tsx

// src/app/about/page.tsx
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-serif text-amber-900 mb-8 border-b border-amber-200 pb-4">
        Our Story
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-serif text-amber-800 mb-4">Who We Are</h2>
          <p className="text-amber-700 mb-4">
            Handcrafted Haven is a passionate collective of artisans, craftsmen, and designers 
            dedicated to preserving traditional craftsmanship in the modern world.
          </p>
          <p className="text-amber-700">
            Founded in 2015, we've grown from a small local cooperative to an international 
            platform connecting makers with appreciative customers worldwide.
          </p>
        </div>
        <div className="bg-amber-100 rounded-lg p-6">
          <h3 className="text-xl font-serif text-amber-800 mb-3">Our Mission</h3>
          <ul className="space-y-2 text-amber-700">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">✓</span>
              Preserve traditional crafting techniques
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">✓</span>
              Support independent artisans
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">✓</span>
              Promote sustainable, handmade goods
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">✓</span>
              Build a community of craft enthusiasts
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-serif text-amber-800 mb-6">Meet Our Artisans</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-amber-200 h-48 rounded-md mb-4"></div>
              <h3 className="text-xl font-serif text-amber-900">Artisan Name</h3>
              <p className="text-amber-700 mt-2">Specialty: Woodworking</p>
              <p className="text-amber-600 text-sm mt-2">10+ years experience</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-800 text-amber-50 rounded-lg p-6">
        <h2 className="text-2xl font-serif mb-4">Join Our Community</h2>
        <p className="mb-4">
          Whether you're an artisan looking to showcase your work or a customer who appreciates 
          handmade quality, we'd love to connect with you.
        </p>
        <Link 
          href="/contact" 
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
