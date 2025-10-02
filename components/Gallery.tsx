'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const GALLERY_IMAGES = [
  { src: '/images/gallery/can.avif', alt: 'Red Night Can' },
  { src: '/images/gallery/rednight.avif', alt: 'Red Night Product' },
  { src: '/images/gallery/rednightcheers.avif', alt: 'Cheers with Red Night' },
  { src: '/images/gallery/rednightgirldrinking.avif', alt: 'Enjoying Red Night' },
  { src: '/images/gallery/rednighthold.avif', alt: 'Holding Red Night' },
  { src: '/images/gallery/rednightpour.avif', alt: 'Pouring Red Night' },
  { src: '/images/gallery/rednightsingle.avif', alt: 'Red Night Single Can' },
  { src: '/images/gallery/single.avif', alt: 'Single Serve' },
  { src: '/images/gallery/tasting.avif', alt: 'Tasting Red Night' },
  { src: '/images/gallery/withpizza.avif', alt: 'Red Night with Pizza' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <motion.div
            key={image.src}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gold-500 z-10"
            >
              ×
            </button>

            {/* Previous Button */}
            {selectedImage > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
                className="absolute left-4 text-white text-4xl hover:text-gold-500 z-10"
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {selectedImage < GALLERY_IMAGES.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
                className="absolute right-4 text-white text-4xl hover:text-gold-500 z-10"
              >
                ›
              </button>
            )}

            <motion.div
              className="relative w-full max-w-4xl h-[80vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[selectedImage].src}
                alt={GALLERY_IMAGES[selectedImage].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
