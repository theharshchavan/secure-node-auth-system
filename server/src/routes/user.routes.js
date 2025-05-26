import express from 'express';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post(
    '/register', 
    [body('username').isString().trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],
    
);

export default router;