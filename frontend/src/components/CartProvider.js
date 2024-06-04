// src/components/CartProvider.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cart/cartActions";
import axios from "axios";
import { url } from "../default";
import { toast } from "react-toastify";

const CartProvider = ({ children }) => {
    const dispatch = useDispatch();
    // const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    async function getCart() {
        try {
            const res = await axios.get(`${url}api/v1/cart/get-cart`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                },
            });

            if (res.data.success) {
                dispatch(setCart(res?.data?.data));
            } else {
                toast(res.data.message);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }

    useEffect(() => {
        if (!(Object.keys(auth).length === 0)) {
            getCart();
        } else {
            dispatch(setCart([]));
        }
    }, [dispatch, auth.role === "user"]);

    return <>{children}</>;
};

export default CartProvider;
