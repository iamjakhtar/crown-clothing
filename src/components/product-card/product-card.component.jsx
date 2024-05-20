import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.reducer";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  FooterContainer,
  ProductCardContainer,
  ProductImage,
  ProductName,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

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
        onClick={() => dispatch(addItemToCart(product))}
      >
        ADD TO CART
      </Button>
    </ProductCardContainer>
  );
};
export default ProductCard;
