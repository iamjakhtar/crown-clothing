import { CartItemProps } from "../../types/CartItemProps";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <h2>{name}</h2>
        <span>
          {quantity} x ${price}{" "}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};
export default CartItem;
