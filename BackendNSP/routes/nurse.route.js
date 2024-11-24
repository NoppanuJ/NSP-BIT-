const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurse.controller');

// Define routes
router.get('/', nurseController.getAllNurses);
// router.post('/', nurseController.createNurse);

module.exports = router;
