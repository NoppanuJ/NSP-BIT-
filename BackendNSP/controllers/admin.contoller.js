const Announcement = require('../models/announcement.model');
const Notification = require('../models/notification.model');

exports.createAnnouncement = async (req, res) => {
    const data = {
        title: req.body.title,
        type: req.body.type,
        message: req.body.message,
        date: new Date()
    }
    try {
        const announcement = new Announcement(data);
        await announcement.save();
        res.status(201).json({ message: 'Announcement created successfully', announcement : announcement });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAnnouncement = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//delete announcement
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.json({ message: 'Announcement deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createNotification = async (req, res) => {
    const data = {
        to: req.body.to,
        title: req.body.title,
        message: req.body.message,
        type: req.body.type,
        date: new Date()
    }
    try {
        const notification = new Notification(data);
        await notification.save();
        res.status(201).json({ message: 'Notification created successfully', notification : notification });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNotification = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json({ message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};