import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import { CartContext } from "../../context/cart-context.component";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {!cartItems.length ? (
          <EmptyMessage>No items in your cart</EmptyMessage>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        )}
      </CartItems>
      <Button onClick={goToCheckout}>Go To Checkout</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
