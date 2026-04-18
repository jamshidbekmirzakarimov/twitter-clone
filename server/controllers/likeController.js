import pool from '../config/connection.js';

export const toggleLike = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        // Check if already liked
        const checkLike = await pool.query(
            'SELECT id FROM likes WHERE user_id = $1 AND post_id = $2',
            [userId, postId]
        );

        if (checkLike.rows.length > 0) {
            // Unlike
            await pool.query(
                'DELETE FROM likes WHERE user_id = $1 AND post_id = $2',
                [userId, postId]
            );
            return res.json({ message: 'Post unliked', liked: false });
        } else {
            // Like
            await pool.query(
                'INSERT INTO likes (user_id, post_id) VALUES ($1, $2)',
                [userId, postId]
            );
            return res.json({ message: 'Post liked', liked: true });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
