const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.contoller');

router.post('/createAnnouncement', adminController.createAnnouncement);
router.get('/getAnnouncement', adminController.getAnnouncement);
router.delete('/deleteAnnouncement/:id', adminController.deleteAnnouncement);
router.post('/createNotification', adminController.createNotification);
router.get('/getNotification', adminController.getNotification);
router.delete('/deleteNotification/:id', adminController.deleteNotification);

module.exports = router;
