import React from 'react';
import { FaCalendarAlt, FaBullhorn, FaBell, FaUserNurse, FaThLarge, FaHome, FaCircle } from 'react-icons/fa';
import '../CssComponents/AdminMain.css'; // Ensure you create a CSS file for your styles

const AdminMain = () => {
    return (
        <div className="admin-main-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <FaThLarge size={32} />
                    <h2>Admin</h2>
                </div>
                <nav className="sidebar-menu">
                    <div className="menu-item">
                        <FaHome /> Home
                    </div>
                </nav>
            </aside>
            <main className="admin-main-content">
                <header className="admin-header">
                    <h1>NSP System V.1</h1>
                    <div className="header-right">
                        <div>System Time<br />19:30</div>
                        <FaUserNurse className="profile-icon" />
                    </div>
                </header>
                <div className="action-section">
                    <div className="action-item">
                        <FaCalendarAlt size={50} />
                        <h3>Create Schedule</h3>
                    </div>
                    <div className="action-item">
                        <FaBullhorn size={50} />
                        <h3>Create Announcement</h3>
                    </div>
                    <div className="action-item">
                        <FaBell size={50} />
                        <h3>Send Notifications</h3>
                    </div>
                    <div className="action-item">
                        <FaUserNurse size={50} />
                        <h3>Check Personnel List</h3>
                    </div>
                </div>
                <div className="data-section">
                    <div className="data-item">
                        <h3>Pending Request</h3>
                        <ul>
                            <li><FaCircle color="red" /> John Doe request schedule change - 1 hour ago</li>
                            <li><FaCircle color="red" /> Jane Smith request trading shift - 2 hours ago</li>
                            <li><FaCircle color="red" /> Marry Sue request trading shift - 2 hours ago</li>
                        </ul>
                        <button className="data-button">Request page</button>
                    </div>
                    <div className="data-item">
                        <h3>Last month data</h3>
                        <ul>
                            <li><FaCircle color="red" /> 30 schedules created</li>
                            <li><FaCircle color="red" /> 40 shift requests in total</li>
                            <li><FaCircle color="red" /> ...</li>
                        </ul>
                        <button className="data-button">Data page</button>
                    </div>
                    <div className="data-item">
                        <h3>Today's Schedule</h3>
                        <ul>
                            <li><FaCircle color="red" /> Nurse in total - 20 Nurses</li>
                            <li><FaCircle color="red" /> Shift in total - 20 shifts</li>
                        </ul>
                        <button className="data-button">View schedule</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminMain;
