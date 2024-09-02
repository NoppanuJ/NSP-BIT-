import React, { useState } from 'react';
import { FaUser, FaBell, FaLock } from 'react-icons/fa';
import '../CssComponents/Setting.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        shiftChanges: false,
        alerts: false,
        messages: false,
    });

    const toggleNotification = (key) => {
        setNotifications({
            ...notifications,
            [key]: !notifications[key],
        });
    };

    const navigate = useNavigate();

    const ProfileEdit = () => {
        navigate('/profileedit');
    };
    const ChangePassword = () => {
        navigate('/changepassword');
    };

    return (
        <div className="settings-container">
            <header className="settings-header">
                <button className="back-button">{'<'}</button>
                <h1>Settings</h1>
            </header>
            <div className="user-info">
                <FaUser size={40} />
                <span>John Doe</span>
            </div>
            <div className="settings-section notifications-section">
                <h2><FaBell /> Notifications</h2>
                <div className="toggle-item">
                    <span>Shift Changes</span>
                    <input
                        type="checkbox"
                        checked={notifications.shiftChanges}
                        onChange={() => toggleNotification('shiftChanges')}
                    />
                </div>
                <div className="toggle-item">
                    <span>Alerts</span>
                    <input
                        type="checkbox"
                        checked={notifications.alerts}
                        onChange={() => toggleNotification('alerts')}
                    />
                </div>
                <div className="toggle-item">
                    <span>Messages</span>
                    <input
                        type="checkbox"
                        checked={notifications.messages}
                        onChange={() => toggleNotification('messages')}
                    />
                </div>
            </div>
            <div className="settings-section">
                <button className="settings-button" onClick={ProfileEdit}>
                    <FaUser /> Edit Profile
                </button>
                <button className="settings-button" onClick={ChangePassword}>
                    <FaLock /> Change Password
                </button>
            </div>
        </div>
    );
};

export default Settings;
