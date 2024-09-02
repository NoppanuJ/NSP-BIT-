import React from 'react';
import { Button } from '@mui/material';
import { FaUser, FaBell, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import '../CssComponents/Dashboard.css'; // Create this file for custom styles

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="header-icons">
                    <Button
                        variant="outlined"
                        startIcon={<FaCalendarAlt />}
                    >
                        Schedules
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FaUser />}
                    >
                        Profile
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FaClipboardList />}
                    >
                        Request
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FaBell />}
                    >
                        Notifications
                    </Button>
                </div>
            </header>
            <main className="dashboard-content">
                <section className="metrics-overview">
                    <h2>Metrics Overview:</h2>
                    <ul>
                        <li>Total Nurses: 30</li>
                        <li>Shift Today: 20</li>
                        <li>Pending Requests: 5</li>
                    </ul>
                </section>
                <section className="upcoming-shift">
                    <h2>Upcoming Shift:</h2>
                    <ul>
                        <li>Mon 9 AM - 5 PM (John Doe)</li>
                        <li>Tue 1 PM - 9 PM (Jane Smith)</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
