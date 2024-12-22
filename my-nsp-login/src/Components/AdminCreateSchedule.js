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


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const shifts = ["Morning", "Afternoon", "Night"];


const AdminCreateSchedule = () => {
  const [dataset, setDataset] = useState('DEAP PYTHON');
  const [duration, setDuration] = useState('Week');
  // const [numNurses, setNumNurses] = useState(12);
  const [nurses, setNurses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [dateExp, setDateExp] = useState('');

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

  // const handleNursesChange = (event) => {
  //   setNumNurses(event.target.value);
  // };

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
        setDateExp(response.data[0].exp_time);
        setSchedule(response.data);
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

  const transformScheduleData = (schedule) => {
    const result = {};
    Object.entries(schedule).forEach(([nurseId, scheduleArray]) => {
      result[nurseId] = days.map((_, dayIndex) => {
        const dayShifts = scheduleArray.slice(dayIndex * 3, (dayIndex + 1) * 3);
        return shifts
          .map((shift, shiftIndex) => ({
            shift: shift === "Morning" ? "Morning : 9 - 12 AM" : shift === "Afternoon" ? "Afternoon : 12 - 3 PM" : shift === "Night" ? "Night : 3 - 6 PM" : "-",
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
      <Box display={"flex"} marginTop={4} justifyContent={"end"} maxWidth={1700}>
        <FormControl fullWidth sx={{ maxWidth: 200 }}>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: '0.8rem' }}>Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Month"
            size="small"
            sx={{
              fontSize: '0.8rem',
              height: '50px', // กำหนดความสูง
            }}
          >
            <MenuItem value={1} sx={{ fontSize: '0.8rem' }}>January</MenuItem>
            <MenuItem value={2} sx={{ fontSize: '0.8rem' }}>February</MenuItem>
            <MenuItem value={3} sx={{ fontSize: '0.8rem' }}>March</MenuItem>
            <MenuItem value={4} sx={{ fontSize: '0.8rem' }}>April</MenuItem>
            <MenuItem value={5} sx={{ fontSize: '0.8rem' }}>May</MenuItem>
            <MenuItem value={6} sx={{ fontSize: '0.8rem' }}>June</MenuItem>
            <MenuItem value={7} sx={{ fontSize: '0.8rem' }}>July</MenuItem>
            <MenuItem value={8} sx={{ fontSize: '0.8rem' }}>August</MenuItem>
            <MenuItem value={9} sx={{ fontSize: '0.8rem' }}>September</MenuItem>
            <MenuItem value={10} sx={{ fontSize: '0.8rem' }}>October</MenuItem>
            <MenuItem value={11} sx={{ fontSize: '0.8rem' }}>November</MenuItem>
            <MenuItem value={12} sx={{ fontSize: '0.8rem' }}>December</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ backgroundColor: "#e0e0e0", padding: 3, borderRadius: 2, maxWidth: 1500, margin: "0 auto", marginTop: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Nurse Schedule</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="nurse schedule table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Nurse ID</strong></TableCell>
                <TableCell align="center"><strong>Name</strong></TableCell>
                {days.map((day, index) => {
                  const daysToSubtract = 6 - index;
                  const formattedDate = dayjs(dateExp)
                    .subtract(daysToSubtract, 'day')
                    .format('YYYY-MM-DD');
                  return (
                    <TableCell align="center" key={day}>
                      <strong>{day}</strong> <br></br>
                      <strong>{formattedDate}</strong>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleData.map((item, index) => (
                Object.entries(item.schedule).map(([nurseId, nurseSchedule]) => (
                  <TableRow key={`${index}-${nurseId}`}>
                    <TableCell align="center">{nurseId + " "}</TableCell>
                    {schedule.map((item, index) => (
                      Object.entries(item.schedule).map(([key, values]) =>
                        nurseId === key ? (
                          <TableCell align="center" key={key}>
                            {
                              nurses.map((nurse) => {
                                if (nurse.Nurse_ID === parseInt(key)) {
                                  return nurse.User_First_Name + " " + nurse.User_Last_Name;
                                }
                                return null; // Return null for non-matching nurses
                              }).filter(Boolean)[0] // Filter out null values and take the first match
                            }

                          </TableCell>
                        ) : null  // Render nothing (null) if nurseId doesn't match the key
                      )
                    ))}
                    {nurseSchedule.map((daySchedule, dayIndex) => (
                      <TableCell key={dayIndex} align="center">
                        {daySchedule.map(({ shift, status }) => (
                          <div key={shift}>
                            {shift}
                          </div>
                        ))}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  );
};

export default AdminCreateSchedule;
