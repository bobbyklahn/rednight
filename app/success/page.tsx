'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-night-900 px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-gold-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gold-500 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Thank you for your purchase. Your Red Night order is on its way!
        </p>

        <div className="bg-night-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gold-500 mb-3">What&apos;s Next?</h2>
          <ul className="text-gray-400 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">✓</span>
              <span>You&apos;ll receive an order confirmation email shortly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">✓</span>
              <span>Your order will be processed within 1-2 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">✓</span>
              <span>Delivery typically takes 3-5 business days</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link href="/" className="btn-primary inline-block w-full">
            Continue Shopping
          </Link>

          <p className="text-sm text-gray-500">
            Questions? Contact us at{' '}
            <a href="mailto:orders@rednight.com.au" className="text-gold-500 hover:underline">
              orders@rednight.com.au
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
