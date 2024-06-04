

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Badge, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/auth/authActions';
import { toast } from "react-toastify";

export default function Navbarr() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    // const inCartItems = cart.filter(item => item.isAdded);

    // console.log(auth)
    const handleLogout = () => {
        localStorage.removeItem("auth");
        dispatch(setAuth([]));
        toast("Logout Successfully");
    };

    return (
        <Navbar style={{ backgroundColor: "#e8e9eb" }} expand="lg">
            <div className="container " style={{ fontSize: "1rem" }} >
                <Navbar.Brand as={Link} to="/">
                    🛒 Ecommerce App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
                <Navbar.Collapse id="navbarTogglerDemo01">
                    <Nav className="ms-auto">
                        {/* <SearchInput /> */}
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/">
                                Home
                            </Nav.Link>
                        </Nav.Item>

                        {/* <Nav.Item>
                            <Nav.Link to="/cart" as={NavLink}>
                                {/* <pre>{JSON.stringify(cart, null, 4)}</pre> 


                                Cart{" "}
                                {cart.length ? (
                                    <Badge bg="secondary">
                                        {cart?.length}
                                    </Badge>
                                ) : ""}


                            </Nav.Link>
                        </Nav.Item> */}
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
                            <>
                                <Nav.Item>
                                    <Nav.Link to="/cart" as={NavLink}>
                                        {/* <pre>{JSON.stringify(cart, null, 4)}</pre> */}


                                        Cart{" "}
                                        {cart.length ? (
                                            <Badge bg="secondary">
                                                {cart?.length}
                                            </Badge>
                                        ) : ""}


                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} onClick={handleLogout} to="/login">
                                        Logout
                                    </Nav.Link>
                                </Nav.Item>

                            </>
                        )}



                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};


