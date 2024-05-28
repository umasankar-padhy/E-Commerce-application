const Product = require("../models/Product");
const Merchant = require("../models/Merchant");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { title, description, imageUrl, price, quantity, size, color, isActive, MFG_Date, EXP_Date, productId, brand, category } = req.body;

        // Check if the merchant exists
        const merchant = await Merchant.findById(req.merchantId);
        if (!merchant) {
            return res.status(400).json({
                success: false,
                message: "Merchant not found",
            });
        }

        // Create new product
        const product = await Product.create({
            title,
            description,
            imageUrl,
            price,
            quantity,
            size,
            color,
            isActive,
            merchant_id: req.merchantId,
            MFG_Date,
            EXP_Date,
            productId,
            brand,
            category,
            rating
        });
        const updatemerchant = await Merchant.findByIdAndUpdate(req.merchantId, { $push: { product_id: product._id } }, { new: true })
            .populate("product_id").exec();


        return res.status(201).json({
            success: true,
            data: product,
            merchantDetails:updatemerchant,
            message: "Product created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating product",
        });
    }
};

// Get all products 
exports.getProduct = async (req, res) => {
    try {
        // const productId = req.params.id;
        const products = await Product.find().populate('merchant_id', 'name email');

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving product",
        });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('merchant_id', 'name email');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving product",
        });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, imageUrl, price, quantity, size, color, isActive, MFG_Date, EXP_Date, brand, category, rating } = req.body;
        
        const product = await Product.findOneAndUpdate({_id:productId, merchant_id:req.merchantId}, {
            title,
            description,
            imageUrl,
            price,
            quantity,
            size,
            color,
            isActive,
            MFG_Date,
            EXP_Date,
            brand,
            category,
            rating
        }, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: "Product updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating product",
        });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOneAndDelete({ _id: productId, merchant_id: req.merchantId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        const updatemerchant = await Merchant.findByIdAndUpdate(req.merchantId, { $pull: { product_id: product._id } }, { new: true })
            .populate("product_id").exec();
        return res.status(200).json({
            success: true,
            merchantDetails: updatemerchant,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting product",
        });
    }
};
