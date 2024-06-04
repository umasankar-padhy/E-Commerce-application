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
import { Carousel } from 'react-bootstrap'; // Import Carousel component
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
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
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
            // setLoading(false);
        } catch (err) {
            // setLoading(false);
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
            // setLoading(false);
        } catch (err) {
            // setLoading(false);
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
            // setLoading(false);
        } catch (err) {
            // setLoading(false);
            console.error("Error:", err);
        }
    };

    const handleAddReply = async (e, parentCommentId) => {
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
            // setLoading(false);
        } catch (err) {
            // setLoading(false);
            console.error("Error:", err);
        }
    };

    const toggleReplies = (commentId) => {
        setShowReplies({ ...showReplies, [commentId]: !showReplies[commentId] });
    };

    const toggleReplyForm = (commentId) => {
        setShowReplyForm({
            ...showReplyForm, [commentId]: !showReplyForm[commentId
            ]
        });
    }


    const renderComments = (comments) => {
        return comments.map(comment => (
            <div key={comment._id} className="comment border p-2 mb-3">
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
                                <button className="btn btn-primary btn-sm" onClick={(e) => handleAddReply(e, comment._id)}>
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

            {loading ? <Spinner /> :
                <div className="container mt-4">
                    <h2 className="text-center mb-4">Product Details</h2>
                    <div className="row">
                        <div className="col-md-6">
                            {/* Carousel for images */}
                            <Carousel>
                                {product?.imageUrl && product.imageUrl.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            src={image}
                                            className="d-block w-100"
                                            alt={`Image ${index}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-md-6">
                            <h3>{product.title}</h3>
                            <p className="mb-4">{product.description}</p>
                            <h4 className="mb-4">&#8377; {product.price}/-</h4>
                            <div className="d-flex align-items-center mb-4">
                                <label className="me-2">Quantity:</label>
                                <select className="form-select" onChange={(e) => setQty(e.target.value)}>
                                    {Array.from(Array(10), (e, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className={`btn ${isProductInCart && !isOrdered ? 'btn-success' : 'btn-warning'} ms-1 mb-1`}
                                style={{ fontSize: ".8rem" }}
                                onClick={isProductInCart && !isOrdered ? handleUpdateCartItem : handleAddToCart}
                            >
                                {isProductInCart && !isOrdered ? 'Buy More' : loading ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="mb-4">Comments</h3>
                        {comments.length > 0 ? renderComments(comments) : <p>No comments yet.</p>}
                        {auth.token && (
                            <div className="mt-4">
                                <h4>Add a Comment</h4>
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
