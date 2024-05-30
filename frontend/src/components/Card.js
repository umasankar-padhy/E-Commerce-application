import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../default';
import axios from 'axios';
import { setAuth } from '../redux/auth/authActions';
import { setCart } from '../redux/cart/cartActions';
import { toast } from 'react-toastify';

export default function Card({ item }) {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const location = useLocation();

    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);

    async function handleAddToCart(e) {
        e.preventDefault();
        if (Object.keys(auth).length === 0) {
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
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error('Error:', err);
        }
    }

    async function handleUpdateCartItem(e) {
        e.preventDefault();

        if (Object.keys(auth).length === 0) {
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
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error('Error:', err);
        }
    }
//  product card is created here
    const isProductInCart = cart.some((cartItem) => cartItem.product_id?._id === item?._id);
    const isOrdered = cart.some((cartItem) => cartItem.product_id?._id === item?._id && cartItem.isOrdered);

    return (
        <div>
            <div className="card m-2" style={{ width: '16rem' }} key={item?._id}>
                <img
                    src={item?.imageUrl[0]}
                    className="card-img-top"
                    alt={item?.title}
                    style={{ height: '12rem' }}
                />

                <div className="card-body" style={{ height: '11.5rem' }}>
                    <h6 className="card-title">{item?.title?.length > 64 ? `${item.title.substring(0, 64)}...` : item?.title}</h6>

                    <h5 className="card-title">&#8377; {item?.price}/-</h5>
                    <h6 className="card-title">
                        set Quantity :
                        <select className="ms-2 h-100 bg-light rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(10), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </h6>

                    <p className="card-text" style={{ fontSize: '.76rem' }}>
                        {item?.description?.length > 61 ? `${item.description.substring(0, 61)}...` : item?.description}
                    </p>
                </div>
                <div>
                    <button
                        className="btn btn-primary ms-1 mb-1"
                        style={{ fontSize: '.8rem' }}
                        onClick={() => navigate(`/product/${item?._id}`)}
                    >
                        More Details
                    </button>
                    {isProductInCart && !isOrdered ? (
                        <button
                            className="btn btn-warning ms-1 mb-1"
                            style={{ fontSize: '.8rem' }}
                            onClick={handleUpdateCartItem}
                        >
                            Buy More
                        </button>
                    ) : (
                        <button
                            className="btn btn-warning ms-1 mb-1"
                            style={{ fontSize: '.8rem' }}
                            onClick={handleAddToCart}
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
