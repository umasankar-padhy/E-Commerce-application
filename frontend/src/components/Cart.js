import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOfCart from './CardOfCart';
import Navbarr from './Navbar';
import axios from 'axios';
import { url } from '../default';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const totalPrice = cart
        .filter(item => item.product_id && !item.isOrdered)
        .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);

    const handleCheckOut = (e) => {
        e.preventDefault();
        navigate("/order");
    };

    return (
        <div>
            <Navbarr />
            <Container className="mt-4">
                {/* <pre>{JSON.stringify(cart, null, 4)}</pre> */}

                <h2 className="mb-4">In Your Cart</h2>
                {cart.length === 0 ? (
                    <Alert variant="info" onClick={() => navigate("/home")} className="text-center">
                        Your cart is empty. Click here to continue Shopping
                    </Alert>
                ) : (
                    <Row>
                        {cart.map((item) => (
                            <Col key={item._id} sm={12} md={6} lg={4} className="mb-3">
                                <CardOfCart item={item} />
                            </Col>
                        ))}
                    </Row>
                )}
                {cart.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-end">Total Price: &#8377; {totalPrice.toFixed(2)}/-</h4>
                    </div>
                )}
                {cart.length > 0 && (
                    <div className="text-end mt-3">
                        <Button
                            variant="warning"
                            onClick={handleCheckOut}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Proceed to buy'}
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}
