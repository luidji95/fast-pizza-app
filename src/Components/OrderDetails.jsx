import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://react-fast-pizza-api.onrender.com/api/order/${orderId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrder(data.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="order-details">
      <h2 className="order-title">Order #{order.id} status</h2>

      <div className="order-status">
        {order.priority && <span className="badge priority">PRIORITY</span>}
        <span className="badge preparing">PREPARING ORDER</span>
      </div>

      <div className="order-estimate">
        <p>Only 52 minutes left 😊</p>
        <span>
          (Estimated delivery:{" "}
          {new Date(order.estimatedDelivery).toLocaleString()})
        </span>
      </div>

      {/* ORDER ITEMS */}
      <ul className="order-items">
        {order.cart.map((item) => (
          <li key={item.pizzaId} className="order-item">
            <span>
              {item.quantity} × {item.name}
            </span>
            <span className="price">€{item.unitPrice.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* PAYMENT INFO */}
      <div className="order-summary">
        <p>Price pizza: €{order.orderPrice - (order.priorityPrice || 0)}</p>
        {order.priority && <p>Price priority: €{order.priorityPrice}</p>}
        <p className="total-price">To pay on delivery: €{order.orderPrice}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
