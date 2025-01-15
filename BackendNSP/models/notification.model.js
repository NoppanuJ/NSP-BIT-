const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    type : { type: String, required: true },
    to : { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
})

module.exports = mongoose.model('Notification', NotificationSchema, "Notification");