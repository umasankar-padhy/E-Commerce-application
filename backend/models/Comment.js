
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
