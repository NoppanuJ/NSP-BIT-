const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurse.controller');

// Define routes
router.get('/nurses', nurseController.getAllNurses);
router.post('/createRequest', nurseController.creatRequest);
router.post('/createTradeShift', nurseController.createTradeShift);
router.get('/getrequest', nurseController.getRequest);
router.get('/getTradeShift', nurseController.getTradeShift);
router.get('/getNurseByEmail/:email', nurseController.getNurseByEmail);
router.post('/editProfile', nurseController.editProfile);
router.post('/editStatus', nurseController.editStatus);
router.delete('/deleteNurse/:id', nurseController.deleteNurse)

module.exports = router;

