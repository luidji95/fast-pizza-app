import { useSelector } from "react-redux";
import { selectTotalItems, selectTotalPrice } from "../Redux/Slices/cartSlice";
import "../Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const navigate = useNavigate();

  return (
    <div className="footer-main">
      <div className="cart-container" onClick={() => navigate("/cart")}>
        <i className="fas fa-shopping-cart cart-icon"></i>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
      <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
    </div>
  );
};

export default Footer;
