import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';

const PostForm = ({ onSubmit }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        await onSubmit(formData);
        setContent('');
        setImage(null);
    };

    return (
        <div className="post-form-card card">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="post-textarea"
                    placeholder="What is happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={280}
                />
                
                <div className="post-form-actions">
                    <div className="post-form-tools">
                        <label className="tool-btn" style={{ cursor: 'pointer' }}>
                            <Image size={18} />
                            Image
                            <input 
                                type="file" 
                                hidden 
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                        <span style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 600 }}>
                            280
                        </span>
                    </div>
                    
                    <button type="submit" className="btn-brand" style={{ padding: '8px 20px', gap: '8px', fontSize: '14px', borderRadius: '4px' }} disabled={!content.trim()}>
                        Post <Send size={14} />
                    </button>
                </div>
                {image && (
                    <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--primary-color)' }}>
                        Selected image: {image.name}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PostForm;
