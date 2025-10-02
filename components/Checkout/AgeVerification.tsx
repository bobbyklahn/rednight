'use client';

import { useState } from 'react';

interface AgeVerificationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function AgeVerification({ onConfirm, onCancel }: AgeVerificationProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/75 z-[60] flex items-center justify-center p-4">
      <div className="bg-night-800 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gold-500 mb-4">Age Verification</h2>
        <p className="text-gray-300 mb-6">
          You must be 18 years or older to purchase alcohol.
        </p>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-2 border-gold-500 bg-night-700 checked:bg-gold-500"
          />
          <span className="text-gray-300">
            I confirm that I am 18 years or older and of legal drinking age.
          </span>
        </label>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmed}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Checkout
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Please drink responsibly. Visit{' '}
          <a href="https://drinkwise.org.au" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">
            drinkwise.org.au
          </a>
        </p>
      </div>
    </div>
  );
}
