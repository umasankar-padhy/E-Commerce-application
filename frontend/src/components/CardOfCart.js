import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/cart/cartActions';
import { url } from '../default';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CardOfCart({ item }) {
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    async function handleRemoveFromCart() {
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
        <div className="card ms-3 mt-3" style={{ maxWidth: '450px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={item.product_id?.imageUrl[0]}
                        className="img-fluid rounded-start"
                        alt={item.product_id?.name}
                        style={{ width: '150px' }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body" style={{ width: '265px' }}>
                        <h5 className="card-title">{item.product_id?.title}</h5>
                        <p className="card-text">Price: &#8377; {item.product_id?.price || 'N/A'}/-</p>
                        <p className="card-text">Quantity: {item.quantity || 'N/A'}</p>
                        <p className="card-text">
                            <small className="text-muted">Size: {item.product_id?.size || 'N/A'}</small>
                            <span>  </span>
                            <small className="text-muted">Color: {item.product_id?.color || 'N/A'}</small>
                        </p>
                        <button
                            className="btn btn-warning"
                            onClick={handleRemoveFromCart}
                            disabled={loading}
                        >
                            {loading ? 'Removing...' : 'Remove from Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
