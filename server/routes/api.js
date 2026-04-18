import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { createPost, getAllPosts, getMyPosts, getMyLikedPosts } from '../controllers/postController.js';
import { toggleLike } from '../controllers/likeController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

import { toggleFollow, getFollowers, getFollowing } from '../controllers/followsController.js';

const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// Post routes
router.get('/posts', getAllPosts);
router.post('/posts', authenticateToken, upload.single('image'), createPost);
router.get('/posts/my', authenticateToken, getMyPosts);
router.get('/posts/liked', authenticateToken, getMyLikedPosts);

// Like routes
router.post('/posts/:postId/like', authenticateToken, toggleLike);

// Follow routes
router.post('/users/:followingId/follow', authenticateToken, toggleFollow);
router.get('/users/:userId/followers', getFollowers);
router.get('/users/:userId/following', getFollowing);

export default router;
