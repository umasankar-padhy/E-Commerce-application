import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Navbarr from './Navbar';
import Spinner from './Spinner';
import { url } from '../default';
import { useDispatch, useSelector } from 'react-redux';
import CartProvider from './CartProvider';
import { setCart } from '../redux/cart/cartActions';
import { toast } from 'react-toastify';


export default function ProductDetails() {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);



    const getProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}api/v1/product/get/${params?.id}`);
            setProduct(data?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        if (params?.id) getProduct();
    }, [params?.id]);

    async function handleAddToCart(e) {
        e.preventDefault();
        if (Object.keys(auth).length === 0) {
            navigate('/login', { state: { from: location.pathname } })
        }
        try {
            setLoading(true);
            const formData = { product_id: params?.id, quantity: qty }
            const res = await axios.post(`${url}api/v1/cart/add-to-cart`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );

            if (res.data.success) {
                toast(res.data.message);

                dispatch(setCart(res?.data?.data));
                navigate("/cart");

            } else {
                toast(res.data.message);
            }
            setLoading(false);

        } catch (err) {
            setLoading(false);

            console.error("Error:", err);
        }
    }

    async function handleUpdateCartItem(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const formData = { product_id: params?.id, quantity: qty }
            const res = await axios.put(`${url}api/v1/cart/update-cart-item`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );

            if (res.data.success) {
                toast(res.data.message);
                dispatch(setCart(res?.data?.data));
                navigate("/cart");

            } else {
                toast(res.data.message);
            }
            setLoading(false);

        } catch (err) {
            setLoading(false);

            console.error("Error:", err);
        }
    }
    // Check if item is in the cart and get its isOrdered status
    const cartItem = cart.find(cartItem => cartItem.product_id?._id === params?.id);
    const isProductInCart = Boolean(cartItem);
    const isOrdered = cartItem?.isOrdered;

    return (
        <div>
            <Navbarr />
            <pre>{JSON.stringify(product, null, 4)}</pre>

            {loading ? <Spinner /> :
                <div className="d-flex flex-wrap justify-content-center">
                    <h2 className="text-center">Product Details</h2>
                    <div className="row container mt-2">
                        <div className="col-md-6">
                            <img
                                src={product?.imageUrl}
                                className="card-img-top"
                                alt={product.title}
                                style={{
                                    height: "400px", width: "300px"
                                }}

                            />
                        </div>
                        <div className="col-md-6 ">
                            
                            <h5>{product.title}</h5>
                            <p>{product.description}</p>
                            <h4> &#8377; {product.price}/-</h4>
                            <h6 className="card-title">set Quantity :
                                <select className='ms-2 h-100 bg-light rounded' onChange={(e) => setQty(e.target.value)}>
                                    {Array.from(Array(10), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })}
                                </select>
                            </h6>
                            {isProductInCart && !isOrdered ? (

                                <button
                                    className="btn btn-warning ms-1 mb-1"
                                    style={{ fontSize: ".8rem" }}
                                    onClick={handleUpdateCartItem}
                                >
                                    Buy More
                                </button>
                            ) : (
                                <button
                                    className="btn btn-warning ms-1 mb-1"
                                    style={{ fontSize: ".8rem" }}
                                    onClick={handleAddToCart}
                                >
                                    {loading ? 'Adding...' : 'Add to Cart'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>}
        </div>
    )
}
