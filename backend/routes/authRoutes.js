const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

const router = express.Router();

// ✅ 1. User Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate role
        const allowedRoles = ['Director', 'Producer', 'Accountant'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid role selected' });
        }

        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, hashedPassword, role]
        );

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, user: newUser.rows[0], token });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ 2. User Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, role: user.rows[0].role }, token });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
