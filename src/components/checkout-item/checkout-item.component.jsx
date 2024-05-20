import { useDispatch } from "react-redux";
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.reducer";
import {
  Arrow,
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  QuantityContainer,
  RemoveButton,
  Value,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const dispatch = useDispatch();


  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <QuantityContainer>
        <Arrow onClick={() => dispatch(removeItemFromCart(cartItem))}>&lt;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={() => dispatch(addItemToCart(cartItem))}>&gt;</Arrow>
      </QuantityContainer>
      <Price>{price}</Price>
      <RemoveButton onClick={() => dispatch(clearItemFromCart(cartItem))}>X</RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
