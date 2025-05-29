import  HeroBanner  from '../components/home-page/hero-banner'
import ProductCard from '@/components/ProductCard';
import ArtisanCard from '@/components/ArtisanCard';

export default function Home() {
  return (
    <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">
      {/* Hero Section */}
      <HeroBanner />

      {/* Featured Products */}
      <section className="p-8 md:p-16">
  <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {[1, 2, 3, 4].map((i) => (
      <ProductCard key={i} name={''} price={''} rating={0} imageUrl={''} />
    ))}
  </div>
</section>

      {/* Top Artisans */}
      
<section className="p-8 md:p-16 bg-[#FFF]">
  <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <ArtisanCard key={i} name={''} description={''} imageUrl={''} />
    ))}
  </div>
</section>
    </main>
  );
}
