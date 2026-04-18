import React, { useState, useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import { fetchWithAuth, API_URL } from '../services/api';
import { RefreshCcw, Plus } from 'lucide-react';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await fetchWithAuth('/posts/my');
            setPosts(data);
        } catch (err) {
            console.error('Failed to load my posts:', err);
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
                    <h3>My Posts</h3>
                    <h1>My Posts</h1>
                    <p>Everything you have shared so far.</p>
                </div>
                <button className="btn-refresh" onClick={loadPosts} disabled={loading}>
                    <RefreshCcw size={16} /> Refresh
                </button>
            </div>
            
            <PostForm onSubmit={handleCreatePost} />
            
            {posts.length === 0 && !loading ? (
                <div className="empty-state card">
                    <Plus size={48} strokeWidth={3} />
                    <h3>Nothing here yet</h3>
                    <p>Your profile is waiting for its first post.</p>
                </div>
            ) : (
                <div className="feed-list">
                    {posts.map(post => (
                        <PostItem 
                            key={post.id} 
                            post={post} 
                            onLikeClick={handleLikeClick} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPosts;
