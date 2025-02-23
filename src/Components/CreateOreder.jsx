import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectTotalPrice } from "../Redux/Slices/cartSlice";
import "../CreateOrder.css";
import { setAddress, setPhoneNumber } from "../Redux/Slices/userSlice";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Funkcija koja parsira Zod greške i vraća objekat sa porukama grešaka
const parseErrorsFromResponse = (error) => {
  if (error instanceof z.ZodError) {
    return error.issues.reduce(
      (acc, issue) => {
        if (issue.path.includes("phone")) acc.phone = issue.message;
        if (issue.path.includes("address")) acc.address = issue.message;
        return acc;
      },
      { phone: "", address: "" }
    );
  }
  return null;
};

const CreateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectTotalPrice);
  const userName = useSelector((state) => state.user.username);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const address = useSelector((state) => state.user.address);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isPriority, setIsPriority] = useState(false);

  const [zodErrors, setZodErrors] = useState({ phone: "", address: "" });

  const finalPrice = isPriority ? totalPrice + 3 : totalPrice;

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            if (data.display_name) {
              dispatch(setAddress(data.display_name));
            } else {
              toast.error(
                "Could not fetch address, using coordinates instead."
              );
              dispatch(setAddress(`Lat: ${latitude}, Lng: ${longitude}`));
            }
          } catch (error) {
            console.error("Geocoding error:", error);
            toast.error("Failed to fetch address. Please try again.");
            dispatch(setAddress(`Lat: ${latitude}, Lng: ${longitude}`)); // Ako ne uspe, prikazuje koordinate
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get location. Please allow location access.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Zod validacija
  const orderSchema = z.object({
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

    try {
      orderSchema.parse(orderData);
      setZodErrors({ phone: "", address: "" });

      const response = await fetch(
        "https://react-fast-pizza-api.onrender.com/api/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(
          errorData.message || "Server error, order not created."
        );
        error.isCustom = true;
        throw error;
      }

      const data = await response.json();
      console.log("Order created:", data);
      navigate(`/order/${data.data.id}`);
    } catch (error) {
      const parsedErrors = parseErrorsFromResponse(error);
      if (parsedErrors) {
        setZodErrors(parsedErrors);
        toast.error("Please check your input data and try again!");
      } else if (error.isCustom) {
        console.error("Server error:", error.message);
        toast.error("Something went wrong with the server. Try again later.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
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
              className={`order-input ${zodErrors.phone ? "error-border" : ""}`}
              placeholder={zodErrors.phone || "Enter your phone number"}
              onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
            />
          </div>

          <div className="order-field">
            <p className="order-label">Address</p>
            <div className="input-wrapper">
              <input
                type="text"
                className={`order-input ${
                  zodErrors.address ? "error-border" : ""
                }`}
                placeholder={zodErrors.address || "Enter your delivery address"}
                value={address}
                onChange={(e) => dispatch(setAddress(e.target.value))}
              />
              <button className="location-btn" onClick={getUserLocation}>
                Get Position
              </button>
            </div>
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
