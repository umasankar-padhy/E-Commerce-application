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
    .filter(item => item.product_id && !item.isOrdered)
    .reduce((total, item) => total + (item.product_id.price * item.quantity), 0);

<<<<<<< HEAD
=======




>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18
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
<<<<<<< HEAD
            const addressId ="664e291f890c7e8ff8cc40c5";


            const response = await axios.post(
                `${url}api/v1/order/create`,
                { cartIds, addressId, products },
                {
=======
            const addressId ="664e291f890c7e8ff8cc40c5"


            const response = await axios.post(`${url}api/v1/order/create`,  {cartIds,addressId,products} ,
              {
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );

<<<<<<< HEAD
=======

>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18
            if (response.data.success) {
                // Clear the cart after successful checkout
                // dispatch any action to clear the cart state if needed
            } else {
                // Handle error, show error message, etc.
            }
        } catch (error) {
<<<<<<< HEAD
            // Handle error
        }
    };
=======
        } 
    };














    // const inCartItems = cart.filter(item => item.isAdded);
    // const removedItems = cart.filter(item => !item.isAdded);
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18

    return (
        <div>
            <Navbarr />
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
            </div>
        </div>
    );
}
