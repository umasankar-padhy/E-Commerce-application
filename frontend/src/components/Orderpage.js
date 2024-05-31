// import { useDispatch, useSelector } from 'react-redux';
// import CardOfCart from './CardOfCart';
// import Navbarr from './Navbar';
// import axios from 'axios';
// import { url } from '../default';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import AddressForm from './AddressForm';

// export default function Orderpage() {
//     const cart = useSelector((state) => state.cart);
//     const [loading, setLoading] = useState(false);
//     const auth = useSelector((state) => state.auth);
//     const navigate = useNavigate();

//     const totalPrice = cart
//         .filter(item => item.product_id && !item.isOrdered)
//         .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);

//     const handleCheckOut = async (e) => {
//         e.preventDefault();

//         try {
//             const products = cart.map(item => ({
//                 productId: item.product_id._id,
//                 merchantId: item.product_id.merchant_id
//             }));
//             // Extract product IDs and merchant IDs
//             const cartIds = cart.map(item => item._id);
//             const merchantIds = cart.map(item => item.product_id.merchant_id);
//             const addressId = "664e291f890c7e8ff8cc40c5"


//             const response = await axios.post(`${url}api/v1/order/create`, { cartIds, addressId, products },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${auth?.token}`
//                     }
//                 }
//             );

//             if (response.data.success) {
//                 navigate("/cart")
//                 // Clear the cart after successful checkout
//                 // dispatch any action to clear the cart state if needed
//             } else {
//                 // Handle error, show error message, etc.
//             }
//         } catch (error) {
//             // Handle error
//         }
//     };






//     const [addresses, setAddresses] = useState([]);
//     const [showAddressForm, setShowAddressForm] = useState(false);
//     const fetchAddresses = async () => {
//         try {
//             const response = await axios.get(`${url}api/v1/address/getByAuth`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${auth?.token}`
//                     }
//                 }
//             );
//             if (response.data && response.data.success) {
//                 setAddresses(response.data.data);
//             } else {
//                 throw new Error('Failed to fetch addresses');
//             }
//         } catch (error) {
//             console.error('Error fetching addresses:', error);
//         }
//     };

//     useEffect(() => {
       
//         fetchAddresses();
//     }, [auth]);






//     return (
//         <div>
//             <Navbarr />
//             <h2>Order summary</h2>
//             <div className="container d-flex flex-wrap">
//                 {cart?.map((item) => (
//                     <div className="row g-0">
//                         <div className="col-md-4">
//                             <img
//                                 src={item.product_id?.imageUrl[0]}
//                                 className="img-fluid rounded-start"
//                                 alt={item.product_id?.name}
//                                 style={{ width: '150px' }}
//                             />
//                         </div>
//                         <div className="col-md-8">
//                             <div className="card-body" style={{ width: '300px' }}>
//                                 <h5 className="card-title">{item.product_id?.title}</h5>
//                                 <p className="card-text">Price: &#8377; {item.product_id?.price || 'N/A'}/-</p>
//                                 <p className="card-text">Quantity: {item.quantity || 'N/A'}</p>
//                                 <p className="card-text">
//                                     <small className="text-muted">Size: {item.size || 'N/A'}</small>
//                                     <span>  </span>
//                                     <small className="text-muted">Color: {item.color || 'N/A'}</small>
//                                 </p>
//                                 <button
//                                     className="btn btn-warning"
//                                     // onClick={handleRemoveFromCart}
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Removing...' : 'Remove it'}
//                                 </button>
//                             </div>
//                         </div>
//                         <hr />
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h2>Shipping Address</h2>
//                 <Container className="mt-5">
//                     <Row className="justify-content-md-center">
//                         <Col md={8}>
//                             {addresses.length > 0 ? (
//                                <div>
//                                     {addresses.map((address) => (
//                                         <>
//                                             <Card key={address._id} className="mb-3">
//                                                 <Card.Body>
//                                                     <Card.Title>{address.houseNo}</Card.Title>
//                                                     <Card.Text>
//                                                         {address.streetName}, {address.city}, {address.district}, {address.state}, {address.country} - {address.pin}
//                                                     </Card.Text>
//                                                 </Card.Body>
//                                             </Card>

//                                         </>
//                                     ))}
//                                     <Container className="mt-5">
//                                         <Button onClick={() => setShowAddressForm(!showAddressForm)}>
//                                             {showAddressForm ? 'Hide Address Form' : 'Click to Add a New Address'}
//                                         </Button>

//                                         {showAddressForm && <AddressForm setShowAddressForm={setShowAddressForm} fetchAddresses={fetchAddresses} />}


//                                     </Container>
//                                </div>
//                             ) : (
//                                     <Container className="mt-5">
//                                         <Button onClick={() => setShowAddressForm(!showAddressForm)}>
//                                             {showAddressForm ? 'Hide Address Form' : 'Click to Add a New Address'}
//                                         </Button>

//                                         {showAddressForm && <AddressForm setShowAddressForm={setShowAddressForm} fetchAddresses={fetchAddresses} />}

                                       
//                                     </Container>
//                             )}
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </div>
//     )
// }




















import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { url } from '../default';
import AddressForm from './AddressForm';
import Navbarr from './Navbar';
import { setCart } from '../redux/cart/cartActions';
import { toast } from 'react-toastify';

export default function Orderpage() {
    const cart = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const dispatch = useDispatch();

    const totalPrice = cart
        .filter(item => item.product_id && !item.isOrdered)
        .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);

    const handleCheckOut = async (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            alert("Please select a shipping address.");
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
                toast("order successful")
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


    return (
        <div>
            <Navbarr />
            <h2>Order summary</h2>
            <div className="container d-flex flex-wrap">
                {cart?.map((item) => (
                    <div className="row g-0" key={item._id}>
                        <div className="col-md-4">
                            <img
                                src={item.product_id?.imageUrl[0]}
                                className="img-fluid rounded-start"
                                alt={item.product_id?.name}
                                style={{ width: '150px' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body" style={{ width: '300px' }}>
                                <h5 className="card-title">{item.product_id?.title}</h5>
                                <p className="card-text">Price: &#8377; {item.product_id?.price || 'N/A'}/-</p>
                                <p className="card-text">Quantity: {item.quantity || 'N/A'}</p>
                                <p className="card-text">
                                    <small className="text-muted">Size: {item.size || 'N/A'}</small>
                                    <span>  </span>
                                    <small className="text-muted">Color: {item.color || 'N/A'}</small>
                                </p>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => { handleRemoveFromCart(item) }}

                                    disabled={loading}
                                >
                                    {loading ? 'Removing...' : 'Remove it'}
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <div>
                <h2>totalPrice :{totalPrice}</h2>
                <h2>Shipping Address</h2>
                <Container className="mt-5">
                    <Row className="justify-content-md-center">
                        <Col md={8}>
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
                                    <Container className="mt-5">
                                        <Button onClick={() => setShowAddressForm(!showAddressForm)}>
                                            {showAddressForm ? 'Hide Address Form' : 'Click to Add a New Address'}
                                        </Button>

                                        {showAddressForm && <AddressForm setShowAddressForm={setShowAddressForm} fetchAddresses={fetchAddresses} />}
                                    </Container>
                                </div>
                            ) : (
                                <Container className="mt-5">
                                    <Button onClick={() => setShowAddressForm(!showAddressForm)}>
                                        {showAddressForm ? 'Hide Address Form' : 'Click to Add a New Address'}
                                    </Button>

                                    {showAddressForm && <AddressForm setShowAddressForm={setShowAddressForm} fetchAddresses={fetchAddresses} />}
                                </Container>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="mt-4">
                <Button variant="success" onClick={handleCheckOut}>Checkout</Button>
            </div>
        </div>
    );
}
