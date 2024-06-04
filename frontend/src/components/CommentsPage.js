import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { url } from '../default';

function Comment({ comment, handleLike, handleDislike, handleReply }) {
    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-body">
                    <p className="card-text">{comment.comment}</p>
                    {/* <button className="btn btn-primary me-2" onClick={() => handleLike(comment._id)}>Like</button>
                    <button className="btn btn-danger me-2" onClick={() => handleDislike(comment._id)}>Dislike</button> */}
                    <button className="btn btn-secondary" onClick={() => handleReply(comment._id)}>Reply</button>
                </div>
            </div>
            {comment.comment_ids && comment.comment_ids.map(reply => (
                <div className="card ms-5 mt-3" key={reply._id}>
                    <div className="card-body">
                        <p className="card-text">{reply.comment}</p>
                        {/* <button className="btn btn-primary me-2" onClick={() => handleLike(reply._id)}>Like</button>
                        <button className="btn btn-danger" onClick={() => handleDislike(reply._id)}>Dislike</button> */}
                    </div>
                </div>
            ))}
        </div>
    );
}

function CommentSection({ productId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const auth = useSelector(state => state.auth);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${url}api/v1/comment/product/${productId}/comments`);
            setComments(response.data.data); // Assuming comments data is nested under 'data'
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        if (!auth?.token) {
            alert('Please log in to add a comment.');
            return;
        }
        try {
            await axios.post(`${url}api/v1/comment/create`, { product_id: productId, comment: newComment }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleLike = async (commentId) => {
        // Implement like functionality
    };

    const handleDislike = async (commentId) => {
        // Implement dislike functionality
    };

    const handleReply = async (commentId) => {
        if (!auth?.token) {
            alert('Please log in to reply to a comment.');
            return;
        }
        const replyText = prompt('Enter your reply:');
        if (replyText) {
            try {
                await axios.post(`${url}api/v1/comment/create`, { comment_id: commentId, comment: replyText }, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                fetchComments();
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        }
    };

    useEffect(() => {
        fetchComments();
    }, [productId]);

    return (
        <div>
            <h2 className="mb-4">Comments</h2>
            {comments.map(comment => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    handleReply={handleReply}
                />
            ))}
            {auth?.token ? (
                <div className="mb-3">
                    <textarea className="form-control mb-2" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add a new comment" />
                    <button className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                </div>
            ) : (
                <p>Please log in to add a comment.</p>
            )}
        </div>
    );
}

export default CommentSection;