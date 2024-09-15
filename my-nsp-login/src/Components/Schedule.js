import React, { useState } from 'react';
import { DateCalendar, PickersDay, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { format } from 'date-fns';
import '../CssComponents/Schedule.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month');
  
  const shifts = {
    '2024-10-19': { shiftName: 'Afternoon Shift', time: '4 PM - 12 PM', color: 'green' },
    '2024-10-20': { shiftName: 'Night Shift', time: '12 PM - 8 AM', color: 'black' },
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    const dateKey = format(date, 'yyyy-MM-dd');
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

  return (
    <div className="schedule-container">
      <div className="left-panel">
        <h2>October 2024</h2>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            renderDay={renderPickerDay}
          />
        </LocalizationProvider>

        <div className="shift-info">
          <h3>Today {format(selectedDate, 'dd/MM/yy')}</h3>
          {shifts[format(selectedDate, 'yyyy-MM-dd')] ? (
            <>
              <div>
                <span className="shift-dot" style={{ backgroundColor: shifts[format(selectedDate, 'yyyy-MM-dd')].color }}></span>
                {shifts[format(selectedDate, 'yyyy-MM-dd')].shiftName}
              </div>
              <div>{shifts[format(selectedDate, 'yyyy-MM-dd')].time}</div>
            </>
          ) : (
            <p>No shifts scheduled</p>
          )}
        </div>
      </div>

      <div className="right-panel">
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view selector"
        >
          <ToggleButton value="day">Day</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="year">Year</ToggleButton>
        </ToggleButtonGroup>

        <div className="calendar-view">
          <h3>{view === 'day' ? 'Day View' : view === 'week' ? 'Week View' : view === 'month' ? 'Month View' : 'Year View'}</h3>
          <p>(Calendar view changes based on the selected view)</p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
