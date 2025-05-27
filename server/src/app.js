import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/user.routes.js'; // Adjust the path as necessary
import dashboardRoutes from './routes/dashboard.routes.js'; // Adjust the path as necessary
import verificationRoutes from './routes/verify.routes.js'; // Uncomment if you have verification routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookieParser());
// Middleware to handle CORS
app.use(cors());

// route
app.use('/auth', authRoutes);
app.use('/api/v1/user', dashboardRoutes);
app.use('/api/v1', verificationRoutes);

export default app;