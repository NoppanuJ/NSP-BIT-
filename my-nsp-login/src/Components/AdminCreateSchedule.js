import React, { useState } from 'react';
import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

const AdminCreateSchedule = () => {
  const [dataset, setDataset] = useState('DEAP PYTHON');
  const [duration, setDuration] = useState('Week');
  const [numNurses, setNumNurses] = useState(12);

  const handleDatasetChange = () => {
    // Handle dataset selection
    alert("Dataset Selected: " + dataset);
  };

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  const handleNursesChange = (event) => {
    setNumNurses(event.target.value);
  };

  const handleLaunch = () => {
    alert(`Launching schedule for ${numNurses} nurses for a ${duration}`);
  };

  const handleReset = () => {
    setDataset('DEAP PYTHON');
    setDuration('Week');
    setNumNurses(12);
  };

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', height: '100vh', padding: 4 }}>
      <Box sx={{ backgroundColor: '#e0e0e0', padding: 3, borderRadius: 2, maxWidth: 800, margin: '0 auto' }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>Create Schedule</Typography>
        
        <Box display="flex" justifyContent="space-between" mb={3}>
          {/* Dataset Section */}
          <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center', width: '45%' }}>
            <Typography variant="h6" color="primary">Dataset</Typography>
            <Button variant="contained" onClick={handleDatasetChange} sx={{ marginTop: 2, backgroundColor: '#00CFFF' }}>
              {dataset}
            </Button>
          </Box>

          {/* Select Duration Section */}
          <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center', width: '45%' }}>
            <Typography variant="h6" color="primary">Select Duration</Typography>
            <ToggleButtonGroup
              color="primary"
              value={duration}
              exclusive
              onChange={handleDurationChange}
              sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 }}
            >
              <ToggleButton value="Day" sx={{ padding: 1, margin: '4px' }}>Day</ToggleButton>
              <ToggleButton value="Week" sx={{ padding: 1, margin: '4px', backgroundColor: duration === "Week" ? "#00CFFF" : "" }}>Week</ToggleButton>
              <ToggleButton value="Month" sx={{ padding: 1, margin: '4px' }}>Month</ToggleButton>
              <ToggleButton value="Year" sx={{ padding: 1, margin: '4px' }}>Year</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Number of Nurses Section */}
        <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center', mb: 3 }}>
          <Typography variant="h6" color="primary">Number of Nurses</Typography>
          <TextField
            type="number"
            value={numNurses}
            onChange={handleNursesChange}
            variant="outlined"
            sx={{ marginTop: 2, width: '50%' }}
          />
        </Box>

        {/* Buttons Section */}
        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" onClick={handleLaunch} sx={{ backgroundColor: '#007bff' }}>
            Launch
          </Button>
          <Button variant="contained" onClick={handleReset} sx={{ backgroundColor: '#6c757d' }}>
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminCreateSchedule;
