import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectTotalPrice } from "../Redux/Slices/cartSlice";
import "../CreateOrder.css";
import { setAddress, setPhoneNumber } from "../Redux/Slices/userSlice";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectTotalPrice);
  const userName = useSelector((state) => state.user.username);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const address = useSelector((state) => state.user.address);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isPriority, setIsPriority] = useState(false);

  // Držimo state za greške inputa
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  const finalPrice = isPriority ? totalPrice + 3 : totalPrice;

  // Zod šema
  const orderSchema = z.object({
    customer: z
      .string()
      .min(2, "Customer name must have at least 2 characters"),
    phone: z.coerce
      .number()
      .int()
      .positive("Phone number must be a valid number"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
  });

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

    // Validacija inputa pomoću Zod-a
    const validationResult = orderSchema.safeParse(orderData);

    if (!validationResult.success) {
      // Resetujemo prethodne greške
      setPhoneError("");
      setAddressError("");

      // Iteriramo kroz sve greške i postavljamo odgovarajuće state-ove
      validationResult.error.issues.forEach((issue) => {
        if (issue.path.includes("phone")) {
          setPhoneError(issue.message);
        }
        if (issue.path.includes("address")) {
          setAddressError(issue.message);
        }
      });

      // Opciona toast notifikacija za grešku
      toast.error("Please check your input data and try again");
      return;
    }

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
        console.log(await response.json());
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
              className={`order-input ${phoneError ? "error-border" : ""}`}
              placeholder={phoneError || "Enter your phone number"}
              onChange={(e) => {
                setPhoneError(""); // Reset greške pri unosu
                dispatch(setPhoneNumber(e.target.value));
              }}
            />
          </div>

          <div className="order-field">
            <p className="order-label">Address</p>
            <input
              type="text"
              className={`order-input ${addressError ? "error-border" : ""}`}
              placeholder={addressError || "Enter your delivery address"}
              onChange={(e) => {
                setAddressError(""); // Reset greške pri unosu
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
