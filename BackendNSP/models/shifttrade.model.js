const mongoose = require('mongoose');

const shiftTradeSchema = new mongoose.Schema({
    Trade_ID : {type : Number, required: true },
    Nurse_ID : {type : Number, required : true},
    Shift_ID : {type : Number, required : true},
    Shift_Date: { type: Date, required: true },
    Requested_Nurse_ID : {type : Number, required : true},
    Request_Reason : {type : String, required : true},
    Trade_Status : {type : Boolean, required : true},
});

module.exports = mongoose.model('shifttrade', shiftTradeSchema, "ShiftTrade");
