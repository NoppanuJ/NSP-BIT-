import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TextField, MenuItem, Button, RadioGroup, Radio, FormControlLabel, Autocomplete } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import '../CssComponents/ShiftRequest.css';

const ShiftRequest = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [requestType, setRequestType] = useState('scheduleChange');
  const [selectedNurse, setSelectedNurse] = useState('');
  const [nurseSearch, setNurseSearch] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [reason, setReason] = useState('');

  const nurses = [
    {label : 'John Doe'}, 
    {label : 'Jane Smith'}, 
    {label : 'Michael Lee'}, 
    {label :'Emily Davis'}, 
    {label : 'Robert Brown'}
  ];

  // const filteredNurses = nurses.filter((nurse) =>
  //   nurse.toLowerCase().includes(nurseSearch.toLowerCase())
  // );

  const shifts = ['Morning Shift', 'Afternoon Shift', 'Night Shift'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftRequestData = {
      requestType,
      nurse: selectedNurse,
      shift: selectedShift,
      date: selectedDate,
      time: selectedTime,
      reason,
    };
    console.log('Shift request submitted:', shiftRequestData);
    // You can now send this data to your backend via an API request.
  };

  return (
    <div className="shift-request-container">
      <h1>Shift Request</h1>
      <p>Fill out your request form</p>

      <form onSubmit={handleSubmit} className="shift-request-form">
        <div className="form-group">
          <label>Request type</label>
          <RadioGroup
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            row
          >
            <FormControlLabel
              value="scheduleChange"
              control={<Radio />}
              label="Request changing schedule"
            />
            <FormControlLabel
              value="shiftTrading"
              control={<Radio />}
              label="Request trading shift"
            />
          </RadioGroup>
        </div>

        {requestType === 'shiftTrading' && (
          <>
            <div >
              <label style = {{display : 'flex', justifyContent : 'start'}}>Select nurse</label>
              <Autocomplete
                disablePortal
                options={nurses}
                sx={{ width: 300, mb: 2 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
                size = 'small'
              />

              {/* <TextField
                type="text"
                placeholder="Search nurse"
                value={nurseSearch}
                onChange={(e) => setNurseSearch(e.target.value)}
                fullWidth
              />
              <TextField
                select
                fullWidth
                value={selectedNurse}
                onChange={(e) => setSelectedNurse(e.target.value)}
                variant="outlined"
                placeholder="Select nurse"
              >
                {filteredNurses.map((nurse, index) => (
                  <MenuItem key={index} value={nurse}>
                    {nurse}
                  </MenuItem>
                ))}
              </TextField> */}
            </div>

            {/* <div className="form-group">
              <label>Select shift</label>
              <TextField
                select
                fullWidth
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                variant="outlined"
                placeholder="Select shift"
              >
                {shifts.map((shift, index) => (
                  <MenuItem key={index} value={shift}>
                    {shift}
                  </MenuItem>
                ))}
              </TextField>
            </div> */}
          </>
        )}

        <div className="form-group">
          <label>Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select Date"
            className="datepicker-input"
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <TextField
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Select Time"
          />
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason for your request"
            className="reason-textarea"
          />
        </div>

        <Button type="submit" variant="contained" color="success" className="submit-button">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ShiftRequest;
