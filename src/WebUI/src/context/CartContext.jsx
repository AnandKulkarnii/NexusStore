import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem('NexusStore_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
    return [];
  });
  const [isLoaded] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('NexusStore_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product, quantity = 1) => {
    setItems(current => {
      const existing = current.find(i => i.id === product.id);
      if (existing) {
        return current.map(i => 
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...current, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(current => 
      current.map(i => i.id === productId ? { ...i, quantity } : i)
    );
  };

  const removeFromCart = (productId) => {
    setItems(current => current.filter(i => i.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
