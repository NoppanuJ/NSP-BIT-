import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../CssComponents/Dashboard.css';
import { FaHome, FaCalendarAlt, FaClipboardList, FaBell, FaUserCircle, FaCaretDown, FaThLarge, FaUser, FaCog, FaSignOutAlt, FaSun, FaMoon, FaUserNurse } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Header = ({ setBar, bar, role }) => {
    const [profileDropdown, setProfileDropdown] = useState(false); // State for dropdown visibility
    const [darkMode, setDarkMode] = useState(false); // State for theme
    const [currentTime, setCurrentTime] = useState(dayjs()); // Set initial state for time

    const navigate = useNavigate();

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

    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
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

    return (

        <>
            {role === "user" ? (<AppBar position="static" sx={{ backgroundColor: '#e0e0e0' }}>
                <Toolbar >
                    <IconButton edge="start" color="black" aria-label="menu" sx={{ mr: 2 }} onClick={toggleBar}>

                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                        NSP
                    </Typography>

                    <FaBell onClick={notification} className="header-icon" color='black' />
                    <div className="profile-container">
                        <FaUserCircle onClick={toggleProfileDropdown} className="header-icon" color='black' />
                        {profileDropdown && (
                            <div className="profile-dropdown">
                                <div onClick={ProfileDisplay} className="dropdown-item" style={{ color: 'black' }}>
                                    <FaUser style={{ marginRight: '10px' }} /> Profile
                                </div>
                                <div onClick={settings} className="dropdown-item" style={{ color: 'black' }} >
                                    <FaCog style={{ marginRight: '10px' }} /> Setting
                                </div>
                                <div onClick={toggleTheme} className="dropdown-item" style={{ color: 'black' }} >
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
            </AppBar>) : (

                <AppBar position="static" sx={{ backgroundColor: '#e0e0e0' }}>
                    <Toolbar >
                        <IconButton edge="start" color="black" aria-label="menu" sx={{ mr: 2 }} onClick={toggleBar}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                            NSP System V.1
                        </Typography>
                        <Typography variant="h6" sx={{ marginRight: 2, color: 'black' }}>
                            {currentTime.format('HH:mm:ss')}
                        </Typography>
                        <FaUserNurse  className="header-icon" color='black' />
                        {/* <div className="profile-container">
                            <FaUserCircle onClick={toggleProfileDropdown} className="header-icon" color='black' />
                            {profileDropdown && (
                                <div className="profile-dropdown">
                                    <div onClick={ProfileDisplay} className="dropdown-item" style={{ color: 'black' }}>
                                        <FaUser style={{ marginRight: '10px' }} /> Profile
                                    </div>
                                    <div onClick={settings} className="dropdown-item" style={{ color: 'black' }} >
                                        <FaCog style={{ marginRight: '10px' }} /> Setting
                                    </div>
                                    <div onClick={toggleTheme} className="dropdown-item" style={{ color: 'black' }} >
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
                        </div> */}
                    </Toolbar>
                </AppBar>
            )
            }
        </>
    );
};

export default Header;
