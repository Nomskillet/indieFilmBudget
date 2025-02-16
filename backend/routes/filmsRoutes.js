const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Create a Film (Protected Route)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, budget, revenue } = req.body;
        const userId = req.user.userId; // Extract user ID from JWT token

        const newFilm = await pool.query(
            'INSERT INTO films (user_id, title, budget, revenue) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, title, budget, revenue]
        );

        res.status(201).json({ success: true, film: newFilm.rows[0] });
    } catch (error) {
        console.error('Error creating film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ Get All Films for the Logged-in User
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const films = await pool.query(
            'SELECT * FROM films WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({ success: true, films: films.rows });
    } catch (error) {
        console.error('Error fetching films:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ Update a Film (Only Owner Can Update)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, budget, revenue } = req.body;
        const userId = req.user.userId;

        // Check if the film belongs to the user
        const film = await pool.query('SELECT * FROM films WHERE id = $1 AND user_id = $2', [id, userId]);

        if (film.rows.length === 0) {
            return res.status(403).json({ error: 'Unauthorized: You do not own this film.' });
        }

        const updatedFilm = await pool.query(
            'UPDATE films SET title = $1, budget = $2, revenue = $3 WHERE id = $4 RETURNING *',
            [title, budget, revenue, id]
        );

        res.json({ success: true, film: updatedFilm.rows[0] });
    } catch (error) {
        console.error('Error updating film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ Delete a Film (Only Owner Can Delete)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Check if the film belongs to the user
        const film = await pool.query('SELECT * FROM films WHERE id = $1 AND user_id = $2', [id, userId]);

        if (film.rows.length === 0) {
            return res.status(403).json({ error: 'Unauthorized: You do not own this film.' });
        }

        await pool.query('DELETE FROM films WHERE id = $1', [id]);

        res.json({ success: true, message: 'Film deleted successfully.' });
    } catch (error) {
        console.error('Error deleting film:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
