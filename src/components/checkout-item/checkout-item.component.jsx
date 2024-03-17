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
import { removeItemFromCart, addItemToCart, clearItemFromCart } from "../../store/cart/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import {selectCartItems} from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <QuantityContainer>
        <Arrow onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}>&lt;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={() => dispatch(addItemToCart(cartItems, cartItem))}>&gt;</Arrow>
      </QuantityContainer>
      <Price>{price}</Price>
      <RemoveButton onClick={() => dispatch(clearItemFromCart(cartItems, cartItem))}>X</RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
