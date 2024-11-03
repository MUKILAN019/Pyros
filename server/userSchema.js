const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  registerNumber: String,
  collegeName: String,
  collegeIDPhoto: String,
  email: String,
  mobileNumber: String,
  accommodationRequired: Boolean,
  slotCode: String,
  qrCode: String,
  accommodationDetails: {
    roomNumber: String,
    time: String,
    overtime: Boolean,
  },
});

module.exports = mongoose.model('User', userSchema);