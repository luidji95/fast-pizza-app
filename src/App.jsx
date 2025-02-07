import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Welcome from "./Components/Welcome";
import Menu from "./Components/Menu";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
