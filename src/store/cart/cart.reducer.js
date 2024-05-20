import { createSlice } from "@reduxjs/toolkit";


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
  const existingCartItem = items.find((item) => item.id === product.id);
  if (existingCartItem.quantity === 1) {
    return items.filter((item) => item.id !== existingCartItem.id);
  }
  return items.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

export const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);




const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
     state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addToCart(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeFromCart(state.cartItems, action.payload);
    },
    
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    }
  }
})


export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

