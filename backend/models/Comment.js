
<<<<<<< HEAD
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
=======
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        // required: true
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        // required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true 
    },
    comment_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        // required: true
    }],
    like: { type: Boolean, required: true },
    dislike: { type: Boolean, required: true }
    
}, {
    timestamps: true
});


module.exports = mongoose.model("Comment", commentSchema);
>>>>>>> 5ff320061b2e267ea064bd7f9fc82c9b4a33eb18
