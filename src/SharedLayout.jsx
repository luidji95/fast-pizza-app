import { Outlet } from "react-router-dom";
import Navigation from "./Components/Navigation";
import { useSelector } from "react-redux";

const SharedLayout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const showFooter = cartItems.length > 0; // Proveri da nemaš typo

  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      {showFooter && (
        <footer>
          <p>© 2025 My Pizza App</p>
        </footer>
      )}
    </>
  );
};

export default SharedLayout;
