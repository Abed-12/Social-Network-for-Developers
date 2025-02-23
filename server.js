import express from 'express';
import env from "dotenv";
import connectDB from './config/db.js';
import userRoutes from './routes/api/users.js';
import authRoutes from './routes/api/auth.js';
import profileRoutes from './routes/api/profile.js';
import postRoutes from './routes/api/posts.js';

const app = express();
env.config();

const PORT = process.env.PORT;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});