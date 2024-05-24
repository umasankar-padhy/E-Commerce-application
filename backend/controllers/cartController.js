const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// Add a product to the cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;
            // , size, color
         

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        let cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            cart = new Cart({
                user_id: userId,
                cartSummary: [],
                total: 0
            });

        }

        const existingProductIndex = cart.cartSummary.findIndex(item => item.product_id.toString() === productId);
        if (existingProductIndex >= 0) {
            cart.cartSummary[existingProductIndex].quantity += quantity;
            cart.cartSummary[existingProductIndex].price = product.price;
            // cart.cartSummary[existingProductIndex].size = size || cart.cartSummary[existingProductIndex].size;
            // cart.cartSummary[existingProductIndex].color = color || cart.cartSummary[existingProductIndex].color;
        } else {
            const cartItem = {
                product_id: productId,
                price: product.price,
                quantity,
                // size,
                // color,
                isChecked: false,
                isOrdered: false
            };
            cart.cartSummary.push(cartItem);
        }

        cart.total = cart.cartSummary.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await cart.save().populate("cart_id").exec();

        const updateUser = await User.findByIdAndUpdate(req.userId,  {cart_id: cart._id }, { new: true })
            .populate("cart_id").exec();


        res.status(200).json({
            success: true,
            data: cart,
            userDetails:updateUser,
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
        const cart = await Cart.findOne({ user_id: userId }).populate('cartSummary.product_id');

        if (!cart) {
            return res.status(202).json({
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

// Update cart item
exports.updateCartItem = async (req, res) => {
    // try {
    //     const userId = req.userId;
    //     const { productId, quantity, size, color } = req.body;

    //     let cart = await Cart.findOne({ user_id: userId });
    //     if (!cart) {
    //         return res.status(404).json({
    //             success: false,
    //             message: 'Cart not found'
    //         });
    //     }

    //     const cartItem = cart.cartSummary.find(item => item.product_id.toString() === productId);
    //     if (!cartItem) {
    //         return res.status(404).json({
    //             success: false,
    //             message: 'Product not found in cart'
    //         });
    //     }

    //     if (quantity !== undefined) cartItem.quantity = quantity;
    //     if (size !== undefined) cartItem.size = size;
    //     if (color !== undefined) cartItem.color = color;

    //     cart.total = cart.cartSummary.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    //     await cart.save();

    //     res.status(200).json({
    //         success: true,
    //         data: cart,
    //         message: 'Cart item updated successfully'
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({
    //         success: false,
    //         message: 'Error updating cart item'
    //     });
    // }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        let cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.cartSummary = cart.cartSummary.filter(item => item.product_id.toString() !== productId);
        cart.total = cart.cartSummary.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        await cart.save();

        res.status(200).json({
            success: true,
            data: cart,
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
