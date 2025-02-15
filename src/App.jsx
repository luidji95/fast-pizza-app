import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import SharedLayout from "./SharedLayout";
import Welcome from "./Components/Welcome";
import Menu from "./Components/Menu";
import Cart from "./Components/Cart";
import CreateOreder from "./Components/CreateOreder";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Welcome />} />
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="createOreder" element={<CreateOreder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
