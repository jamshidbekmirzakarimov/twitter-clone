import React from 'react';
import PostForm from '../components/PostForm';
import { RefreshCcw, Plus } from 'lucide-react';

const Profile = () => {
    return (
        <div>
            <div className="feed-header">
                <div>
                    <h3>Profile</h3>
                    <h1>Your Profile</h1>
                    <p>Your public identity and latest contributions.</p>
                </div>
                <button className="btn-refresh">
                    <RefreshCcw size={16} /> Refresh
                </button>
            </div>
            
            <PostForm onSubmit={() => {}} />

            <div className="empty-state card">
                <Plus size={48} strokeWidth={3} />
                <h3>Nothing here yet</h3>
                <p>Your profile is waiting for its first post.</p>
            </div>
        </div>
    );
};

export default Profile;
