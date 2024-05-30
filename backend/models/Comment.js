
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Assuming there's a User model
});

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    likes: [likeSchema]
});

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    likes: [likeSchema],
    replies: [replySchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to user
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
