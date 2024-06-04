import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { url } from '../default';
import { setCart } from '../redux/cart/cartActions';
import { toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';
import './Card.css';

export default function Card({ item, auth, navigate }) {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const location = useLocation();

    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);

    async function handleAddToCart(e) {
        e.preventDefault();
        if (!auth?.token) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }
        try {
            setLoading(true);
            const formData = { product_id: item?._id, quantity: qty };
            const res = await axios.post(`${url}api/v1/cart/add-to-cart`, formData, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                },
            });

            if (res.data.success) {
                toast(res.data.message);
                dispatch(setCart(res?.data?.data));
                navigate('/cart');
            } else {
                toast(res.data.message);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdateCartItem(e) {
        e.preventDefault();

        if (!auth?.token) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }
        try {
            setLoading(true);
            const formData = { product_id: item?._id, quantity: qty };
            const res = await axios.put(`${url}api/v1/cart/update-cart-item`, formData, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                },
            });

            if (res.data.success) {
                toast(res.data.message);
                dispatch(setCart(res?.data?.data));
                navigate('/cart');
            } else {
                toast(res.data.message);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }

    const isProductInCart = cart.some((cartItem) => cartItem.product_id?._id === item?._id);
    const isOrdered = cart.some((cartItem) => cartItem.product_id?._id === item?._id && cartItem.isOrdered);
    const hasMultipleImages = Array.isArray(item?.imageUrl) && item?.imageUrl.length > 1;

    return (
        <div className="card-container">
            <div className="card custom-card" key={item?._id}>
                {hasMultipleImages ? (
                    <Carousel className="custom-carousel">
                        {item?.imageUrl.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={image}
                                    className="card-img-top custom-card-img"
                                    alt={item?.title}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div className="single-image-container">
                        <img
                            src={item?.imageUrl[0]}
                            className="card-img-top custom-card-img"
                            alt={item?.title}
                        />
                    </div>
                )}
                <div className="card-body" style={{ height: "12rem" }}>
                    <h6 className="card-title">{item?.title.length > 50 ? `${item.title.substring(0, 50)}...` : item?.title}</h6>
                    <h6 className="card-price">&#8377; {item?.price}/-</h6>
                    <h6 className="card-quantity">
                        Qty:
                        <select className="ms-2 h-100 bg-light rounded" onChange={(e) => setQty(Number(e.target.value))}>
                            {Array.from(Array(10), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </h6>
                    <p className="card-text">
                        {item?.description?.length > 85 ? `${item.description.substring(0, 85)}...` : item?.description}
                    </p>
                </div>
                <div className="card-buttons">
                    <button
                        className="btn btn-primary custom-btn"
                        onClick={() => navigate(`/product/${item?._id}`)}
                    >
                        More Details
                    </button>
                    {isProductInCart && !isOrdered ? (
                        <button
                            className="btn btn-warning custom-btn"
                            onClick={handleUpdateCartItem}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Buy More'}
                        </button>
                    ) : (
                        <button
                            className="btn btn-warning custom-btn"
                            onClick={handleAddToCart}
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
