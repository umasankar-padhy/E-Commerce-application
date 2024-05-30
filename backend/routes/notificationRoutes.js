// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { requireSignIn } = require('../middleware/authMiddleware');
const { getAllNotifications, changeAllNotifications, createNotification } = require('../controllers/notificationController');

// Route to create a notification
router.post('/create', createNotification);

// Route to get all notifications
router.get('/get', requireSignIn, getAllNotifications);
router.post('/change', requireSignIn, changeAllNotifications);

module.exports = router;
