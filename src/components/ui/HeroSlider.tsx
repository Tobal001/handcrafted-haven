
// src/components/ui/HeroSlider.tsx

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Slide {
  src: string;
  alt: string;
  link?: string; // Optional link for the slide
  title?: string; // Optional title for the slide
}

interface HeroSliderProps {
  slides: Slide[];
  autoplay?: boolean;
  interval?: number; // Autoplay interval in ms
  heightClass?: string; // Add a prop for height
}

export default function HeroSlider({ slides, autoplay = true, interval = 5000, heightClass = 'h-96' }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Navigation functions
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Dot navigation
  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  // Update selected index and scroll snaps on API change
  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    // Autoplay logic
    let autoplayTimer: NodeJS.Timeout;
    const play = () => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
      autoplayTimer = setTimeout(play, interval);
    };

    const stop = () => {
      clearTimeout(autoplayTimer);
    };

    if (autoplay) {
      autoplayTimer = setTimeout(play, interval);
      emblaApi.on('pointerDown', stop); // Stop on user interaction
      emblaApi.on('select', () => clearTimeout(autoplayTimer)); // Reset timer on manual scroll
      emblaApi.on('settle', () => autoplayTimer = setTimeout(play, interval)); // Restart timer after settling
    }

    return () => {
      stop(); // Clean up timer on unmount
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', stop);
      emblaApi.off('select', () => clearTimeout(autoplayTimer));
      emblaApi.off('settle', () => autoplayTimer = setTimeout(play, interval));
    };
  }, [emblaApi, onInit, onSelect, autoplay, interval]);

  return (
    <div className={`relative w-full overflow-hidden rounded-xl shadow-lg bg-[#E6E1DC] ${heightClass}`}>
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide relative flex-[0_0_100%] min-w-0 h-full" key={index}>
              {/* Title Overlay */}
              {slide.title && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white z-10">
                  {/* ^^^^^^^^^^^^  CHANGED CLASSES HERE ^^^^^^^^^^^^ */}
                  {/* Removed 'p-8', 'items-start', 'justify-start' */}
                  {/* Added 'items-center' (vertical center) and 'justify-center' (horizontal center) */}
                  <h2 className="text-3xl md:text-4xl font-bold max-w-lg text-center leading-tight">
                    {/* ^^^^^^^^^^^^  ADDED text-center HERE ^^^^^^^^^^^^ */}
                    {slide.title}
                  </h2>
                </div>
              )}

              {slide.link ? (
                <a href={slide.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </a>
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="embla__button embla__button--prev absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-70 text-[#3E3E3E] hover:bg-opacity-90 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#B55B3D]"
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        className="embla__button embla__button--next absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-70 text-[#3E3E3E] hover:bg-opacity-90 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#B55B3D]"
        onClick={scrollNext}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="embla__dots absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`embla__dot w-3 h-3 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-[#B55B3D]' : 'bg-white bg-opacity-70'
            } hover:bg-[#B55B3D] focus:outline-none focus:ring-2 focus:ring-[#B55B3D]`}
            onClick={() => scrollTo(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}