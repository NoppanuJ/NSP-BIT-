import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AdminAnnouncement = () => {
    const [formData, setFormData] = useState({
        type: 'General announcement',
        title: '',
        message: '',
        markAsEmergency: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = () => {
        console.log('Form data:', formData);
    };

    const handleCancel = () => {
        setFormData({
            type: 'General announcement',
            title: '',
            message: '',
            markAsEmergency: false,
        });
    };

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

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 3 }}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Mark as Emergency</Typography>
                        <IconButton
                            onClick={() => setFormData({ ...formData, markAsEmergency: !formData.markAsEmergency })}
                            sx={{
                                backgroundColor: formData.markAsEmergency ? 'red' : 'transparent',
                                color: formData.markAsEmergency ? 'white' : 'red',
                                borderRadius: '5px',
                                border: '1px solid red',
                                padding: 1
                            }}
                        >
                            <ErrorOutlineIcon />
                        </IconButton>
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
                        onClick={handleCancel}
                        sx={{ width: '150px', backgroundColor: '#808080' }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminAnnouncement;
