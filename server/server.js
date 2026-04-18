import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import apiRoutes from './routes/api.js';
import initDb from './utils/dbInit.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize Database
initDb();

// Routes
app.use('/api', apiRoutes);

// Simple health check
app.get('/', (req, res) => {
    res.send('Twitter Clone API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
