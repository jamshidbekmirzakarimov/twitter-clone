import pool from '../config/connection.js';

export const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    const image = req.file ? req.file.path : null; // Multer will handle file upload

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO posts (user_id, content, image) VALUES ($1, $2, $3) RETURNING *',
            [userId, content, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id, 
                p.content, 
                p.image, 
                p.created_at, 
                u.username, 
                u.avatar,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getMyPosts = async (req, res) => {
    const userId = req.user.id;
    try {
        const query = `
            SELECT 
                p.id, 
                p.content, 
                p.image, 
                p.created_at, 
                u.username,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.user_id = $1
            ORDER BY p.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getMyLikedPosts = async (req, res) => {
    const userId = req.user.id;
    try {
        const query = `
            SELECT 
                p.id, 
                p.content, 
                p.image, 
                p.created_at, 
                u.username,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            JOIN likes l ON p.id = l.post_id
            WHERE l.user_id = $1
            ORDER BY l.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
