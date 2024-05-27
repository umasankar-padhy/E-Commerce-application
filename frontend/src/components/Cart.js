
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOfCart from './CardOfCart';
import Navbarr from './Navbar';

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);

    const totalPrice = cart
        .filter(item => !item.isOrdered)
        .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);

    // const inCartItems = cart.filter(item => item.isAdded);
    // const removedItems = cart.filter(item => !item.isAdded);

    return (
        <div>
            <Navbarr />
            {/* <pre>{JSON.stringify(cart, null, 4)}</pre> */}
            <div className=" mt-4">
                <h2>In Your Cart</h2>
                <div>
                    {cart.length === 0 ? (
                        <div className="alert alert-info" role="alert">
                            Your cart is empty
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
                        // onClick={handleCheckOut}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Check Out'}
                    </button>
                </div>

                {/* <h2>Recently Removed</h2>
                <div>
                    {removedItems.length === 0 ? (
                        <div className="alert alert-info" role="alert">
                            No recently removed items
                        </div>
                    ) : (
                        <div className="container d-flex flex-wrap">
                            {removedItems?.map((item) => (
                                <CardOfCart key={item._id} item={item} />
                            ))}
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
}
