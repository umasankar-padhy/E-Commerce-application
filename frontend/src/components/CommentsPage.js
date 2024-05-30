import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../default';

function Comment({ comment, handleLike, handleDislike, handleReply }) {
    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-body">
                    <p className="card-text">{comment.text}</p>
                    <button className="btn btn-primary me-2" onClick={() => handleLike(comment._id)}>Like</button>
                    <button className="btn btn-danger me-2" onClick={() => handleDislike(comment._id)}>Dislike</button>
                    <button className="btn btn-secondary" onClick={() => handleReply(comment._id)}>Reply</button>
                </div>
            </div>
            {/* Display replies */}
            {comment.replies.map(reply => (
                <div className="card ms-5 mt-3" key={reply._id}>
                    <div className="card-body">
                        <p className="card-text">{reply.text}</p>
                        <button className="btn btn-primary me-2" onClick={() => handleLike(comment._id, reply._id)}>Like</button>
                        <button className="btn btn-danger" onClick={() => handleDislike(comment._id, reply._id)}>Dislike</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CommentSection({ productId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Function to fetch comments for the product
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${url}api/v1/products/${productId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Function to handle adding a new comment
    const handleAddComment = async () => {
        try {
            await axios.post(`${url}api/v1/products/${productId}/comments`, { text: newComment });
            setNewComment('');
            fetchComments(); // Refresh comments after adding a new one
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Function to handle liking a comment or reply
    const handleLike = async (commentId, replyId = null) => {
        try {
            await axios.post(`${url}api/v1/products/${productId}/comments/${commentId}/like`, { replyId });
            fetchComments(); // Refresh comments after liking
        } catch (error) {
            console.error('Error liking comment/reply:', error);
        }
    };

    // Function to handle disliking a comment or reply
    const handleDislike = async (commentId, replyId = null) => {
        try {
            await axios.post(`${url}api/v1/products/${productId}/comments/${commentId}/dislike`, { replyId });
            fetchComments(); // Refresh comments after disliking
        } catch (error) {
            console.error('Error disliking comment/reply:', error);
        }
    };

    // Function to handle replying to a comment
    const handleReply = async (commentId) => {
        const replyText = prompt('Enter your reply:');
        if (replyText) {
            try {
                await axios.post(`${url}api/v1/products/${productId}/comments/${commentId}/replies`, { text: replyText });
                fetchComments(); // Refresh comments after replying
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        }
    };

    useEffect(() => {
        fetchComments(); // Fetch comments when the component mounts
    }, [productId]);

    return (
        <div>
            <h2 className="mb-4">Comments</h2>
            {/* Display existing comments */}
            {comments.map(comment => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    handleReply={handleReply}
                />
            ))}
            {/* Add new comment */}
            <div className="mb-3">
                <textarea className="form-control mb-2" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add a new comment" />
                <button className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
}

export default CommentSection;
