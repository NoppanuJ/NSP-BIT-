import React, { useState } from 'react';
import { TextField, MenuItem, Button, RadioGroup, Radio, FormControlLabel, Autocomplete } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en'; // Import the locale if needed
import '../CssComponents/ShiftRequest.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ShiftRequest = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [requestType, setRequestType] = useState('scheduleChange');
  const [reason, setReason] = useState('');

  const navigate = useNavigate();

  const nurses = [
    { label: 'John Doe' },
    { label: 'Jane Smith' },
    { label: 'Michael Lee' },
    { label: 'Emily Davis' },
    { label: 'Robert Brown' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftRequestData = {
      requestType,
      date: selectedDate,
      reason,
    };
    console.log('Shift request submitted:', shiftRequestData);
    // You can now send this data to your backend via an API request.
  };

  const submit = () => {
    Swal.fire({
      title: 'SUCCESS',
      text: 'Request Submitted Successfully',
      icon: 'success',
    });
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
          <div>
            <label style={{ display: 'flex', justifyContent: 'start' }}>
              Select nurse
            </label>
            <Autocomplete
              disablePortal
              options={nurses}
              sx={{ width: 300, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Nurse" size="small" />
              )}
            />
          </div>
        )}

        <div className="form-group">
          <label>Date</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Select Date"
                  size="small"
                />
              )}
            />
          </LocalizationProvider>
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

        <Button
          type="submit"
          variant="contained"
          color="success"
          className="submit-button"
          onClick={submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ShiftRequest;
