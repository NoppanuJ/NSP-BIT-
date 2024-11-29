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

