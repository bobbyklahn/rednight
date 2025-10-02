'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CancelPage() {
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
            className="w-20 h-20 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-300 mb-4">
          Checkout Cancelled
        </h1>

        <p className="text-xl text-gray-400 mb-8">
          Your order was not completed. Your cart has been saved.
        </p>

        <div className="bg-night-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gold-500 mb-3">What Happened?</h2>
          <p className="text-gray-400 mb-4">
            You cancelled the checkout process or closed the payment window. Don&apos;t worry - all items remain in your cart.
          </p>
          <p className="text-gray-400">
            Ready to complete your purchase? Your Red Night order is waiting!
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/#products" className="btn-primary inline-block w-full">
            Return to Cart
          </Link>

          <Link
            href="/"
            className="btn-secondary inline-block w-full"
          >
            Continue Shopping
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            Need help? Contact us at{' '}
            <a href="mailto:hello@thestillco.com.au" className="text-gold-500 hover:underline">
              hello@thestillco.com.au
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
