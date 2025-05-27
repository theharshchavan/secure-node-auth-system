import express from 'express';
import {body} from 'express-validator';

import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post(
    '/register', 
    [body('username').isString().trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],
    registerUser
);

router.post(
    '/login',
    [
        body('email').isEmail().notEmpty().withMessage('Valid email is required'),
        body('password').isLength({min: 6}).withMessage('Password must be t least 6 characters long')
    ],
    loginUser
)

export default router;