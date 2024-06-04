import React, { useEffect } from 'react';
import axios from 'axios';
import { url } from '../../default';
import { useSelector } from 'react-redux';
import './NotificationPage.css';

const NotificationPage = ({ noti }) => {
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const sendNotificationIds = async () => {
            const notificationIds = noti.map(notification => notification._id);
            try {
                const response = await axios.post(`${url}api/v1/notification/change`, { ids: notificationIds },
                    {
                        headers: {
                            Authorization: `Bearer ${auth?.token}`
                        }
                    }
                );
                console.log('Notification IDs sent successfully:', response.data);
            } catch (error) {
                console.error('Error sending notification IDs:', error);
            }
        };

        sendNotificationIds();

    }, [noti, auth?.token]);

    return (
        <div className="notification-container">
            <h1 className="notification-header">Notifications</h1>
            <ul className="notification-list">
                {noti?.map(notification => (
                    <li key={notification._id} className="notification-item">
                        <div className="notification-info">
                            <p><span className="notification-label">Username:</span> {notification.order_id.user_id.name}</p>
                            <p><span className="notification-label">Product ID:</span> {notification.product_id._id}</p>
                            <p><span className="notification-label">Title:</span> {notification.product_id.title}</p>
                            <p><span className="notification-label">Order ID:</span> {notification.order_id._id}</p>
                            <p><span className="notification-label">Created At:</span> {new Date(notification.createdAt).toLocaleString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationPage;
