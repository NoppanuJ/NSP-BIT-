import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TextField, Button } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import '../CssComponents/ShiftRequest.css';

const ShiftRequest = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftRequestData = {
      date: selectedDate,
      time: selectedTime,
      reason: reason,
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
            className="timepicker-input"
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
