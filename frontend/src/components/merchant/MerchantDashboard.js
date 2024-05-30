<<<<<<< HEAD
import React from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs"; // Import profile icon
import ProductManagement from "./ProductManagement"; // Import the ProductManagement component
import ProductView from "./ProductView"; // Import the ProductView component
import ProductEdit from "./ProductEdit"; // Import the ProductEdit component
import { useDispatch, useSelector } from "react-redux"; // Import hooks for dispatching actions and selecting state
import "./MerchantDashboard.css"; // Import the CSS file for custom styles
import { setAuth } from "../../redux/auth/authActions"; // Import setAuth action for updating auth state
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

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
=======
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs"; // Import profile icon
import ProductManagement from "./ProductManagement";
import { url } from "../../default";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/auth/authActions";
import { toast } from "react-toastify";
import NotificationPage from "./NotificationPage";

const MerchantDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18

  const [noti,setnoti]=useState([]);
  // const [count,setcount]=useState(0)
  const auth = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(setAuth([]));
    toast("Logout Successfully");
  };

  const getAllNotifications = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`${url}api/v1/notification/get`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        });
      setnoti(data);
      // setcount(noti.length)
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!(Object.keys(auth).length === 0)) { getAllNotifications(); }
    //  getAllNotifications();
  }, [auth]);
function handleclick(){
// setcount(0)
}
  
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
<<<<<<< HEAD
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/merchant/dashboard/profile">
                <BsPersonCircle /> {merchantName}
              </Nav.Link>
              <Nav.Link as={Link} onClick={handleLogout} to="/">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
=======
          {/* Products link */}
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/merchant/dashboard/products">
              Products
            </Nav.Link>
          </Nav>
          {/* Profile and Logout links */}
          <Nav className="ml-auto">
            {/* Profile link */}
            <Nav.Link as={Link} to="/merchant/dashboard/profile">
              <BsPersonCircle /> Profile
            </Nav.Link>
            {/* Logout link */}
            <Nav.Link as={Link} onClick={handleLogout} to="/">
              Logout
            </Nav.Link>
            <Nav.Link as={Link} to="/merchant/dashboard/notifications " onClick={handleclick} >
              notification{noti.length}
              
            </Nav.Link>
          </Nav>
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18
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
<<<<<<< HEAD
          <Route path="products" element={<ProductManagement auth={auth} />} />
          <Route path="products/view/:id" element={<ProductView />} />
          <Route path="products/edit/:id" element={<ProductEdit auth={auth} />} />
=======
          {/* Route for the ProductManagement component */}
          <Route path="products" element={<ProductManagement />} />
        
          <Route path="notifications" element={<NotificationPage setnoti={setnoti} noti={noti} getAllNotifications={getAllNotifications} />} />
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18
        </Routes>
      </Container>
    </div>
  );
};

export default MerchantDashboard;




// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { BsPersonCircle } from "react-icons/bs"; // Import profile icon
// import ProductManagement from "./ProductManagement";
// import { url } from "../../default";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuth } from "../../redux/auth/authActions";
// import { toast } from "react-toastify";
// import NotificationPage from "./NotificationPage";

// const MerchantDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [noti, setNoti] = useState([]);
//   const auth = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     dispatch(setAuth([]));
//     toast("Logout Successfully");
//     navigate('/');
//   };

//   const getAllNotifications = async () => {
//     try {
//       const { data } = await axios.get(`${url}api/v1/notification/get`, {
//         headers: {
//           Authorization: `Bearer ${auth?.token}`
//         }
//       });
//       setNoti(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth && auth.token) {
//       getAllNotifications();
//     }
//   }, [auth]);

//   const handleClick = () => {
//     setNoti([]); // Reset notification count
//   };

//   return (
//     <div>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand as={Link} to="/merchant/dashboard">
//             Merchant Dashboard
//           </Navbar.Brand>
//           <Nav className="mr-auto">
//             <Nav.Link as={Link} to="/merchant/dashboard/products">
//               Products
//             </Nav.Link>
//           </Nav>
//           <Nav className="ml-auto">
//             <Nav.Link as={Link} to="/merchant/dashboard/profile">
//               <BsPersonCircle /> Profile
//             </Nav.Link>
//             <Nav.Link as={Link} onClick={handleLogout} to="/">
//               Logout
//             </Nav.Link>
//             <Nav.Link as={Link} to="/merchant/dashboard/notifications" onClick={handleClick}>
//               notification{noti.length}
//             </Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>

//       <Container className="mt-4">
//         <Routes>
//           <Route path="products" element={<ProductManagement />} />
//           <Route path="notifications" element={<NotificationPage setNoti={setNoti} noti={noti} getAllNotifications={getAllNotifications} />} />
//         </Routes>
//       </Container>
//     </div>
//   );
// };

// export default MerchantDashboard;
