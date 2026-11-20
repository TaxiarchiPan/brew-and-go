import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET all available products
router.get('/', async (req, res) => {
    try {
        const [products] = await pool.query(`
            SELECT
                products.id,
                products.name,
                products.description,
                products.price,
                products.image_url,
                categories.name AS category
            FROM products
            INNER JOIN categories
                ON products.category_id = categories.id
            WHERE products.is_available = TRUE
            ORDER BY products.id ASC
        `);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        console.error('Error fetching products:', error.message);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch products'
        });
    }
});

export default router;
