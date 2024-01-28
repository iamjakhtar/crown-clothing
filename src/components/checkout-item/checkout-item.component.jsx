import { useContext } from "react";
import { CartContext } from "../../context/cart-context.component";
import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  QuantityContainer,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItem, incrementQuantity, decrementQuantity } =
    useContext(CartContext);
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <QuantityContainer>
        <Arrow onClick={() => decrementQuantity(cartItem)}>&lt;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={() => incrementQuantity(cartItem)}>&gt;</Arrow>
      </QuantityContainer>
      <Price>{price}</Price>
      <RemoveButton onClick={() => removeItem(cartItem)}>X</RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
