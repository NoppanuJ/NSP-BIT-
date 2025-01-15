import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton, FormControlLabel, Checkbox } from '@mui/material';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';
import swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import "../CssComponents/AdminResult.css";
import dayjs from 'dayjs';

const AdminAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [formData, setFormData] = useState({
        type: 'General announcement',
        title: '',
        message: '',
        // markAsEmergency: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDeleteAnnouncement = (id) => {
        axios
            .delete(`http://localhost:5001/deleteAnnouncement/${id}`)
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === "Announcement deleted successfully") {
                    swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Announcement deleted successfully',
                    });
                    // อัปเดตรายการประกาศ
                    setAnnouncements((prevAnnouncements) =>
                        prevAnnouncements.filter((announcement) => announcement._id !== id)
                    );
                }
            })
            .catch((error) => {
                console.error(error);
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete the announcement',
                });
            });
    };


    const handleSubmit = () => {
        if (!formData.type || !formData.title || !formData.message) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all required fields',
            })
        }
        else {
            console.log('Form data:', formData);
            axios.post('http://localhost:5001/createAnnouncement', formData)
                .then((response) => {
                    console.log(response.data.announcement);
                    if (response.data.message === "Announcement created successfully") {
                        swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Announcement created successfully',
                        })

                        setAnnouncements([...announcements, response.data.announcement]);
                        setFormData({
                            type: 'General announcement',
                            title: '',
                            message: '',
                            // markAsEmergency: false,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    };

    const handleReset = () => {
        setFormData({
            type: 'General announcement',
            title: '',
            message: '',
            // markAsEmergency: false,
        });
    };

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: '#f0f0f0',
                height: '100vh'
            }}
        >
            <Box
                sx={{
                    width: '70%',
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 1,
                    boxShadow: 2
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Create Announcement
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box sx={{ flex: 1, pr: 2 }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'red' }}>*Type</Typography>
                        <FormControl fullWidth>
                            <Select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="General announcement">General announcement</MenuItem>
                                <MenuItem value="Urgent announcement">Urgent announcement</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography sx={{ fontWeight: 'bold', color: 'red' }}>*Title</Typography>
                        <TextField
                            fullWidth
                            name="title"
                            placeholder="Enter Title"
                            value={formData.title}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <Typography sx={{ fontWeight: 'bold', color: 'red' }}>*Message</Typography>
                        <TextField
                            fullWidth
                            name="message"
                            multiline
                            rows={4}
                            placeholder="Enter Message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </Box>
                </Box>

                <Box display="flex" justifyContent="center" mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: '150px', mr: 2 }}
                    >
                        Post
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleReset}
                        sx={{ width: '150px', backgroundColor: '#808080' }}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>

            <Box sx={{ mt: 3, width: '70%', backgroundColor: 'white', padding: 4, borderRadius: 1, boxShadow: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Announcement
                </Typography>
                {announcements.map((announcement, index) => (
                   <Box
                   key={index}
                   sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     mb: 3,
                    //  borderBottom: '1px solid #e0e0e0', // เส้นคั่นด้านล่าง
                    //  pb: 2, // ระยะห่างด้านล่าง
                     backgroundColor: announcement.type === 'General announcement' ? '#f9f9f9' : '#FFB0B0',
                     p : 5,
                     borderRadius: '10px'
                   }}
                 >
                   {/* ส่วนแสดง Date (ซ้าย) */}
                   <Box sx={{ textAlign: 'center', minWidth: '80px',  borderRight: '1px solid black', pr : 5 }}>
                     <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                       {dayjs(announcement.date).format('DD')}
                     </Typography>
                     <Typography variant="h6" sx={{ fontWeight: 'bold',}}>
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
                   <Button
                     variant="contained"
                     color="error"
                     onClick={() => handleDeleteAnnouncement(announcement._id)}
                     sx={{ ml: 2 }}
                   >
                     <DeleteIcon />
                   </Button>
                 </Box>
                 
                ))}
            </Box>
        </Box>
    );
};

export default AdminAnnouncement;
