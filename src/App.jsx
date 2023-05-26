import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Map from "./page/Map";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
