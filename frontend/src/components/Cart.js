import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOfCart from './CardOfCart';
import Navbarr from './Navbar';
import axios from 'axios';
import { url } from '../default';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const totalPrice = cart
    .filter(item => item.product_id && !item.isOrdered)
    .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);

    const handleCheckOut =  (e) => {
        e.preventDefault();
        navigate("/order")
    };

    return (
        <div>
            <Navbarr />
            <div className=" mt-4">
                <h2>In Your Cart</h2>
                <div>
                    {cart.length === 0 ? (
                        <div className="alert alert-info" role="alert" 
                        onClick={()=>{navigate("/home")}}
                        >
                            Your cart is empty Click here to continue Shopping
                            
                        </div>
                    ) : (
                        <div className="container d-flex flex-wrap">
                            {cart?.map((item) => (
                                <CardOfCart key={item._id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    Total Price: &#8377; {totalPrice.toFixed(2)}/-
                </div>
                <div>
                    <button
                        className="btn btn-warning"
                        onClick={handleCheckOut}
                        disabled={loading}
                        
                    >
                        {loading ? 'Processing...' : 'Proceed to buy'}
                    </button>
                </div>
            </div>
        </div>
    );
}
