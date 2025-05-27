import express from 'express';
import cors from 'cors';

import authRoutes from './routes/user.routes.js'; // Adjust the path as necessary

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to handle CORS
app.use(cors());

// route
app.use('/auth', authRoutes)

export default app;