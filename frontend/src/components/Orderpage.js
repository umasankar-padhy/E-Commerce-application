import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { url } from '../default';
import AddressForm from './AddressForm';
import Navbarr from './Navbar';
import { setCart } from '../redux/cart/cartActions';
import { toast } from 'react-toastify';
import './Orderpage.css'; // Import custom CSS

export default function Orderpage() {
    const cart = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const dispatch = useDispatch();

    const [editItem, setEditItem] = useState(null);

    const totalPrice = cart
        .filter(item => item.product_id && !item.isOrdered)
        .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);

    const handleCheckOut = async (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            toast("Please select a shipping address.");
            return;
        }

        try {
            const products = cart.map(item => ({
                productId: item.product_id._id,
                merchantId: item.product_id.merchant_id
            }));
            const cartIds = cart.map(item => item._id);
            const addressId = selectedAddress;

            const response = await axios.post(`${url}api/v1/order/create`, { cartIds, addressId, products },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );

            if (response.data.success) {
                toast("Order successful");
                dispatch(setCart([]));
                navigate("/home");
            } else {
                alert("Failed to create order.");
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${url}api/v1/address/getByAuth`,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setAddresses(response.data.data);
                if (response.data.data.length > 0) {
                    setSelectedAddress(response.data.data[0]._id); // Set default selected address
                }
            } else {
                throw new Error('Failed to fetch addresses');
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [auth]);

    async function handleRemoveFromCart(item) {
        try {
            setLoading(true);
            const res = await axios.delete(`${url}api/v1/cart/remove-from-cart`, {
                data: { product_id: item?.product_id?._id },
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            });

            if (res.data.success) {
                toast(res.data.message);
                dispatch(setCart(res.data.data));
            } else {
                toast(res.data.message);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error:", err);
        }
    }

    async function handleUpdateCart(item, updatedItem) {
        try {
            setLoading(true);
            const res = await axios.put(`${url}api/v1/cart/update-cart`, {
                product_id: item.product_id._id,
                ...updatedItem,
            }, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            });

            if (res.data.success) {
                toast(res.data.message);
                dispatch(setCart(res.data.data));
                setEditItem(null);
            } else {
                toast(res.data.message);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error:", err);
        }
    }

    return (
        <div>
            <Navbarr />
            <Container className="mt-4">
                <Row>
                    <Col md={8}>
                        <h2 className="mb-4">Order Summary</h2>
                        {cart?.map((item) => (
                            <Card key={item._id} className="mb-3 cart-item-card">
                                <Row className="g-0">
                                    <Col md={4}>
                                        <img
                                            src={item.product_id?.imageUrl[0]}
                                            className="img-fluid rounded-start cart-item-image"
                                            alt={item.product_id?.name}
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            {editItem === item._id ? (
                                                <Form>
                                                    <Form.Group controlId="formQuantity">
                                                        <Form.Label>Quantity</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            min="1"
                                                            defaultValue={item.quantity}
                                                            onChange={(e) => setEditItem({ ...item, quantity: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="formSize">
                                                        <Form.Label>Size</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={item.size}
                                                            onChange={(e) => setEditItem({ ...item, size: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="formColor">
                                                        <Form.Label>Color</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            defaultValue={item.color}
                                                            onChange={(e) => setEditItem({ ...item, color: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                    <div className="action-buttons">
                                                        <Button
                                                            variant="success"
                                                            onClick={() => handleUpdateCart(item, editItem)}
                                                            disabled={loading}
                                                        >
                                                            {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
                                                        </Button>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => setEditItem(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </Form>
                                            ) : (
                                                <>
                                                    <Card.Title>{item.product_id?.title}</Card.Title>
                                                    <Card.Text>Price: ₹ {item.product_id?.price || 'N/A'}/-</Card.Text>
                                                    <Card.Text>Quantity: {item.quantity || 'N/A'}</Card.Text>
                                                    <Card.Text>
                                                        <small className="text-muted">Size: {item.product_id?.size || 'N/A'}</small>
                                                        <span>  </span>
                                                        <small className="text-muted">Color: {item.product_id?.color || 'N/A'}</small>
                                                    </Card.Text>
                                                    <div className="action-buttons">
                                                        <Button
                                                            variant="warning"
                                                            onClick={() => { handleRemoveFromCart(item) }}
                                                            disabled={loading}
                                                        >
                                                            {loading ? <Spinner animation="border" size="sm" /> : 'Remove'}
                                                        </Button>
                                                        {/* <Button
                                                            variant="primary"
                                                            onClick={() => setEditItem(item._id)}
                                                        >
                                                            Edit
                                                        </Button> */}
                                                    </div>
                                                </>
                                            )}
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </Col>
                    <Col md={4}>
                        <div className="checkout-section">
                            <h2 className="mb-4">Checkout</h2>
                            <div className="text-center mb-4">
                                <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
                            </div>
                            <h2 className="mb-4">Shipping Address</h2>
                            {addresses.length > 0 ? (
                                <div>
                                    {addresses.map((address) => (
                                        <Card key={address._id} className="mb-3">
                                            <Card.Body>
                                                <Form.Check
                                                    type="radio"
                                                    id={`address-${address._id}`}
                                                    name="address"
                                                    value={address._id}
                                                    checked={selectedAddress === address._id}
                                                    onChange={() => setSelectedAddress(address._id)}
                                                />
                                                <Card.Title>{address.houseNo}</Card.Title>
                                                <Card.Text>
                                                    {address.streetName}, {address.city}, {address.district}, {address.state}, {address.country} - {address.pin}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                    <Button className="mt-3" onClick={() => setShowAddressForm(!showAddressForm)}>
                                        {showAddressForm ? 'Hide Address Form' : 'Add a New Address'}
                                    </Button>
                                    {showAddressForm && <AddressForm setShowAddressForm={setShowAddressForm} fetchAddresses={fetchAddresses} />}
                                </div>
                            ) : (
                                <div>
                                    <Button onClick={() => setShowAddressForm(!showAddressForm)}>
                                        {showAddressForm ? 'Hide Address Form' : 'Add a New Address'}
                                    </Button>
                                    {showAddressForm && <AddressForm setShowAddressForm={setShowAddressForm} fetchAddresses={fetchAddresses} />}
                                </div>
                            )}
                            <div className="text-center mt-4">
                                <Button variant="success" onClick={handleCheckOut}>Checkout</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
