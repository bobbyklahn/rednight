import { CartItem } from './types';

// Stripe shipping rate IDs from rednight_stripe_config.md
const SHIPPING_RATES = {
  STANDARD: 'shr_1SDDfoJCURcVFbNLvgWy6Udv',  // $5.00 AUD
  FREE: 'shr_1SDDlpJCURcVFbNLTVxDkKJT',      // $0.00 AUD
};

/**
 * Calculate shipping cost based on cart contents
 * Rule: FREE shipping if cart contains ANY slab, otherwise $5 flat rate
 */
export function calculateShipping(items: CartItem[]): number {
  if (items.length === 0) {
    return 0;
  }

  // Check if cart contains any slab
  const hasSlab = items.some(item => item.product.isSlab === true);

  return hasSlab ? 0 : 5.00;
}

/**
 * Get the appropriate Stripe shipping rate ID for cart contents
 */
export function getShippingRateId(items: CartItem[]): string {
  const hasSlab = items.some(item => item.product.isSlab === true);
  return hasSlab ? SHIPPING_RATES.FREE : SHIPPING_RATES.STANDARD;
}
