import { Route, Routes } from "react-router-dom"
import './App.css';
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <div>
      <AuthProvider />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>


      </Routes>
    </div>
  );
}

export default App;
