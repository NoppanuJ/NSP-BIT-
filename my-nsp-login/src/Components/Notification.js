import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import '../CssComponents/Notification.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/getNotification')
            .then(response => {
                const base64Decode = (str) => atob(str); // ฟังก์ชันถอดรหัส Base64
                const loggedInUser = localStorage.getItem('loggedInUser');
                const filteredNurses = response.data.filter(notification => {
                    const nurseEmail = base64Decode(loggedInUser);
                    return notification.to === nurseEmail;
                })
                console.log(filteredNurses);
                setNotifications(filteredNurses);
            })
            .catch(error => {
                console.error(error);
            })

    }, [])

    // const deleteNotification = (id) => {
    //     axios.delete(`http://localhost:5001/deleteNotification/${id}`)
    //         .then(response => {
    //             console.log(response.data);
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Success',
    //                 text: 'Notification deleted successfully',
    //             })
    //             setNotifications(notifications.filter(notification => notification.id !== id));
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // };

    return (
        <div className="notifications-container">
            <h1>Notifications</h1>
            <p>Your notification will be shown here.</p>
            <div className="notifications-list">
                {notifications.map(notification => (
                    <div
                        key={notification._id}
                        className={`notification-item ${notification.type === "Urgent announcement" ? 'emergency' : ''}`}
                    >
                        <div className="notification-message">
                            {notification.message} - {dayjs(notification.date).format('YYYY-MM-DD HH:mm:ss')}
                            {notification.type === "Urgent announcement" && (
                                <FaExclamationTriangle className="emergency-icon" />
                            )}
                        </div>
                        {/* <FaTrash
                            className="delete-icon"
                            onClick={() => deleteNotification(notification.id)}
                        /> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
