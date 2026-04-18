import pool from './config/connection.js';

async function fixDb() {
    try {
        await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(100);');
        console.log("Successfully added full_name column to users table.");
    } catch (e) {
        console.error("Error altering table", e);
    } finally {
        pool.end();
    }
}

fixDb();
