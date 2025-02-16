const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const filmRoutes = require('./routes/filmsRoutes'); // ✅ Import film routes
const authenticateToken = require('./middleware/authMiddleware'); // Import middleware

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Mount auth routes
app.use('/api/films', filmRoutes); // ✅ Use film routes

// 🔒 Protected Route Example
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ success: true, message: `Welcome, user ${req.user.userId}!` });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
