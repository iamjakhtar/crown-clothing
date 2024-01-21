import { createContext, useState, useEffect } from "react";

const addToCart = (items, product) => {
  const foundProduct = items.find((item) => item.id === product.id);
  if (foundProduct) {
    return items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...items, { ...product, quantity: 1 }];
};

const removeFromCart = (items, product) => {
  return items.filter((item) => item.id !== product.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  removeItem: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addToCart(cartItems, productToAdd));
  };

  const removeItem = (productToRemove) => {
    setCartItems(removeFromCart(cartItems, productToRemove));
  };

  const incrementQuantity = (item) => {
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(newCartItems);
  };
  const decrementQuantity = (item) => {
    if (item.quantity === 1) {
      removeItem(item);
      return;
    }
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(newCartItems);
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      const { price, quantity } = cartItem;
      const itemTotal = price * quantity;
      return total + itemTotal;
    }, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    removeItem,
    incrementQuantity,
    decrementQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
