'use client';

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '@/lib/types';
import { calculateShipping } from '@/lib/shipping';

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; items: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.findIndex(
        item => item.product.id === action.product.id
      );

      if (existingIndex >= 0) {
        const newState = [...state];
        const newQuantity = newState[existingIndex].quantity + action.quantity;
        newState[existingIndex] = {
          ...newState[existingIndex],
          quantity: newQuantity,
          lineTotal: newState[existingIndex].product.priceAUD * newQuantity,
        };
        return newState;
      }

      return [
        ...state,
        {
          product: action.product,
          quantity: action.quantity,
          lineTotal: action.product.priceAUD * action.quantity,
        },
      ];
    }

    case 'REMOVE_ITEM':
      return state.filter(item => item.product.id !== action.productId);

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return state.filter(item => item.product.id !== action.productId);
      }

      return state.map(item =>
        item.product.id === action.productId
          ? {
              ...item,
              quantity: action.quantity,
              lineTotal: item.product.priceAUD * action.quantity,
            }
          : item
      );
    }

    case 'CLEAR_CART':
      return [];

    case 'HYDRATE':
      return action.items;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rednight_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Recalculate lineTotals to ensure data integrity
          const validated = parsed.map(item => ({
            ...item,
            lineTotal: item.product.priceAUD * item.quantity,
          }));
          dispatch({ type: 'HYDRATE', items: validated });
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      localStorage.removeItem('rednight_cart');
    }
  }, []);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('rednight_cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('rednight_cart');
    }
  }, [items]);

  // Computed values
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingCost = calculateShipping(items);
  const total = subtotal + shippingCost;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Actions
  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItem = (productId: string) => {
    return items.find(item => item.product.id === productId);
  };

  const hasItem = (productId: string) => {
    return items.some(item => item.product.id === productId);
  };

  const value: CartContextType = {
    items,
    subtotal,
    shippingCost,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
    hasItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext };
