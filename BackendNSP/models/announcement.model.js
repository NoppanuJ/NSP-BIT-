const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Announcement', announcementSchema, "Announcement");