import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList, FaBell, FaUserCircle, FaCaretDown, FaThLarge, FaUser, FaCog, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import '../CssComponents/Dashboard.css';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [profileDropdown, setProfileDropdown] = useState(false); // State for dropdown visibility
    const [darkMode, setDarkMode] = useState(false); // State for theme

    useEffect(() => {
        // Apply the theme class to the body based on the darkMode state
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

    }, [darkMode]);
  
    return (
        <div className="dashboard-container">
            <main className="dashboard-main">
                <div className="dashboard-content">
                    <div className="announcement-section">
                        <div className="announcement-header">
                            <FaCaretDown /> Announcement
                        </div>
                        <div className="announcement-body">
                            No Announcement
                        </div>
                    </div>
                    <div className="time-schedule-section">
                        <h2>Today Time Schedule</h2>
                        <ul>
                            <li>Current shift - Sunday 1 PM - 9 PM</li>
                            <li>Present time - 6:00 PM</li>
                            <li>Time left - 4 hours left</li>
                        </ul>
                    </div>
                    <div className="upcoming-shift-section">
                        <h2>Upcoming Shift</h2>
                        <ul>
                            <li>Mon 9 AM - 5 PM</li>
                            <li>Tue 1 PM - 9 PM</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
