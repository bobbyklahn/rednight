'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-night-700">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-gold-500">{item.product.name}</h4>
        <p className="text-sm text-gray-400">${item.product.priceAUD} AUD</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-8 h-8 rounded bg-night-800 text-gold-500 hover:bg-night-600 transition-colors text-sm"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-gold-400">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-8 h-8 rounded bg-night-800 text-gold-500 hover:bg-night-600 transition-colors text-sm"
          >
            +
          </button>
          <button
            onClick={() => removeItem(item.product.id)}
            className="ml-auto text-red-400 hover:text-red-300 text-sm"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-gold-400">${item.lineTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
