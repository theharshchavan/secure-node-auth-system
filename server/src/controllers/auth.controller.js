import User from "../model/user.model.js";
import {validationResult} from 'express-validator';

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // bcrypt password
        const user = new User({username, email, password});
        await user.save();

        res.status(201).json({ user, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

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
        return res.status(200).json({ user: userData, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
}