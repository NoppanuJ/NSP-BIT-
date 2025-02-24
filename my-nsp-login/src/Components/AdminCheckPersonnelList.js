import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { MoreVert, Add, Delete, Edit, Visibility } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';

// const personnelData = [
//     { id: 1, name: 'John Doe', status: 'In Shift', joined: '20/10/2021', department: 'Surgery', statusColor: 'green' },
//     { id: 2, name: 'Jane Smith', status: 'Sick', joined: '17/09/2014', department: 'Cardiology', statusColor: 'red' },
//     { id: 3, name: 'Sarah Johnson', status: 'In Shift', joined: '29/01/2009', department: 'Pediatrics', statusColor: 'green' },
//     { id: 4, name: 'Michael Rodriguez', status: 'Unavailable', joined: '5/02/2005', department: 'Emergency Room', statusColor: 'gray' },
// ];

const AdminCheckPersonnelList = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPersonnel, setSelectedPersonnel] = useState(null);
    const [personnelData, setPersonnelData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/nurses")
            .then(res => {
                console.log(res.data);
                setPersonnelData(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const handleClick = (event, personnel) => {
        // setAnchorEl(event.currentTarget);
        // setSelectedPersonnel(personnel);
        console.log(personnel._id);
        const id = personnel._id
        axios.delete(`http://localhost:5001/deleteNurse/${personnel._id}`)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Personnel deleted successfully',
                })
                setPersonnelData(personnelData.filter(personnel => personnel._id !== id));

            }).catch(err => {
                console.log(err);
            })
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
                            {/* <TableCell style={{ fontWeight: 'bold' }}>Department</TableCell> */}
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {personnelData.map((personnel) => (
                            <TableRow key={personnel.Nurse_ID}>
                                <TableCell>
                                    <Box display="flex" alignItems="center" width={200}>
                                        {/* <img src="https://via.placeholder.com/40" alt="personnel" style={{ marginRight: 10, borderRadius: '50%' }} /> */}
                                        {personnel.User_First_Name} {personnel.User_Last_Name}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" style={{ border: '1px solid #ccc', borderRadius: '20px', padding: '2px 10px' }}>
                                        <span style={{ backgroundColor: personnel.Status === 'Inactive' ? 'gray' : personnel.Status === 'Active' ? 'green' : 'red', width: 10, height: 10, borderRadius: '50%', marginRight: 5 }}></span>
                                        {personnel.Status}
                                    </Box>
                                </TableCell>
                                <TableCell>{personnel.CreatedAt}</TableCell>
                                {/* <TableCell>{personnel.department}</TableCell> */}
                                <TableCell align="right">
                                    <IconButton onClick={(event) => handleClick(event, personnel)}>
                                        <Delete />
                                    </IconButton>
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
