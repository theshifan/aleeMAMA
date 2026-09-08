// import { createContext, useContext, useReducer, useEffect } from "react";
// import { parsePrice } from "../utils/parseprice";

// // ---- Cart shape ----
// // cart.items = [{ id, name, priceDisplay, unitPrice, image, quantity }]
// // priceDisplay keeps your original "250/-" string for showing in the UI.
// // unitPrice is the parsed number used for all cart math.
// // Kept intentionally flat and serializable — this is exactly what
// // gets synced to the backend at checkout time.

// const CartContext = createContext(null);
// const STORAGE_KEY = "aleemama_cart";

// function loadInitialCart() {
//   try {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     return saved ? JSON.parse(saved) : { items: [] };
//   } catch {
//     // Corrupted or blocked storage shouldn't crash the app —
//     // just fall back to an empty cart.
//     return { items: [] };
//   }
// }

// function cartReducer(state, action) {
//   switch (action.type) {
//     case "ADD_ITEM": {
//       const product = action.payload;
//       const existing = state.items.find((i) => i.id === product.id);

//       if (existing) {
//         return {
//           ...state,
//           items: state.items.map((i) =>
//             i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
//           ),
//         };
//       }

//       return {
//         ...state,
//         items: [
//           ...state.items,
//           {
//             id: product.id,
//             name: product.name,
//             priceDisplay: product.price, // e.g. "250/-", kept for display
//             unitPrice: parsePrice(product.price), // e.g. 250, used for math
//             image: product.image,
//             quantity: 1,
//           },
//         ],
//       };
//     }

//     case "REMOVE_ITEM": {
//       return {
//         ...state,
//         items: state.items.filter((i) => i.id !== action.payload.id),
//       };
//     }

//     case "UPDATE_QUANTITY": {
//       const { id, quantity } = action.payload;
//       if (quantity <= 0) {
//         return {
//           ...state,
//           items: state.items.filter((i) => i.id !== id),
//         };
//       }
//       return {
//         ...state,
//         items: state.items.map((i) =>
//           i.id === id ? { ...i, quantity } : i
//         ),
//       };
//     }

//     case "CLEAR_CART": {
//       return { items: [] };
//     }

//     default:
//       return state;
//   }
// }

// export function CartProvider({ children }) {
//   const [cart, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

//   // Persist to localStorage on every change — this is what makes the
//   // guest cart survive a page refresh before login.
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
//   }, [cart]);

//   const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
//   const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
//   const updateQuantity = (id, quantity) =>
//     dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
//   const clearCart = () => dispatch({ type: "CLEAR_CART" });

//   const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
//   const subtotal = cart.items.reduce(
//     (sum, i) => sum + i.unitPrice * i.quantity,
//     0
//   );

//   const value = {
//     items: cart.items,
//     itemCount,
//     subtotal,
//     addItem,
//     removeItem,
//     updateQuantity,
//     clearCart,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return ctx;
// }