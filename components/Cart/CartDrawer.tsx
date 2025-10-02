'use client';

import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import { useState } from 'react';
import { AgeVerification } from '@/components/Checkout/AgeVerification';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, shippingCost, total, itemCount } = useCart();
  const [showAgeVerification, setShowAgeVerification] = useState(false);

  const handleCheckout = () => {
    if (itemCount === 0) return;
    setShowAgeVerification(true);
  };

  const handleAgeConfirmed = async () => {
    setShowAgeVerification(false);
    // Redirect to Stripe checkout
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-night-800 z-50 shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gold-500">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gold-500 text-2xl"
            >
              ×
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <button onClick={onClose} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>

              <div className="border-t border-night-700 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-gold-500 font-bold' : ''}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)} AUD`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gold-500 pt-2 border-t border-night-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)} AUD</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary w-full mt-6"
                disabled={itemCount === 0}
              >
                Checkout
              </button>

              <button
                onClick={onClose}
                className="btn-secondary w-full mt-3"
              >
                Continue Shopping
              </button>
            </>
          )}
        </div>
      </div>

      {/* Age Verification Modal */}
      {showAgeVerification && (
        <AgeVerification
          onConfirm={handleAgeConfirmed}
          onCancel={() => setShowAgeVerification(false)}
        />
      )}
    </>
  );
}
