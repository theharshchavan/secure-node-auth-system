import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/db/db.js';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
