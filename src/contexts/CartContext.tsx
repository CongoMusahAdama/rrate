
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Property {
  id: number;
  name: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: string;
  location: string;
  type: string;
  status: string;
}

interface CartContextType {
  cartItems: Property[];
  addToCart: (property: Property) => void;
  removeFromCart: (propertyId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Property[]>([]);

  const addToCart = (property: Property) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === property.id);
      if (existingItem) {
        return prev; // Don't add duplicate
      }
      return [...prev, property];
    });
  };

  const removeFromCart = (propertyId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== propertyId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₵,]/g, ''));
      return total + price;
    }, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
