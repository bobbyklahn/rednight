// Product entity
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  priceAUD: number;
  stripeProductId: string;
  stripePriceId: string;
  imageUrl: string;
  images: string[];
  isSlab: boolean;
}

// Cart item entity
export interface CartItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

// Cart state
export interface CartState {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  itemCount: number;
}

// Cart context type
export interface CartContextType extends CartState {
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: string) => CartItem | undefined;
  hasItem: (productId: string) => boolean;
}

// Checkout session parameters
export interface CheckoutSessionParams {
  lineItems: Array<{
    price: string;
    quantity: number;
  }>;
  shippingOptions: Array<{
    shipping_rate: string;
  }>;
  successUrl: string;
  cancelUrl: string;
  mode: 'payment';
  shipping_address_collection: {
    allowed_countries: ['AU'];
  };
}

// API response types
export interface CreateCheckoutResponse {
  url: string;
}

export interface ErrorResponse {
  error: string;
}
