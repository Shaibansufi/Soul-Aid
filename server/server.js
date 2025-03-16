import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import streamRoutes from './routes/streamRoutes.js';
import postRoutes from './routes/postRoutes.js';
import mypageRoutes from './routes/mypageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import cors from 'cors';

// configure env
dotenv.config();

// database config
connectDB();

// rest Object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/stream', streamRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/mypage', mypageRoutes);
app.use('/api/v1/user', userRoutes); // Ensure userRoutes is used
app.use('/api/v1/transaction', transactionRoutes);
app.use('/api/v1/report', reportRoutes);

// rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome To SkillBarter: A Platform for Skill Exchange</h1>");
});

// PORT 
const PORT = process.env.PORT || 8080;

// run listen 
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`.bgCyan.white);
});