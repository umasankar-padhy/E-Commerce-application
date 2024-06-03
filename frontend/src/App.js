import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./components/AuthProvider";
import CartProvider from "./components/CartProvider";
import Cart from "./components/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import MerchantSignupPage from "./components/merchant/MerchantSignup";
import MerchantLogin from "./components/merchant/MerchantLogin";
import MerchantDashboard from "./components/merchant/MerchantDashboard";
import Profile from "./components/merchant/Profile";
import ForgotPassword from "./components/merchant/ForgotPassword";
import ResetPassword from "./components/merchant/ResetPassword";
import NotificationPage from "./components/merchant/NotificationPage";
import Orderpage from "./components/Orderpage";
import ResetPasswordUser from "./components/ResetPassword";
import ForgotPasswordUser from "./components/ForgotPassword";


function App() {
  return (
    <div>
      <AuthProvider />
      <CartProvider />
      <Routes>
        {/* <Route path="/notifications" element={<NotificationPage  />} /> */}

        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset_password" element={<ResetPasswordUser />}></Route>
        <Route path="/forgot_password" element={<ForgotPasswordUser />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<PrivateRoute element={Cart} />} />
        <Route path="/order" element={<PrivateRoute element={Orderpage} />} />
        <Route path="/merchant/signup" element={<MerchantSignupPage />} />
        <Route path="/merchant/login" element={<MerchantLogin />} />
        <Route path="/merchant/forgot-password" element={<ForgotPassword />} />
        <Route path="/merchant/reset-password" element={<ResetPassword />} />
        <Route path="/merchant/dashboard/*" element={<MerchantDashboard />} />
        <Route path="/merchant/dashboard/profile" element={<Profile />} />
        
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
