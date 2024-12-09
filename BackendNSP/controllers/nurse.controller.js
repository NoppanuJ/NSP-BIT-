const Nurse = require('../models/nurse.model');
const ShiftRequest = require('../models/shiftrequest.model');
const TradeShift = require('../models/shifttrade.model');

// Get all nurses
exports.getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editProfile = async (req, res) => {
  const data = {
    User_First_Name: req.body.firstName,
    User_Last_Name: req.body.lastName,
    Sex: req.body.sex,
    Date_of_Birth: req.body.dateOfBirth,
    Phone_Number: req.body.phoneNumber
  }
  try {
    const nurse = await Nurse.findOneAndUpdate({ User_Email: req.body.email }, data, { new: true });
    if (!nurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    res.json(nurse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getNurseByEmail = async (req, res) => {
  try {
    const nurse = await Nurse.findOne({ User_Email: req.params.email });
    if (!nurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    res.json(nurse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRequest = async (req, res) => {  
   try{
     const requests = await ShiftRequest.find();
     res.json(requests);
   }catch(err){
     res.status(500).json({ message: err.message });
   }
}

exports.getTradeShift = async (req, res) => {
    try{
      const tradeshift = await TradeShift.find();
      res.json(tradeshift);
    }catch(err){
      res.status(500).json({ message: err.message });
    }
}

exports.creatRequest = async (req, res) => {
     console.log(req.body);

}


exports.createTradeShift = async (req, res) => {
    console.log(req.body);

}

