import { useState, useEffect } from "react";
import "../Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="menu-item-content">
              <h3>{item.name}</h3>
              <p>{item.ingredients?.join(", ")}</p>
              <p className="price">${item.unitPrice}</p>
            </div>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
