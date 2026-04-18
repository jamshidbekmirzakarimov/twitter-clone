import React, { useState, useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import { fetchWithAuth, API_URL } from '../services/api';
import { RefreshCcw } from 'lucide-react';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await fetchWithAuth('/posts');
            setPosts(data);
        } catch (err) {
            console.error('Failed to load posts:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleCreatePost = async (formData) => {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData // send FormData directly
            });
            const newPostRaw = await response.json();
            if (!response.ok) throw new Error(newPostRaw.message);
            
            // fetch again to get populated user info or just prepend 
            // Better to prepend and then mock user info or just reload fully 
            await loadPosts();
        } catch (err) {
            console.error('Failed to create post', err);
        }
    };

    const handleLikeClick = async (postId) => {
        try {
            const result = await fetchWithAuth(`/posts/${postId}/like`, { method: 'POST' });
            
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likes_count: result.liked ? parseInt(post.likes_count) + 1 : parseInt(post.likes_count) - 1,
                        isLiked: result.liked
                    };
                }
                return post;
            }));
        } catch (err) {
            console.error('Failed to toggle like', err);
        }
    };

    return (
        <div>
            <div className="feed-header">
                <div>
                    <h3>Global Feed</h3>
                    <h1>Home</h1>
                    <p>Fresh posts from everyone, newest first.</p>
                </div>
                <button className="btn-refresh" onClick={loadPosts} disabled={loading}>
                    <RefreshCcw size={16} /> Refresh
                </button>
            </div>
            
            <PostForm onSubmit={handleCreatePost} />
            
            <div className="feed-list">
                {posts.map(post => (
                    <PostItem 
                        key={post.id} 
                        post={post} 
                        onLikeClick={handleLikeClick} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
