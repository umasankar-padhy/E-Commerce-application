
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOfCart from './CardOfCart';
import Navbarr from './Navbar';
import axios from 'axios';
import { url } from '../default';

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);

    const totalPrice = cart
        .filter(item => !item.isOrdered)
        .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);





    const handleCheckOut = async (e) => {
        e.preventDefault();

        try {
            const products = cart.map(item => ({
                productId: item.product_id._id,
                merchantId: item.product_id.merchant_id
            }));
            // Extract product IDs and merchant IDs
            const cartIds = cart.map(item => item._id);
            const merchantIds = cart.map(item => item.product_id.merchant_id);
            const addressId ="664e291f890c7e8ff8cc40c5"


            const response = await axios.post(`${url}api/v1/order/create`,  {cartIds,addressId,products} ,
              {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );


            if (response.data.success) {
                // Clear the cart after successful checkout
                // dispatch any action to clear the cart state if needed
            } else {
                // Handle error, show error message, etc.
            }
        } catch (error) {
        } 
    };














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
                        onClick={handleCheckOut}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Proceed to buy'}
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
