import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendOrderNotificationEmail, sendCustomerConfirmationEmail } from '@/lib/email';
import Stripe from 'stripe';

// Disable body parsing - Stripe needs raw body for signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing Stripe signature');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCheckoutCompleted(session);
    } catch (error) {
      console.error('Error handling checkout.session.completed:', error);
      // Don't return error - we've received the webhook, just failed to process
      // Stripe will retry, but we log for debugging
    }
  }

  // Return 200 to acknowledge receipt
  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing completed checkout:', session.id);

  // Retrieve the full session with line items and customer details
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'line_items.data.price.product', 'shipping_cost.shipping_rate'],
  }) as Stripe.Checkout.Session & {
    shipping_details?: {
      name?: string;
      address?: Stripe.Address;
    };
  };

  const customerDetails = fullSession.customer_details;
  // shipping_details is available on checkout sessions with shipping address collection
  const shippingDetails = fullSession.shipping_details;
  const lineItems = fullSession.line_items?.data || [];

  if (!customerDetails) {
    console.error('Missing customer details');
    throw new Error('Missing required order details');
  }

  // Map line items to order items
  const orderItems = lineItems.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      name: product?.name || item.description || 'Unknown Product',
      quantity: item.quantity || 1,
      unitPrice: (item.price?.unit_amount || 0) / 100,
      total: (item.amount_total || 0) / 100,
    };
  });

  // Calculate totals
  const subtotal = (fullSession.amount_subtotal || 0) / 100;
  const shippingCost = (fullSession.shipping_cost?.amount_total || 0) / 100;
  const total = (fullSession.amount_total || 0) / 100;

  // Build shipping address with fallbacks
  const shippingAddress = shippingDetails?.address
    ? {
        line1: shippingDetails.address.line1 || '',
        line2: shippingDetails.address.line2 || undefined,
        city: shippingDetails.address.city || '',
        state: shippingDetails.address.state || '',
        postalCode: shippingDetails.address.postal_code || '',
        country: shippingDetails.address.country || 'AU',
      }
    : {
        line1: 'No shipping address provided',
        line2: undefined,
        city: '',
        state: '',
        postalCode: '',
        country: 'AU',
      };

  // Build order details for email
  const orderDetails = {
    orderId: fullSession.id,
    customerEmail: customerDetails.email || 'No email provided',
    customerName: shippingDetails?.name || customerDetails.name || 'No name provided',
    shippingAddress,
    items: orderItems,
    subtotal,
    shippingCost,
    total,
    stripePaymentId: fullSession.payment_intent as string,
    createdAt: new Date(fullSession.created * 1000),
  };

  // Send admin notification + customer confirmation in parallel
  await Promise.all([
    sendOrderNotificationEmail(orderDetails),
    sendCustomerConfirmationEmail(orderDetails),
  ]);

  console.log('Order emails sent for:', fullSession.id);
}
