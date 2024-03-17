import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.actions";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  FooterContainer,
  ProductCardContainer,
  ProductImage,
  ProductName,
} from "./product-card.styles";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();


  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <FooterContainer>
        <ProductName>{name}</ProductName>
        <span>{price}</span>
      </FooterContainer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => dispatch(addItemToCart(cartItems, product))}
      >
        ADD TO CART
      </Button>
    </ProductCardContainer>
  );
};
export default ProductCard;
