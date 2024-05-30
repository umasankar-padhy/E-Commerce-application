
const express = require("express");
const router = express.Router();
const commentController = require('../controllers/commentController');
const { requireSignIn } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByMerchant,
  deleteImage
} = require("../controllers/productController");

router.post("/create", requireSignIn, createProduct); // Protected route to create a new product
router.get("/get", getProduct); // Protected route to get product by ID
router.get("/getProduct",requireSignIn, getProductByMerchant); // Protected route to get product merchant
router.get("/get/:id", getProductById); // Protected route to get product by ID
router.put("/update/:id", requireSignIn, updateProduct); // Protected route to update product details
router.delete("/delete/:id", requireSignIn, deleteProduct); // Protected route to delete a product
router.delete("/deleteImage/:id", requireSignIn, deleteImage); // Protected route to delete a product


// Comment routes within product
router.post('/:productId/comments', commentController.addComment); // Add a new comment to a product
router.post('/:productId/comments/:commentId/like', commentController.likeComment); // Like a comment on a product
router.post('/:productId/comments/:commentId/dislike', commentController.dislikeComment); // Dislike a comment on a product
router.post('/:productId/comments/:commentId/replies', commentController.addReply); // Add a reply to a comment on a product
router.post('/:productId/comments/:commentId/replies/:replyId/like', commentController.likeReply); // Like a reply on a comment of a product
router.post('/:productId/comments/:commentId/replies/:replyId/dislike', commentController.dislikeReply); // Dislike a reply on a comment of a product


module.exports = router;
