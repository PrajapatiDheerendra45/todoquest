import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.json({ message: 'User registered successfully' });
};

export const loginUser = async (req, res) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is missing!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
