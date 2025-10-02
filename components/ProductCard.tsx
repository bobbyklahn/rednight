'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="card group hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-64 mb-4 group-hover:scale-105 transition-transform duration-300">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-2xl font-bold text-gold-500 mb-2">{product.name}</h3>
      <p className="text-gray-400 mb-4">{product.description}</p>

      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded bg-night-800 text-gold-500 hover:bg-night-700 hover:scale-110 active:scale-90 transition-all"
          >
            -
          </button>
          <span className="w-12 text-center text-xl font-bold text-gold-400">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            className="w-10 h-10 rounded bg-night-800 text-gold-500 hover:bg-night-700 hover:scale-110 active:scale-90 transition-all"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gold-400">${product.priceAUD} AUD</span>
        <button
          onClick={handleAddToCart}
          className="btn-primary relative hover:scale-105 active:scale-95 transition-transform"
        >
          {showAdded ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
