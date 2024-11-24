const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model('Nurse', nurseSchema);
