import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const AdminSendNotification = () => {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
    });

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
    };

    const handleCancel = () => {
        // Handle the cancel action here
        console.log('Notification Cancelled');
        setFormData({ title: '', message: '' });
    };

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
                            onClick={handleCancel}
                            sx={{ backgroundColor: '#6c757d', color: 'white', width: '150px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminSendNotification;
