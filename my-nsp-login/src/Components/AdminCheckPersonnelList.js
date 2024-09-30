import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { MoreVert, Add, Delete, Edit, Visibility } from '@mui/icons-material';

const personnelData = [
    { id: 1, name: 'John Doe', status: 'In Shift', joined: '20/10/2021', department: 'Surgery', statusColor: 'green' },
    { id: 2, name: 'Jane Smith', status: 'Sick', joined: '17/09/2014', department: 'Cardiology', statusColor: 'red' },
    { id: 3, name: 'Sarah Johnson', status: 'In Shift', joined: '29/01/2009', department: 'Pediatrics', statusColor: 'green' },
    { id: 4, name: 'Michael Rodriguez', status: 'Unavailable', joined: '5/02/2005', department: 'Emergency Room', statusColor: 'gray' },
];

const AdminCheckPersonnelList = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPersonnel, setSelectedPersonnel] = useState(null);

    const handleClick = (event, personnel) => {
        setAnchorEl(event.currentTarget);
        setSelectedPersonnel(personnel);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedPersonnel(null);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f0f0f0', height: '100vh' }}>
            <Box sx={{ padding: 3, backgroundColor: '#e0e0e0', borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" fontWeight="bold">Personnel List</Typography>
                    <IconButton sx={{ backgroundColor: '#007bff', color: 'white' }}>
                        <Add />
                    </IconButton>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Joined</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Department</TableCell>
                                <TableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {personnelData.map((personnel) => (
                                <TableRow key={personnel.id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <img src="https://via.placeholder.com/40" alt="personnel" style={{ marginRight: 10, borderRadius: '50%' }} />
                                            {personnel.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" style={{ border: '1px solid #ccc', borderRadius: '20px', padding: '2px 10px' }}>
                                            <span style={{ backgroundColor: personnel.statusColor, width: 10, height: 10, borderRadius: '50%', marginRight: 5 }}></span>
                                            {personnel.status}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{personnel.joined}</TableCell>
                                    <TableCell>{personnel.department}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={(event) => handleClick(event, personnel)}>
                                            <MoreVert />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl) && selectedPersonnel?.id === personnel.id}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Visibility fontSize="small" sx={{ mr: 1 }} /> View
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                                            </MenuItem>
                                            <MenuItem onClick={handleClose} sx={{ color: 'red' }}>
                                                <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default AdminCheckPersonnelList;
