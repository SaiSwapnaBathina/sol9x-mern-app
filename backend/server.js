
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { PORT } from './config/config.js';

import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js'; // 👈 Make sure this is here

const app = express();

connectDB();

// app.use(cors()); --peevious

//updated

app.use(cors({
  origin: "https://sol9x-mern-app.vercel.app", // your frontend URL
  credentials: true,
}));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes); // 👈 Make sure this is here

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });//fixed the rote checking 404 error while checking in postmon
  });
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
