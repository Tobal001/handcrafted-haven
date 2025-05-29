import { Button } from "../ui/button"
import Image from "next/image"

export default function HeroBanner()  {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-16 bg-[#F3ECE5]">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Discover Unique <br /> Handcrafted Creations
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" >
              Explore Products
            </Button>
            <Button variant="secondary">
              Meet Artisans
            </Button>
          </div>
        </div>
        <div >
          <Image 
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className='hidden md:block w-full h-64 bg-[#E6E1DC] rounded-xl shadow'
            alt="Handcrafted bowel and vase displayed desktop version"
          />
          <Image
            src="/hero-desktop.png"
            width={400}
            height={550}
            className='hidden md:hiden w-full h-64 bg-[#E6E1DC] rounded-xl shadow'
            alt="Handcrafted bowel and vase displayed mobile version"
          />
        </div>
      </section>
    )
}