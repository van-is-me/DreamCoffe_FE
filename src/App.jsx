import { Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/ve-chung-toi" element={<AboutUs />} />
        <Route path="/menu/:childPath/:paramName" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
