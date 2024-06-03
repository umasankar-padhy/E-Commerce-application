
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { url } from '../../default';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import { BsPersonCircle, BsBell } from "react-icons/bs"; // Import profile and notification icons
import ProductManagement from "./ProductManagement"; 
import ProductView from "./ProductView"; 
import ProductEdit from "./ProductEdit"; 
import ProductForm from "./ProductForm"; 
import NotificationPage from "./NotificationPage"; 
import { setAuth } from "../../redux/auth/authActions"; 
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

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
  const auth = useSelector((state) => state.auth);
  const merchantName = auth.user?.name || "Merchant";
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // State for the count of unread notifications 
  
  const [noti, setNoti] = useState([]); // State for notifications
  
  const [count, setCount] = useState(noti?.length); 
  const [unreadNotifications, setUnreadNotifications] = useState(false); // State for unread notifications
  useEffect(() => { 
    setCount(noti?.length);
  }, [noti]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${url}api/v1/notification/get`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        });
        setNoti(response.data);
        
        // Check if there are any unread notifications
        const hasUnread = response.data.some(notification => !notification.isRead);
        setUnreadNotifications(hasUnread);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [auth.token]);


=======
  const [noti, setNoti] = useState([]);

  // Function to handle logout

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(setAuth({}));
    toast.success("Logout Successfully");
    navigate("/");
  };

  const handleGoToProducts = () => {
    navigate("/merchant/dashboard/products");
  };


  const handleCreateProduct = () => {
    navigate("/merchant/dashboard/products/create");
  };

  const isWelcomePage = location.pathname === "/merchant/dashboard";

  function handleNavigate() {
    setCount(0);
    setUnreadNotifications(false);
    // navigate('/merchant/dashboard/notification');
  }

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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      


      {/* Navbar with profile icon and merchant name */}

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/merchant/dashboard">
            Merchant Dashboard
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/merchant/dashboard/profile">
                <BsPersonCircle /> {merchantName}
              </Nav.Link>
              <Nav.Link as={Link} onClick={handleLogout} to="/">
                Logout
              </Nav.Link>
              {/* Display the bell icon conditionally based on unread notifications */}
              {unreadNotifications && (
                <Nav.Link as={Link} to="/merchant/dashboard/notifications" onClick={handleNavigate} > 
                  <BsBell color="yellow" />{count ? count : ""} {/* Change the color of the bell icon */}
                </Nav.Link>
              )}
              {!unreadNotifications && (
                <Nav.Link as={Link}  onClick={handleNavigate} to="/merchant/dashboard/notifications">
                  <BsBell />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>

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

        </Container>
      </Navbar>

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
                <Button variant="success" onClick={handleCreateProduct}>
                  Create Product
                </Button>
              </div>
            </Col>
          </Row>
        )}

        <Routes>
          <Route path="products" element={<ProductManagement auth={auth} />} />
          <Route path="products/view/:id" element={<ProductView />} />
          <Route path="products/edit/:id" element={<ProductEdit auth={auth} />} />

          <Route path="products/create" element={<ProductForm />} />
          <Route path="notifications" element={<NotificationPage noti={noti} />} />

          <Route path="notifications" element={<NotificationPage setNoti={setNoti} noti={noti} getAllNotifications={getAllNotifications} />} />

        </Routes>
      </Container>
    </div>
  );
};

export default MerchantDashboard;
