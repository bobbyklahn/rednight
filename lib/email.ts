import { Resend } from 'resend';

// Lazy-load Resend client to avoid build-time initialization
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Email recipients for order notifications
const ORDER_NOTIFICATION_EMAILS = [
  'bobbyleo@me.com',
  'hhinrichsen@gmail.com',
];

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface OrderDetails {
  orderId: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  stripePaymentId: string;
  createdAt: Date;
}

export async function sendOrderNotificationEmail(order: OrderDetails) {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.total.toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order - Red Night</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 28px;">🍸 New Order Received!</h1>
      </div>

      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
          <p style="margin: 0; color: #666; font-size: 14px;">Order ID</p>
          <p style="margin: 5px 0 0 0; font-weight: bold; font-family: monospace; font-size: 14px;">${order.orderId}</p>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Stripe Payment ID</p>
          <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 12px;">${order.stripePaymentId}</p>
        </div>

        <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Customer Details</h2>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${order.customerName}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${order.customerEmail}">${order.customerEmail}</a></p>

        <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 25px;">Shipping Address</h2>
        <p style="margin: 5px 0; line-height: 1.6;">
          ${order.shippingAddress.line1}<br>
          ${order.shippingAddress.line2 ? order.shippingAddress.line2 + '<br>' : ''}
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
          ${order.shippingAddress.country}
        </p>

        <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 25px;">Order Items</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #eee;">
          <table style="width: 100%;">
            <tr>
              <td style="padding: 5px 0;"><strong>Subtotal:</strong></td>
              <td style="text-align: right;">$${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Shipping:</strong></td>
              <td style="text-align: right;">${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}</td>
            </tr>
            <tr style="font-size: 18px;">
              <td style="padding: 10px 0; border-top: 2px solid #d4af37;"><strong>Total:</strong></td>
              <td style="text-align: right; padding: 10px 0; border-top: 2px solid #d4af37; color: #d4af37;"><strong>$${order.total.toFixed(2)} AUD</strong></td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: #1a1a1a; border-radius: 6px; text-align: center;">
          <p style="margin: 0; color: #888; font-size: 14px;">
            View full order details in
            <a href="https://dashboard.stripe.com/payments/${order.stripePaymentId}" style="color: #d4af37;">Stripe Dashboard</a>
          </p>
        </div>

        <p style="margin-top: 25px; color: #999; font-size: 12px; text-align: center;">
          Order received at ${order.createdAt.toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })} AEST
        </p>
      </div>
    </body>
    </html>
  `;

  const plainText = `
New Order Received - Red Night

Order ID: ${order.orderId}
Stripe Payment ID: ${order.stripePaymentId}

CUSTOMER DETAILS
Name: ${order.customerName}
Email: ${order.customerEmail}

SHIPPING ADDRESS
${order.shippingAddress.line1}
${order.shippingAddress.line2 ? order.shippingAddress.line2 + '\n' : ''}${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}
${order.shippingAddress.country}

ORDER ITEMS
${order.items.map((item) => `- ${item.name} x${item.quantity} @ $${item.unitPrice.toFixed(2)} = $${item.total.toFixed(2)}`).join('\n')}

Subtotal: $${order.subtotal.toFixed(2)}
Shipping: ${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}
Total: $${order.total.toFixed(2)} AUD

View in Stripe: https://dashboard.stripe.com/payments/${order.stripePaymentId}
  `.trim();

  try {
    const client = getResendClient();
    const { data, error } = await client.emails.send({
      // Use your verified domain. Before domain verification, use: 'onboarding@resend.dev'
      from: process.env.RESEND_FROM_EMAIL || 'Red Night Orders <orders@rednight.com.au>',
      to: ORDER_NOTIFICATION_EMAILS,
      replyTo: 'bobbyleo@me.com',
      subject: `New Order: ${order.customerName} - $${order.total.toFixed(2)} AUD`,
      html,
      text: plainText,
    });

    if (error) {
      console.error('Failed to send order notification email:', error);
      throw error;
    }

    console.log('Order notification email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Error sending order notification email:', error);
    throw error;
  }
}

export async function sendCustomerConfirmationEmail(order: OrderDetails) {
  if (!order.customerEmail || order.customerEmail === 'No email provided') {
    console.warn('No customer email available, skipping confirmation email');
    return;
  }

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; color: #e0e0e0;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; text-align: center; color: #e0e0e0;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; text-align: right; color: #e0e0e0;">$${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; text-align: right; color: #e0e0e0;">$${item.total.toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmed - Red Night</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0d0d0d;">

      <div style="background-color: #1a1a1a; padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center; border-bottom: 2px solid #d4af37;">
        <h1 style="color: #d4af37; margin: 0 0 8px 0; font-size: 32px; letter-spacing: 2px; text-transform: uppercase;">Red Night</h1>
        <p style="color: #888; margin: 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Premium Ready-to-Drink Cocktails</p>
      </div>

      <div style="background-color: #1a1a1a; padding: 30px; border-radius: 0 0 8px 8px;">

        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 10px 0;">Order Confirmed</h2>
          <p style="color: #aaa; margin: 0; font-size: 15px;">
            Thanks ${order.customerName.split(' ')[0]}, your order is on its way.
          </p>
        </div>

        <div style="background-color: #111; padding: 15px 20px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #d4af37;">
          <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Reference</p>
          <p style="margin: 4px 0 0 0; font-family: monospace; font-size: 13px; color: #d4af37;">${order.orderId}</p>
        </div>

        <h3 style="color: #d4af37; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 1px solid #2a2a2a;">Your Order</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="padding: 10px 12px; text-align: left; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Product</th>
              <th style="padding: 10px 12px; text-align: center; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
              <th style="padding: 10px 12px; text-align: right; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Price</th>
              <th style="padding: 10px 12px; text-align: right; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="padding-top: 15px; border-top: 1px solid #2a2a2a; margin-bottom: 25px;">
          <table style="width: 100%;">
            <tr>
              <td style="padding: 5px 0; color: #888; font-size: 14px;">Subtotal</td>
              <td style="text-align: right; color: #e0e0e0; font-size: 14px;">$${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #888; font-size: 14px;">Shipping</td>
              <td style="text-align: right; color: #e0e0e0; font-size: 14px;">${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0 0 0; color: #ffffff; font-size: 16px; font-weight: bold; border-top: 1px solid #2a2a2a;">Total</td>
              <td style="text-align: right; padding: 12px 0 0 0; color: #d4af37; font-size: 18px; font-weight: bold; border-top: 1px solid #2a2a2a;">$${order.total.toFixed(2)} AUD</td>
            </tr>
          </table>
        </div>

        <h3 style="color: #d4af37; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 1px solid #2a2a2a;">Delivering To</h3>
        <p style="margin: 0 0 25px 0; color: #aaa; line-height: 1.8; font-size: 14px;">
          ${order.customerName}<br>
          ${order.shippingAddress.line1}<br>
          ${order.shippingAddress.line2 ? order.shippingAddress.line2 + '<br>' : ''}
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
          Australia
        </p>

        <div style="background-color: #111; padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 25px;">
          <p style="margin: 0 0 5px 0; color: #888; font-size: 13px;">Questions about your order?</p>
          <p style="margin: 0; font-size: 13px;">
            <a href="mailto:orders@rednight.com.au" style="color: #d4af37; text-decoration: none;">orders@rednight.com.au</a>
          </p>
        </div>

        <p style="margin: 0; color: #444; font-size: 11px; text-align: center; line-height: 1.6;">
          Red Night &nbsp;|&nbsp; Australia &nbsp;|&nbsp;
          <a href="https://drinkwise.org.au" style="color: #555; text-decoration: none;">Drink Responsibly</a>
          <br>
          Please enjoy responsibly. Must be 18+ to purchase alcohol.
        </p>

      </div>
    </body>
    </html>
  `;

  const plainText = `
Order Confirmed — Red Night

Thanks ${order.customerName.split(' ')[0]}, your order is confirmed.

Order Reference: ${order.orderId}

ORDER SUMMARY
${order.items.map((item) => `${item.name} x${item.quantity} — $${item.total.toFixed(2)}`).join('\n')}

Subtotal: $${order.subtotal.toFixed(2)}
Shipping: ${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}
Total: $${order.total.toFixed(2)} AUD

DELIVERING TO
${order.customerName}
${order.shippingAddress.line1}
${order.shippingAddress.line2 ? order.shippingAddress.line2 + '\n' : ''}${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}
Australia

Questions? Email orders@rednight.com.au

Please enjoy responsibly. Must be 18+ to purchase alcohol.
drinkwise.org.au
  `.trim();

  try {
    const client = getResendClient();
    const { data, error } = await client.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Red Night <orders@rednight.com.au>',
      to: order.customerEmail,
      replyTo: 'orders@rednight.com.au',
      subject: `Order confirmed — Red Night`,
      html,
      text: plainText,
    });

    if (error) {
      console.error('Failed to send customer confirmation email:', error);
      throw error;
    }

    console.log('Customer confirmation email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Error sending customer confirmation email:', error);
    throw error;
  }
}
