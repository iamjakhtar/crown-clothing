import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCardContainer,
  ProductImage,
  FooterContainer,
  ProductName,
} from "./product-card.styles";
import { CartContext } from "../../context/cart-context.component";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <FooterContainer>
        <ProductName>{name}</ProductName>
        <span>{price}</span>
      </FooterContainer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => addItemToCart(product)}
      >
        ADD TO CART
      </Button>
    </ProductCardContainer>
  );
};
export default ProductCard;
