import express from 'express';

import { authCheck } from '../middleware/authCheck.js'; // Assuming you have an authCheck middleware

const router = express.Router();

router.get('/dashboard', authCheck, (req, res) => {
    // This route is protected by authCheck middleware
    res.status(200).json({ message: "Welcome to the dashboard" });
});

export default router;