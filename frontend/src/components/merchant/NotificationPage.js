import React, { useEffect } from 'react';
import axios from 'axios';
import { url } from '../../default';
import { useSelector } from 'react-redux';

const NotificationPage = ({ noti, getAllNotifications ,setnoti}) => {
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
        
    }, [noti]);

    // useEffect(() => {
    //     getAllNotifications();
    // setnoti([])
    //     // getAllNotifications();
    // }, []);

    // getAllNotifications();
    return (
        <div>
            <h1>Notifications</h1>
            {/* <pre>{JSON.stringify(noti, null, 4)}</pre> */}

            <ul>
                {noti?.map(notification => (
                    <li key={notification._id}>
                        <p>Merchant ID: {notification.merchant_id}</p>
                        <p>Product ID: {notification.product_id}</p>
                        {/* <p>Seen: {notification.isseen ? 'Yes' : 'No'}</p> */}
                        <p>Created At: {new Date(notification.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationPage;






// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { url } from '../../default';
// import { useSelector } from 'react-redux';

// const NotificationPage = ({ noti, getAllNotifications }) => {
//     const auth = useSelector((state) => state.auth);

//     useEffect(() => {
//         const sendNotificationIds = async () => {
//             const notificationIds = noti.map(notification => notification._id);
//             try {
//                 const response = await axios.post(`${url}api/v1/notification/change`, { ids: notificationIds }, {
//                     headers: {
//                         Authorization: `Bearer ${auth?.token}`
//                     }
//                 });
//                 console.log('Notification IDs sent successfully:', response.data);
//             } catch (error) {
//                 console.error('Error sending notification IDs:', error);
//             }
//         };

//         sendNotificationIds();
//     }, [noti, auth.token]);

//     useEffect(() => {
//         getAllNotifications();
//     }, []);

//     return (
//         <div>
//             <h1>Notifications</h1>
//             <ul>
//                 {noti.map(notification => (
//                     <li key={notification._id}>
//                         <p>Merchant ID: {notification.merchant_id}</p>
//                         <p>Product ID: {notification.product_id}</p>
//                         <p>Created At: {new Date(notification.createdAt).toLocaleString()}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default NotificationPage;
