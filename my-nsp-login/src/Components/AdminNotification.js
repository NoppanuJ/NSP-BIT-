import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminNotification = () => {
    const notifications = [
        {
            title: "Test 2",
            message: "This is a test message.",
            dateAdded: "17/09/2024"
        },
        {
            title: "Test 1",
            message: "jsjgjaposjdfpojapofjkop[afk[poakspfgokspofdgpojopedgjoopdjrfgojpoafjposjg[papodjfopajsopedjfoejosfapofdk",
            dateAdded: "17/09/2024"
        },
        {
            title: "Shift change",
            message: "There will shift change in this month schedule.",
            dateAdded: "15/09/2024"
        },
        {
            title: "Emergency",
            message: "Emergency message test.",
            dateAdded: "14/09/2024"
        }
    ];

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f0f0f0', height: '100vh' }}>
            <Box sx={{ padding: 2, backgroundColor: '#e0e0e0', borderRadius: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Send Notifications
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Send Notifications List
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <IconButton sx={{ backgroundColor: 'blue', color: 'white', marginRight: 1 }}>
                        <AddIcon />
                    </IconButton>
                    <IconButton sx={{ backgroundColor: 'red', color: 'white' }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date Added</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notifications.map((notification, index) => (
                                <TableRow key={index}>
                                    <TableCell>{notification.title}</TableCell>
                                    <TableCell>{notification.message}</TableCell>
                                    <TableCell>{notification.dateAdded}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default AdminNotification;
