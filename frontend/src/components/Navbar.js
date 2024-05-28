import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/auth/authActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(setAuth({}));
    alert("Logout Successfully");
  };

  return (
    <BootstrapNavbar style={{ backgroundColor: "#e8e9eb" }} expand="lg">
      <div className="container" style={{ fontSize: "1rem" }}>
        <BootstrapNavbar.Brand as={Link} to="/">
          🛒 Ecommerce App
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarTogglerDemo01" />
        <BootstrapNavbar.Collapse id="navbarTogglerDemo01">
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/" exact>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/cart">
                Cart{" "}
                {cart.length ? (
                  <Badge bg="secondary">{cart.length}</Badge>
                ) : (
                  <Badge bg="secondary">0</Badge>
                )}
              </Nav.Link>
            </Nav.Item>
            {Object.keys(auth).length === 0 ? (
              <>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/merchant/signup">
                    Become a Seller
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link as={NavLink} onClick={handleLogout} to="/login">
                  Logout
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </div>
    </BootstrapNavbar>
  );
}
