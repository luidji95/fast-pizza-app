import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation će se prikazivati na svim stranicama */}
      <Navigation />

      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
