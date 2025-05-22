export default function Home() {
  return (
    <main className="bg-[#F9F4EF] text-[#3E3E3E] font-sans">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-16 bg-[#F3ECE5]">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Discover Unique <br /> Handcrafted Creations
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#B55B3D] text-white px-6 py-3 rounded font-semibold hover:bg-[#9E4F37]">
              Explore Products
            </button>
            <button className="border-2 border-[#3E3E3E] px-6 py-3 rounded font-semibold hover:bg-[#F0ECE8]">
              Meet Artisans
            </button>
          </div>
        </div>
        <div>
          <div className="w-full h-64 bg-[#E6E1DC] rounded-xl shadow" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="p-8 md:p-16">
        <h2 className="text-2xl font-serif font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="w-full h-40 bg-[#E6E1DC] rounded-lg mb-4" />
              <div className="h-4 w-3/4 bg-[#D0CBC6] rounded mx-auto mb-2" />
              <div className="h-3 w-1/2 bg-[#D0CBC6] rounded mx-auto mb-1" />
              <div className="h-4 w-1/4 bg-[#D0CBC6] rounded mx-auto mb-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Top Artisans */}
      <section className="p-8 md:p-16 bg-[#FFF]">
        <h2 className="text-2xl font-serif font-bold mb-6">Top Artisans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-full h-48 bg-[#E6E1DC] rounded-lg mb-4" />
              <div className="h-4 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-2" />
              <div className="h-3 w-3/4 bg-[#D0CBC6] rounded mx-auto mb-1" />
              <div className="h-3 w-2/3 bg-[#D0CBC6] rounded mx-auto mb-1" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
