import React from 'react';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';

const timeAgo = (dateStr) => {
    const time = new Date(dateStr).getTime();
    const now = Date.now();
    const diff = now - time;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} minutes ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hours ago`;
    return `${Math.floor(hrs / 24)} days ago`;
};

const PostItem = ({ post, onLikeClick }) => {
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://localhost:5559/${path.replace(/\\/g, '/')}`;
    };

    return (
        <div className="post-item-card card">
            <div className="post-item-header">
                <div className="avatar">
                    {post.avatar ? (
                        <img src={getImageUrl(post.avatar)} alt="" />
                    ) : (
                        <span style={{fontWeight: 700, fontSize: 13}}>
                            {post.username?.substring(0, 2).toUpperCase()}
                        </span>
                    )}
                </div>
                <div>
                    <span className="post-author-name">{post.username}</span>
                    <span className="post-author-handle">@{post.username}</span>
                    <span style={{ margin: '0 8px', color: 'var(--text-light)' }}>·</span>
                    <span className="post-time">{post.created_at ? timeAgo(post.created_at) : 'recently'}</span>
                </div>
            </div>
            
            <div className="post-content">
                {post.content}
            </div>
            
            {post.image && (
                <img 
                    src={getImageUrl(post.image)} 
                    alt="Post attachment" 
                    className="post-image" 
                />
            )}
            
            <div className="post-actions">
                <button 
                    className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                    onClick={() => onLikeClick(post.id)}
                >
                    <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
                    {post.likes_count || 0}
                </button>
                <button className="action-btn" style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
                    <MessageCircle size={16} />
                    Reply
                </button>
                <button className="action-btn" style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
                    <Repeat2 size={16} />
                    Repost
                </button>
            </div>
        </div>
    );
};

export default PostItem;
