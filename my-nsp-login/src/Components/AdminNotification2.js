import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControl, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert2';

const AdminSendNotification = () => {
    const [formData, setFormData] = useState({
        type : '',
        to: '',
        title: '',
        message: '',
    });
    const [nurses, setNurses] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Handle the send action here (e.g., sending the data to the backend)
        console.log('Notification Sent:', formData);
        axios.post('http://localhost:5001/createNotification', formData)
            .then((response) => {
                console.log(response.data);
                if (response.data.message === "Notification created successfully") {
                    swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Notification created successfully',
                    });
                    setFormData({ to: '', title: '', message: '', type: '' });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleReset = () => {
        // Handle the cancel action here
        setFormData({ to: '', title: '', message: '', type: '' });
    };

    useEffect(() => {
        axios.get('http://localhost:5001/nurses')
          .then(response => {
            const filteredNurses = response.data.filter(nurse => nurse.Role !== 'admin');
            setNurses(filteredNurses);
          })
          .catch(error => {
            console.error(error);
          })
      }, []);

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f0f0f0', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ padding: 3, backgroundColor: '#e0e0e0', borderRadius: 2, minWidth: '600px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Send Notifications
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Enter send notifications to personnel
                </Typography>
                <Box component="form">
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: 'red', fontWeight: 'bold', display: 'inline-block', marginRight: '5px' }}>*</Typography>
                        <Typography sx={{ display: 'inline-block', fontWeight: 'bold' }}>Type</Typography>
                        <FormControl fullWidth>
                            <Select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                sx={{ backgroundColor: 'white', mt: 1  }}
                            >
                                <MenuItem value="General announcement">General announcement</MenuItem>
                                <MenuItem value="Urgent announcement">Urgent announcement</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {/* <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: 'red', fontWeight: 'bold', display: 'inline-block', marginRight: '5px' }}>*</Typography>
                        <Typography sx={{ display: 'inline-block', fontWeight: 'bold' }}>To</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter the Email"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            sx={{ backgroundColor: 'white', mt: 1 }}
                        />
                    </Box> */}
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: 'red', fontWeight: 'bold', display: 'inline-block', marginRight: '5px' }}>*</Typography>
                        <Typography sx={{ display: 'inline-block', fontWeight: 'bold' }}>To</Typography>
                        <FormControl fullWidth>
                            <Select
                                name="to"
                                value={formData.to}
                                onChange={handleChange}
                                sx={{ backgroundColor: 'white', mt: 1  }}
                            >                         
                                {nurses.map((nurse) => (
                                    <MenuItem key={nurse._id} value={nurse.User_Email}>{nurse.User_Email}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: 'red', fontWeight: 'bold', display: 'inline-block', marginRight: '5px' }}>*</Typography>
                        <Typography sx={{ display: 'inline-block', fontWeight: 'bold' }}>Title</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter the Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            sx={{ backgroundColor: 'white', mt: 1 }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: 'red', fontWeight: 'bold', display: 'inline-block', marginRight: '5px' }}>*</Typography>
                        <Typography sx={{ display: 'inline-block', fontWeight: 'bold' }}>Message</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your message"
                            multiline
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            sx={{ backgroundColor: 'white', mt: 1 }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ backgroundColor: '#007bff', color: 'white', width: '150px' }}
                        >
                            Sent
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleReset}
                            sx={{ backgroundColor: '#6c757d', color: 'white', width: '150px' }}
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminSendNotification;
