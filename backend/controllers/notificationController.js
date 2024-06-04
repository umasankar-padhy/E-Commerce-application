// controllers/notificationController.js
const Notification = require('../models/Notification');

// Create notifications for each product ID and merchant ID
exports.createNotification = async (req, res) => {
    try {
        // Extracting data from the request body
        const { products } = req.body;

        // Array to store created notifications
        const notifications = [];

        // Loop through each product and merchant pair
        for (const product of products) {
            const { productId, merchantId } = product;

            // Create a new notification instance
            const notification = new Notification({
                user_id: req.userId,
                product_id: productId,
                merchant_id: merchantId,
                order_id: req.orderId,

                // Assuming other fields like order_id and isseen are not provided in the request
                // If needed, adjust this code to include those fields
            });

            // Save the notification to the database
            const savedNotification = await notification.save();

            // Push the saved notification to the array
            notifications.push(savedNotification);
        }

        return res.status(201).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ merchant_id: req.merchantId, isseen: false })
            .populate({
                path: 'order_id',
                populate: {
                    path: 'user_id',
                    model: 'User'
                }
            })
            .populate('product_id')
            .exec();

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// Get all notifications
exports.changeAllNotifications = async (req, res) => {
    const { ids } = req.body
    try {
        const notifications = await Notification.updateMany({ _id: { $in: ids } }, { $set: { isseen: true } });
        // .populate('merchant_id')
        // .populate('product_id')
        // .populate('order_id');

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};
