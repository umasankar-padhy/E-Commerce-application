// // // import React, { useEffect, useState } from 'react'
// // // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // // import axios from "axios";
// // // import Navbarr from './Navbar';
// // // import Spinner from './Spinner';
// // // import { url } from '../default';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import CartProvider from './CartProvider';
// // // import { setCart } from '../redux/cart/cartActions';
// // // import { toast } from 'react-toastify';


// // // export default function ProductDetails() {
// // //     const params = useParams();
// // //     const [loading, setLoading] = useState(false);
// // //     const auth = useSelector((state) => state.auth);
// // //     const navigate = useNavigate();
// // //     const location = useLocation();

// // //     const [product, setProduct] = useState({});
// // //     const [qty, setQty] = useState(1);
// // //     const dispatch = useDispatch();
// // //     const cart = useSelector((state) => state.cart);



// // //     const getProduct = async () => {
// // //         try {
// // //             setLoading(true);
// // //             const { data } = await axios.get(`${url}api/v1/product/get/${params?.id}`);
// // //             setProduct(data?.data);
// // //             setLoading(false);
// // //         } catch (error) {
// // //             setLoading(false);
// // //             console.log(error);
// // //         }
// // //     };
// // //     useEffect(() => {
// // //         if (params?.id) getProduct();
// // //     }, [params?.id]);

// // //     async function handleAddToCart(e) {
// // //         e.preventDefault();
// // //         if (Object.keys(auth).length === 0) {
// // //             navigate('/login', { state: { from: location.pathname } })
// // //         }
// // //         try {
// // //             setLoading(true);
// // //             const formData = { product_id: params?.id, quantity: qty }
// // //             const res = await axios.post(`${url}api/v1/cart/add-to-cart`, formData,
// // //                 {
// // //                     headers: {
// // //                         Authorization: `Bearer ${auth?.token}`
// // //                     }
// // //                 }
// // //             );

// // //             if (res.data.success) {
// // //                 toast(res.data.message);

// // //                 dispatch(setCart(res?.data?.data));
// // //                 navigate("/cart");

// // //             } else {
// // //                 toast(res.data.message);
// // //             }
// // //             setLoading(false);

// // //         } catch (err) {
// // //             setLoading(false);

// // //             console.error("Error:", err);
// // //         }
// // //     }

// // //     async function handleUpdateCartItem(e) {
// // //         e.preventDefault();

// // //         try {
// // //             setLoading(true);
// // //             const formData = { product_id: params?.id, quantity: qty }
// // //             const res = await axios.put(`${url}api/v1/cart/update-cart-item`, formData,
// // //                 {
// // //                     headers: {
// // //                         Authorization: `Bearer ${auth?.token}`
// // //                     }
// // //                 }
// // //             );

// // //             if (res.data.success) {
// // //                 toast(res.data.message);
// // //                 dispatch(setCart(res?.data?.data));
// // //                 navigate("/cart");

// // //             } else {
// // //                 toast(res.data.message);
// // //             }
// // //             setLoading(false);

// // //         } catch (err) {
// // //             setLoading(false);

// // //             console.error("Error:", err);
// // //         }
// // //     }
// // //     // Check if item is in the cart and get its isOrdered status
// // //     const cartItem = cart.find(cartItem => cartItem.product_id?._id === params?.id);
// // //     const isProductInCart = Boolean(cartItem);
// // //     const isOrdered = cartItem?.isOrdered;

// // //     return (
// // //         <div>
// // //             <Navbarr />
// // //             <pre>{JSON.stringify(product, null, 4)}</pre>

// // //             {loading ? <Spinner /> :
// // //                 <div className="d-flex flex-wrap justify-content-center">
// // //                     <h2 className="text-center">Product Details</h2>
// // //                     <div className="row container mt-2">
// // //                         <div className="col-md-6">
// // //                             <img
// // //                                 src={product?.imageUrl}
// // //                                 className="card-img-top"
// // //                                 alt={product.title}
// // //                                 style={{
// // //                                     height: "400px", width: "300px"
// // //                                 }}

// // //                             />
// // //                         </div>
// // //                         <div className="col-md-6 ">
                            
// // //                             <h5>{product.title}</h5>
// // //                             <p>{product.description}</p>
// // //                             <h4> &#8377; {product.price}/-</h4>
// // //                             <h6 className="card-title">set Quantity :
// // //                                 <select className='ms-2 h-100 bg-light rounded' onChange={(e) => setQty(e.target.value)}>
// // //                                     {Array.from(Array(10), (e, i) => {
// // //                                         return (
// // //                                             <option key={i + 1} value={i + 1}>{i + 1}</option>
// // //                                         )
// // //                                     })}
// // //                                 </select>
// // //                             </h6>
// // //                             {isProductInCart && !isOrdered ? (

// // //                                 <button
// // //                                     className="btn btn-warning ms-1 mb-1"
// // //                                     style={{ fontSize: ".8rem" }}
// // //                                     onClick={handleUpdateCartItem}
// // //                                 >
// // //                                     Buy More
// // //                                 </button>
// // //                             ) : (
// // //                                 <button
// // //                                     className="btn btn-warning ms-1 mb-1"
// // //                                     style={{ fontSize: ".8rem" }}
// // //                                     onClick={handleAddToCart}
// // //                                 >
// // //                                     {loading ? 'Adding...' : 'Add to Cart'}
// // //                                 </button>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 </div>}
// // //         </div>
// // //     )
// // // }

























// // import React, { useEffect, useState } from 'react';
// // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // import axios from "axios";
// // import Navbarr from './Navbar';
// // import Spinner from './Spinner';
// // import { url } from '../default';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setCart } from '../redux/cart/cartActions';
// // import { toast } from 'react-toastify';

// // export default function ProductDetails() {
// //     const params = useParams();
// //     const [loading, setLoading] = useState(false);
// //     const [product, setProduct] = useState({});
// //     const [qty, setQty] = useState(1);
// //     const [comments, setComments] = useState([]);
// //     const [newComment, setNewComment] = useState("");
// //     const [replyComment, setReplyComment] = useState({});
// //     const auth = useSelector((state) => state.auth);
// //     const cart = useSelector((state) => state.cart);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const location = useLocation();

// //     const getProduct = async () => {
// //         try {
// //             setLoading(true);
// //             const { data } = await axios.get(`${url}api/v1/product/get/${params?.id}`);
// //             setProduct(data?.data);
// //             setComments(data?.data?.comment_ids || []);
// //             setLoading(false);
// //         } catch (error) {
// //             setLoading(false);
// //             console.log(error);
// //         }
// //     };

// //     useEffect(() => {
// //         if (params?.id) getProduct();
// //     }, [params?.id]);

// //     const handleAddToCart = async (e) => {
// //         e.preventDefault();
// //         if (Object.keys(auth).length === 0) {
// //             navigate('/login', { state: { from: location.pathname } });
// //         }
// //         try {
// //             setLoading(true);
// //             const formData = { product_id: params?.id, quantity: qty };
// //             const res = await axios.post(`${url}api/v1/cart/add-to-cart`, formData, {
// //                 headers: { Authorization: `Bearer ${auth?.token}` },
// //             });
// //             if (res.data.success) {
// //                 toast(res.data.message);
// //                 dispatch(setCart(res?.data?.data));
// //                 navigate("/cart");
// //             } else {
// //                 toast(res.data.message);
// //             }
// //             setLoading(false);
// //         } catch (err) {
// //             setLoading(false);
// //             console.error("Error:", err);
// //         }
// //     };

// //     const handleUpdateCartItem = async (e) => {
// //         e.preventDefault();
// //         try {
// //             setLoading(true);
// //             const formData = { product_id: params?.id, quantity: qty };
// //             const res = await axios.put(`${url}api/v1/cart/update-cart-item`, formData, {
// //                 headers: { Authorization: `Bearer ${auth?.token}` },
// //             });
// //             if (res.data.success) {
// //                 toast(res.data.message);
// //                 dispatch(setCart(res?.data?.data));
// //                 navigate("/cart");
// //             } else {
// //                 toast(res.data.message);
// //             }
// //             setLoading(false);
// //         } catch (err) {
// //             setLoading(false);
// //             console.error("Error:", err);
// //         }
// //     };

// //     const handleAddComment = async () => {
// //         if (Object.keys(auth).length === 0) {
// //             navigate('/login', { state: { from: location.pathname } });
// //         }
// //         try {
// //             setLoading(true);
// //             const formData = { product_id: params?.id, comment: newComment };
// //             const res = await axios.post(`${url}api/v1/comment/create`, formData, {
// //                 headers: { Authorization: `Bearer ${auth?.token}` },
// //             });
// //             if (res.data.success) {
// //                 toast(res.data.message);
// //                 setComments([...comments, res.data.data]);
// //                 setNewComment("");
// //             } else {
// //                 toast(res.data.message);
// //             }
// //             setLoading(false);
// //         } catch (err) {
// //             setLoading(false);
// //             console.error("Error:", err);
// //         }
// //     };

// //     const handleAddReply = async (parentCommentId) => {
// //         if (Object.keys(auth).length === 0) {
// //             navigate('/login', { state: { from: location.pathname } });
// //         }
// //         try {
// //             setLoading(true);
// //             const formData = { comment_id: parentCommentId, comment: replyComment[parentCommentId] };
// //             const res = await axios.post(`${url}api/v1/comment/create`, formData, {
// //                 headers: { Authorization: `Bearer ${auth?.token}` },
// //             });
// //             if (res.data.success) {
// //                 toast(res.data.message);
// //                 const updatedComments = comments.map(comment =>
// //                     comment._id === parentCommentId
// //                         ? { ...comment, comment_ids: [...comment.comment_ids, res.data.data] }
// //                         : comment
// //                 );
// //                 setComments(updatedComments);
// //                 setReplyComment({ ...replyComment, [parentCommentId]: "" });
// //             } else {
// //                 toast(res.data.message);
// //             }
// //             setLoading(false);
// //         } catch (err) {
// //             setLoading(false);
// //             console.error("Error:", err);
// //         }
// //     };

// //     const renderComments = (comments) => {
// //         return comments.map(comment => (
// //             <div key={comment._id} className="comment">
// //                 <p><strong>{comment.user}</strong>: {comment.comment}</p>
// //                 <div className="ms-4">
// //                     {renderComments(comment.comment_ids)}
// //                     {auth.token && (
// //                         <div>
// //                             <input
// //                                 type="text"
// //                                 value={replyComment[comment._id] || ""}
// //                                 onChange={(e) => setReplyComment({ ...replyComment, [comment._id]: e.target.value })}
// //                                 placeholder="Write a reply..."
// //                             />
// //                             <button onClick={() => handleAddReply(comment._id)}>Reply</button>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         ));
// //     };

// //     // Check if item is in the cart and get its isOrdered status
// //     const cartItem = cart.find(cartItem => cartItem.product_id?._id === params?.id);
// //     const isProductInCart = Boolean(cartItem);
// //     const isOrdered = cartItem?.isOrdered;

// //     return (
// //         <div>
// //             <Navbarr />
// //             {loading ? <Spinner /> :
// //                 <div className="d-flex flex-wrap justify-content-center">
// //                     <h2 className="text-center">Product Details</h2>
// //                     <div className="row container mt-2">
// //                         <div className="col-md-6">
// //                             <img
// //                                 src={product?.imageUrl}
// //                                 className="card-img-top"
// //                                 alt={product.title}
// //                                 style={{ height: "400px", width: "300px" }}
// //                             />
// //                         </div>
// //                         <div className="col-md-6">
// //                             <h5>{product.title}</h5>
// //                             <p>{product.description}</p>
// //                             <h4> &#8377; {product.price}/-</h4>
// //                             <h6 className="card-title">Set Quantity:
// //                                 <select className='ms-2 h-100 bg-light rounded' onChange={(e) => setQty(e.target.value)}>
// //                                     {Array.from(Array(10), (e, i) => {
// //                                         return (
// //                                             <option key={i + 1} value={i + 1}>{i + 1}</option>
// //                                         )
// //                                     })}
// //                                 </select>
// //                             </h6>
// //                             {isProductInCart && !isOrdered ? (
// //                                 <button
// //                                     className="btn btn-warning ms-1 mb-1"
// //                                     style={{ fontSize: ".8rem" }}
// //                                     onClick={handleUpdateCartItem}
// //                                 >
// //                                     Buy More
// //                                 </button>
// //                             ) : (
// //                                 <button
// //                                     className="btn btn-warning ms-1 mb-1"
// //                                     style={{ fontSize: ".8rem" }}
// //                                     onClick={handleAddToCart}
// //                                 >
// //                                     {loading ? 'Adding...' : 'Add to Cart'}
// //                                 </button>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>
// //             }
// //             <div className="comments-section mt-5">
// //                 <h3>Comments</h3>
// //                 {renderComments(comments)}
// //                 {auth.token && (
// //                     <div className="add-comment mt-3">
// //                         <input
// //                             type="text"
// //                             value={newComment}
// //                             onChange={(e) => setNewComment(e.target.value)}
// //                             placeholder="Write a comment..."
// //                         />
// //                         <button onClick={handleAddComment}>Comment</button>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }




















import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Navbarr from './Navbar';
import Spinner from './Spinner';
import { url } from '../default';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/cart/cartActions';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetails.css'; // Custom CSS for additional styling

export default function ProductDetails() {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyComment, setReplyComment] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [showReplyForm, setShowReplyForm] = useState({});
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getProduct = async () => {
        try {
            // setLoading(true);
            const { data } = await axios.get(`${url}api/v1/product/get/${params?.id}`);
            setProduct(data?.data);
            setComments(data?.data?.comment_ids || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.id) getProduct();
    }, [params?.id]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (Object.keys(auth).length === 0) {
            navigate('/login', { state: { from: location.pathname } });
        }
        try {
            // setLoading(true);
            const formData = { product_id: params?.id, quantity: qty };
            const res = await axios.post(`${url}api/v1/cart/add-to-cart`, formData, {
                headers: { Authorization: `Bearer ${auth?.token}` },
            });
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
    };

    const handleUpdateCartItem = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
            const formData = { product_id: params?.id, quantity: qty };
            const res = await axios.put(`${url}api/v1/cart/update-cart-item`, formData, {
                headers: { Authorization: `Bearer ${auth?.token}` },
            });
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
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (Object.keys(auth).length === 0) {
            navigate('/login', { state: { from: location.pathname } });
        }
        try {
            // setLoading(true);
            const formData = { product_id: params?.id, comment: newComment };
            const res = await axios.post(`${url}api/v1/comment/create`, formData, {
                headers: { Authorization: `Bearer ${auth?.token}` },
            });
            if (res.data.success) {
                toast(res.data.message);
                getProduct()
                setComments([...comments, res.data.data]);
                setNewComment("");
            } else {
                toast(res.data.message);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error:", err);
        }
    };

    const handleAddReply = async (e,parentCommentId) => {
        e.preventDefault();

        if (Object.keys(auth).length === 0) {
            navigate('/login', { state: { from: location.pathname } });
        }
        try {
            // setLoading(true);
            const formData = { comment_id: parentCommentId, comment: replyComment[parentCommentId] };
            const res = await axios.post(`${url}api/v1/comment/create`, formData, {
                headers: { Authorization: `Bearer ${auth?.token}` },
            });
            if (res.data.success) {
                toast(res.data.message);
                getProduct()
                const updatedComments = comments.map(comment =>
                    comment._id === parentCommentId
                        ? { ...comment, comment_ids: [...comment.comment_ids, res.data.data] }
                        : comment
                );
                setComments(updatedComments);
                setReplyComment({ ...replyComment, [parentCommentId]: "" });
            } else {
                toast(res.data.message);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error:", err);
        }
    };

    const toggleReplies = (commentId) => {
        setShowReplies({ ...showReplies, [commentId]: !showReplies[commentId] });
    };

    const toggleReplyForm = (commentId) => {
        setShowReplyForm({ ...showReplyForm, [commentId]: !showReplyForm[commentId] });
    };

    const renderComments = (comments) => {
        return comments.map(comment => (
            <div key={comment._id} className="comment border p-2 mb-2">
                <p><strong>{comment.user}</strong>: {comment.comment}</p>
                {comment.comment_ids.length > 0 && (
                    <button className="btn btn-link p-0" onClick={() => toggleReplies(comment._id)}>
                        {showReplies[comment._id] ? 'Hide Replies' : 'Show Replies'}
                    </button>
                )}
                {showReplies[comment._id] && (
                    <div className="ms-4">
                        {renderComments(comment.comment_ids)}
                    </div>
                )}
                {auth.token && (
                    <div>
                        <button className="btn btn-link p-0" onClick={() => toggleReplyForm(comment._id)}>
                            Reply
                        </button>
                        {showReplyForm[comment._id] && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={replyComment[comment._id] || ""}
                                    onChange={(e) => setReplyComment({ ...replyComment, [comment._id]: e.target.value })}
                                    placeholder="Write a reply..."
                                />
                                <button className="btn btn-primary btn-sm" onClick={(e) => handleAddReply(e,comment._id)}>
                                    Submit Reply
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        ));
    };

    const cartItem = cart.find(cartItem => cartItem.product_id?._id === params?.id);
    const isProductInCart = Boolean(cartItem);
    const isOrdered = cartItem?.isOrdered;

    return (
        <div>
            <Navbarr />
            {/* <pre>{JSON.stringify(product, null, 4)}</pre> */}


            {loading ? <Spinner /> :
                <div className="d-flex flex-wrap justify-content-center">
                    <h2 className="text-center">Product Details</h2>
                    <div className="row container mt-2">
                        <div className="col-md-6">
                            <img
                                src={product?.imageUrl}
                                className="card-img-top"
                                alt={product.title}
                                style={{ height: "400px", width: "300px" }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h5>{product.title}</h5>
                            <p>{product.description}</p>
                            <h4> &#8377; {product.price}/-</h4>
                            <h6 className="card-title">Set Quantity:
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
                    <div className="container mt-4">
                        <h3>Comments</h3>
                        {renderComments(comments)}
                        {auth.token && (
                            <div className="mt-4">
                                <h5>Add a Comment</h5>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                />
                                <button className="btn btn-primary" onClick={handleAddComment}>
                                    Submit Comment
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}



















// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Navbarr from './Navbar';
// import Spinner from './Spinner';
// import { url } from '../default';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCart } from '../redux/cart/cartActions';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ProductDetails.css';

// export default function ProductDetails() {
//     const params = useParams();
//     const [loading, setLoading] = useState(false);
//     const [product, setProduct] = useState({});
//     const [qty, setQty] = useState(1);
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState("");
//     const [replyComment, setReplyComment] = useState({});
//     const [showReplies, setShowReplies] = useState({});
//     const [showReplyForm, setShowReplyForm] = useState({});
//     const auth = useSelector((state) => state.auth);
//     const cart = useSelector((state) => state.cart);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const getProduct = async () => {
//         try {
            // setLoading(true);
//             const { data } = await axios.get(`${url}api/v1/product/get/${params?.id}`);
//             setProduct(data?.data);
//             setComments(data?.data?.comment_ids || []);
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (params?.id) getProduct();
//     }, [params?.id]);

//     const handleAddToCart = async (e) => {
//         e.preventDefault();
//         if (Object.keys(auth).length === 0) {
//             navigate('/login', { state: { from: location.pathname } });
//             return;
//         }
//         try {
//             setLoading(true);
//             const formData = { product_id: params?.id, quantity: qty };
//             const res = await axios.post(`${url}api/v1/cart/add-to-cart`, formData, {
//                 headers: { Authorization: `Bearer ${auth?.token}` },
//             });
//             if (res.data.success) {
//                 toast(res.data.message);
//                 dispatch(setCart(res?.data?.data));
//                 navigate("/cart");
//             } else {
//                 toast(res.data.message);
//             }
//             setLoading(false);
//         } catch (err) {
//             setLoading(false);
//             console.error("Error:", err);
//         }
//     };

//     const handleUpdateCartItem = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const formData = { product_id: params?.id, quantity: qty };
//             const res = await axios.put(`${url}api/v1/cart/update-cart-item`, formData, {
//                 headers: { Authorization: `Bearer ${auth?.token}` },
//             });
//             if (res.data.success) {
//                 toast(res.data.message);
//                 dispatch(setCart(res?.data?.data));
//                 navigate("/cart");
//             } else {
//                 toast(res.data.message);
//             }
//             setLoading(false);
//         } catch (err) {
//             setLoading(false);
//             console.error("Error:", err);
//         }
//     };

//     const handleAddComment = async () => {
//         if (Object.keys(auth).length === 0) {
//             navigate('/login', { state: { from: location.pathname } });
//             return;
//         }
//         try {
//             setLoading(true);
//             const formData = { product_id: params?.id, comment: newComment };
//             const res = await axios.post(`${url}api/v1/comments/add`, formData, {
//                 headers: { Authorization: `Bearer ${auth?.token}` },
//             });
//             if (res.data.success) {
//                 toast(res.data.message);
//                 setComments([...comments, res.data.data]);
//                 setNewComment("");
//             } else {
//                 toast(res.data.message);
//             }
//             setLoading(false);
//         } catch (err) {
//             setLoading(false);
//             console.error("Error:", err);
//         }
//     };

//     const handleAddReply = async (parentCommentId) => {
//         if (Object.keys(auth).length === 0) {
//             navigate('/login', { state: { from: location.pathname } });
//             return;
//         }
//         try {
//             setLoading(true);
//             const formData = { comment_id: parentCommentId, comment: replyComment[parentCommentId] };
//             const res = await axios.post(`${url}api/v1/comments/add-reply`, formData, {
//                 headers: { Authorization: `Bearer ${auth?.token}` },
//             });
//             if (res.data.success) {
//                 toast(res.data.message);
//                 const updatedComments = comments.map(comment =>
//                     comment._id === parentCommentId
//                         ? { ...comment, comment_ids: [...comment.comment_ids, res.data.data] }
//                         : comment
//                 );
//                 setComments(updatedComments);
//                 setReplyComment({ ...replyComment, [parentCommentId]: "" });
//             } else {
//                 toast(res.data.message);
//             }
//             setLoading(false);
//         } catch (err) {
//             setLoading(false);
//             console.error("Error:", err);
//         }
//     };

//     return (
//         <div>
//             <Navbarr />
//             {loading ? <Spinner /> :
//                 <div className="d-flex flex-wrap justify-content-center">
//                     <h2 className="text-center">Product Details</h2>
//                     <div className="row container mt-2">
//                         <div className="col-md-6">
//                             <img
//                                 src={product?.imageUrl}
//                                 className="card-img-top"
//                                 alt={product.title}
//                                 style={{ height: "400px", width: "300px" }}
//                             />
//                         </div>
//                         <div className="col-md-6">
//                             <h5>{product.title}</h5>
//                             <p>{product.description}</p>
//                             <h4>&#8377; {product.price}/-</h4>
//                             <h6 className="card-title">
//                                 Set Quantity:
//                                 <select className='ms-2 h-100 bg-light rounded' onChange={(e) => setQty(e.target.value)}>
//                                     {Array.from(Array(10), (e, i) => (
//                                         <option key={i + 1} value={i + 1}>{i + 1}</option>
//                                     ))}
//                                 </select>
//                             </h6>
//                             <button
//                                 className="btn btn-warning ms-1 mb-1"
//                                 style={{ fontSize: ".8rem" }}
//                                 onClick={handleAddToCart}
//                             >
//                                 {loading ? 'Adding...' : 'Add to Cart'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             }

//             {/* Comments Section */}
//             <div className="comments-section">
//                 <h3>Comments</h3>
//                 <div className="comments-list">
//                     {comments.map(comment => (
//                         <div key={comment._id} className="comment">
//                             <p>{comment.comment}</p>
//                             <button onClick={() => setShowReplies({ ...showReplies, [comment._id]: !showReplies[comment._id] })}>
//                                 {showReplies[comment._id] ? "Hide Replies" : "Show Replies"}
//                             </button>
//                             {showReplyForm[comment._id] && (
//                                 <div>
//                                     <input
//                                         type="text"
//                                         value={replyComment[comment._id] || ""}
//                                         onChange={(e) => setReplyComment({ ...replyComment, [comment._id]: e.target.value })}
//                                     />
//                                     <button onClick={() => handleAddReply(comment._id)}>Reply</button>
//                                 </div>
//                             )}
//                             {showReplies[comment._id] && comment.comment_ids.map(reply => (
//                                 <div key={reply._id} className="reply">
//                                     <p>{reply.comment}</p>
//                                     <button onClick={() => setShowReplyForm({ ...showReplyForm, [reply._id]: true })}>Reply</button>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="new-comment-form">
//                     <input
//                         type="text"
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                     />
//                     <button onClick={handleAddComment}>Add Comment</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
