'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { CartButton } from '@/components/Cart/CartButton';
import { CartDrawer } from '@/components/Cart/CartDrawer';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Gallery } from '@/components/Gallery';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-night-900/95 backdrop-blur-sm border-b border-night-700">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/RedNight_LogoMark_RGB-Red.png"
                alt="Red Night Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gold-500">Red Night</h1>
          </div>
          <CartButton onClick={() => setIsCartOpen(true)} />
        </div>
      </header>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <HeroCarousel />
          <div className="relative z-10 text-center px-4">
            <motion.h2
              className="text-6xl md:text-8xl font-bold text-gold-500 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Early, Late, Every Night
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Premium Ready-to-Drink Shiraz Gin & Dark Soda
            </motion.p>
            <motion.a
              href="#products"
              className="btn-primary inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Shop Now
            </motion.a>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 px-4 bg-night-800">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center text-gold-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Products
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRODUCTS.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 px-4 bg-night-900">
          <div className="container mx-auto max-w-7xl">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center text-gold-500 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Gallery
            </motion.h2>
            <Gallery />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-night-900 py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="text-gold-500 font-bold mb-4">Contact</h4>
                <p className="text-gray-400">hello@thestillco.com.au</p>
                <p className="text-gray-400">960 Light Pass Road</p>
                <p className="text-gray-400">Vine Vale, SA 5352</p>
              </div>
              <div>
                <h4 className="text-gold-500 font-bold mb-4">Shipping</h4>
                <p className="text-gray-400">4-Pack: $5.00 flat rate</p>
                <p className="text-gray-400">Slab: FREE shipping</p>
                <p className="text-gray-400">Australia-wide delivery</p>
              </div>
              <div>
                <h4 className="text-gold-500 font-bold mb-4">Social</h4>
                <a href="https://www.instagram.com/rednightcan/" className="text-gray-400 hover:text-gold-500 block mb-2">Instagram</a>
                <a href="https://www.facebook.com/rednightcan" className="text-gray-400 hover:text-gold-500 block mb-2">Facebook</a>
                <a href="https://drinkwise.org.au" className="text-gray-400 hover:text-gold-500 block">Drink Responsibly</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-night-700 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} Red Night. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
