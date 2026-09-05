import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "aleemama_cart";

const demoCart = [
  {
  },
];

// Load cart from localStorage when the app starts
function loadInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    // If a saved cart exists, use it
    if (savedCart) {
      return JSON.parse(savedCart);
    }

    // If no saved cart exists, start with demo cart
    return demoCart;
  } catch (error) {
    // If localStorage has corrupted data,
    // don't let the app crash
    console.error("Failed to load cart from localStorage:", error);

    return demoCart;
  }
}

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  // Load the cart from localStorage when the app starts
  const [cartItems, setCartItems] = useState(loadInitialCart);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  const openCart = () => setCartOpen(true);

  const closeCart = () => setCartOpen(false);

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });

    // Automatically open the cart after adding an item
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty + delta),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        openCart,
        closeCart,
        toggleCart,
        cartItems,
        addToCart,
        updateQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);