const Product = require("../models/Product");
const Comment = require("../models/Comment");
// const CommentOfComment = require("../models/comment_of_CommentModel");
// const LikeOfComment = require("../models/like_of_CommentModel");

exports.createComment = async (req, res) => {
    try {
        const { product_id, comment, comment_id } = req.body;
        user = req.user
        user_id = req.userId
        if (product_id) {
            const comments = new Comment({ product_id, user, comment, user_id });
            const savecomment = await comments.save();

            const updateProduct = await Product.findByIdAndUpdate(product_id, { $push: { comment_ids: savecomment._id } }, { new: true })
                .populate("comment_ids").exec();

            res.status(200).json({
                success: true,
                data: savecomment,
                Product: updateProduct,
                message: "comment created"
            });
        }
        if (comment_id) {
            const comments = new Comment({ comment_id, user, comment, user_id });
            const savecomment = await comments.save();

            const updateComment = await Comment.findByIdAndUpdate(comment_id, { $push: { comment_ids: savecomment._id } }, { new: true })
                .populate("comment_ids").exec();

            res.status(200).json({
                success: true,
                data: savecomment,
                comment: updateComment,
                message: "comment created"
            });
        }



    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while creating comment",
            message: err.message
        });
    }
};





exports.updateComment = async (req, res) => {
    try {
        const { comment } = req.body;
        user = req.user

        const savecomment = await Comment.findOneAndUpdate({ _id: req.params.id, user: user }, { comment }, { new: true });
        if (savecomment) {
            res.status(200).json({
                success: true,
                data: savecomment,
            });
        } else {
            res.status(200).json({
                success: false,
                data: savecomment,
                message: "unauthorised access"
            });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while updating comment",
            message: err.message
        });
    }
};





exports.getComment = async (req, res) => {
    try {
        const { index, type, order } = req.body
        // console.log(index)
        const getcomment = await Comment.find({ product_id: req.params.id }).sort({ [type]: order }).limit(index);

        res.status(200).json({
            success: true,
            data: getcomment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while getting comment",
            message: err.message
        });
    }
};


exports.getCommentCount = async (req, res) => {
    try {
        const count = await Comment.find({ product_id: req.params.id }).countDocuments();

        res.status(200).json(count);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while getting comment",
            message: err.message
        });
    }
};





exports.deleteComment = async (req, res) => {
    try {
        user = req.user

        const deletecomment = await Comment.findOneAndDelete({ _id: req.params.id, user: user }, { new: true });
        if (!deletecomment) {
            return res.status(200).json({
                success: false,
                data: deletecomment,
                message: "unauthorised access"
            });
        }
        // const deleteCommentOfComment = await CommentOfComment.deleteMany({ commentId: req.params.id });
        // const deleteLikeOfComment = await LikeOfComment.deleteMany({ commentId: req.params.id });

        res.status(200).json({
            success: true,
            data: deletecomment,
            // deleteCommentOfComment: deleteCommentOfComment,
            // deleteLikeOfComment: deleteLikeOfComment,

        });


    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while deleting comment",
            message: err.message
        });
    }
};









