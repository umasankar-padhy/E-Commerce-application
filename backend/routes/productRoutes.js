
const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post("/create", requireSignIn, createProduct); // Protected route to create a new product
router.get("/get", getProduct); // Protected route to get product by ID
router.get("/get/:id", getProductById); // Protected route to get product by ID
router.put("/update/:id", requireSignIn, updateProduct); // Protected route to update product details
router.delete("/delete/:id", requireSignIn, deleteProduct); // Protected route to delete a product

module.exports = router;
