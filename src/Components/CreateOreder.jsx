import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectTotalPrice } from "../Redux/Slices/cartSlice";
import { useEffect } from "react";
import "../CreateOrder.css";
import { setAddress, setPhoneNumber } from "../Redux/Slices/userSlice";

const CreateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectTotalPrice);
  const userName = useSelector((state) => state.user.username);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const address = useSelector((state) => state.user.address);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isPriority, setIsPriority] = useState(false);

  const finalPrice = isPriority ? totalPrice + 3 : totalPrice;

  const handleOrder = async () => {
    const orderData = {
      customer: userName,
      phone: phoneNumber,
      address: address,
      cart: cartItems.map((item) => ({
        pizzaId: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity,
      })),
      priority: isPriority,
    };

    try {
      const response = await fetch(
        "https://react-fast-pizza-api.onrender.com/api/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order created:", data);

      navigate(`/order/${data.data.id}`);
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="order-page">
      <div className="order-box">
        <h2 className="order-title">Ready to order? Let's go!</h2>

        <div className="order-form">
          <div className="order-field">
            <p className="order-label">First Name</p>
            <input
              type="text"
              value={userName}
              className="order-input"
              readOnly
            />
          </div>

          <div className="order-field">
            <p className="order-label">Phone number</p>
            <input
              type="text"
              className="order-input"
              placeholder="Enter your phone number"
              onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
            />
          </div>

          <div className="order-field">
            <p className="order-label">Address</p>
            <input
              type="text"
              className="order-input"
              placeholder="Enter your delivery address"
              onChange={(e) => {
                console.log(e.target.value);
                dispatch(setAddress(e.target.value));
              }}
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

        <button className="order-btn" onClick={handleOrder}>
          ORDER NOW FOR €{finalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
