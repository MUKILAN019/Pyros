const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const User = require('./userSchema');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Register User
router.post('/register', upload.single('collegeIDPhoto'), async (req, res) => {
  try {
    const slotCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const qrCodeData = await QRCode.toDataURL(slotCode);

    const newUser = new User({
      ...req.body,
      collegeIDPhoto: req.file.path,
      slotCode,
      qrCode: qrCodeData,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', slotCode });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Admin login and access
router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, 'secretKey');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get user data by slot code
router.get('/user/:slotCode', async (req, res) => {
  try {
    const user = await User.findOne({ slotCode: req.params.slotCode });
    if (user) res.json(user);
    else res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user data' });
  }
});

// Update accommodation details
router.put('/update-accommodation/:slotCode', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { slotCode: req.params.slotCode },
      { $set: { accommodationDetails: req.body } },
      { new: true }
    );
    res.json({ message: 'Accommodation updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating accommodation details' });
  }
});

module.exports = router;