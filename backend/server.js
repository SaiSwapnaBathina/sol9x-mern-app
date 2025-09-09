// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import { PORT } from './config/config.js';

// import authRoutes from './routes/authRoutes.js';
// import studentRoutes from './routes/studentRoutes.js';

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);

// // Base Route (Optional)
// app.get('/', (req, res) => {
//     res.send('🔗 SOL9X MERN Backend API is running...');
//   });
  
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { PORT } from './config/config.js';

import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js'; // 👈 Make sure this is here

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes); // 👈 Make sure this is here

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
