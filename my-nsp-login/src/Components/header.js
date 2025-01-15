import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../CssComponents/Dashboard.css';
import { FaBell, FaUserCircle, FaUserNurse, FaUser, FaCog, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

const Header = ({ setBar, bar, role }) => {
    const [profileDropdown, setProfileDropdown] = useState(false); // Profile dropdown state
    const [nurseDropdown, setNurseDropdown] = useState(false); // Nurse dropdown state
    const [darkMode, setDarkMode] = useState(false); // Dark mode state
    const [currentTime, setCurrentTime] = useState(dayjs()); // Current time
    const [notificationCount, setNotificationCount] = useState(0);

    const navigate = useNavigate();

    const notification = () => {
        navigate('/notification');
    };
    const ProfileDisplay = () => {
        navigate('/profiledisplay');
    };
    const settings = () => {
        navigate('/setting');
    };
    const logout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
    };

    const toggleNurseDropdown = () => {
        setNurseDropdown(!nurseDropdown);
    };

    const toggleBar = () => {
        setBar(!bar);
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

      useEffect(() => {
        axios.get('http://localhost:5001/getNotification')
            .then(response => {
                const base64Decode = (str) => atob(str); // ฟังก์ชันถอดรหัส Base64
                const loggedInUser = localStorage.getItem('loggedInUser');
                const filteredNurses = response.data.filter(notification => {
                    const nurseEmail = base64Decode(loggedInUser);
                    return notification.to === nurseEmail;
                })
                setNotificationCount(filteredNurses.length);
            })
            .catch(error => {
                console.error(error);
            })

    }, [])

    return (
        <>
            {role === "user" ? (
                <AppBar position="static" sx={{ backgroundColor: '#e0e0e0' }}>
                    <Toolbar>
                        <IconButton edge="start" color="black" aria-label="menu" sx={{ mr: 2 }} onClick={toggleBar}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                            NSP
                        </Typography>
                        <div
                            style={{
                                // width: '40px', // Set the desired size for the circle
                                // height: '40px', // Same as width to make it a perfect circle
                                // display: 'flex',
                                // backgroundColor: '#f0f0f0', // Optional: Set a background color
                                // cursor: 'pointer', // Add pointer cursor for better UX
                            }}
                        >
                            <div style={{
                                width: '12px', // Set the desired size for the circle
                                height: '12px', // Same as width to make it a perfect circle
                                fontSize : '10px',
                                fontWeight : 'bold',
                                display: notificationCount > 0 ? 'flex' : 'none',
                                color : 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%', // Makes the container circular
                                backgroundColor: '#f0f0f0', // Optional: Set a background color
                                position: 'absolute',
                                marginLeft: '30px',
                            }}>
                                {notificationCount > 0 && <div>{notificationCount}</div>}
                            </div>
                            <FaBell className="header-icon" color="black" size={20}   onClick={notification} /> 
                        </div>

                        <div className="profile-container">
                            <FaUserCircle onClick={toggleProfileDropdown} className="header-icon" color='black' />
                            {profileDropdown && (
                                <div className="profile-dropdown">
                                    <div onClick={ProfileDisplay} className="dropdown-item" style={{ color: 'black' }}>
                                        <FaUser style={{ marginRight: '10px' }} /> Profile
                                    </div>
                                    <div onClick={settings} className="dropdown-item" style={{ color: 'black' }}>
                                        <FaCog style={{ marginRight: '10px' }} /> Setting
                                    </div>
                                    <div onClick={toggleTheme} className="dropdown-item" style={{ color: 'black' }}>
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
                                    <div onClick={logout} className="dropdown-item" style={{ color: 'black' }}>
                                        <FaSignOutAlt style={{ marginRight: '10px' }} /> Log Out
                                    </div>
                                </div>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            ) : (
                <AppBar position="static" sx={{ backgroundColor: '#e0e0e0' }}>
                    <Toolbar>
                        <IconButton edge="start" color="black" aria-label="menu" sx={{ mr: 2 }} onClick={toggleBar}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                            NSP System V.1
                        </Typography>
                        <Typography variant="h6" sx={{ marginRight: 2, color: 'black' }}>
                            {currentTime.format('HH:mm:ss')}
                        </Typography>
                        <div className="profile-container">
                            <FaUserNurse onClick={toggleNurseDropdown} className="header-icon" color='black' />
                            {nurseDropdown && (
                                <div className="profile-dropdown">
                                    <div onClick={logout} className="dropdown-item" style={{ color: 'black' }}>
                                        <FaSignOutAlt style={{ marginRight: '10px' }} /> Log Out
                                    </div>
                                </div>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            )}
        </>
    );
};

export default Header;
