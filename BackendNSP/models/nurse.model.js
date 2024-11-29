const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  Nurse_ID: { type: Number, required: true },
  Admin_ID: { type: Number, required: false },
  User_First_Name: { type: String, required: true },
  User_Last_Name : { type: String, required: true },
  Sex: { type: String, required: true },
  Date_of_Birth: { type: Date, required: true },
  Phone_Number: { type: String, required: true },
  User_Email: { type: String, required: true },
  Profile_Picture : { type: String, required: false },
  Role : { type: String, required: true },
});

module.exports = mongoose.model('Nurse', nurseSchema, "nurses");