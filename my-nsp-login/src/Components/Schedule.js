import React, { useEffect, useState } from 'react';
import { DateCalendar, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import '../CssComponents/Schedule.css';
import axios from 'axios';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [schedule, setSchedule] = useState({});
  const [exp_date, setExp_date] = useState(null);

  useEffect(() => {
    const Nurse_ID = 1;
    axios.get('http://localhost:8000/launchAll')
      .then(response => {
        console.log(response.data);
        response.data.forEach(item => {
          // console.log("Schedule:", item.schedule); // ตรวจสอบค่า schedule
      
          if (item.schedule && typeof item.schedule === 'object') {
              setExp_date(item.exp_time);
              Object.entries(item.schedule).forEach(([key, value]) => {
                if (parseInt(key) === Nurse_ID) {
                      console.log("Schedule:", value);
                      setSchedule(value);
                  }
              });
          } else {
              console.warn("item.schedule is not an object:", item.schedule);
          }
      });
      
    })
      .catch(error => {
        console.error(error);
      })
  }, []);

  // const array_shilfs = [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // const exp_time = "2024-12-15";

  const shiftsPerDay = 3; // กะต่อวัน
  const shiftNames = ["morning", "afternoon", "night"]; // ชื่อกะ

  // ฟังก์ชันสร้าง schedule
  const generateSchedule = () => {
    const endDate = new Date(exp_date); // วันสุดท้าย
    const days = Math.floor(schedule.length / shiftsPerDay); // จำนวนวันทั้งหมด
    const schedules = [];

    for (let i = 0; i < days; i++) {
      // คำนวณวันที่
      const currentDate = new Date(exp_date);
      currentDate.setDate(endDate.getDate() - (days - 1 - i));

      // ดึง shifts ของวันนั้น
      const shifts = schedule.slice(i * shiftsPerDay, (i + 1) * shiftsPerDay);

      // หา shifts ที่ active (ค่าเป็น 1)
      const activeShifts = shifts
        .map((shift, index) => (shift === 1 ? shiftNames[index] : null))
        .filter((shift) => shift !== null);

      // เพิ่มวันที่และกะเฉพาะถ้ามี active shifts
      if (activeShifts.length > 0) {
        schedules.push({
          date: currentDate.toISOString().split("T")[0], // แปลงเป็น YYYY-MM-DD
          shifts: activeShifts,
        });
      }
    }

    return schedules;
  };
  


  useEffect(() => {
    if (schedule.length > 0) {
      console.log("Generated Schedule:", generateSchedule());
    }
  }, [schedule]);


  // Shift data for example
  // const shifts = {
  //   '2024-10-19': { shiftName: 'Afternoon Shift', time: '4 PM - 12 PM', color: 'green' },
  //   '2024-10-20': { shiftName: 'Night Shift', time: '12 PM - 8 AM', color: 'black' },
  //   '2024-10-21': { shiftName: 'Morning Shift', time: '8 AM - 4 PM', color: '#F9B208' },
  // };

  // const Shiftss = [
  //  { date : '2024-12-09', shifts : ['morning']},
  //  { date : '2024-12-10', shifts : ['afternoon']},
  //  { date : '2024-12-11', shifts : ['night']},
  //  { date : '2024-12-12', shifts : ['morning', 'night']}
  // ]
  
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
