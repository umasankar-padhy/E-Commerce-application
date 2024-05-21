

import React from "react";
import { NavLink, Link } from "react-router-dom";

// import { useSelector } from 'react-redux';
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import useCategory from "../../hooks/useCategory";
// import { useCart } from "../../context/cart";
import { Badge, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch,useSelector } from 'react-redux';
import { setAuth } from '../redux/auth/authActions';

export default function Navbarr() {
    // const [cart] = useCart();
    const dispatch = useDispatch();

    // const categories = useCategory();
    const auth = useSelector((state) => state.auth);
    console.log(auth)
    const handleLogout = () => {
        // setAuth({});
        localStorage.removeItem("auth");
        dispatch(setAuth({}));

        alert("Logout Successfully");
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

                        <Nav.Item>
                            <Nav.Link to="/cart" as={NavLink}>

                                Cart{" "}
                                {/* {cart.length ? <Badge bg="secondary">{cart.length}</Badge> : ""} */}


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
                            </>
                        ) : (

                            <Nav.Item>
                                <Nav.Link as={NavLink} onClick={handleLogout} to="/login">
                                    Logout
                                </Nav.Link>
                            </Nav.Item>

                        )}

                        {/* {auth?.user?.role ? "" : */}



                        {/* } */}

                        {/* <Nav.Item>
                         <Nav.Link as={NavLink} to="/cart">
                           Cart (0)
                            </Nav.Link>
                              </Nav.Item> */}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};


