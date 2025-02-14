import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  deleteFromChart,
} from "../Redux/Slices/cartSlice";
import "../Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          "https://react-fast-pizza-api.onrender.com/api/menu"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await response.json();
        setMenuItems(data.data || []);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <h2>Loading menu...</h2>;
  }

  return (
    <div className="menu-container">
      <h2>Our Menu</h2>
      <div className="menu-list">
        {menuItems.map((item) => {
          const cartItem = cartItems.find((cart) => cart.id === item.id);

          return (
            <div key={item.id} className="menu-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p>{item.ingredients?.join(", ")}</p>

                {cartItem ? (
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </button>
                    <span className="quantity">{cartItem.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => dispatch(deleteFromChart(item.id))}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <p className="price">${item.unitPrice}</p>
                )}
              </div>
              <div className="menu-item-buttons">
                {cartItem ? (
                  <span className="price-tag">${item.unitPrice}</span>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
