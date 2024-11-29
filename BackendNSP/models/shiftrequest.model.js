const mongoose = require('mongoose');

const shiftrequestSchema = new mongoose.Schema({
    Request_ID: { type: Number, required: true },
    Nurse_ID: { type: Number, required: true },
    Request_Data: { type: Date, required: true },
    Request_Reason : { type: String, required: true },
    Request_Status : { type: String, required: true },
    Shift_Data : { type: Date, required: true },
    Shift_ID: { type: Number, required: true }, 
});

module.exports = mongoose.model('shiftrequest', shiftrequestSchema, "ShiftRequest");
