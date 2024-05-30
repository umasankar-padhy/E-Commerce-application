const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { userId } = req.user; // Assuming user information is available in the request

        // Create a new comment
        const comment = new Comment({
            text,
            user: userId
        });

        // Save the comment to the database
        await comment.save();

        res.status(201).json({ success: true, comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add comment' });
    }
};

exports.likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.user; // Assuming user information is available in the request

        // Find the comment and check if the user has already liked it
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        if (comment.likes.some(like => like.userId.equals(userId))) {
            return res.status(400).json({ success: false, message: 'You have already liked this comment' });
        }

        // Add the user's like to the comment
        comment.likes.push({ userId });
        await comment.save();

        res.json({ success: true, message: 'Comment liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to like comment' });
    }
};

exports.dislikeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.user; // Assuming user information is available in the request

        // Find the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Check if the user has already liked the comment
        const likeIndex = comment.likes.findIndex(like => like.userId.equals(userId));
        if (likeIndex === -1) {
            return res.status(400).json({ success: false, message: 'You have not liked this comment' });
        }

        // Remove the user's like from the comment
        comment.likes.splice(likeIndex, 1);
        await comment.save();

        res.json({ success: true, message: 'Comment disliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to dislike comment' });
    }
};

exports.addReply = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const { userId } = req.user; // Assuming user information is available in the request

        // Find the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Add the reply to the comment
        comment.replies.push({ text, user: userId });
        await comment.save();

        res.status(201).json({ success: true, comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add reply' });
    }
};

exports.likeReply = async (req, res) => {
    try {
        const { commentId, replyId } = req.params;
        const { userId } = req.user; // Assuming user information is available in the request

        // Find the comment and reply
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        const reply = comment.replies.id(replyId);
        if (!reply) {
            return res.status(404).json({ success: false, message: 'Reply not found' });
        }

        if (reply.likes.some(like => like.userId.equals(userId))) {
            return res.status(400).json({ success: false, message: 'You have already liked this reply' });
        }

        // Add the user's like to the reply
        reply.likes.push({ userId });
        await comment.save();

        res.json({ success: true, message: 'Reply liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to like reply' });
    }
};

exports.dislikeReply = async (req, res) => {
    try {
        const { commentId, replyId } = req.params;
        const { userId } = req.user; // Assuming user information is available in the request

        // Find the comment and reply
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        const reply = comment.replies.id(replyId);
        if (!reply) {
            return res.status(404).json({ success: false, message: 'Reply not found' });
        }

        const likeIndex = reply.likes.findIndex(like => like.userId.equals(userId));
        if (likeIndex === -1) {
            return res.status(400).json({ success: false, message: 'You have not liked this reply' });
        }

        // Remove the user's like from the reply
        reply.likes.splice(likeIndex, 1);
        await comment.save();

        res.json({ success: true, message: 'Reply disliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to dislike reply' });
    }
};