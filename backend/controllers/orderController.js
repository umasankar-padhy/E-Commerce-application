// controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create order from cart items
exports.createOrder = async (req, res, next) => {
    try {
        const userId = req.userId;
        // console.log(req.body)
        // Get cart IDs array from the request body
        const { cartIds, addressId } = req.body;

        // Check if the user is connected to all cart items
        const carts = await Cart.find({ _id: { $in: cartIds }, user_id: userId });

        if (carts.length !== cartIds.length) {
            return res.status(202).json({
                success: false,
                message: "User is not connected to all cart items"
            });
        }

        // Update carts to mark them as ordered
        await Cart.updateMany({ _id: { $in: cartIds } }, { $set: { isOrdered: true } });

        // Create a new order instance
        const order = new Order({
            user_id: userId,
            cart_id: cartIds,
            address_id: addressId
        });

        // Save the order to the database
        const savedOrder = await order.save();

        //  res.status(201).send({
        //     success: true,
        //     data: savedOrder
        // });
        req.orderId = savedOrder._id
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
