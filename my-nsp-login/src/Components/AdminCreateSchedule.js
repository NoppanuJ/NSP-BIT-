import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup, Autocomplete, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Tab } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { date } from 'yup';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const shifts = ["Morning", "Afternoon", "Night"];
const currentYear = dayjs();


const AdminCreateSchedule = () => {
  const [dataset, setDataset] = useState('DEAP PYTHON');
  const [duration, setDuration] = useState('Week');
  // const [numNurses, setNumNurses] = useState(12);
  const [nurses, setNurses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  // const [dateExp, setDateExp] = useState('');
  const [originalSchedule, setOriginalSchedule] = useState([]);
  const [selectedYearAndMonth, setSelectedYeaAndMonth] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:5001/nurses')
      .then(response => {
        // if(response.data.Role === "user"){
        // console.log(response.data);
        setNurses(response.data);
        // }
      })
      .catch(error => {
        console.error(error);
      })
  }, []);
  const [selectedNurses, setSelectedNurses] = useState([]);

  const filterOptions = (options, { inputValue }) => {
    return options.filter(
      (option) =>
        option.Role !== "admin" && // กรอง role ที่ไม่ใช่ admin
        !selectedNurses.some((selected) => selected._id === option._id) // หลีกเลี่ยงการเลือกซ้ำ
    );
  };

  const handleNursesChange = (event, newValue) => {
    // console.log(newValue);
    setSelectedNurses(newValue); // อัปเดตค่าเมื่อผู้ใช้เปลี่ยนแปลง
  };

  const handleDatasetChange = () => {
    // Handle dataset selection
    alert("Dataset Selected: " + dataset);
  };

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  const handleLaunch = () => {
    // console.log(selectedNurses)
    const listNurses = selectedNurses.map((nurse) => nurse.Nurse_ID.toString());

    console.log(listNurses)
    axios.post('http://localhost:8000/launch', {
      nurses: listNurses,
    })
      .then(response => {
        console.log(response.data);
        //popup sweetalert
        setSelectedNurses([]);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Schedule created successfully',
        })
        window.location.reload();

      })
      .catch(error => {
        console.error(error);
        setSelectedNurses([]);

        //popup sweetalert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create schedule',
        })
      })
  };
  useEffect(() => {
    axios.get('http://localhost:8000/launchAll')
      .then(response => {
        // console.log(response.data[0].exp_time);
        console.log(response.data);
        // setDateExp(response.data[0].exp_time);
        setSchedule(response.data);
        setOriginalSchedule(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);


  const handleReset = () => {
    setDataset('DEAP PYTHON');
    setDuration('Week');
    setSelectedNurses([]);
    // console.log(scheduleData);
  };

  useEffect(() => {
    const filteredSchedule = originalSchedule.filter((item) => {
      const itemYearMonth = dayjs(item.exp_time).format('YYYY-MM'); // แปลงค่า exp_time เป็นรูปแบบ YYYY-MM
      const selectedYearMonth = dayjs(selectedYearAndMonth).format('YYYY-MM'); // แปลงค่า selectedYearAndMonth เป็นรูปแบบ YYYY-MM
      return itemYearMonth.includes(selectedYearMonth); // ตรวจสอบว่าปีและเดือนตรงกัน
    });
    
    console.log(dayjs(selectedYearAndMonth).format('YYYY-MM')); // แสดงค่าที่เลือก
    console.log(filteredSchedule); // แสดงข้อมูลที่กรองแล้ว
    setSchedule(filteredSchedule); // อัปเดต schedule ด้วยข้อมูลที่กรอง

  }, [selectedYearAndMonth]);

  const transformScheduleData = (schedule) => {
    const result = {};
    Object.entries(schedule).forEach(([nurseId, scheduleArray]) => {
      result[nurseId] = days.map((_, dayIndex) => {
        const dayShifts = scheduleArray.slice(dayIndex * 3, (dayIndex + 1) * 3);
        return shifts
          .map((shift, shiftIndex) => ({
            shift: shift === "Morning" ? "  Morning : 9 - 12 AM" : shift === "Afternoon" ? "Afternoon : 12 - 3 PM" : shift === "Night" ? "Night : 3 - 6 PM" : "-",
            status: dayShifts[shiftIndex] === 1 ? "Work" : "Off",
          }))
          .filter((shiftObj) => shiftObj.status === "Work"); // กรองเฉพาะ shift ที่ status เป็น "Work"
      });
    });
    return result;
  };
  const scheduleData = schedule.map((item) => ({
    exp_time: item.exp_time,
    schedule: transformScheduleData(item.schedule),
  }));




  // console.log(scheduleData[0].exp_time);


  // schedule.forEach((item) => {
  //   console.log(`Exp Time: ${item.exp_time}`);
  //   for (const [key, values] of Object.entries(item.schedule)) {
  //     console.log(`Schedule Key: ${key}`);
  //     values.forEach((value, index) => {
  //       console.log(`Index: ${index}, Value: ${value}`);
  //     });
  //   }
  // });
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', padding: 4 }}>
      <Box sx={{ backgroundColor: '#e0e0e0', padding: 3, borderRadius: 2, maxWidth: 800, margin: '0 auto' }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>Create Schedule</Typography>

        <Box display="flex" justifyContent="space-between" mb={3}>
          {/* Dataset Section */}
          {/* <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center', width: '45%' }}>
            <Typography variant="h6" color="primary">Dataset</Typography>
            <Button variant="contained" onClick={handleDatasetChange} sx={{ marginTop: 2, backgroundColor: '#00CFFF' }}>
              {dataset}
            </Button>
          </Box> */}

          {/* Select Duration Section */}
          {/* <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center', width: '45%' }}>
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
          </Box> */}
        </Box>

        {/* Number of Nurses Section */}
        <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center', mb: 3 }}>
          <Typography variant="h6" color="primary">Select Nurses</Typography>
          <Autocomplete
            multiple
            options={nurses}
            getOptionLabel={(option) => option.User_First_Name}
            value={selectedNurses}
            onChange={handleNursesChange}
            filterOptions={filterOptions} // กรองตัวเลือกที่เลือกแล้วออก
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{ marginTop: 2, width: '50%' }}
                placeholder="Select Nurses"
              />
            )}
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
      <Box display={"flex"} marginTop={4} justifyContent={"end"} maxWidth={1700} gap={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Years and Months"
            maxDate={currentYear}
            openTo="year"
            views={['year', 'month']}
            yearsOrder="desc"
            onChange={(newValue) => setSelectedYeaAndMonth(newValue)}
            sx={{ minWidth: 250 }}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{ backgroundColor: "#e0e0e0", padding: 3, borderRadius: 2, maxWidth: 1500, margin: "0 auto", marginTop: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Nurse Schedule</Typography>

        <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
  <Typography variant="h6" sx={{ margin: 2 }}>Schedule</Typography>
  <Table sx={{ minWidth: 650 }} aria-label="nurse schedule table">
    {scheduleData.map((group, groupIndex) => (
      <React.Fragment key={`group-${groupIndex}`}>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Nurse ID</strong></TableCell>
            <TableCell align="center"><strong>Name</strong></TableCell>
            {group.schedule &&
              Object.values(group.schedule)[0].map((_, dayIndex) => {
                const daysToSubtract = 6 - dayIndex;
                const formattedDate = dayjs(group.exp_time)
                  .subtract(daysToSubtract, 'day')
                  .format('YYYY-MM-DD');
                return (
                  <TableCell align="center" key={`group-${groupIndex}-day-${dayIndex}`}>
                    <strong>{days[dayIndex]}</strong> <br />
                    <strong>{formattedDate}</strong>
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {Object.entries(group.schedule).map(([nurseId, nurseSchedule]) => (
            <TableRow key={`group-${groupIndex}-nurse-${nurseId}`}>
              <TableCell align="center">{nurseId}</TableCell>
              <TableCell align="center">
                {nurses.find(nurse => nurse.Nurse_ID === parseInt(nurseId))?.User_First_Name || "Unknown"}
              </TableCell>
              {nurseSchedule.map((daySchedule, dayIndex) => (
                <TableCell key={`group-${groupIndex}-nurse-${nurseId}-day-${dayIndex}`} align="center">
                  {daySchedule.length > 0 ? (
                    daySchedule.map(({ shift }) => (
                      <Box
                        key={shift}
                        sx={{
                          backgroundColor:
                            shift.includes('Morning') ? '#DFF6FF' :
                            shift.includes('Afternoon') ? '#FFF4CF' :
                            shift.includes('Night') ? '#FFE0E9' :
                            'transparent',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          marginBottom: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        {shift}
                      </Box>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        color: '#B71C1C',
                      }}
                    >
                      No Shift
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {/* Spacer Row Between Weekly Groups */}
          <TableRow>
            <TableCell colSpan={9} sx={{ backgroundColor: '#f5f5f5', height: '40px' }} />
          </TableRow>
        </TableBody>
      </React.Fragment>
    ))}
  </Table>
</TableContainer>





      </Box>

    </Box>
  );
};

export default AdminCreateSchedule;
