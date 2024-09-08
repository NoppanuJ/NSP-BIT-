import React, { useState } from 'react';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import '../CssComponents/Notification.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: 'Emergency Nurse Require!',
            time: '15 minutes ago',
            isEmergency: true,
        },
        {
            id: 2,
            message: 'Shift Change Approved!',
            time: '5 hours ago',
            isEmergency: false,
        },
        {
            id: 3,
            message: 'Your next shift is at 15 July',
            time: '7 hours ago',
            isEmergency: false,
        },
        {
            id: 4,
            message: 'Schedule Changed!',
            time: '10 hours ago',
            isEmergency: false,
        },
    ]);

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <div className="notifications-container">
            <h1>Notifications</h1>
            <p>Your notification will be shown here.</p>
            <div className="notifications-list">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`notification-item ${notification.isEmergency ? 'emergency' : ''}`}
                    >
                        <div className="notification-message">
                            {notification.message} - {notification.time}
                            {notification.isEmergency && (
                                <FaExclamationTriangle className="emergency-icon" />
                            )}
                        </div>
                        <FaTrash
                            className="delete-icon"
                            onClick={() => deleteNotification(notification.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
