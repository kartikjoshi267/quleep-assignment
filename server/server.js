import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "./database/index.js";
import user from './routes/user/index.js';
import blogs from './routes/blogs/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectToDatabase();

app.get('/', (req, res) => {
    res.send('API running successfully');
});

app.use('/api', user);
app.use('/api', blogs);

app.listen(PORT, () => {
    console.log('Successfully started server at http://localhost:8000');
});

