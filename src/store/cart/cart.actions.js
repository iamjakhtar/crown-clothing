import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES } from "./cart.types";

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
    if (existingCartItem.quantity === 1) {
        return items.filter(item => item.id !== existingCartItem.id);
    }
    return items.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
};

export const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addToCart(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  };

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeFromCart(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
  