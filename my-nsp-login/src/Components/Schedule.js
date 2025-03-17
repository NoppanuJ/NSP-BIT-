import React, { useEffect, useState } from 'react';
import { DateCalendar, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import '../CssComponents/Schedule.css';
import axios from 'axios';

const Schedule = ({nurseData}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [schedule, setSchedule] = useState({});
  const [listShilfs, setListShilfs] = useState({
    exp_time : [],
    array_shilfs : []
  });

  useEffect(() => {

    // console.log(localStorage.getItem('loggedInUser'));
    console.log(nurseData);
    axios.get('http://localhost:8000/launchAll')
      .then(response => {
        console.log(response.data);
        const expDates = [];
        const schedules = [];
        response.data.forEach(item => {
          // console.log("Schedule:", item.schedule); // ตรวจสอบค่า schedule
          if (item.schedule && typeof item.schedule === 'object') {
            // setExp_date(item.exp_time);
            Object.entries(item.schedule).forEach(([key, value]) => {
              if (parseInt(key) === nurseData.Nurse_ID) {
                console.log("Schedule:", value);
                expDates.push(item.exp_time);
                      setSchedule(value);
                      schedules.push(value);
                    }
                  });
          } else {
              console.warn("item.schedule is not an object:", item.schedule);
          }
      });
      setListShilfs({
        exp_time: expDates,
        array_shilfs: schedules
      });
      
    })
      .catch(error => {
        console.error(error);
      })
  }, []);
  
  const generateSchedule = () => {
    const schedules = []; // Store the final schedule
    const shiftNames = ["morning", "afternoon", "night"]; // Shift names
    const shiftsPerDay = 3; // Number of shifts per day
    // Process each array_shilf
    listShilfs.array_shilfs.forEach((schedule, index) => {
      const expDate = new Date(listShilfs.exp_time[index]); // Expiration date for this shift set
      
      // Traverse the schedule backwards to calculate dates
      let currentDate = new Date(expDate);
  
      for (let i = schedule.length - 1; i >= 0; i -= shiftsPerDay) {
        // Get the shifts for this day
        const dailyShifts = schedule.slice(Math.max(i - shiftsPerDay + 1, 0), i + 1);
  
        // Find active shifts for the day
        const activeShifts = dailyShifts
          .map((shift, shiftIndex) => (shift === 1 ? shiftNames[shiftIndex] : null)) // Use shiftIndex without `% shiftsPerDay`
          .filter((shift) => shift !== null);
  
        // Add to the schedule if there are active shifts
        if (activeShifts.length > 0) {
          schedules.unshift({
            date: currentDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
            shifts: activeShifts,
          });
        }
  
        // Go back one day
        currentDate.setDate(currentDate.getDate() - 1);
      }
    });
  
    return schedules;
  };
  
  

  useEffect(() => {
    if (schedule.length > 0) {
      console.log("Generated Schedule:", generateSchedule());
      console.log("listShilfs :" + JSON.stringify(listShilfs, null, 2))
    }
  }, [schedule]);

  const shifts = generateSchedule().reduce((acc, item) => {
    acc[item.date] = { shifts: item.shifts };
    return acc;
  }, {});

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Custom day rendering for the calendar based on shifts
  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    const dateKey = dayjs(date).format('YYYY-MM-DD');
    const shiftData = shifts[dateKey];
  
    if (shiftData) {
      return (
        <PickersDay
          {...pickersDayProps}
          sx={{
            bgcolor: '#d3d3d3', // สีพื้นหลังตาม shift
            color: '#000', // สีข้อความ
            '&:hover': {
              bgcolor: '#a9a9a9' // สีเมื่อ hover
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
        <Typography variant="h4" sx={{ color: '#0E46A3', fontWeight: 'bold' }}>
          Today {selectedDate.format('DD/MM/YY')}
        </Typography>
        {todayShift ? (
          <Typography variant="h6">Shifts: {todayShift.shifts.join(', ')}</Typography>
        ) : (
          <Typography variant="h5">No shifts scheduled today.</Typography>
        )}
  
        <Typography variant="h4" sx={{ color: '#505050', fontWeight: 'bold' }} mt={2}>
          Tomorrow {selectedDate.add(1, 'day').format('DD/MM/YY')}
        </Typography>
        {tomorrowShift ? (
          <Typography variant="h6">Shifts: {tomorrowShift.shifts.join(', ')}</Typography>
        ) : (
          <Typography variant="h5">No shifts scheduled tomorrow.</Typography>
        )}
      </Box>
    );
  };

  return (
    <div className="schedule-container">
      <div className="left-panel">
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: 'black' }}>{selectedDate.format('MMMM')}</span>
          <span style={{ color: 'Red' }}> {selectedDate.format('YYYY')}</span>
        </Typography>
        {renderShiftInfo()}
      </div>
  
      <div className="right-panel">
        <Typography variant="h3" className="calendar-header">Calendar</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            renderDay={renderPickerDay}
            sx={{
              transform: 'scale(2.0)',  // ค่าเริ่มต้นสำหรับหน้าจอใหญ่
              transformOrigin: 'top',  // ตั้งจุดขยายที่ด้านบน
              '@media (max-width: 1500px)': {  // เมื่อหน้าจอเล็กกว่า 1200px
              transform: 'scale(2)',  // ลดขนาดการขยายลง
              },
              '@media (max-width: 1200px)': {  // เมื่อหน้าจอเล็กกว่า 900px
               transform: 'scale(1)',  // ลดขนาดการขยายลงอีก
            }}
          }
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Schedule;
