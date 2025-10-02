import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '4-pack',
    name: 'Red Night Premix - 4 Pack',
    description: '4 x 250ml Cans',
    longDescription: 'Experience the perfect blend of Shiraz Gin and Dark Soda in our convenient 4-pack. Each 250ml can delivers a sophisticated, ready-to-drink cocktail that\'s perfect for intimate gatherings or those nights when you want something elevated. Say goodbye to the same-old and hello to Red Night.',
    priceAUD: 20.00,
    stripeProductId: 'prod_T9IK63l3Vu75qs',
    stripePriceId: 'price_1SCzjfJCURcVFbNLeRecDCbG',
    imageUrl: '/images/products/4-pack.png',
    images: ['/images/products/4-pack.png'],
    isSlab: false,
  },
  {
    id: 'slab',
    name: 'Red Night Premix - Slab',
    description: '24 x 250ml Cans - Case',
    longDescription: 'Stock up for the long haul with our full slab of 24 premium Red Night cans. Perfect for parties, events, or keeping your fridge stocked for spontaneous celebrations. The sophisticated blend of Shiraz Gin and Dark Soda ensures every night can be extraordinary. Free shipping Australia-wide means the party comes to you.',
    priceAUD: 120.00,
    stripeProductId: 'prod_T9LcMtBKaTJPTL',
    stripePriceId: 'price_1SD2vKJCURcVFbNLLkpp3Lwc',
    imageUrl: '/images/products/slab.png',
    images: ['/images/products/slab.png'],
    isSlab: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}
