import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList, FaBell, FaUserCircle, FaCaretDown, FaThLarge, FaUser, FaCog, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import '../CssComponents/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [profileDropdown, setProfileDropdown] = useState(false); // State for dropdown visibility
    const [darkMode, setDarkMode] = useState(false); // State for theme
    const navigate = useNavigate();
    
    // Toggle between dark and light modes
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

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

    const home = () => {       
        navigate('/dashboard');
    };
    const schedule = () => {       
        navigate('/schedule');
    };
    const request = () => {       
        navigate('/shiftrequest');
    };
    const notification = () => {       
        navigate('/notification');
    };
    const ProfileDisplay = () => {       
        navigate('/profiledisplay');
    };
    const settings = () => {
        navigate('/setting'); // Navigate to settings page
    };
    const logout = () => {
        // Add your logout logic here, for now, we just navigate to login
        navigate('/');
    };

    // Function to toggle profile dropdown visibility
    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <FaThLarge size={32} />
                    <h2>Dashboard</h2>
                </div>
                <nav className="sidebar-menu">
                    <div className="menu-item">
                        <FaHome onClick={home}/> Home
                    </div>
                    <div className="menu-item">
                        <FaCalendarAlt onClick={schedule}/> Schedule
                    </div>
                    <div className="menu-item">
                        <FaClipboardList onClick={request}/> Request
                    </div>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <FaBell onClick={notification} className="header-icon" />
                    <div className="profile-container">
                        <FaUserCircle onClick={toggleProfileDropdown} className="header-icon" />
                        {profileDropdown && (
                            <div className="profile-dropdown">
                                <div onClick={ProfileDisplay} className="dropdown-item">
                                    <FaUser style={{ marginRight: '10px' }} /> Profile
                                </div>
                                <div onClick={settings} className="dropdown-item">
                                    <FaCog style={{ marginRight: '10px' }} /> Setting
                                </div>
                                <div onClick={toggleTheme} className="dropdown-item">
                                    {darkMode ? (
                                        <>
                                            <FaSun style={{ marginRight: '10px' }} /> Light Mode
                                        </>
                                    ) : (
                                        <>
                                            <FaMoon style={{ marginRight: '10px' }} /> Dark Mode
                                        </>
                                    )}
                                </div>
                                <div onClick={logout} className="dropdown-item">
                                    <FaSignOutAlt style={{ marginRight: '10px' }} /> Log Out
                                </div>
                            </div>
                        )}
                    </div>
                </header>
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
