import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList, FaBell, FaUserCircle, FaCaretDown, FaThLarge, FaUser, FaCog, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton, FormControlLabel, Checkbox } from '@mui/material';

import '../CssComponents/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const Dashboard = () => {
    const [profileDropdown, setProfileDropdown] = useState(false); // State for dropdown visibility
    const [darkMode, setDarkMode] = useState(false); // State for theme
    const [announcements, setAnnouncements] = useState([]);

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

    useEffect(() => {
        axios.get('http://localhost:5001/getAnnouncement')
            .then((response) => {
                console.log(response.data);
                setAnnouncements(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])


    return (
        <div className="dashboard-container">
            <main className="dashboard-main">
                <div className="dashboard-content">
                    <div className="announcement-section">
                        <div className="announcement-header">
                            <FaCaretDown /> Announcement
                        </div>
                        <div className="announcement-body">
                            {announcements.length === 0 ? (
                                // กรณีไม่มีประกาศ
                                <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray', mt: 3 }}>
                                    No Announcement
                                </Typography>
                            ) : (
                                // กรณีมีประกาศ
                                announcements.map((announcement, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mb: 3,
                                            borderRadius: '10px',
                                            // borderBottom: '1px solid #e0e0e0', // เส้นคั่นด้านล่าง
                                            // pb: 2, // ระยะห่างด้านล่าง
                                            backgroundColor: announcement.type === 'General announcement' ? '#f9f9f9' : '#FFB0B0', // สีพื้นหลัง
                                            p : 5,
                                        }}
                                    >
                                        {/* ส่วนแสดง Date (ซ้าย) */}
                                        <Box sx={{ textAlign: 'center', minWidth: '80px', borderRight: '1px solid black', pr: 5 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {dayjs(announcement.date).format('DD')}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {dayjs(announcement.date).format('MMM YYYY')}
                                            </Typography>
                                        </Box>

                                        {/* ส่วนแสดง Title และ Message (กลาง) */}
                                        <Box sx={{ flex: 1, ml: 5 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                {announcement.title}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'gray' }}>
                                                {announcement.message}
                                            </Typography>
                                        </Box>

                                        {/* ส่วนแสดง Delete Icon (ขวา) */}
                                        {/* Uncomment หากต้องการปุ่ม Delete */}
                                        {/* 
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteAnnouncement(announcement.id)}
          sx={{ ml: 2 }}
        >
          <DeleteIcon />
        </Button> 
        */}
                                    </Box>
                                ))
                            )}
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
