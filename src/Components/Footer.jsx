import { useSelector } from "react-redux";
import "../Footer.css";

const Footer = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  console.log(cartItems);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price || 0),
    0
  );

  return (
    <div className="footer-main">
      <div className="cart-container">
        <i className="fas fa-shopping-cart cart-icon"></i>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
      <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
    </div>
  );
};

export default Footer;
