import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  deleteFromChart,
  clearCart,
} from "../Redux/Slices/cartSlice";
import "../Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="div-main">
      <div className="div-content">
        <a onClick={() => navigate("/menu")} className="back-link">
          Back to menu
        </a>
        <h2>Your cart, {user ? user : "Guest"}</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty! 🛒</p>
        ) : (
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="item-info">
                  {item.quantity} × {item.name} - $
                  {item.unitPrice * item.quantity}
                </span>
                <div className="item-actions">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="quantity-btn"
                  >
                    ➖
                  </button>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="quantity-btn"
                  >
                    ➕
                  </button>
                  <button
                    onClick={() => dispatch(deleteFromChart(item.id))}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-buttons">
          <button
            className="order-btn"
            onClick={() => navigate("/createOreder")}
          >
            Order pizza
          </button>
          <button className="clear-btn" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
