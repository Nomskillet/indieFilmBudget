const { Pool } = require('pg');
require('dotenv').config();

// Create a new database connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL Database');
});

module.exports = pool;
