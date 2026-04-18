import pool from '../config/connection.js';

export const toggleFollow = async (req, res) => {
    const { followingId } = req.params;
    const followerId = req.user.id;

    if (followerId == followingId) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    try {
        // Check if already following
        const checkFollow = await pool.query(
            'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
            [followerId, followingId]
        );

        if (checkFollow.rows.length > 0) {
            // Unfollow
            await pool.query(
                'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
                [followerId, followingId]
            );
            return res.json({ message: 'Unfollowed successfully', following: false });
        } else {
            // Follow
            await pool.query(
                'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)',
                [followerId, followingId]
            );
            return res.json({ message: 'Followed successfully', following: true });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getFollowers = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT u.id, u.username, u.full_name, u.avatar
            FROM users u
            JOIN follows f ON u.id = f.follower_id
            WHERE f.following_id = $1
        `;
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getFollowing = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT u.id, u.username, u.full_name, u.avatar
            FROM users u
            JOIN follows f ON u.id = f.following_id
            WHERE f.follower_id = $1
        `;
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
