import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './config/database.js';
import productRoutes from './routes/productRoutes.js';

// Initialize environment variables
dotenv.config();


// Create Express application
const app = express();

app.use(cors());
app.use(express.json());


// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

// Server port
const PORT = process.env.PORT || 5000;

// First API endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to BREW & GO API!',
        status: 'Server is running ☕'
    });
});


app.get('/api/db-check', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT DATABASE() AS database_name'
        );

        res.status(200).json({
            success: true,
            message: 'MySQL connection successful!',
            database: rows[0].database_name
        });

    } catch (error) {
        console.error('Database error:', error.message);

        res.status(500).json({
            success: false,
            message: 'Database connection failed'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`BREW & GO server running on port ${PORT}`);
});
