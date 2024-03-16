import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";
const addToCart = (items, product) => {
  const existingCartItem = items.find((item) => item.id === product.id);
  if (existingCartItem) {
    return items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...items, { ...product, quantity: 1 }];
};

const removeFromCart = (items, product) => {
  const existingCartItem = items.find(item => item.id === product.id);
  if (existingCartItem) {
    return items.filter(item => item.id !== existingCartItem.id);
  }
  
};

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItem: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
});


const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`Unhandled action ${type} type in cart reducer.`);
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const {cartItems, cartTotal, cartCount, isCartOpen} = state;

  const updateCartReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce((total, cartItem) => {
      const { price, quantity } = cartItem;
      const itemTotal = price * quantity;
      return total + itemTotal;
    }, 0);
    
    dispatch(createAction(
     CART_ACTION_TYPES.SET_CART_ITEMS,
      {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      }
    ))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addToCart(cartItems, productToAdd);
    updateCartReducer(newCartItems);
  };

  const removeItem = (productToRemove) => {
    const newCartItems = removeFromCart(cartItems, productToRemove);
    updateCartReducer(newCartItems);
  };

  const incrementQuantity = (item) => {
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    updateCartReducer(newCartItems);
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
    updateCartReducer(newCartItems);
  };


  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

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
