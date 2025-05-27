import express from 'express';
import verificationService from '../controllers/verify.controller.js';

const router = express.Router();

router.get('/verify/:token', verificationService);

export default router;
