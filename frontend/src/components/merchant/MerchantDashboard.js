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
      {/* Navbar with profile icon and product options */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/merchant/dashboard">
            Merchant Dashboard
          </Navbar.Brand>
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
        </Container>
      </Navbar>

      {/* Main content area */}
      <Container className="mt-4">
        <Routes>
          {/* Route for the ProductManagement component */}
          <Route path="products" element={<ProductManagement />} />
        
          <Route path="notifications" element={<NotificationPage setnoti={setnoti} noti={noti} getAllNotifications={getAllNotifications} />} />
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
