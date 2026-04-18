import React, { useState, useEffect } from 'react';
import PostItem from '../components/PostItem';
import { fetchWithAuth } from '../services/api';
import { RefreshCcw, Plus } from 'lucide-react';
import PostForm from '../components/PostForm';
import { API_URL } from '../services/api';

const MyLikes = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await fetchWithAuth('/posts/liked');
            setPosts(data);
        } catch (err) {
            console.error('Failed to load liked posts:', err);
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
            
            // Unlikely to show up in My Likes unless you like it right away, but we should handle form clears
        } catch (err) {
            console.error('Failed to create post', err);
        }
    };


    const handleLikeClick = async (postId) => {
        try {
            const result = await fetchWithAuth(`/posts/${postId}/like`, { method: 'POST' });
            
            if (!result.liked) {
                // Remove from this list
                setPosts(posts.filter(p => p.id !== postId));
            }
        } catch (err) {
            console.error('Failed to toggle like', err);
        }
    };

    return (
        <div>
            <div className="feed-header">
                <div>
                    <h3>Saved Energy</h3>
                    <h1>My Likes</h1>
                    <p>Posts you tapped with intent.</p>
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
                    <p>You haven't liked any posts yet.</p>
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

export default MyLikes;
