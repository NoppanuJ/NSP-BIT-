const Nurse = require('../models/nurse.model');

// Get all nurses
exports.getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Create a new nurse
// exports.createNurse = async (req, res) => {
//   try {
//     const newNurse = new Nurse(req.body);
//     await newNurse.save();
//     res.status(201).json(newNurse);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
;

