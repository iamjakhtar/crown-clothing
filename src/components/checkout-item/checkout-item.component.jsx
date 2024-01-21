import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../context/cart-context.component";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItem, incrementQuantity, decrementQuantity } =
    useContext(CartContext);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={() => decrementQuantity(cartItem)}>
          &lt;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => incrementQuantity(cartItem)}>
          &gt;
        </span>
      </div>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={() => removeItem(cartItem)}>
        X
      </span>
    </div>
  );
};
export default CheckoutItem;
