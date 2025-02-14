import { Outlet } from "react-router-dom";
import Navigation from "./Components/Navigation";
import { useSelector } from "react-redux";
import Footer from "./Components/Footer";

const SharedLayout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const showFooter = cartItems.length > 0;

  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer></Footer>}
    </>
  );
};

export default SharedLayout;
