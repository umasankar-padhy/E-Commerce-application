
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// Add a product to the cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { product_id, quantity, size, color } = req.body;

        // Validate required fields
        if (!product_id || !quantity) {
            return res.status(202).json({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }

        // Find the product
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(204).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if the product is already in the cart
        // let cart = await Cart.findOne({ user_id: userId, product_id });
        // if (cart) {
        //     cart.quantity += parseInt(quantity);
        //     cart.size = size || cart.size;
        //     cart.color = color || cart.color;
        // } else {
        //     // Create a new cart item
        const cart = new Cart({
            user_id: userId,
            product_id,
            quantity,
            size,
            color,
            // orderDate: new Date()
        });
        // }

        // Save the cart item
        const savedCart = await cart.save();

        // Update the user's cart IDs array
        const user = await User.findById(userId);
        // if (!user.cart_id.includes(savedCart._id)) {
        user.cart_id.push(savedCart._id);
        await user.save();
        // }
        const getCart = await Cart.find({ user_id: userId, isOrdered: false }).populate('product_id');

        res.status(201).json({
            success: true,
            data: getCart,

            message: 'Product added to cart successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding product to cart'
        });
    }
};

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.find({ user_id: userId, isOrdered: false }).populate('product_id');

        if (!cart) {
            return res.status(204).json({
                success: false,
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cart,
            message: 'Cart found successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart'
        });
    }
};

// Update a cart item by ID
exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { product_id, quantity, size, color } = req.body;

        // Validate required fields
        if (!product_id || quantity === undefined) {
            return res.status(202).json({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }

        // Find the product
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(204).json({
                success: false,
                message: 'Product not found'
            });
        }

        let cart = await Cart.findOne({ user_id: userId, product_id, isOrdered: false });
        if (!cart) {
            return res.status(204).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        cart.quantity += parseInt(quantity);
        cart.size = size || cart.size;
        cart.color = color || cart.color;
        cart.isAdded = true;
        const updatedCart = await cart.save();
        const getCart = await Cart.find({ user_id: userId, isOrdered: false }).populate('product_id');

        res.status(200).json({
            success: true,
            data: getCart,
            message: 'Cart item updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating cart item'
        });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { product_id } = req.body;

        if (!product_id) {
            return res.status(202).json({
                success: false,
                message: 'Product ID is required'
            });
        }
        // isAdded: false
        // const cart = await Cart.findOneAndUpdate({ user_id: userId, product_id: product_id ,isOrdered:false},{isAdded: !isAdded});
        //  // // const cart = await Cart.findOne({ user_id: userId, product_id: product_id ,isOrdered:false});
        const cart = await Cart.findOneAndDelete({ user_id: userId, product_id: product_id, isOrdered: false });

        if (!cart) {
            return res.status(204).json({
                success: false,
                message: 'Cart item not found'
            });
        }
        //  // // cart.isAdded=!cart.isAdded;
        //  // // await cart.save();
        const user = await User.findById(userId);
        // if (!user.cart_id.includes(savedCart._id)) {
        user.cart_id.pull(cart._id);
        await user.save();
        const getCart = await Cart.find({ user_id: userId, isOrdered: false }).populate('product_id');

        res.status(200).json({
            success: true,
            data: getCart,
            message: 'Product removed from cart successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error removing product from cart'
        });
    }
};
