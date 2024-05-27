import { Route, Routes } from "react-router-dom"
import './App.css';
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./components/AuthProvider";
import CartProvider from "./components/CartProvider";
import Cart from "./components/Cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <AuthProvider />
      <CartProvider />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="/cart" element={<Cart />}></Route> */}
        <Route path="/cart" element={<PrivateRoute element={Cart} />} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
