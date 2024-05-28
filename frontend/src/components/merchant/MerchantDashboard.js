import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs"; // Import profile icon
import ProductManagement from "./ProductManagement";
import ProductView from "./ProductView"; // Import the ProductView component
import ProductEdit from "./ProductEdit"; // Import the ProductEdit component
import { useSelector } from "react-redux";

const MerchantDashboard = () => {
  const auth = useSelector((state) => state.auth);

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
            <Nav.Link as={Link} to="/">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main content area */}
      <Container className="mt-4">
        <Routes>
          {/* Route for the ProductManagement component */}
          <Route path="products" element={<ProductManagement auth={auth} />} />
          <Route path="products/view/:id" element={<ProductView />} />
          <Route path="products/edit/:id" element={<ProductEdit auth={auth} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default MerchantDashboard;
