import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs"; // Import profile icon
import ProductManagement from "./ProductManagement"; // Import the ProductManagement component
import ProductView from "./ProductView"; // Import the ProductView component
import ProductEdit from "./ProductEdit"; // Import the ProductEdit component
import NotificationPage from "./NotificationPage"; // Import the NotificationPage component
import { useDispatch, useSelector } from "react-redux"; // Import hooks for dispatching actions and selecting state
import { setAuth } from "../../redux/auth/authActions"; // Import setAuth action for updating auth state
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import "./MerchantDashboard.css"; // Import the CSS file for custom styles
import { url } from "../../default";

const MerchantDashboard = () => {
  // Get the authentication state from the Redux store
  const auth = useSelector((state) => state.auth);
  // Get the merchant's name from the authentication state or default to "Merchant"
  const merchantName = auth.user?.name || "Merchant";
  // React router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  // Redux hook for dispatching actions
  const dispatch = useDispatch();

  const [noti, setNoti] = useState([]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove auth data from local storage
    dispatch(setAuth({})); // Update the auth state in the Redux store
    toast.success("Logout Successfully"); // Show a success toast notification
    navigate("/"); // Navigate to the home page
  };

  // Function to navigate to the products page
  const handleGoToProducts = () => {
    navigate("/merchant/dashboard/products");
  };

  // Check if the current path is the welcome page
  const isWelcomePage = location.pathname === "/merchant/dashboard";

  const getAllNotifications = async () => {
    try {
      const { data } = await axios.get(`${url}api/v1/notification/get`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setNoti(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!(Object.keys(auth).length === 0)) {
      getAllNotifications();
    }
  }, [auth]);

  const handleClick = () => {
    setNoti([]); // Reset notification count
  };

  return (
    <div>
      {/* ToastContainer to render toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {/* Navbar with profile icon and merchant name */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/merchant/dashboard">
            Merchant Dashboard
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/merchant/dashboard/products">
              Products
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/merchant/dashboard/profile">
              <BsPersonCircle /> {merchantName}
            </Nav.Link>
            <Nav.Link as={Link} onClick={handleLogout} to="/">
              Logout
            </Nav.Link>
            <Nav.Link as={Link} to="/merchant/dashboard/notifications" onClick={handleClick}>
              notification{noti.length}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main content area */}
      <Container className="mt-4">
        {isWelcomePage && (
          <Row>
            <Col>
              <div className="welcome-message">
                <h1>Welcome to the Dashboard, {merchantName}!</h1>
                <p>Manage your products and profile from here.</p>
                <Button variant="primary" onClick={handleGoToProducts}>
                  Go to Products
                </Button>
              </div>
            </Col>
          </Row>
        )}

        {/* Define the routes for different components */}
        <Routes>
          <Route path="products" element={<ProductManagement auth={auth} />} />
          <Route path="products/view/:id" element={<ProductView />} />
          <Route path="products/edit/:id" element={<ProductEdit auth={auth} />} />
          <Route path="notifications" element={<NotificationPage setNoti={setNoti} noti={noti} getAllNotifications={getAllNotifications} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default MerchantDashboard;
