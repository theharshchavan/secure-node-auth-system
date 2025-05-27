import User from "../model/user.model.js";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/generateToken.js";
import transporter from "../utils/mailer.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // bcrypt password
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token (valid for e.g., 1 day)
    const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send verification email
    const verificationLink = `${process.env.BASE_URL}/api/v1/verify/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `<p>Hello ${username}, please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User not exists" });
    }

    if (!findUser.isVerified) return res.status(400).send('Please verify your email first');


    // Use the instance method on the found user
    const isMatch = await findUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // If password matches, return user data (excluding password)
    const userData = {
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
    };

    const token = generateToken(userData);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set secure flag in production to true
      maxAge: 500 * 1000, // 5 minutes
    });

    return res
      .status(200)
      .json({ message: "Login successful", user: userData, token });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
