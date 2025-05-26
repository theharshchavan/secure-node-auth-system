import express from 'express';
import cors from 'cors';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to handle CORS
app.use(cors());

// route

export default app;