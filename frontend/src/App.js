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
import MerchantSignupPage from "./components/merchant/MerchantSignup";
import MerchantLogin from "./components/merchant/MerchantLogin";
import MerchantDashboard from "./components/merchant/MerchantDashboard";
<<<<<<< HEAD
import Profile from "./components/merchant/Profile";
import ForgotPassword from "./components/merchant/ForgotPassword";
import ResetPassword from "./components/merchant/ResetPassword";
import CommentPage from "./components/CommentsPage"; // Import the CommentPage component
=======
import NotificationPage from "./components/merchant/NotificationPage";
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18

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
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<PrivateRoute element={Cart} />} />
        <Route path="/merchant/signup" element={<MerchantSignupPage />} />
        <Route path="/merchant/login" element={<MerchantLogin />} />
<<<<<<< HEAD
        <Route path="/merchant/forgot-password" element={<ForgotPassword />} />
        <Route path="/merchant/reset-password" element={<ResetPassword />} />
        <Route path="/merchant/dashboard/*" element={<MerchantDashboard />} />
        <Route path="/merchant/dashboard/profile" element={<Profile />} />
        {/* Include the comment page route */}
        <Route path="/product/:id/comments" element={<CommentPage />} />
=======
        <Route path="/merchant/dashboard/*" element={<MerchantDashboard />} />
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
