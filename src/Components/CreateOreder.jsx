import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectTotalPrice } from "../Redux/Slices/cartSlice";
import "../CreateOrder.css";

const CreateOrder = () => {
  const navigate = useNavigate();
  const totalPrice = useSelector(selectTotalPrice);
  const [isPriority, setIsPriority] = useState(false);

  const finalPrice = isPriority ? totalPrice + 3 : totalPrice;

  return (
    <div className="order-page">
      <div className="order-box">
        <h2 className="order-title">Ready to order? Let's go!</h2>

        <div className="order-form">
          <div className="order-field">
            <p className="order-label">First Name</p>
            <input
              type="text"
              className="order-input"
              placeholder="Enter your name"
            />
          </div>

          <div className="order-field">
            <p className="order-label">Phone number</p>
            <input
              type="text"
              className="order-input"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="order-field">
            <p className="order-label">Address</p>
            <input
              type="text"
              className="order-input"
              placeholder="Enter your delivery address"
            />
          </div>

          <div className="order-priority">
            <input
              type="checkbox"
              id="priority"
              className="order-checkbox"
              checked={isPriority}
              onChange={() => setIsPriority(!isPriority)}
            />
            <label htmlFor="priority" className="order-checkbox-label">
              Want to give your order priority?
            </label>
          </div>
        </div>

        <button className="order-btn">
          ORDER NOW FOR €{finalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
