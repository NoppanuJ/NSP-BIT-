import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import '../CssComponents/AdminResult.css';

const AdminResult = () => {
  // Example data
  const scheduleData = {
    nurses: {
      A: "[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]",
      B: "[0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]"
      // Add other nurses here
    },
    weeklyShifts: "[4, 5, 4, 5, 5, 5, 5, 5, 4, 5]",
    shiftsPerWeekViolations: 0,
    nursesPerShift: "[3, 3, 2, 3, 3, 3, 3, 2, 3]",
    nursesPerShiftViolations: 0,
    shiftPreferenceViolations: 9,
  };

  const calendarData = [
    // Example data for calendar (You can populate this with actual data)
    { date: '1', nurses: ['Nurse A', 'Nurse B', 'Nurse C'] },
    { date: '2', nurses: ['Nurse B', 'Nurse D'] },
    // Add the rest of the days here
  ];

  return (
    <Box display="flex" p={3} style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
      {/* Left Panel */}
      <Box flex={1} pr={2} style={{ backgroundColor: '#e0e0e0', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h5" style={{ color: 'blue', fontWeight: 'bold' }}>
          Result
        </Typography>
        
        <Box mt={2}>
          <Typography variant="body1">-- Schedule = Schedule for each nurse:</Typography>
          {Object.keys(scheduleData.nurses).map((nurse, index) => (
            <Typography key={index} variant="body2" style={{ whiteSpace: 'pre-line' }}>
              {nurse}: {scheduleData.nurses[nurse]}
            </Typography>
          ))}
        </Box>

        <Box mt={2}>
          <Typography variant="body1">
            Weekly Shifts = {scheduleData.weeklyShifts}
          </Typography>
          <Typography variant="body1">
            Shifts Per Week Violations = {scheduleData.shiftsPerWeekViolations}
          </Typography>
          <Typography variant="body1">
            Nurses Per Shift = {scheduleData.nursesPerShift}
          </Typography>
          <Typography variant="body1">
            Nurses Per Shift Violations = {scheduleData.nursesPerShiftViolations}
          </Typography>
          <Typography variant="body1">
            Shift Preference Violations = {scheduleData.shiftPreferenceViolations}
          </Typography>
        </Box>

        {/* Placeholder for a Chart */}
        <Box mt={2}>
          <img
            src="https://via.placeholder.com/300x150.png?text=Chart+Placeholder"
            alt="Chart Placeholder"
            style={{ width: '100%', borderRadius: '5px' }}
          />
        </Box>
      </Box>

      {/* Right Panel */}
      <Box flex={3} pl={2}>
        <Typography variant="h4" align="center" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          October
        </Typography>
        
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
          {/* Headers */}
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => (
            <Typography key={index} variant="body1" align="center" style={{ fontWeight: 'bold' }}>
              {day}
            </Typography>
          ))}
          
          {/* Calendar Days - Ensure the right alignment of dates */}
          {Array.from({ length: 31 }, (_, index) => (
            <Paper key={index} variant="outlined" style={{ padding: '5px', minHeight: '60px', backgroundColor: '#fafafa' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                {index + 1}
              </Typography>
              {/* List nurses working on this day */}
              {calendarData.find(day => day.date === String(index + 1))?.nurses.map((nurse, i) => (
                <Typography key={i} variant="body2" style={{ fontSize: '12px', marginLeft: '10px' }}>
                  • {nurse}
                </Typography>
              ))}
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminResult;
