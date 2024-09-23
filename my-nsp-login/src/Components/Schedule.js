import React, { useState } from 'react';
import { DateCalendar, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import '../CssComponents/Schedule.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Shift data for example
  const shifts = {
    '2024-10-19': { shiftName: 'Afternoon Shift', time: '4 PM - 12 PM', color: 'green' },
    '2024-10-20': { shiftName: 'Night Shift', time: '12 PM - 8 AM', color: 'black' },
    '2024-10-21': { shiftName: 'Morning Shift', time: '8 AM - 4 PM', color: '#F9B208' },
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Custom day rendering for the calendar based on shifts
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

  const renderShiftInfo = () => {
    const todayShift = shifts[selectedDate.format('YYYY-MM-DD')];
    const tomorrowShift = shifts[selectedDate.add(1, 'day').format('YYYY-MM-DD')];

    return (
      <Box>
        <Typography variant="h6" sx={{ color: '#0E46A3', fontWeight: 'bold' }}> {/* Today's date in #0E46A3 */}
          Today {selectedDate.format('DD/MM/YY')}
        </Typography>
        {todayShift ? (
          <>
            <div>
              <span className="shift-dot" style={{ backgroundColor: todayShift.color }}></span>
              {todayShift.shiftName}
            </div>
            <div>{todayShift.time}</div>
          </>
        ) : (
          <Typography>No shifts scheduled today.</Typography>
        )}

        <Typography variant="h6" sx={{ color: '#505050', fontWeight: 'bold' }} mt={2}> {/* Tomorrow's date in dark grey */}
          Tomorrow {selectedDate.add(1, 'day').format('DD/MM/YY')}
        </Typography>
        {tomorrowShift ? (
          <>
            <div>
              <span className="shift-dot" style={{ backgroundColor: tomorrowShift.color }}></span>
              {tomorrowShift.shiftName}
            </div>
            <div>{tomorrowShift.time}</div>
          </>
        ) : (
          <Typography>No shifts scheduled tomorrow.</Typography>
        )}
      </Box>
    );
  };

  return (
    <div className="schedule-container">
      <div className="left-panel">
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}> {/* Month in bold black */}
          <span style={{ color: 'black' }}>{selectedDate.format('MMMM')}</span>
          <span style={{ color: 'Red' }}> {selectedDate.format('YYYY')}</span> {/* Year in bold red */}
        </Typography>
        {renderShiftInfo()}
      </div>

      <div className="right-panel">
        <Typography variant="h5" className="calendar-header">Calendar</Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            renderDay={renderPickerDay}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Schedule;