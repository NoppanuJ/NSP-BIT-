import React from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList, FaBell, FaUserCircle, FaCaretDown, FaThLarge } from 'react-icons/fa';
import '../CssComponents/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <FaThLarge size={32} />
                    <h2>Dashboard</h2>
                </div>
                <nav className="sidebar-menu">
                    <div className="menu-item">
                        <FaHome /> Home
                    </div>
                    <div className="menu-item">
                        <FaCalendarAlt /> Schedule
                    </div>
                    <div className="menu-item">
                        <FaClipboardList /> Request
                    </div>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <FaBell className="header-icon" />
                    <FaUserCircle className="header-icon" />
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
