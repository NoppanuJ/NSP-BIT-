import React from 'react';
import { Box, Typography, Button, Paper, Grid, IconButton } from '@mui/material';
import { FaCalendarAlt, FaBullhorn, FaBell, FaUserNurse } from 'react-icons/fa';

const AdminMain = () => {
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Admin
        </Typography>
        <Typography variant="h6">NSP System V.1</Typography>
        <Typography variant="h6">System Time: 19:30</Typography>
        <IconButton>
          <FaUserNurse size={30} />
        </IconButton>
      </Box>

      <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#d3d3d3' }}>
        <Grid container spacing={15} justifyContent="center" mb={3}>
          <Grid item>
            <Button variant="contained" startIcon={<FaCalendarAlt />} sx={{ backgroundColor: '#5A8DFF', padding: '20px', width: '200px' }}>
              Create Schedule
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<FaBullhorn />} sx={{ backgroundColor: '#5A8DFF', padding: '20px', width: '200px' }}>
              Create Announcement
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<FaBell />} sx={{ backgroundColor: '#5A8DFF', padding: '20px', width: '200px' }}>
              Send Notifications
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<FaUserNurse />} sx={{ backgroundColor: '#5A8DFF', padding: '20px', width: '200px' }}>
              Check Personnel List
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold">Pending Request</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>🔴 John Doe request schedule change - 1 hour ago</li>
                <li>🔴 Jane Smith request trading shift - 2 hours ago</li>
                <li>🔴 Marry Sue request trading shift - 2 hours ago</li>
              </ul>
              <Button variant="contained" sx={{ backgroundColor: '#007bff', mt: 1 }}>Request page</Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold">Last month data</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>🔴 30 schedule created.</li>
                <li>🔴 40 shift requested in total.</li>
                <li>🔴 ...</li>
              </ul>
              <Button variant="contained" sx={{ backgroundColor: '#007bff', mt: 1 }}>Data page</Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} mt={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold">Today's Schedule</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>🔴 Nurse in total - 20 Nurses</li>
                <li>🔴 Shift in total - 20 shifts</li>
              </ul>
              <Button variant="contained" sx={{ backgroundColor: '#007bff', mt: 1 }}>View schedule</Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminMain;
