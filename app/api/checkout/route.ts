import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProductById } from '@/lib/products';
import { getShippingRateId } from '@/lib/shipping';
import { CartItem } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    if (items.length > 10) {
      return NextResponse.json(
        { error: 'Cart cannot exceed 10 unique items' },
        { status: 400 }
      );
    }

    // Validate and map items to Stripe format
    const lineItems = [];
    const cartItems: CartItem[] = [];

    for (const item of items) {
      const product = getProductById(item.productId);

      if (!product) {
        return NextResponse.json(
          { error: `Invalid product ID: ${item.productId}` },
          { status: 400 }
        );
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
        return NextResponse.json(
          { error: 'Quantity must be between 1 and 99' },
          { status: 400 }
        );
      }

      lineItems.push({
        price: product.stripePriceId,
        quantity: item.quantity,
      });

      cartItems.push({
        product,
        quantity: item.quantity,
        lineTotal: product.priceAUD * item.quantity,
      });
    }

    // Calculate shipping rate
    const shippingRateId = getShippingRateId(cartItems);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      shipping_options: [
        {
          shipping_rate: shippingRateId,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
