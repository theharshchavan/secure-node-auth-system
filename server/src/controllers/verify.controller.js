import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const verificationService = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).send('Invalid token');
    }

    user.isVerified = true;
    await user.save();

    res.send('Email verified successfully! You can now log in.');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
}

export default verificationService;