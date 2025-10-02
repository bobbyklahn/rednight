'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HERO_IMAGES = [
  '/images/hero/webP/DSC01783.webp',
  '/images/hero/webP/DSC01924.webp',
  '/images/hero/webP/DSC01947-asian.webp',
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
          <Image
            src={image}
            alt="Red Night"
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}
    </div>
  );
}
