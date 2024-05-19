const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const register = async (req, res) => {
  const { firstName, lastName, email, phone, password, isSeller } = req.body;
  try {
    const user = new User({ firstName, lastName, email, phone, password, isSeller });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, email: user.email, isSeller: user.isSeller } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
