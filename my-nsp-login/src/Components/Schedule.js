import React, { useState } from 'react';
import { DateCalendar, PickersDay, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToggleButton, ToggleButtonGroup, Box, Typography, Grid } from '@mui/material';
import dayjs from 'dayjs';
import '../CssComponents/Schedule.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [view, setView] = useState('month'); // Default view is 'month'

  const shifts = {
    '2024-10-19': { shiftName: 'Afternoon Shift', time: '4 PM - 12 PM', color: 'green' },
    '2024-10-20': { shiftName: 'Night Shift', time: '12 PM - 8 AM', color: 'black' },
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    const dateKey = dayjs(date).format('YYYY-MM-DD');
    const shift = shifts[dateKey];

    if (shift) {
      return (
        <PickersDay
          {...pickersDayProps}
          sx={{
            bgcolor: shift.color,
            color: '#fff',
            '&:hover': {
              bgcolor: shift.color,
            },
          }}
        />
      );
    }
    return <PickersDay {...pickersDayProps} />;
  };

  // Rendering detailed views for each selected option (day, week, month, year)
  const renderViewContent = () => {
    switch (view) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      case 'year':
        return renderYearView();
      default:
        return null;
    }
  };

  // Detailed Day View
  const renderDayView = () => (
    <Box>
      <Typography variant="h5">Detailed Day View</Typography>
      <Typography variant="body1">Selected Day: {selectedDate.format('DD/MM/YYYY')}</Typography>
      {shifts[selectedDate.format('YYYY-MM-DD')] ? (
        <Box mt={2}>
          <Typography variant="h6">
            Shift: {shifts[selectedDate.format('YYYY-MM-DD')].shiftName}
          </Typography>
          <Typography variant="body1">
            Time: {shifts[selectedDate.format('YYYY-MM-DD')].time}
          </Typography>
        </Box>
      ) : (
        <Typography>No shifts scheduled for this day.</Typography>
      )}
    </Box>
  );

  // Detailed Week View
  const renderWeekView = () => {
    const startOfWeek = selectedDate.startOf('week');
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

    return (
      <Grid container spacing={2}>
        {daysOfWeek.map((day) => (
          <Grid item key={day.format('YYYY-MM-DD')} xs={12} md={6} lg={4}>
            <Typography variant="h6">{day.format('DD/MM/YYYY')}</Typography>
            {shifts[day.format('YYYY-MM-DD')] ? (
              <>
                <Typography>{shifts[day.format('YYYY-MM-DD')].shiftName}</Typography>
                <Typography>{shifts[day.format('YYYY-MM-DD')].time}</Typography>
              </>
            ) : (
              <Typography>No shifts</Typography>
            )}
          </Grid>
        ))}
      </Grid>
    );
  };

  // Detailed Month View (This is the default calendar)
  const renderMonthView = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar 
        value={selectedDate} 
        onChange={handleDateChange} 
        renderDay={renderPickerDay} 
      />
    </LocalizationProvider>
  );

  // Year View (Just a basic example of a year layout)
  const renderYearView = () => (
    <Grid container spacing={2}>
      {Array.from({ length: 12 }, (_, i) => selectedDate.startOf('year').add(i, 'month')).map((month) => (
        <Grid item xs={12} md={3} key={month.format('MM/YYYY')}>
          <Typography variant="h6">{month.format('MMMM YYYY')}</Typography>
          <Box height={320} bgcolor="#f5f5f5" p={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={selectedDate} onChange={handleDateChange} renderDay={renderPickerDay} />
    </LocalizationProvider>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className="schedule-container">
      <div className="left-panel">
        <Typography variant="h4">{selectedDate.format('MMMM YYYY')}</Typography>

        {/* Toggle Buttons for Views */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view selector"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="day">Day</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="year">Year</ToggleButton>
        </ToggleButtonGroup>

        {/* Calendar View */}
        <Box>{renderViewContent()}</Box>
      </div>
    </div>
  );
};

export default Schedule;